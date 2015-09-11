
import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql/type';

import {
  connectionArgs,
  connectionFromArray,
  globalIdField,
  nodeDefinitions,
  fromGlobalId,
  connectionDefinitions,
} from 'graphql-relay';

import { Post, Blog, getPostList, getBlog } from './database';
import metaType from './metaType';

export const node = nodeDefinitions(

  (globalId) => {

    var {type, id} = fromGlobalId(globalId);

    if (type === 'Post') {
      return getPostList({slug: id})[0];
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
      args: connectionArgs,
      resolve: (blog, args) => connectionFromArray(getPostList(), args),
    }

  },

  interfaces: [ node.nodeInterface ]
});
