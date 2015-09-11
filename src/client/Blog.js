
import Relay from 'react-relay';
import React, { Component } from 'react';

export default function (PostsList) {

  class Blog extends Component {

    render() {
      return (
        <div className="Bloql">
          <PostsList posts={ this.props.blog.posts } />
        </div>
      );
    }

  }

  return Relay.createContainer(Blog, {

    fragments: {
      blog: () => Relay.QL`
        fragment on Blog {
          posts(first:10) {
            ${PostsList.getFragment('posts')}
          }
        }
      `,
    },

  });

}
