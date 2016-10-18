import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AvatarComponent from '../component/init/AvatarComponent.js';
import { AVATAR_UPLOADING, AVATAR_UPLOADED, setAvatarStatusAsync, createAvatarAction } from '../action/AvatarAction.js';
import { setAuthentication } from '../action/AuthenticationAction.js';
import AvatarUploadFetch from '../fetch/AvatarUploadFetch.js';
import { durationSendNotification } from '../util/notification.js';
import AuthenticationStore from '../store/AuthenticationStore.js';

const mapStateToProps = (state) => ({...state});
const mapDispatchToProps = (dispatch) => (bindActionCreators({setAvatarStatusAsync}, dispatch));

class AvatarContainer extends Component {

  static propTypes = {
    use_dingtalk_avatar: PropTypes.bool.isRequired,
    avatar_upload_status: PropTypes.bool.isRequired,
    setAvatarStatusAsync: PropTypes.func.isRequired,
  };

  render() {
    const AuthenticationState = AuthenticationStore.getState();

    if (AuthenticationState === false) {
      return null;
    }

    const { use_dingtalk_avatar, avatar_upload_status } = this.props;
    const handleFileSelectOnDrop = this.handleFileSelectOnDrop.bind(this);
    const { user: { username, face: { avatar_big } } } = AuthenticationState;

    return (
      <AvatarComponent
        useDingtalkAvatar={use_dingtalk_avatar}
        avatarUploadStatus={avatar_upload_status}
        username={username}
        avatar={avatar_big}
        handleFileSelectOnDrop={handleFileSelectOnDrop}
      />
    );
  }

  handleFileSelectOnDrop([file]) {
    const { setAvatarStatusAsync } = this.props;

    setAvatarStatusAsync(createAvatarAction(AVATAR_UPLOADING));

    AvatarUploadFetch(file, ({error, response}) => {

      if (error !== null) {
        let statusText = response ? response.statusText : '网络连接失败';
        durationSendNotification(statusText);

      } else if (response.body.status != 1) {
        const { body: { message } } = response;
        durationSendNotification(message);

      } else {
        const { body: { data } } = response;
        const { user } = AuthenticationStore.getState();
        AuthenticationStore.dispatch(setAuthentication({
          ...user,
          face: {
            avatar_big: data.big,
            avatar_middle: data.middle,
            avatar_small: data.small,
            avatar_tiny: data.tiny,
          },
        }));
      }

      setAvatarStatusAsync(createAvatarAction(AVATAR_UPLOADED));
    });
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AvatarContainer);
