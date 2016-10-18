import React, { Component, PropTypes } from 'react';
import {
  Group,
  List,
  Button,
  Icon
} from 'amazeui-touch';
import CommentIcon from '../icon/CommentIcon.js';
import ZanIcon from '../icon/ZanIcon.js';

class FeedItemComponent extends Component {

  static propsTypes = {
    data: PropTypes.object.isRequired,
  };

  render() {

    const { data } = this.props;
    const { user_info, is_digg, digg_count, comment_count, is_favorite  } = data;
    console.log(data);

    return (
      <Group className="edu-feed">
        <div className="feed-user-to-list">
          <div className="avatar">
            <img src={user_info.avatar.avatar_middle} />
          </div>
          <div className="userinfo">
            <h4 className="margin-bottom-0 text-truncate username">{user_info.uname}</h4>
            <span className="text-truncate time">1分钟前 来自网站 1分钟前 来自网站 1分钟前 来自网站</span>
          </div>
          <div className="buttons">
            <Button
              amStyle="success"
              amSize="xs"
              hollow={true}
              className="margin-right-0"
            >
              关注
            </Button>
          </div>
        </div>
        <div>content</div>
        <div className="line margin-top-sm margin-bottom-sm" />
        <div className="bar-box">
          <div className="button-box text-center">
            <Icon name="star" className="margin-right-sm" />
            <span>1.2k</span>
          </div>
          <span className="arrow-line">|</span>
          <div className="button-box text-center">
            <CommentIcon className="margin-right-sm" />
            <span>1</span>
          </div>
          <span className="arrow-line">|</span>
          <div className="button-box text-center">
            <ZanIcon active={true} />
          </div>
        </div>
      </Group>
    );
  }
}

export default FeedItemComponent;
