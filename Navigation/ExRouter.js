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
import HomeScreen from 'HomeScreen';
import IntroductionArticle from 'IntroductionArticle';
import TextInputArticle from 'TextInputArticle';

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
        return HomeScreen;
      }
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
          return IntroductionArticle;
        } else if (id === 'text-input') {
          return TextInputArticle;
        }
      },
    };
  },
};

export default ExRouter;
