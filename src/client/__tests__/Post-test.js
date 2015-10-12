
jest.dontMock('../../../dist/Post');
jest.dontMock('./fixtures/TestPost');

import React from 'react';
import TestUtils from 'react-addons-test-utils';

const Post = require('../../../dist/Post');
const TestPost = require('./fixtures/TestPost');

describe('Post', () => {

  describe('createComponent', () => {

    it('creates a React component that you can render', () => {
      var MyTestPost = Post.createComponent(TestPost);
      expect(TestUtils.isElement(<MyTestPost/>)).toBeTruthy();
      TestUtils.renderIntoDocument(<MyTestPost/>);
    });

    it('renders the right Post according to slug', () => {
      var MyTestPost = Post.createComponent(TestPost);
      var component = TestUtils.renderIntoDocument(
        <MyTestPost slug="my-test-slug"/>
      );

      var title = TestUtils.findRenderedDOMComponentWithClass(component, 'title');
      console.log(title);

    });

  });

});
