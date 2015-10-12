
import React, { Component } from 'react';

export default class TestPost extends Component {

  componentDidMount() {
    this.props.bloql.setSlug('children-of-men');
  }

  onButtonClick(slug) {
    this.props.bloql.setSlug(slug);
  }

  render() {

    console.log('title', this.props.post.meta.title);

    return (
      <div>

        <div>
          Click on those buttons to switch articles:
          <button class="button-children-of-men" onClick={this.onButtonClick.bind(this, 'children-of-men')}>Children of Men</button>
          <button class="button-markdown-powered" onClick={this.onButtonClick.bind(this, 'markdown-powered')}>Markdown Powered</button>
          <button class="button-antibes" onClick={this.onButtonClick.bind(this, 'antibes')}>Antibes</button>
          <button class="button-annecy" onClick={this.onButtonClick.bind(this, 'annecy')}>Annecy</button>
        </div>

        <h1 class="title">{this.props.post.meta.title}</h1>
        <div class="content" dangerouslySetInnerHTML={{__html: this.props.post.content}}/>

      </div>
    );

  }
}
