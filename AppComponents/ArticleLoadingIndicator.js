/**
 * Copyright 2015-present 650 Industries. All rights reserved.
 *
 * @providesModule ArticleLoadingIndicator
 */

import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View,
} from 'react-native';

import Colors from 'Colors';

export default class ArticleLoadingIndicator extends React.Component {

  render() {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.brand} />
      </View>
    );
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
