
import _ from 'lodash';
import graphqlHTTP from 'express-graphql';
import { setConfig } from '../../config';

export default function (options) {

  let graphQLOptions = _.extend({ schema: require('../schema/schema')}, options);

  setConfig(options);

  return graphqlHTTP(graphQLOptions);

}
