
// TODO: @refactoring This file needs some refactoring.

import fs from 'fs';
import path from 'path';

import _ from 'lodash';
import moment from 'moment';
import metaParser from 'gray-matter';
import MarkdownIt from 'markdown-it';
const md = new MarkdownIt();

import appRoot from 'app-root-path';

import { getPostsPath } from '../../config';

export class Blog extends Object {}
export class Post extends Object {}

var blog = new Blog();
blog.id = 1;

export function getBlog() {
  return blog;
}

const DATE_FILTERS = [
  'date',
];

const STRING_FILTERS = [
  'title',
  'slug',
];

const ARRAY_FILTERS = [
  'categories',
  'tags',
];

const getPost = function (filename) {
  const content = fs.readFileSync(path.join(appRoot.path, getPostsPath(), filename), 'utf8');
  const parsed = metaParser(content);
  return {
    meta: parsed.data,
    content: md.render(parsed.content)
  };
};

// Filter by array field
function arrayFilter(a, b) {
  return !!_.intersection(a, b).length;
}

// Filter by date equality field
function dateFilter(a, b) {
  return moment(a).format('YYYYMMDD') === moment(b).format('YYYYMMDD');
}

function checkEmptyFilter(filters) {
  return !filters ||
    _.isEmpty(filters) ||
    _.every(_.values(filters), function (filter) {
      return _.isNull(filter) || _.isUndefined(filter);
    });
}

export const getPostList = function (filters) {

  let retPostList = [];

  const postList = fs.readdirSync(path.join(appRoot.path, getPostsPath()));
  for (var i = postList.length - 1; i >= 0; i--) {
    let postName = postList[i];

    let post = getPost(postName);

    // Don't process a post if it doesn't have a slug since it's our unique id for a post
    if (post && post.meta && post.meta.slug) {
      if (checkEmptyFilter(filters)) {
        // If there is no filters, add every blog post
        post.id = post.meta.slug;
        retPostList.push(post);
      } else {

        for (let filter in filters) {
          if ({}.hasOwnProperty.call(filters, filter)) {

            // Filter by string filter
            if (_.contains(STRING_FILTERS, filter) && post.meta[filter] === filters[filter]) {
              post.id = post.meta.slug;
              retPostList.push(post);
            }

            // Filter by array filter
            if (_.contains(ARRAY_FILTERS, filter) && arrayFilter(post.meta[filter], filters[filter])) {
              post.id = post.meta.slug;
              retPostList.push(post);
            }

            // Filter by array filter
            if (_.contains(DATE_FILTERS, filter) && dateFilter(post.meta[filter], filters[filter])) {
              post.id = post.meta.slug;
              retPostList.push(post);
            }

          }
        }

      }
    }


  }

  // If there is more than one article having the same slug, return the first one
  if (filters && filters.slug && retPostList.length > 1) {
    retPostList = [ retPostList[0] ];
  }

  return retPostList;

};
