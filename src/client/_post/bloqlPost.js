
import slugStore from './slugStore';
import React from 'react';

export default function (Component) {

  return React.createClass({

    setSlug: function (slug) {
      slugStore.setSlug(slug);
    },

    render: function () {

      var bloqlProps = { bloql: {
        setSlug: this.setSlug,
      } };

      return <Component {...this.props} {...bloqlProps} />;
    }

  });

}
