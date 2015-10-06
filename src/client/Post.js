
import Relay from 'react-relay';
import React from 'react';

import DefaultRoute from './routes/PostRoute';
import generateRootComponent from './_post/generateRootComponent';
import bloqlPost from './_post/bloqlPost';

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

    // Create a very generic component to begin
    this.setComponent(React.createClass({
      render: function () { return <div/>; }
    }));

  }

  // Generate components from the React one provided
  setComponent(component) {

    this.Component = component;

    this.Bloql = this.setBloql(this.Component);
    this.Relay = this.setRelay(this.Bloql);
    this.Root = this.setRoot(this.Relay);

    return this.Root;

  }

  // Generate bloql post element with custom functions
  setBloql(component) {
    return bloqlPost(component);
  }

  // Generate Relay component
  setRelay(component) {
    return Relay.createContainer(component, {
      fragments: {
        post: () => this.fragment,
      }
    });
  }

  // Generate Relay Root Container
  setRoot(component) {
    return generateRootComponent(component, this.Component.slug, this.route);
  }

}

var post = new Post();

export var setComponent = post.setComponent.bind(post);
export default post;
