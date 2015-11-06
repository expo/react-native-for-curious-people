/**
 * Copyright 2015-present 650 Industries. All rights reserved.
 *
 * @providesModule CommitLink
 */
'use strict';

import React, {
  StyleSheet,
  Text,
} from 'react-native';

export default class CommitLink extends React.Component {

  render() {
    return (
      <Text style={styles.text} onPress={() => {}}>
        {this.props.children}
      </Text>
    );
  }
}

let styles = StyleSheet.create({
  text: {
    textDecorationLine: 'underline',
  }
});
