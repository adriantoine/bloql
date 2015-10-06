
import Relay from 'react-relay';

import DefaultRoute from './routes/PostRoute';
import PostComponent from './_post/PostComponent';
import generateRootComponent from './_post/generateRootComponent';

class Post {

  constructor() {

    // Create initial fragment
    this.fragment = Relay.QL`
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
    `;

    // Set default route
    this.route = DefaultRoute;

    // Create a very generic component
    this.setComponent(PostComponent);

  }

  // Generate components from the React one provided
  setComponent(component) {

    this.Component = component;

    this.Relay = this.setRelay(this.Component);
    this.Root = this.setRoot(this.Relay);

  }

  // Generate Relay component
  setRelay(component = this.Component) {
    return Relay.createContainer(component, {
      fragments: {
        post: () => this.fragment,
      }
    });
  }

  // Generate Relay Root Container
  setRoot(relay = this.Relay) {
    return generateRootComponent(relay, this.Component.slug, this.route);
  }

}

export default new Post();
