import React, { Component } from 'react';
import { View, TabBar, Container } from 'amazeui-touch';
import PlusIcon from '../icon/PlusIcon.js';
import EduHomeIcon from '../icon/EduHomeIcon.js';
import ArticleIcon from '../icon/ArticleIcon.js';
import WorkingIcon from '../icon/WorkingIcon.js';

class MainComponent extends Component {
  render() {
    return (
      <View>
        <Container
          scrollable={false}
          fill={true}
          direction="column"
        >
          {this.props.children}
        </Container>
        <div className="tabbar main-tab-bar" >
          <div className="tabbar-item">
            <EduHomeIcon />
          </div>
          <div className="tabbar-item">
            <WorkingIcon />
          </div>
          <div className="tabbar-item" >
            <PlusIcon
              width={38}
              height={38}
              color="#6cbb52"
            />
          </div>
          <div className="tabbar-item">
            <ArticleIcon />
          </div>
          <TabBar.Item icon="person" />
        </div>
      </View>
    );
  }
}

export default MainComponent;
