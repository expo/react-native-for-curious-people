
/**
 * Copyright 2015-present 650 Industries. All rights reserved.
 *
 * @providesModule ExTextInput
 */

import React from 'react';
import {
  Platform,
  StyleSheet,
  TextInput,
} from 'react-native';

export default class ExTextInput extends React.Component {

  render() {
    return (
      <TextInput
        {...this.props}
        style={[styles.textInput, this.props.style]}
      />
    );
  }
}

let styles;

if (Platform.OS === 'android') {
  styles = StyleSheet.create({
    textInput: {
      backgroundColor: 'rgba(0,0,0,0.025)',
    },
  });
} else {
  styles = StyleSheet.create({
    textInput: {
    },
  });
}
