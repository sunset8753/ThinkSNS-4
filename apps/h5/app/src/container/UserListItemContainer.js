import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Loader } from 'amazeui-touch';
import UserListItemComponent from '../component/UserListItemComponent.js';
import { request, USER_FOLLOW, USER_UNFOLLOW } from '../util/api.js'
import { durationSendNotification } from '../util/notification.js';
import modalAction, { closeModal } from '../action/ModalAction.js';
import { UpdateUserData } from '../action/UserListItemAction.js';

const mapStateToProps = (state) => ({
  user: {...state},
});

class UserListItemContainer extends Component {
  render() {
    const { user } = this.props;

    if (!user) {
      return null;
    }

    const handleFollow = this.handleFollow.bind(this);

    return (
      <UserListItemComponent
        user={user}
        handleFollow={handleFollow}
      />
    );
  }

  componentDidMount() {
    // const { user, dispatch } = this.props;
    // dispatch({
    //   type: 'UPDATE_USER_DATA',
    //   data: {
    //     uid: 11,
    //   }
    // })
  }

  handleFollow() {
    const { user } = this.props;
    const { user_id, follow_status: { following } } = user;

    modalAction({
      title: '操作中...',
      closeBtn: false,
      node: (<Loader amStyle="success" rounded={true} />)
    });

    if (following == 1) {
      this.unFollowHandle(user_id);
    } else {
      this.followHandle(user_id);
    }
  }

  followHandle(user_id) {
    request(USER_FOLLOW)
      .field('user_id', user_id)
      .end((error, response) => this.updateUserStateHandle({error, response, following: 1}))
    ;
  }

  unFollowHandle(user_id) {
    request(USER_UNFOLLOW)
      .field('user_id', user_id)
      .end((error, response) => this.updateUserStateHandle({error, response, following: 0}))
    ;
  }

  updateUserStateHandle({following, error, response}) {
    const { dispatch } = this.props;

    if (error != null) {
      let statusText = response ? response.statusText : '网络连接失败';
      durationSendNotification(statusText);
      setTimeout(closeModal, 1500);
    } else if (response.body.status != 1) {
      durationSendNotification(response.body.msg || response.body.info);
      setTimeout(closeModal, 1500);
    } else {
      setTimeout(() => {
        closeModal();
        dispatch(UpdateUserData({follow_status: { following }}));
      }, 1500);
    }
  }
}

export default connect(mapStateToProps)(UserListItemContainer);
