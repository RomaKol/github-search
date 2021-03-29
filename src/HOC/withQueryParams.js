import { withProps } from 'recompose';
import queryString from 'query-string';

import history from 'services/history';

export default function withQueryParams(Component) {
  return withProps(props => {
    return {
      queryParams: queryString.parse(history.location.search)
    };
  })(Component);
}