
## [0.11.0](https://github.com/adriantoine/bloql/tree/0.10.0) (2015-10-12)

- Changed bloql interface to avoid polluting `this.props` object and make it easier to access for posts:

for `PostList`:
  ```js
{this.props.posts.edges.map(edge =>
  <a href={edge.node.meta.slug}>{edge.node.meta.title}</a>
)}
// becomes:
{this.props.bloql.posts.map(post =>
  <a href={post.meta.slug}>{post.meta.title}</a>
)}
  ```

for `Post` (to avoid polluting `this.props`, in case a user wants to have pass his own `post` prop, we shouldn't override it):
  ```js
this.props.post
// becomes:
this.props.bloql.post
  ```

[Full Changelog](https://github.com/adriantoine/bloql/compare/0.11.0...0.10.1)

## [0.10.0](https://github.com/adriantoine/bloql/tree/0.10.0) (2015-10-07)

- Added ability to dynamically update filters on the post list using bloql functions in an `PostList` component:
  ```js
// Filter a list of posts by tags or date
this.props.bloql.setFilters({ tags: ['trip', 'usa'], startDate: '2015-01-01' });

// Reset filters
this.props.bloql.resetFilters();
  ```
  Example: https://github.com/adriantoine/bloql-examples/blob/master/filters/public/index.js#L10

- Changed function names for better consistency (hopefully it will be the last time I do that):
  ```js
import { setComponent } from 'bloql/Post';
import { setComponent } from 'bloql/PostList';

// become =>

import { createComponent } from 'bloql/Post';
import { createComponent } from 'bloql/PostList';
  ```

- Just like `Post`, `PostList` becomes a big customisable object, see previous release.
- This is not part of this repo/package but examples have been updated to demonstrate more features: [bloql-examples](https://github.com/adriantoine/bloql-examples)

[Full Changelog](https://github.com/adriantoine/bloql/compare/0.9.1...0.10.0)

## [0.9.0](https://github.com/adriantoine/bloql/tree/0.9.0) (2015-10-06)
- Added ability to update the slug of a post which will change the displayed post, just run this command in any bloql `Post` component:
  ```js
this.props.bloql.setSlug('my-post-slug');
  ```
  Example: https://github.com/adriantoine/bloql-examples/blob/master/basic/public/post.js#L11

- Changed interface and function names:
  ```js
import createPost from 'bloql/Post';
import createPostList from 'bloql/PostList';

// become =>

import { setComponent } from 'bloql/Post';
import { setComponent } from 'bloql/PostList';
  ```
- `Post` element is much easier to customise with your own routes or fragments, so if you require the `Post` component this way:

  ```js
import Post from 'bloql/Post';
  ```
  you'll be able to change almost anything from this post before calling its method `setComponent` with your component. More documentation and examples to be coming, for now you can have a look at: https://github.com/adriantoine/bloql/blob/master/src/client/Post.js
  This cool stuff is not yet available for `PostList` but that should be in the next release

[Full Changelog](https://github.com/adriantoine/bloql/compare/0.8.3...0.9.0)

## [0.8.3](https://github.com/adriantoine/bloql/tree/0.8.3) (2015-10-06)
Small code fix and added back webpack options

[Full Changelog](https://github.com/adriantoine/bloql/compare/0.8.2...0.8.3)

## [0.8.2](https://github.com/adriantoine/bloql/tree/0.8.2) (2015-10-05)
- Fixed build process to use webpack
- Fixed many issues with dependencies and multiple copies of React
- Doesn't bundle `react` and `react-relay` packages to make files minimal and avoid build issues, they are now [peer dependencies](https://github.com/adriantoine/bloql/blob/master/package.json#L39-L40)
- Changed folder structure and way to get files:
  - On the server side:
  ```js
import bloql from 'bloql/server/middleware/express';

// become =>

import bloql from 'bloql/middleware/express';
  ```
  - On the client side:
  ```js
import { createPost } from 'bloql/client';
import { createPostList } from 'bloql/client';

// become =>

import createPost from 'bloql/Post';
import createPostList from 'bloql/PostList';
```
- Created [examples](https://github.com/adriantoine/bloql-examples) and updated [README.md](https://github.com/adriantoine/bloql/blob/master/README.md)

[Full Changelog](https://github.com/adriantoine/bloql/compare/0.7.0...0.8.2)

## [0.7.0](https://github.com/adriantoine/bloql/tree/0.7.0) (2015-09-16)
- Now the database that retrieves and process posts is in another module to make it more modular, in case people want to store and retrieve posts in another way (MongoDB, PostgreSQL, using an API, etc...) they would be able to write the own database module for bloql. Ex: https://github.com/adriantoine/adriantoine.com/blob/580c04261e9fc8f5000bcb8ead715e6b349f5ae7/server.js#L15

[Full Changelog](https://github.com/adriantoine/bloql/compare/0.6.0...0.7.0)

## [0.6.0](https://github.com/adriantoine/bloql/tree/0.6.0) (2015-09-16)
- Now able to filter a date range using `startDate` and `endDate` filters. Ex: https://github.com/adriantoine/adriantoine.com/blob/5cb31174cceea25183efbe27302e721901e9d74b/src/components/PostList.js#L9-L10

[Full Changelog](https://github.com/adriantoine/bloql/compare/0.5.0...0.6.0)

## [0.5.0](https://github.com/adriantoine/bloql/tree/0.5.0) (2015-09-12)
- Removed the `createPostItem` from the client interface so that now you can actually use any React elements as PostItem, you don't have to pass the `PostItem` static variable anymore to `PostList`. A `PostList` is the only element needed by bloql to generate a list of posts. Ex: https://github.com/adriantoine/adriantoine.com/blob/7118ddcdc00f7fcb72b4e1a48363a460c5c9d03a/src/components/PostList.js

- You can now use filters: https://github.com/adriantoine/adriantoine.com/blob/7118ddcdc00f7fcb72b4e1a48363a460c5c9d03a/src/components/PostList.js#L9-L10

[Full Changelog](https://github.com/adriantoine/bloql/compare/0.4.0...0.5.0)

## [0.4.0](https://github.com/adriantoine/bloql/tree/0.4.0) (2015-09-12)
Added a post component to be able to create a post page.

[Full Changelog](https://github.com/adriantoine/bloql/compare/0.3.0...0.4.0)

## [0.3.0](https://github.com/adriantoine/bloql/tree/0.3.0) (2015-09-11)
Simplified interface for an easier way to create components. Documentation still needs to be written.

[Full Changelog](https://github.com/adriantoine/bloql/compare/0.2.0...0.3.0)

## [0.2.0](https://github.com/adriantoine/bloql/tree/0.2.0) (2015-09-11)
The first version of my `bloql` blog engine powered by React using Relay and GraphQL to serve blog posts.

This is a pre-release, the interface is probably going to be simplified in further released and docs need to be updated.

[Full Changelog](https://github.com/adriantoine/bloql/compare/0.1.0...0.2.0)

## [0.1.0](https://github.com/adriantoine/bloql/tree/0.1.0) (2015-09-11)
Initial release

[Full Changelog](https://github.com/adriantoine/bloql/compare/show...0.1.0)

## [show](https://github.com/adriantoine/bloql/tree/show) (2015-09-11)
