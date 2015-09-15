
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

// Elements needed by Relay
// TODO: Investigate how to get rid of these
// ------------------------------

export class Blog extends Object {}
export class Post extends Object {}

var blog = new Blog();
blog.id = 1;

export function getBlog() {
  return blog;
}

// Filter functions
// ------------------------------

// Function to call by filter
var filterFunctions = {
  date: dateFilter,
  title: stringFilter,
  slug: stringFilter,
  categories: arrayFilterAnd,
  tags: arrayFilterAnd,
};

// Filter by date equality field
function stringFilter(a, b) {
  return a === b;
}

// // Filter by array field
// // This one returns elements containing at least one of the filters
// function arrayFilterOr(a, b) {
//   return !!_.intersection(a, b).length;
// }

// Filter by array field
// This one returns elements containing all the filters
function arrayFilterAnd(a, b) {
  return !_.difference(b, a).length;
}

// Filter by date equality field
function dateFilter(a, b) {
  return moment(a).format('YYYYMMDD') === moment(b).format('YYYYMMDD');
}

function isNullOrUndefined(a) {
  return _.isNull(a) || _.isUndefined(a);
}

function checkEmptyFilter(filters) {
  return !filters ||
    _.isEmpty(filters) ||
    _.every(_.values(filters), function (filter) {
      return isNullOrUndefined(filter);
    });
}

const getPost = function (filename) {
  const content = fs.readFileSync(path.join(appRoot.path, getPostsPath(), filename), 'utf8');
  const parsed = metaParser(content);
  return {
    meta: parsed.data,
    content: md.render(parsed.content)
  };
};

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
          if (!isNullOrUndefined(filters[filter]) && {}.hasOwnProperty.call(filters, filter)) {

            if (filterFunctions[filter](post.meta[filter], filters[filter])) {
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
