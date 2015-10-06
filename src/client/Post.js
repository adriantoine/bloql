
import Relay, { RootContainer } from 'react-relay';
import React from 'react';
import Route from './routes/PostRoute';

function createRelayComponent(component) {
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

function createRelayRoot(relayComponent, component) {

  return React.createClass({

    render: function () {

      const routeParams = {
        slug: this.props.slug || component.slug
      };

      return React.createElement(RootContainer, {
        Component: relayComponent,
        route: new Route(routeParams)
      });
    }

  });
}

export default function (component) {
  var relayComponent = createRelayComponent(component);
  return createRelayRoot( relayComponent, component );
}
