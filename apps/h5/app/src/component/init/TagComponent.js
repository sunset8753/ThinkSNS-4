import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import {
  Container,
  View,
  NavBar,
  Group,
  Button,
} from 'amazeui-touch';
import { setTransitionType, SHOW_FROM_RIGHT, REVEAL_FROM_RIGHT } from '../../util/transitionType.js';
import guid from '../../util/guid.js';

const backHash = '/init';
const leftNav = [
  {
    component: Link,
    icon: 'left-nav',
    title: '返回',
    to: backHash,
  }
];

class TagComponent extends Component {
  render() {
    const { tags, selected, handleSeleteTag, handleSubmitTags } = this.props;

    return (
      <View>
        <NavBar
          title="选择标签"
          leftNav={leftNav}
          rightNav={[
            {
              title: '下一步',
              onClick: handleSubmitTags,
            }
          ]}
          onAction={(item) => {
            if (item.to === backHash) {
              setTransitionType(REVEAL_FROM_RIGHT);
            }
          }}
        />
        <Container scrollable={true}>
          <div className="text-center text-success margin-top-sm">只能选择5个标签哦</div>
          {tags.map(({child, title}) => (
            <Group
              key={guid()}
              header={title}
            >
              {child.map(({title, id}) => (
                <Button
                  key={guid()}
                  amStyle={selected[id] ? 'success' : ''}
                  hollow={selected[id]? true : false}
                  onClick={() => handleSeleteTag({id, name: title})}
                >
                  {title}
                </Button>
              ))}
            </Group>
          ))}
        </Container>
      </View>
    );
  }
}

export default TagComponent;
