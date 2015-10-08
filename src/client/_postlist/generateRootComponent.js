
import { RootContainer } from 'react-relay';
import React, { Component } from 'react';

import postListStore from './postListStore';

// This function will generate a root component based on parameters
export default function (component, PostRoute) {
  return class Root extends Component {
    render() {

      // Pass props to react component
      postListStore.props = this.props;

      return (
        <RootContainer Component={ component } route={ new PostRoute() }/>
      );
    }
  };
}
