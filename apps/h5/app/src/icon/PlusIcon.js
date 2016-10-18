import React, { Component } from 'react';
import Svg from './Svg.js';

class PlusIncon extends Component {
  render() {
    return (
      <Svg {...this.props}>
        <g transform="scale(0.0234375, 0.0234375)">
          <path
            d="M512 0C229.4 0 0 229.4 0 512s229.2 512 512 512 512-229.2 512-512S794.8 0 512 0zM704 544l-160 0 0 160c0 17.6-14.4 32-32 32-17.6 0-32-14.2-32-32l0-160-160 0c-17.6 0-32-14.4-32-32 0-17.6 14.4-32 32-32l160 0 0-160c0-17.6 14.2-32 32-32 17.6 0 32 14.4 32 32l0 160 160 0c17.6 0 32 14.2 32 32C735.8 529.8 721.6 544 704 544z"
          />
        </g>
      </Svg>
    );
  }
}

export default PlusIncon;
