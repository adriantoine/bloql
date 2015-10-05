
import _ from 'lodash';
import graphqlHTTP from 'express-graphql';
import { setConfig } from '../config';


export default function (app, options) {

  let graphQLOptions = _.extend({
    schema: require('../schema/schema')
  }, options);

  setConfig(options);

  app.use('/graphql', graphqlHTTP(graphQLOptions));

}
