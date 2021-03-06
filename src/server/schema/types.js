
import _ from 'lodash';

import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList,
} from 'graphql/type';

import {
  connectionArgs,
  connectionFromArray,
  globalIdField,
  nodeDefinitions,
  fromGlobalId,
  connectionDefinitions,
} from 'graphql-relay';

import { Post, Blog, getBlog } from './classes';
import { getDatabase } from '../config';
import metaType from './metaType';

export const node = nodeDefinitions(

  (globalId) => {

    var {type, id} = fromGlobalId(globalId);

    if (type === 'Post') {
      return getDatabase().getPostList({slug: id})[0];
    } else if (type === 'Blog') {
      return getBlog();
    }

    return null;

  },

  (obj) => {

    if (obj instanceof Post) {
      return postType;
    } else if (obj instanceof Blog) {
      return blogType;
    }

    return null;

  }

);

export const postType = new GraphQLObjectType({

  name: 'Post',
  description: 'Blog post',

  fields: () => ({
    id: globalIdField('Post'),
    meta: {
      type: metaType,
      description: 'Metadata of the blog post',
    },
    content: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Blog post content in HTML',
    },
  }),

  interfaces: [ node.nodeInterface ]

});

export const connection = connectionDefinitions({
  name: 'Post',
  nodeType: postType
});

export const blogType = new GraphQLObjectType({
  name: 'Blog',

  fields: {

    id: globalIdField('Blog'),

    posts: {
      type: connection.connectionType,
      description: 'Blog posts',

      args: _.extend(connectionArgs, {
        startDate: {
          type: GraphQLString
        },
        endDate: {
          type: GraphQLString
        },
        date: {
          type: GraphQLString
        },
        categories: {
          type: new GraphQLList(GraphQLString)
        },
        tags: {
          type: new GraphQLList(GraphQLString)
        }
      }),

      resolve: (blog, args) => connectionFromArray(getDatabase().getPostList({
        startDate: args.startDate,
        endDate: args.endDate,
        date: args.date,
        categories: args.categories,
        tags: args.tags
      }), args),
    }

  },

  interfaces: [ node.nodeInterface ]
});
