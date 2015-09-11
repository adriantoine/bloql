
import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
} from 'graphql/type';

export default new GraphQLObjectType({
  name: 'Meta',
  description: 'Blog post metadata',
  fields: () => ({
    title: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Title of the blog post',
    },
    slug: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Slug of the blog post',
    },
    date: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Date of the blog post',
    },
    comments: {
      type: GraphQLBoolean,
      description: 'Choose if we want to show comments or not',
    },
    categories: {
      type: new GraphQLList(GraphQLString),
      description: 'Blog post categories',
    },
    tags: {
      type: new GraphQLList(GraphQLString),
      description: 'Blog post tags',
    },
  })
});
