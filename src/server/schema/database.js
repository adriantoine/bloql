
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

  content = fs.readFileSync(path.join(appRoot.path, getPostsPath(), filename + '.md'), 'utf8');

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

    // Remove extension
    postName = postName.replace(path.extname(postName), '');

    let post = getPost(postName);

    if (!filters || _.isEmpty(filters)) {
      // If there is no filters, add every blog post
      retPostList.push(post);
    } else {

      for (let filter in filters) {

        // Filter by string filter
        if (STRING_FILTERS.indexOf(filter) > -1 && post.meta[filter] === filters[filter]) {
          retPostList.push(post);
        }

        // Filter by array filter
        if (ARRAY_FILTERS.indexOf(filter) > -1 && _.intersection(post.meta[filter], filters[filter]).length) {
          retPostList.push(post);
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
