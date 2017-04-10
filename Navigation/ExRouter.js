/**
 * Copyright 2015-present 650 Industries. All rights reserved.
 *
 * @providesModule ExRouter
 */

import React from 'react';
import {
  Platform,
  Text,
  View,
} from 'react-native';

import ExNavigator from '@expo/react-native-navigator';
import HomeScreen from 'HomeScreen';
import IntroductionArticle from 'IntroductionArticle';
import TextInputArticle from 'TextInputArticle';

let baseRoute = {};

const ExRouter = {
  getHomeRoute() {
    return {
      ...baseRoute,

      getSceneClass() {
        return HomeScreen;
      }
    };
  },

  getArticleRoute(id) {
    return {
      ...baseRoute,

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
