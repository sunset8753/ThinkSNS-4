import React, { Component } from 'react';
import { Container, NavBar } from 'amazeui-touch';
import FindUserIcon from '../icon/FindUserIcon.js';
import MessageIcon from '../icon/MessageIcon.js';

class EduMainComponent extends Component {
  render() {
    return (
      <Container
        fill={true}
        direction="column"
        scrollable={false}
      >
        <NavBar
          amStyle="success"
          className="main-nav-bar"
          title={(
            <div className="main-nav-bar-tab">
              <div className="active">动态<span/></div>
              <div>话题<span/></div>
              <div>广场<span/></div>
            </div>
          )}
          leftNav={[
            {
              title: <FindUserIcon className="margin-top" color="#fff" />
            }
          ]}
          rightNav={[
            {
              title: <MessageIcon className="margin-top" color="#fff" />
            }
          ]}
        />
        <Container
          scrollable={true}
          fill={true}
        >
          {this.props.children}
        </Container>
      </Container>
    );
  }
}

export default EduMainComponent;