import React, { Component } from 'react';
import Svg from './Svg.js';

class CommentIcon extends Component {
  render() {
    return (
      <Svg {...this.props} viewBox="0 0 819.2 769.4">
        <path
          d="M742.8,48c15.7,0,28.4,12.7,28.4,28.4v448.9c0,15.7-12.7,28.4-28.4,28.4H153.7h-21.1l-14.3,15.6l-70.3,76.8
            c0-58.5,0.1-116.7,0.1-120.8V76.4C48,60.7,60.7,48,76.4,48H742.8 M742.8,0H76.4C34.2,0,0,34.2,0,76.4v448.9
            c0,8.5-0.1,244.3-0.1,244.3l153.8-167.9h589.1c42.2,0,76.4-34.2,76.4-76.4V76.4C819.2,34.2,785,0,742.8,0L742.8,0z"
        />
      </Svg>
    );
  }
}

export default CommentIcon