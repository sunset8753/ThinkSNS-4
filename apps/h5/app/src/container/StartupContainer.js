import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import StartupBaseComponent from '../component/StartupBaseComponent.js';
import * as setAuthenticationActions from '../action/AuthenticationAction.js';
import { durationSendNotification } from '../util/notification.js';

const mapStateToProps = (state) => {
  if (!state) {
    return {status: 0};
  }

  return {status: state.status};
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(setAuthenticationActions, dispatch);
};

class StartupContainer extends Component {

  static propTypes = {
    setAuthentication: PropTypes.func.isRequired,
  };

  static contextTypes = {
    store: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
  }

  render() {
    return (
      <StartupBaseComponent />
    );
  }

  componentDidMount() {
    this.componentDidUpdate();
  }

  componentDidUpdate() {

    const { router, store } = this.context;
    const { status, location, setAuthenticationAsync } = this.props;
    const state = store.getState();

    if (state === false || !state) {
      setAuthenticationAsync();
    } else if (status === 1) {
      const { user } = store.getState();

      // 如果用户没有初始化，则跳转到初始化页面，如果已经初始化，则到首页
      if (!user.is_init) {
        router.replace('/init');
      } else {
        // 前往首页。 暂时初始化。
        router.replace('/main/edu');
      }

    } else if (status === 2) {
      router.replace('/login');
    } else if (status === 3) {
      durationSendNotification('您不存在于企业通讯录当中，如果您是企业成员，请联系管理员对您进行添加.');
      router.replace('/login');
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StartupContainer);
