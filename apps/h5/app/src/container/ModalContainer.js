import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ModalComponent from '../component/ModalComponent.js';

const mapStateToProps = (state) => ({...state});

class ModalContainer extends Component {

  static propTypes = {
    settings: PropTypes.object,
  }

  render() {
    const { settings = null } = this.props;

    if (settings === null) {
      return null;
    }

    return (
      <ModalComponent {...settings} />
    );
  }
}

export default connect(mapStateToProps)(ModalContainer);
