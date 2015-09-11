
import Relay, { RootContainer } from 'react-relay';
import React, { Component } from 'react';
import Routes from './Routes';

function createPostList(PostList, PostItem) {
  return Relay.createContainer(PostList, {
    fragments: {
      posts: () => Relay.QL`
        fragment on PostConnection {
          edges {
            node {
              id,
              ${PostItem.getFragment('post')}
            }
          }
        }
      `,
    },
  });
}

function createBlog(PostList) {
  class _Blog extends Component {
    render() {
      return <PostList posts={ this.props.blog.posts } />;
    }
  }

  return Relay.createContainer(_Blog, {
    fragments: {
      blog: () => {
        return Relay.QL`
          fragment on Blog {
            posts(first:10) {
              ${PostList.getFragment('posts')}
            }
          }
        `;
      },
    },
  });
}

function createRoot(Blog) {
  return class Root extends Component {
    render() {
      return (
        <RootContainer Component={ Blog } route={ new Routes() }/>
      );
    }
  };
}

export const create = function (PostList, PostItem) {
  var postList = createPostList(PostList, PostItem);
  var blog = createBlog(postList);
  return createRoot(blog);
};
