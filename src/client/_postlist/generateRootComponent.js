
import { RootContainer } from 'react-relay';
import React, { Component } from 'react';

// This function will generate a root component based on parameters
export default function (component, PostRoute) {
  return class Root extends Component {
    render() {
      return (
        <RootContainer Component={ component } route={ new PostRoute() }/>
      );
    }
  };
}
