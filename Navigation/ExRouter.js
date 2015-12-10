/**
 * Copyright 2015-present 650 Industries. All rights reserved.
 *
 * @providesModule ExRouter
 */
'use strict';

import React, {
  Platform,
  StatusBarIOS,
  Text,
  View,
} from 'react-native';

import ExNavigator from '@exponent/react-native-navigator';

let baseRoute = {};

function activateStatusBar() {
  if (StatusBarIOS) {
    StatusBarIOS.setHidden(false, 'slide');
    StatusBarIOS.setStyle('light-content');
  }
}

function hideStatusBar() {
  if (StatusBarIOS) {
    StatusBarIOS.setHidden(true, 'slide');
  }
}

const ExRouter = {
  getHomeRoute() {
    return {
      ...baseRoute,

      onWillFocus(event) {
        activateStatusBar();
      },

      onDidFocus(event) {
        activateStatusBar();
      },

      getSceneClass() {
        return require('HomeScreen');
      },
    };
  },

  getArticleRoute(id) {
    return {
      ...baseRoute,

      onWillFocus(event) {
        hideStatusBar();
      },

      getSceneClass() {
        if (id === 'introduction') {
          return require('IntroductionArticle');
        } else if (id === 'text-input') {
          return require('TextInputArticle');
        }
      },
    };
  },
};

export default ExRouter;
