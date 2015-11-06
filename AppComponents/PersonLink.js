
/**
 * Copyright 2015-present 650 Industries. All rights reserved.
 *
 * @providesModule PersonLink
 */
'use strict';

import React, {
  StyleSheet,
  Text,
} from 'react-native';

export default class PersonLink extends React.Component {

  render() {
    return (
      <Text style={styles.text} onPress={() => {}}>
        @{this.props.github}
      </Text>
    );
  }
}

let styles = StyleSheet.create({
  text: {
    textDecorationLine: 'underline',
  }
});
