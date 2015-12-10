/**
 * Copyright 2015-present 650 Industries. All rights reserved.
 *
 * @providesModule Link
 */
'use strict';

import React, {
  Text,
  StyleSheet,
  NativeModules,
} from 'react-native';

let { EXURLHandler } = NativeModules;

import Colors from 'Colors';

export default class Link extends React.Component {
  render() {
    return (
      <Text
        onPress={this._handlePress.bind(this)}
        style={[styles.link, this.props.style]}>
        {this.props.children}
      </Text>
    )
  }

  _handlePress() {
    EXURLHandler.openURLAsync(this.props.url);
  }
}

let styles = StyleSheet.create({
  link: {
    textDecorationLine: 'underline',
    color: Colors.brand,
  },
});
