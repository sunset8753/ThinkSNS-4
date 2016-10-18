import React from 'react';
import { Provider } from 'react-redux';

import store from './store/AuthenticationStore.js';
import Routes from './Routes.js';

store.subscribe(() => {
  console.log(store.getState());
});

const Root = () => (
  <Provider store={store}>
    <Routes />
  </Provider>
);

export default Root;