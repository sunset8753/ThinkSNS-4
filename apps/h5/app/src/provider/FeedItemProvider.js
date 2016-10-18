import React, { Component, PropTypes } from 'react';
import FeedItemContainer from '../container/FeedItemContainer.js';
import createStoreProvider from '../util/createStoreProvider.js';

class FeedItemProvider extends Component {

  static propsTypes = {
    store: PropTypes.object.isRequired,
  }

  render() {
    const { store } = this.props;
    const Container = createStoreProvider(store, FeedItemContainer);

    return (
      <Container />
    );
  }
}

export default FeedItemProvider;
