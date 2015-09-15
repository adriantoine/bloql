
// TODO: @refactoring This file needs some refactoring.

import fs from 'fs';
import path from 'path';

import _ from 'lodash';
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

const STRING_FILTERS = [
  'title',
  'slug',
];

const ARRAY_FILTERS = [
  'categories',
  'tags',
];

const getPost = function (filename) {

  let content;

  content = fs.readFileSync(path.join(appRoot.path, getPostsPath(), filename), 'utf8');

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
      if (!filters || _.isEmpty(filters)) {
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
            if (_.contains(ARRAY_FILTERS, filter) && _.intersection(post.meta[filter], filters[filter]).length) {
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
