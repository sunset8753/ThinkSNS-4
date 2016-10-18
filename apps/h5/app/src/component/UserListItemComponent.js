import React, { Component } from 'react';
import { List, Button } from 'amazeui-touch';

class UserListItemComponent extends Component {
  render() {
    const { user, handleFollow } = this.props;
    const isFollow = user.follow_status.following == 1;

    console.log(isFollow);

    return (
      <List.Item
        title={user.uname}
        subTitle={<div className="hidden" />}
        desc={user.intro}
        media={<img className="user-avatar" src={user.avatar} />}
        after={<Button
          amSize="xs"
          hollow={true}
          amStyle={isFollow ? '' : 'success'}
          onClick={handleFollow}
        >
          {isFollow ? '已关注' : '关注'}
        </Button>}
      >
      </List.Item>
    );
  }
}

export default UserListItemComponent;
