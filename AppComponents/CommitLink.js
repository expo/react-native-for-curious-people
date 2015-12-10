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

import Link from 'Link';

export default class CommitLink extends React.Component {

  render() {
    let { repo, commit } = this.props;

    return (
      <Link style={styles.text} url={`https://github.com/${repo}/commit/${commit}`}>
        {this.props.children}
      </Link>
    );
  }
}

let styles = StyleSheet.create({
  text: {
    color: 'black',
  }
});
