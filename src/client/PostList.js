
import Relay, { RootContainer } from 'react-relay';
import React, { Component } from 'react';
import DefaultRoute from './routes/BlogRoute';

class PostList {

  constructor() {

    // Create post list initial fragment
    this.postListFragment = Relay.QL`
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
    `;

    // Set default route
    this.route = DefaultRoute;

  }

  // Set all components
  setComponent(component) {

    this.Component = component;

    this.Relay = this.createRelay(this.Component);
    this.Blog = this.createBlog(this.Relay, this.Component);
    this.Root = this.createRoot(this.Blog);

    return this.Root;

  }

  createRelay(component) {
    return Relay.createContainer(component, {
      fragments: {
        posts: () => this.postListFragment,
      },
    });
  }

  createBlog(RelayPostList, component) {

    class Blog extends Component {
      render() {
        return <RelayPostList posts={ this.props.blog.posts } />;
      }
    }

    return Relay.createContainer(Blog, {

      initialVariables: {
        count: component.postCount || 10,

        startDate: component.startDate || null,
        endDate: component.endDate || null,
        date: component.date || null,
        categories: component.categories || null,
        tags: component.tags || null,
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

  createRoot(component) {

    var Route = this.route;

    return class Root extends Component {
      render() {
        return (
          <RootContainer Component={ component } route={ new Route() }/>
        );
      }
    };

  }

}

var postList = new PostList();

export var setComponent = postList.setComponent.bind(postList);
export default postList;
