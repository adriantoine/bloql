
import Relay from 'react-relay';

export default class extends Relay.Route {

  static queries = {
    post: () => Relay.QL`query { post(slug: $slug) }`,
  };

  static routeName = 'PostRoute';

}
