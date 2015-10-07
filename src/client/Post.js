
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

    // Set the functions there to allow it to be overriden
    this.generateRootComponent = generateRootComponent;

    // Create a very generic component to begin
    this.createComponent(React.createClass({
      render: function () { return <div/>; }
    }));

  }

  // Generate components from the React one provided
  createComponent(component) {

    this.Component = component;

    this.Bloql = this.createBloql(this.Component);
    this.Relay = this.createRelay(this.Bloql);
    this.Root = this.createRoot(this.Relay);

    return this.Root;

  }

  // Generate bloql post element with custom functions
  createBloql(component) {
    return bloqlPost(component);
  }

  // Generate Relay component
  createRelay(component) {
    return Relay.createContainer(component, {
      fragments: {
        post: () => this.fragment,
      }
    });
  }

  // Generate Relay Root Container
  createRoot(component) {
    return this.generateRootComponent(component, this.Component.slug, this.route);
  }

}

var post = new Post();

export var createComponent = post.createComponent.bind(post);
export default post;
