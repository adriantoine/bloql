
import React from 'react';
import _ from 'lodash';

import postListStore from './postListStore';

const processPostList = (edges) => {
  return _.map(edges, (edge) => edge.node);
};

export default function (Component) {

  return React.createClass({

    setFilters: function (filters) {
      postListStore.setFilters(filters);
    },
    resetFilters: function () {
      postListStore.resetFilters();
    },

    render: function () {

      var props = _.extend({
        bloql: {
          setFilters: this.setFilters,
          resetFilters: this.resetFilters,
          posts: processPostList(this.props.posts.edges),
        }
      }, this.props, postListStore.props);

      return <Component {...props} />;
    }

  });

}
