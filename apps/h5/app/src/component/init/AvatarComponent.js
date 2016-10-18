import React, { Component, PropTypes } from 'react';
import {
  Container,
  View,
  NavBar,
  Button,
  Loader,
} from 'amazeui-touch';
import { Link } from 'react-router';
import Dropzone from 'react-dropzone';
import { setTransitionType, SHOW_FROM_RIGHT, REVEAL_FROM_RIGHT } from '../../util/transitionType.js';
import { AuthLoginOut } from '../../fetch/AuthenticationFetch.js';

const backHash = '/login';
const nextHash = '/init/tag';
const leftNav = [
  {
    component: Link,
    icon: 'left-nav',
    title: '返回',
    to: backHash,
  }
];
const rightNav = [
  {
    component: Link,
    title: '下一步',
    to: nextHash,
  }
];

class AvatarComponent extends Component {

  static propTypes = {
    useDingtalkAvatar: PropTypes.bool.isRequired,
    avatarUploadStatus: PropTypes.bool.isRequired,
    username: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    handleFileSelectOnDrop: PropTypes.func.isRequired,
  }

  render() {
    const {
      useDingtalkAvatar,
      avatarUploadStatus,
      username,
      avatar,
      handleFileSelectOnDrop,
    } = this.props;

    let NavBarConf = {
      leftNav: leftNav,
      onAction: (item) => {
        if (item.to === backHash) {
          setTransitionType(REVEAL_FROM_RIGHT);
          AuthLoginOut();
        }
      },
    }

    setTransitionType(SHOW_FROM_RIGHT);

    if (useDingtalkAvatar === false) {
      NavBarConf.rightNav = rightNav;
    }

    return (
      <View>
        <NavBar
          title="头像设置"
          {...NavBarConf}
        />
        <Container className="user-init">
          <img className="avatar" src={avatar} />
          <span className="username">{username}</span>
          <div className="buttons">
            {useDingtalkAvatar === true && (
              <Link to={nextHash}>
                <Button block>使用当前头像</Button>
                &nbsp;
              </Link>
            )}
            {
              avatarUploadStatus
              ? (<Button amStyle="success" block>
                  <Loader amStyle="white" rounded={true} />
                </Button>)
              : (<Dropzone
                  accept={'image/*'}
                  multiple={false}
                  onDrop={handleFileSelectOnDrop}
                  style={{}}
                >
                  <Button amStyle="success" block>从相册选择</Button>
                </Dropzone>)
            }
          </div>
        </Container>
      </View>
    );
  }
}

export default AvatarComponent;
