import React, { Component } from 'react';
import { Link } from 'react-router';
import {
  Container,
  View,
  NavBar,
  List,
} from 'amazeui-touch';
import { setTransitionType, SHOW_FROM_RIGHT, REVEAL_FROM_RIGHT } from '../../util/transitionType.js';
import { request, USER_GET_RECOMMEND } from '../../util/api.js';
import { modalAction, closeModal } from '../../action/ModalAction.js';
import { createUserListItemStore } from '../../store/UserListItemStore.js';
import { durationSendNotification } from '../../util/notification.js';
import UserListItemProvider from '../../provider/UserListItemProvider.js';
import guid from '../../util/guid.js';

const backHash = '/init/tag';
const nextHash = '/main/edu';

class FollowComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }

  render() {
    const { list = [] } = this.state;

    return (
      <View>
        <NavBar
          title="推荐关注"
          leftNav={[
            {
              component: Link,
              title: '返回',
              icon: 'left-nav',
              to: backHash
            }
          ]}
          rightNav={[
            {
              title: '完成',
              component: Link,
              to: nextHash
            }
          ]}
          onAction={(item) => {
            if (item.to === backHash) {
              setTransitionType(REVEAL_FROM_RIGHT);
            } else {
              setTransitionType(SHOW_FROM_RIGHT);
            }
          }}
        />
        <Container>
          <List>
            {list.map((user_id) => (
              <UserListItemProvider key={guid()} userId={user_id} />
            ))}
          </List>
        </Container>
      </View>
    );
  }

  componentDidMount() {
    request(USER_GET_RECOMMEND)
      .field('rus', 10)
      .end((error, response) => {
        if (error !== null) {
          let statusText = response ? response.statusText : '网络连接失败';
          durationSendNotification(statusText);

          return ;
        }

        let { list } = this.state;
        response.body.map(({ uid, ...data }) => {
          createUserListItemStore(uid, {...data, uid});
          list = [...list, uid];
        });

        this.setState({ list });

      })
    ;
  }
}

export default FollowComponent;
