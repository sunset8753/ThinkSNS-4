import React, { Component } from 'react';
import Svg from './Svg.js';

class UpArrowIcon extends Component {
  render() {
    return (
      <Svg {...this.props}>
        <g transform="scale(0.0234375, 0.0234375)">
          <path
            d="M873.6 419.2l-355.2-361.6c-9.6-9.6-22.4-9.6-32 0l-355.2 368c-9.6 9.6-9.6 22.4 0 32 9.6 9.6 22.4 9.6 32 0l316.8-329.6 0 828.8c0 12.8 9.6 22.4 22.4 22.4s22.4-9.6 22.4-22.4l0-822.4 310.4 316.8c9.6 9.6 22.4 9.6 32 0C883.2 441.6 883.2 425.6 873.6 419.2z"
          />
        </g>
      </Svg>
    );
  }
}

export default UpArrowIcon;
