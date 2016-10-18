import React, { Component } from 'react';
import { getUserListItemStore, createUserListItemStore } from '../store/UserListItemStore.js';
import UserListItemContainer from '../container/UserListItemContainer.js';
import createStoreProvider from '../util/createStoreProvider.js';

class UserListItemProvider extends Component {
  render() {
    const { userId, data = false } = this.props;
    let store = getUserListItemStore(userId);

    if (!store) {
      if (!data) {
        return null;
      }

      store = createUserListItemStore(userId, data);
    }

    const Container = createStoreProvider(store, UserListItemContainer);

    return (
      <Container />
    );
  }
}

export default UserListItemProvider;