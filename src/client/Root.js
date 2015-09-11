
import React, { Component } from 'react';
import { RootContainer } from 'react-relay';

import Routes from './Routes';
import Blog from './Blog';

class Root extends Component {

  render() {
    return (
      <RootContainer Component={ Blog(this.props.PostsList) } route={ new Routes() }/>
    );
  }

}

export default Root;
