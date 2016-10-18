import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import {
  View,
} from 'amazeui-touch';

import logo from '../../../images/logo.png';
import { setTransitionType, SHOW_FROM_RIGHT } from '../../util/transitionType.js';

class IndexComponent extends Component {

  static contextTypes = {
    store: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
  }

  render() {
    setTransitionType(SHOW_FROM_RIGHT);

    return (
      <View className="startup-login">
        <div className="logo">
          <img src={logo} />
        </div>
        <div className="bottom-login-box filter-bg-fff">
          <Link to={'/login/dingtalk'} className="dindin-button-box" />
          <div>体验客户端&nbsp;>></div>
        </div>
      </View>
    );
  }

  componentDidMount() {
    const { router, store } = this.context;

    // 如果是直接访问，则直接回到首页。
    if (store.getState() === false) {
      router.replace('/');
    }
  }
}

export default IndexComponent;