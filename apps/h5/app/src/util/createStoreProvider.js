import React, { createClass } from 'react';
import { Provider } from 'react-redux';

const createStoreProvider = (store, Container) => (createClass({
  render() {
    return (
      <Provider store={store}>
        <Container {...this.props} />
      </Provider>
    );
  }
}));

export default createStoreProvider; 