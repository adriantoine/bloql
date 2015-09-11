
import Relay from 'react-relay';

export default function (PostsList, PostItem) {
  return Relay.createContainer(PostsList, {
    fragments: {
      posts: () => Relay.QL`
        fragment on PostConnection {
          edges {
            node {
              id,
              ${PostItem.getFragment('post')}
            }
          }
        }
      `,
    },
  });
}
