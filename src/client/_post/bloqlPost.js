
import postStore from './postStore';
import React from 'react';

export default function (Component) {

  return React.createClass({

    setSlug: function (slug) {
      postStore.setSlug(slug);
    },

    render: function () {

      var bloqlProps = { bloql: {
        setSlug: this.setSlug,
      } };

      return <Component {...this.props} {...postStore.props} {...bloqlProps} />;
    }

  });

}
