import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import NotificationComponent from '../component/NotificationComponent.js';
import * as NotificationActions from '../action/NotificationAction.js';

const mapStateToProps = (state) => ({...state});
const mapDispatchToProps = (dispatch) => (bindActionCreators(NotificationActions, dispatch));

class NotificationContainer extends Component {

  static propTypes = {
    message: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
      PropTypes.element,
    ]),
    settings: PropTypes.object.isRequired,
    // sendNotificationAction: PropTypes.func.isRequired,
    closeNotifcationAction: PropTypes.func.isRequired,
  };

  render() {
    const { settings, message, closeNotifcationAction } = this.props;

    return (
      <NotificationComponent settings={settings} message={message} onClose={closeNotifcationAction} />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationContainer)