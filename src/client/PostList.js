
import Relay from 'react-relay';
import DefaultRoute from './routes/BlogRoute';
import { generateBlogReactComponent, generateBlogRelayComponent } from './_postlist/generateBlogComponent';
import generateRootComponent from './_postlist/generateRootComponent';
import bloqlPostList from './_postlist/bloqlPostList';

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

    // Set the functions there to allow it to be overriden
    this.generateBlogReactComponent = generateBlogReactComponent;
    this.generateBlogRelayComponent = generateBlogRelayComponent;
    this.generateRootComponent = generateRootComponent;

  }

  // Set all components
  createComponent(component) {

    this.Component = component;

    this.Bloql = this.createBloql(this.Component);
    this.Relay = this.createRelay(this.Bloql);
    this.Blog = this.createBlog(this.Relay, this.Component);
    this.Root = this.createRoot(this.Blog);

    return this.Root;

  }

  // Generate bloql post element with custom functions
  createBloql(component) {
    return bloqlPostList(component);
  }

  createRelay(component) {
    return Relay.createContainer(component, {
      fragments: {
        posts: () => this.postListFragment,
      },
    });
  }

  createBlog(component) {
    var ReactComponent = this.generateBlogReactComponent(component);
    var RelayComponent = this.generateBlogRelayComponent(ReactComponent, this.Component.filters || {}, component);

    return RelayComponent;
  }

  createRoot(component) {
    return generateRootComponent(component, this.route);
  }

}

var postList = new PostList();

export var createComponent = postList.createComponent.bind(postList);
export default postList;
