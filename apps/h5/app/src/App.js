import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Container } from 'amazeui-touch';
import NotificationProvider from './provider/NotificationProvider.js';
import ModalProvider from './provider/ModalProvider.js';
import { getTransitionType } from './util/transitionType.js';
import { public_routers } from '../config.js';

class App extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
  };

  render() {
    if (this.getpublicRouterStatus()) {
      return null;
    }

    const {
      location,
      children,
    } = this.props;
    const transition = getTransitionType();

    return (
      <Container direction="column" id="sk-container">
        <NotificationProvider />
        <Container
          transition={transition}
          // fade transition example
          // transition='fade'
          // transitionEnterTimeout={450}
          // transitionLeaveTimeout={300}
        >
          {React.cloneElement(children, {key: location.key})}
        </Container>
        <ModalProvider />
      </Container>
    );
  }

  componentDidMount() {
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    if (this.getpublicRouterStatus()) {

      const { router } = this.context;

      router.replace('/');
    }
  }

  getpublicRouterStatus() {
    const { location: { pathname } } = this.props;
    const { store } = this.context;
    let status = false;

    let state = store.getState();

    public_routers.forEach((path) => {
      if (status === false) {
        status = pathname === path;
      }
    });

    return status === false && state.status !== 1;
  }
}

export default App;