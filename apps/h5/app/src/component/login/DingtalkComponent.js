import React, { Component, PropTypes } from 'react';
import {
  Container,
  View,
  NavBar
} from 'amazeui-touch';
import { Link } from 'react-router';
import { setTransitionType, SHOW_FROM_RIGHT, REVEAL_FROM_RIGHT } from '../../util/transitionType.js';
import BuildURL from '../../util/build-url.js';
import { dingtalk_appid } from '../../../config.js';
import { LoginSyncFetch, LoginSyncFetchClear } from '../../fetch/LoginSyncFetch.js';

const backHash = '/';
const leftNav = [
  {
    component: Link,
    icon: 'left-nav',
    title: '返回',
    to: backHash,
  }
];

class DingtalkComponent extends Component {

  static contextTypes = {
    store: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
  }

  render() {

    const src = this.getIframeSrc();

    return (
      <View>
        <NavBar
          title="登录钉钉帐户"
          leftNav={leftNav}
          onAction={(item) => {
            if (item.to === backHash) {
              setTransitionType(REVEAL_FROM_RIGHT);
            }
          }}
        />
        <Container>
          {src && (
            <iframe
              className="dingtalk-iframe"
              seamless="seamless"
              src={src}
            />
          )}
        </Container>
      </View>
    );
  }

  componentDidMount() {
    const { router, store } = this.context;

    // 如果是直接访问，则直接回到首页。
    if (store.getState() === false) {
      router.replace('/');
    } else {
      LoginSyncFetch(store, () => router.push('/init'));
    }
  }

  componentWillUnmount() {
    LoginSyncFetchClear();
  }

  getIframeSrc() {
    const { store } = this.context;
    const state = store.getState();

    let src = false;
    if (state !== false) {
      let redirect_uri = encodeURIComponent(BuildURL('login', 'redirect'));
      let dingtalk_goto = encodeURIComponent('https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid='+dingtalk_appid+'&response_type=code&scope=snsapi_login&state='+state.state+'&redirect_uri='+redirect_uri);
      src = 'https://login.dingtalk.com/login/index.htm?goto='+dingtalk_goto;
    }

    return src;
  }
}

export default DingtalkComponent;