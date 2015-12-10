/**
 * Copyright 2015-present 650 Industries. All rights reserved.
 *
 * @providesModule ArticleLoadingIndicator
 */
'use strict';

import React, {
  ActivityIndicatorIOS,
  Platform,
  ProgressBarAndroid,
  StyleSheet,
  View,
} from 'react-native';

import Colors from 'Colors';

export default class ArticleLoadingIndicator extends React.Component {

  render() {
    if (Platform.OS === 'android') {
      return (
        <View style={styles.loadingContainer}>
          <ProgressBarAndroid styleAttr="Large" color={Colors.brand} />
        </View>
      );
    } else {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicatorIOS size="large" />
        </View>
      );
    }
  }
}

let styles = StyleSheet.create({
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    width: 320,
  },
});
