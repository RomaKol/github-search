import { createBrowserHistory } from 'history';
import queryString from 'query-string';

const history = createBrowserHistory({});

history.listen((location, action) => {
  const state = location.state || {};

  state.scrollToTop !== false && window.scrollTo(0, 0);
});

function pushQueryParams(params) {
  history.push({
    search: queryString.stringify({
      ...queryString.parse(history.location.search),
      ...params
    })
  });
}
function clearQueryParams() {
  history.push(history.location.pathname);
}

export default history;
export { pushQueryParams, clearQueryParams };
