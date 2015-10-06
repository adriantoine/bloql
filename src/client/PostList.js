
import Relay, { RootContainer } from 'react-relay';
import React, { Component } from 'react';
import Route from './routes/BlogRoute';

function createPostList(PostList) {
  return Relay.createContainer(PostList, {
    fragments: {
      posts: () => Relay.QL`
        fragment on PostConnection {
          edges {
            node {
              id,
              meta {
                title
                slug
                date
                categories
                tags
              }
            }
          }
        }
      `,
    },
  });
}

function createBlog(RelayPostList, PostList) {

  class _Blog extends Component {
    render() {
      return <RelayPostList posts={ this.props.blog.posts } />;
    }
  }

  return Relay.createContainer(_Blog, {

    initialVariables: {
      count: PostList.postCount || 10,

      startDate: PostList.startDate || null,
      endDate: PostList.endDate || null,
      date: PostList.date || null,
      categories: PostList.categories || null,
      tags: PostList.tags || null,
    },

    fragments: {
      blog: () => {
        return Relay.QL`
          fragment on Blog {
            posts(first: $count startDate:$startDate endDate:$endDate date:$date categories:$categories tags:$tags) {
              ${RelayPostList.getFragment('posts')}
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
        <RootContainer Component={ Blog } route={ new Route() }/>
      );
    }
  };
}

export var setComponent = function (PostList) {
  var RelayPostList = createPostList(PostList);
  var Blog = createBlog(RelayPostList, PostList);
  return createRoot(Blog);
};
