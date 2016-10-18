import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import EduFriendFeedComponent from '../component/EduFriendFeedComponent.js';
import { storeListAppend, storeListPrepent } from '../action/StoreListAction.js';
import { request, WEIBO_PUBLIC_TIMELINE } from '../util/api.js';
import { durationSendNotification } from '../util/notification.js';
import { createCustomDataStore } from '../store/CustomDataStore.js';

const mapStateToProps = (state) => ({data: state});

class EduFriendFeedContainer extends Component {

  static contextTypes = {
    store: PropTypes.object.isRequired,
  };

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  render() {
    const { data } = this.props;

    return (
      <EduFriendFeedComponent data={data} />
    );
  }

  componentDidMount() {

    this.handleOnRefresh();

    // const { store } = this.context;
  }

  handleOnRefresh() {
    const { store } = this.context;

    const [ firstStore = false ] = store.getState();

    let first_id = 0;
    if (firstStore !== false) {
      first_id = firstStore.getState().feed_id;
    }

    request(WEIBO_PUBLIC_TIMELINE)
      .end((error, response) => {
        if (error !== null) {
          let statusText = response ? response.statusText : '网络连接失败';
          durationSendNotification(statusText);
        } else if (response.body.status != 1) {
          durationSendNotification('没用数据了哦!');
        } else {
          response.body.data.forEach((feed) => {
            if (feed.feed_id > first_id) {
              store.dispatch(storeListPrepent(createCustomDataStore(feed)));
            }
          });
        }
      })
    ;

  }
}

export default connect(mapStateToProps)(EduFriendFeedContainer);