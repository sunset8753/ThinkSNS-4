import React from 'react';
import {
  Router,
  Route,
  IndexRoute,
} from 'react-router';

import history from './util/history.js';
import App from './App.js';
import Startup from './container/StartupContainer.js';

import LoginIndex from './component/login/IndexComponent.js';
import DingtalkComponent from './component/login/DingtalkComponent.js';
import InitUserAvatar from './provider/AvatarProvider.js';
import InitTag from './provider/InitTagProvider.js';
import InitUserFollow from './component/init/FollowComponent.js';

import MainComponent from './component/MainComponent.js';
import EduMainComponent from './component/EduMainComponent.js';
import EduFriendFeedProvider from './provider/EduFriendFeedProvider.js';

const Routes = () => (
  <Router history={history}>
    <Route path={'/'} component={App}>
      <IndexRoute component={Startup} />
      <Route path={'login'}>
        <IndexRoute component={LoginIndex} />
        <Route path={'dingtalk'} component={DingtalkComponent} />
      </Route>

      <Route path={'init'}>
        <IndexRoute component={InitUserAvatar} />
        <Route path={'tag'} component={InitTag} />
        <Route path={'follow'} component={InitUserFollow} />
      </Route>

      <Route path={'main'} component={MainComponent}>
        <Route path={'edu'} component={EduMainComponent}>
          <IndexRoute component={EduFriendFeedProvider} />
        </Route>
      </Route>

    </Route>
  </Router>
);

export default Routes;