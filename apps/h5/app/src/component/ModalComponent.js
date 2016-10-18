import React, { Component, PropTypes } from 'react';
import {
  Modal,
} from 'amazeui-touch';

class ModalComponent extends Component {

  static propTypes = {
    node: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
      PropTypes.element,
    ]),
  }

  render() {
    const { node, ...settings } = this.props;

    return (
      <Modal {...settings}>
        {node}
      </Modal>
    );
  }
}

export default ModalComponent;
