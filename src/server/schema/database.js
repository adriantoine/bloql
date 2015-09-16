
// TODO: @refactoring This file needs some refactoring.

import fs from 'fs';
import path from 'path';

import _ from 'lodash';
import moment from 'moment';
import metaParser from 'gray-matter';
import MarkdownIt from 'markdown-it';
const md = new MarkdownIt();

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

// Filters
// ------------------------------

// Function to call by filter
var filterFunctions = {
  startDate: startDateFilter,
  endDate: endDateFilter,
  date: dateFilter,
  title: stringFilter,
  slug: stringFilter,
  categories: arrayFilterAnd,
  tags: arrayFilterAnd,
};

// Filter by string equality field
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

// Filter by date equality field
function startDateFilter(a, b, meta) {
  return moment(meta.date).isAfter(moment(b));
}

// Filter by date equality field
function endDateFilter(a, b, meta) {
  return moment(meta.date).isBefore(moment(b));
}

function isNullOrUndefined(a) {
  return _.isNull(a) || _.isUndefined(a);
}

// Filter posts
// ------------------------------

// Clean filters list by removing all null and undefined values
function cleanFilters(filters) {
  return _(filters)
      .pairs()
      .reject(function (pair) {
        return isNullOrUndefined(pair[1]);
      })
      .object()
      .value();
}

// Returns true if all filters pass for this post
function checkFilters(filtersParam, meta) {

  // Remove all null and undefined elements from the filters
  let filters = cleanFilters(filtersParam);

  // Check that every filter pass
  return _.every(filters, function (value, filter) {
    return filterFunctions[filter](meta[filter], value, meta);
  });

}

// Retrieve posts and process them
// ------------------------------

const getPost = function (filename) {
  const content = fs.readFileSync(path.join(getPostsPath(), filename), 'utf8');
  const parsed = metaParser(content);
  return {
    meta: parsed.data,
    content: md.render(parsed.content)
  };
};

export const getPostList = function (filters) {

  let retPostList = [];

  // Get the list of posts
  const postList = fs.readdirSync(getPostsPath());

  for (var i = postList.length - 1; i >= 0; i--) {
    let post = getPost(postList[i]);

    // Don't process a post if it doesn't have a slug since it's our unique id for a post
    if (post && post.meta && post.meta.slug) {

      // If there is no filter, or the filters pass, add the post to the array
      if (
        !filters ||
        _.isEmpty(cleanFilters(filters)) ||
        checkFilters(filters, post.meta)
      ) {
        post.id = post.meta.slug;
        retPostList.push(post);
      }
    }

  }

  // If there is more than one article having the same slug, return the first one
  if (filters && filters.slug && retPostList.length > 1) {
    retPostList = [ retPostList[0] ];
  }

  return retPostList;

};
