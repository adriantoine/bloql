# bloql

[![Stories in Ready](https://badge.waffle.io/adriantoine/bloql.svg?label=ready&title=Ready)](http://waffle.io/adriantoine/bloql)
[![Stories in Current Priority](https://badge.waffle.io/adriantoine/bloql.svg?label=current%20priority&title=Current%20Priority)](http://waffle.io/adriantoine/bloql)
[![Stories in Progress](https://badge.waffle.io/adriantoine/bloql.svg?label=in%20progress&title=In%20Progress)](http://waffle.io/adriantoine/bloql)

![Stable version](https://img.shields.io/npm/v/bloql.svg?style=flat)
![Stable version](https://img.shields.io/gemnasium/adriantoine/bloql.svg?style=flat)

Blog engine powered by blog engine powered by [React](https://facebook.github.io/react/) using [Relay](https://facebook.github.io/relay/) and [GraphQL](https://facebook.github.io/graphql/) to interact with data.

# Usage

Have a look there for minimal and understandable examples: [bloql-example](https://github.com/adriantoine/bloql-examples)

# Real world usage

It is currently used on my personal website: https://github.com/adriantoine/adriantoine.com

- Here is the backend part to set up the posts folder and the data retriever (in this case it's just markdown files from a folder): https://github.com/adriantoine/adriantoine.com/blob/master/server.js#L25-L29
- Here is a usage of the `PostList` component: https://github.com/adriantoine/adriantoine.com/blob/master/src/components/PostList/PostList.js#L38
- Here is a usage of the single `Post` component: https://github.com/adriantoine/adriantoine.com/blob/master/src/components/Post/Post.js#L35
- And you probably also need to have a look at my `package.json` since the way I manager peerDependencies is still a bit dodgy: https://github.com/adriantoine/adriantoine.com/blob/master/package.json

Proper docs with proper examples to be coming... (and improvements as well)
