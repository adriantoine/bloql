
import Relay from 'react-relay';

export default class extends Relay.Route {

  static queries = {
    blog: () => Relay.QL`query { blog }`
  };

  static routeName = 'BlogRoute';

}
