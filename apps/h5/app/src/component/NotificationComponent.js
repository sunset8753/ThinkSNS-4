import React, { Component, PropTypes } from 'react';
import { Notification } from 'amazeui-touch';

class NotificationComponent extends Component {

  static propTypes = {
    message: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
      PropTypes.element,
    ]),
    settings: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  render() {
    const { settings, message, onClose } = this.props;
    
    return (
      <Notification {...settings}
        onDismiss={settings.onDismiss || onClose}
        animated={true}
      >
        {message}
      </Notification>
    );
  }
}

export default NotificationComponent;