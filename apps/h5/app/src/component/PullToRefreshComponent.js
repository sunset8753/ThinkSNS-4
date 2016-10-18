import React, { Component, PropTypes } from 'react';
import ReactPullToRefresh from 'react-pull-to-refresh';
import {
  Loader,
  Icon
} from 'amazeui-touch';
import UpArrowIcon from '../icon/UpArrowIcon.js';
import DownArrowIcon from '../icon/DownArrowIcon.js';

class PullToRefreshComponent extends Component {

  static propTypes = {
    onRefresh: PropTypes.func,
    up: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
      PropTypes.element,
    ]),
    down: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
      PropTypes.element,
    ]),
    loading: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
      PropTypes.element,
    ]),
  };

  static defaultProps = {
    onRefresh: (resolve) => setTimeout(resolve, 3000),
    up: (<UpArrowIcon />),
    down: (<DownArrowIcon />),
    loading: (<Loader amStyle="success" rounded={true} />),
  };

  render() {
    const { children, onRefresh, up, down, loading } = this.props;
    return (
      <ReactPullToRefresh
        className="ptr"
        icon={(
          <span className="genericon text-center">
            <span className="down">{down}</span>
            <span className="up">{up}</span>
          </span>
        )}
        loading={(
          <div className="loading text-center margin-top">
            {loading}
          </div>
        )}
        distanceToRefresh={90}
        onRefresh={onRefresh}
      >
        {children}
      </ReactPullToRefresh>
    );
  }
}

export default PullToRefreshComponent;