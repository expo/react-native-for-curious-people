/**
 * Copyright 2015-present 650 Industries. All rights reserved.
 *
 * @providesModule main
 */

import React from 'react';
import {
  AppRegistry,
  BackAndroid,
  PixelRatio,
  StyleSheet,
  View,
} from 'react-native';

import Colors from 'Colors';
import ExNavigator from '@exponent/react-native-navigator';
import ExRouter from 'ExRouter';

import { isIOS, isAndroid } from 'Platforms';
import { serif } from 'Fonts';

class Main extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  componentDidMount() {
    if (BackAndroid) {
      BackAndroid.addEventListener('hardwareBackPress', () => {
        if (this._navigator.getCurrentRoutes().length > 1) {
          this._navigator.pop();
          return true;
        }

        return false;
      });
    }
  }

  render() {
    let initialRoute = ExRouter.getHomeRoute();

    return (
      <ExNavigator
        ref={component => this._navigator = component}
        initialRoute={initialRoute}
        showNavigationBar={false}
      />
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  link: {
    textDecorationLine: 'underline',
    color: Colors.brand,
  },
  body: {
    backgroundColor: Colors.greyBackground,
    paddingTop: 20,
  },
  footerContainer: {
    marginTop: 25,
    paddingHorizontal: 30,
  },
  footerText: {
    color: Colors.fadedText,
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 20,
  },
  articleListContainer: {
    backgroundColor: '#fff',
  },
  header: {
    marginTop: 40,
    marginBottom: 5,
  },
  heroContainer: {
    backgroundColor: Colors.brand,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    paddingTop: 33,
    paddingBottom: 10,
  },
  heroImageContainer: {
    padding: 10,
  },
  heroImage: {
    width: 90,
    height: 70,
  },
  heroTextContainer: {
    flexDirection: 'column',
    paddingVertical: 10,
    paddingLeft: 5,
  },
  heroTitleText: {
    color: '#fff',
    fontSize: 35,
    lineHeight: 35,
    fontWeight: '700',
  },
  heroSubtitleText: {
    marginTop: -2,
    color: '#fff',
    opacity: 0.8,
    fontSize: 23,
    lineHeight: 25,
    fontWeight: '300',
  },
  hr: {
    backgroundColor: '#000',
    opacity: 0.1,
    height: 1.0 / PixelRatio.get(),
    flex: 1,
    marginVertical: 15,
  },
  headerText: {
    fontFamily: serif,
    fontSize: isAndroid ? 30 : 35,
    fontWeight: isAndroid ? 'bold' : 'normal',
    lineHeight: 40,
    marginBottom: 5,
  },
  headerSubtitleText: {
    lineHeight: 25,
    fontSize: 17,
    color: '#848484',
  },
});

AppRegistry.registerComponent('main', () => Main);
