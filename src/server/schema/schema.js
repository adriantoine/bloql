
import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql/type';

import { getBlog } from './classes';
import { getDatabase } from '../../config';
import { blogType, postType, node } from './types';

var Root = new GraphQLObjectType({

  name: 'Root',

  fields: () => ({

    node: node.nodeField,

    blog: {
      type: blogType,
      resolve: () => getBlog()
    },

    post: {
      type: postType,
      args: {
        slug: {
          type: GraphQLString,
        },
      },
      resolve: (root, args) => getDatabase().getPostList(args)[0],
    }

  })

});

var schema = new GraphQLSchema({
  query: Root
});

export default schema;
