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
    fontSize: 25,
    lineHeight: 29,
    color: '#989292',
    marginBottom: 10,
    marginTop: 10,
  },
});
