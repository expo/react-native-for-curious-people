/**
 * Copyright 2015-present 650 Industries. All rights reserved.
 *
 * @providesModule CodeBlock
 */
'use strict';

import React, {
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default class CodeBlock extends React.Component {

  render() {
    return (
      <View style={styles.codeBlock}>
        <Text style={styles.codeBlockText}>
          {this.props.children}
        </Text>
      </View>
    )
  }
}

let styles = StyleSheet.create({
  codeBlock: {
    marginBottom: 15,
  },
  codeBlockText: {
    fontFamily: 'Georgia',
    fontSize: 14,
    lineHeight: 20,
    color: '#363636',
  },
});
