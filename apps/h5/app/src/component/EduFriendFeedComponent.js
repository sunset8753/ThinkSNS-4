import React, { Component } from 'react';
import PullToRefreshComponent from './PullToRefreshComponent.js';
import guid from '../util/guid.js';
import FeedItemComponent from './FeedItemComponent.js';
import FeedItemProvider from '../provider/FeedItemProvider.js';

class EduFriendFeedComponent extends Component {

  render() {

    const { data = [] } = this.props;

    return (
      <PullToRefreshComponent>
        {data.map((feedItemStore) => (
          <FeedItemProvider key={guid()} store={feedItemStore} />
        ))}
      </PullToRefreshComponent>
    );
  }
}

export default EduFriendFeedComponent;