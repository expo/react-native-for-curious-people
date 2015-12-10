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

export default class ArticleLoadingIndicator extends React.Component {

  render() {
    if (Platform.OS === 'android') {
      return (
        <View style={styles.loadingContainer}>
          <ProgressBarAndroid size="Large" />
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
  },
});
