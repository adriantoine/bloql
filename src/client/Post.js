
import Relay, { RootContainer } from 'react-relay';
import React, { Component } from 'react';
import Route from './routes/PostRoute';

function createPost(Post) {
  return Relay.createContainer(Post, {
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

function createRoot(Post) {
  return class Root extends Component {
    render() {
      return (
        <RootContainer Component={ Post } route={ new Route({
          slug: this.props.slug
        }) }/>
      );
    }
  };
}

export const create = function (Post) {
  var post = createPost(Post);
  return createRoot(post);
};
