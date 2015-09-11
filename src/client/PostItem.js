
import Relay from 'react-relay';

function createPostItem(PostItem) {
  return Relay.createContainer(PostItem, {
    fragments: {
      post: () => Relay.QL`
        fragment on Post {
          meta {
            title
            slug
            date
            categories
            tags
          }
        }
      `,
    },
  });
}

export const create = function (PostItem) {
  return createPostItem(PostItem);
};
