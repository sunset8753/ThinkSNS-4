import React, { Component } from 'react';
import {
  View,
  Loader,
} from 'amazeui-touch';
import { setTransitionType, SHOW_FROM_RIGHT } from '../util/transitionType.js';

class StartupBaseComponent extends Component {
  render() {
    setTransitionType(SHOW_FROM_RIGHT);

    return (
      <View className={'startup'}>
        <div className={'loading'}>
          <Loader amStyle={'success'} rounded={true} />
        </div>
      </View>
    );
  }
}

export default StartupBaseComponent;