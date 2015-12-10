/**
 * Copyright 2015-present 650 Industries. All rights reserved.
 *
 * @providesModule Heading
 */
'use strict';

import React, {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { sans } from 'Fonts';
import { isAndroid } from 'Platforms';

export default class Heading extends React.Component {

  render() {
    return (
      <Text style={styles.headingText}>
        {this.props.children}
      </Text>
    )
  }
}

let styles = StyleSheet.create({
  headingText: {
    fontFamily: sans,
    fontSize: 25,
    lineHeight: 32,
    color: '#989292',
    marginBottom: 10,
    marginTop: 10,
  },
});
