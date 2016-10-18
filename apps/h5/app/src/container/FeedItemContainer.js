import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import FeedItemComponent from '../component/FeedItemComponent.js';

const mapStateToProps = (state) => ({data: state});

class FeedItemContainer extends Component {

  static contextTypes = {
    store: PropTypes.object.isRequired,
  };

  render() {
    const { data } = this.props;

    return (
      <FeedItemComponent data={data} />
    );
  }
}

export default connect(mapStateToProps)(FeedItemContainer);