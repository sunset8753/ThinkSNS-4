import React, { Component, PropTypes } from 'react';

class Svg extends Component {

  static propTypes = {
    width: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    height: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    color: PropTypes.string,
    viewBox: PropTypes.string,
  };

  static defaultProps = {
    width: 24,
    height: 24,
    color: '#949494',
    viewBox: '0 0 24 24',
  };

  render() {
    const { width, height, color, viewBox, children, ...settings } = this.props;
    return (
      <svg
        {...settings}
        width={width}
        height={height}
        fill={color}
        viewBox={viewBox}
      >
        {children}
      </svg>
    );
  }
}

export default Svg;
