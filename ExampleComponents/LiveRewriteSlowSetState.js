/**
 * Copyright 2015-present 650 Industries. All rights reserved.
 *
 * @providesModule LiveRewriteSlowSetState
 */
'use strict';

import React, {
  PixelRatio,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import InteractiveScrollView from 'InteractiveScrollView';
import doSomeExpensiveOperation from 'doSomeExpensiveOperation';

export default class LiveRewriteSlowSetState extends React.Component {

  constructor(props, context) {
    super(props, context);

    this._updateText = this._updateText.bind(this);
    this.state = {
      value: '',
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.shadow}>
          <InteractiveScrollView.TextInput
            value={this.state.value}
            onChangeText={this._updateText.bind(this)}
            placeholder="Type some text here! Wait for it to be uppercased"
            style={styles.textInput} />
        </View>
        <Text style={styles.subtitle}>
          Simulating a slow setState with live-rewriting
        </Text>
      </View>
    );
  }

  _updateText(text) {
    doSomeExpensiveOperation();
    this.setState({value: text.toUpperCase()});
  }
}

let styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 25,
  },
  shadow: {
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowOffset: {width: 0, height: 2},
  },
  textInput: {
    height: 45,
    borderWidth: 1.0 / PixelRatio.get(),
    borderColor: '#DCDCDC',
    paddingHorizontal: 10,
    fontSize: 13,
  },
  subtitle: {
    color: '#9C9C9C',
    marginTop: 7,
    fontSize: 12,
  },
});
