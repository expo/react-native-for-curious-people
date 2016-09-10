/**
 * Copyright 2015-present 650 Industries. All rights reserved.
 *
 * @providesModule NavBar
 */

import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import Colors from 'Colors';
import { isIOS, isAndroid } from 'Platforms';

export default class NavBar extends React.Component {

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.props.onPress}>
        <View style={styles.navbar}>
          <Text style={styles.navbarText}>
            React Native for curious people
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

NavBar.HEIGHT = isIOS ? 30 : 65;

let styles = StyleSheet.create({
  navbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: NavBar.HEIGHT,
    paddingTop: isIOS ? 0 : 30,
    paddingBottom: isIOS ? 0 : 7,
    paddingHorizontal: 15,
    backgroundColor: Colors.brand,
    justifyContent: 'center',
  },
  navbarText: {
    color: '#fff',
    opacity: 0.8,
  },
});
