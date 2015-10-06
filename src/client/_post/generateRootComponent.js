
import slugStore from './slugStore';
import { RootContainer } from 'react-relay';
import React, { Component } from 'react';

// This function will generate a root component based on parameters
export default function (relay, staticSlug, PostRoute) {
  return class RootComponent extends Component {

    constructor() {
      super();

      // Make the function setSlug available in the store for other components
      slugStore.setSlug = this.setSlug.bind(this);

    }

    // Update current slug
    setSlug(slug) {
      this.setState({
        slug: slug
      });
    }

    getSlug() {

      // Get a default slug
      var slug = this.props.slug || staticSlug;

      // Get slug from state if it's set
      if (this.state && this.state.slug) {
        slug = this.state.slug;
      }

      return slug;

    }

    render() {
      return <RootContainer Component={relay} route={new PostRoute({ slug: this.getSlug() })}/>;
    }

  };
}
