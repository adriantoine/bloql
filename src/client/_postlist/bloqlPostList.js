
import filterStore from './filterStore';
import React from 'react';

export default function (Component) {

  return React.createClass({

    setFilters: function (filters) {
      filterStore.setFilters(filters);
    },
    resetFilters: function () {
      filterStore.resetFilters();
    },

    render: function () {

      var bloqlProps = { bloql: {
        setFilters: this.setFilters,
        resetFilters: this.resetFilters,
      } };

      return <Component {...this.props} {...bloqlProps} />;
    }

  });

}
