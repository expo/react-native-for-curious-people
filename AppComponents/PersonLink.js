
/**
 * Copyright 2015-present 650 Industries. All rights reserved.
 *
 * @providesModule PersonLink
 */

import React from 'react';
import {
  StyleSheet,
  Text,
} from 'react-native';

import Link from 'Link';

export default class PersonLink extends React.Component {

  render() {
    return (
      <Link style={styles.text} url={`http://github.com/${this.props.github}`}>
        @{this.props.github}
      </Link>
    );
  }
}

let styles = StyleSheet.create({
  text: {
    color: 'black',
  }
});
