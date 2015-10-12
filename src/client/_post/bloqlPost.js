
import React from 'react';
import _ from 'lodash';

import postStore from './postStore';

export default function (Component) {

  return React.createClass({

    setSlug: function (slug) {
      postStore.setSlug(slug);
    },

    render: function () {

      var props = _.extend({
        bloql: {
          setSlug: this.setSlug,
          post: this.props.post,
        }
      }, this.props, postStore.props);

      return <Component {...props} />;
    }

  });

}
