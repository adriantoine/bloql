
import postListStore from './postListStore';
import React from 'react';

export default function (Component) {

  return React.createClass({

    setFilters: function (filters) {
      postListStore.setFilters(filters);
    },
    resetFilters: function () {
      postListStore.resetFilters();
    },

    render: function () {

      var bloqlProps = { bloql: {
        setFilters: this.setFilters,
        resetFilters: this.resetFilters,
      } };

      return <Component {...this.props} {...postListStore.props} {...bloqlProps} />;
    }

  });

}
