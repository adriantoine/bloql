
import Relay from 'react-relay';

export default function (Post) {
  return Relay.createContainer(Post, {
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
