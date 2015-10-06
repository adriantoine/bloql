
import slugStore from './slugStore';
import React from 'react';

export default React.createClass({

  // Set the slug of the root container from a component
  setSlug: function (slug) {
    slugStore.setSlug(slug);
  },

  // Default generic render function
  render: function () {
    return React.createElement('div');
  }
});
