
import Relay from 'react-relay';
import _ from 'lodash';
import React, { Component } from 'react';

import filterStore from './filterStore';

var originalFilters = {
  count: 10,
  startDate: null,
  endDate: null,
  date: null,
  categories: null,
  tags: null,
};

// This function will generate a root component based on parameters
export const generateBlogReactComponent = function (RelayPostList) {
  return class RootComponent extends Component {

    constructor() {
      super();

      // Make the functions available in the store for other components
      filterStore.setFilters = this.setFilters.bind(this);
      filterStore.resetFilters = this.resetFilters.bind(this);

    }

    // Update current filters
    setFilters(filters) {
      this.props.relay.setVariables(filters);
    }

    // Reset filters
    resetFilters() {
      this.props.relay.setVariables(originalFilters);
    }

    render() {
      return <RelayPostList posts={ this.props.blog.posts } />;
    }
  };
};

export const generateBlogRelayComponent = function (ReactComponent, componentStaticFilters, RelayPostList) {

  // Store original filters in an array
  _.extend(originalFilters, componentStaticFilters);

  return Relay.createContainer(ReactComponent, {

    initialVariables: originalFilters,

    fragments: {
      blog: () => {
        return Relay.QL`
          fragment on Blog {
            posts(first: $count startDate:$startDate endDate:$endDate date:$date categories:$categories tags:$tags) {
              ${RelayPostList.getFragment('posts')}
            }
          }
        `;
      },
    },
  });
};
