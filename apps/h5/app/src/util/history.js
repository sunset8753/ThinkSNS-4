import {
  hashHistory,
  createMemoryHistory
} from 'react-router';

let history;
if (window.navigator.standalone == true) {
  history = createMemoryHistory();
} else {
  history = hashHistory;
}

export default history;