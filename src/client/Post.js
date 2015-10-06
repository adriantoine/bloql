
import Relay, { RootContainer } from 'react-relay';
import React from 'react';
import Route from './routes/PostRoute';

function createPost(component) {
  return Relay.createContainer(component, {
    fragments: {
      post: () => Relay.QL`
        fragment on Post {
          meta {
            title
            slug
            date
            categories
            tags
          },
          content
        }
      `,
    },
  });
}

function createRoot(component) {
  return React.createClass({

    render: function () {
      return React.createElement(RootContainer, {
        Component: component,
        route: new Route({
          slug: this.props.slug
        })
      });
    }

  });
}

export default function (component) {
  return createRoot( createPost(component) );
}
