/**
 * Copyright 2015-present 650 Industries. All rights reserved.
 *
 * @providesModule Paragraph
 */
'use strict';

import React, {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { serif } from 'Fonts';

export default class Paragraph extends React.Component {

  render() {
    return (
      <View style={styles.paragraph}>
        <Text style={styles.paragraphText}>
          {this.props.children}
        </Text>
      </View>
    )
  }
}

let styles = StyleSheet.create({
  paragraph: {
    marginBottom: 15,
  },
  paragraphText: {
    fontFamily: serif,
    fontSize: 17,
    lineHeight: 25,
    color: '#363636',
  },
});
