/**
 * Copyright 2015-present 650 Industries. All rights reserved.
 *
 * @providesModule LiveRewriteCursorPosition
 */

import React from 'react';
import {
  PixelRatio,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import InteractiveScrollView from 'InteractiveScrollView';

export default class LiveRewriteCursorPosition extends React.Component {

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
            onChangeText={this._updateText}
            placeholder="Type some text here and watch your cursor!"
            ref={(view) => { this._textInput = view; }}
            style={styles.textInput} />
        </View>
        <Text style={styles.subtitle}>
          When live re-writing changes the length of the text, cursor
          position doesn’t work as expected{Platform.OS === 'android' ? " on iOS. This should work properly for you though!" : "."}
        </Text>
      </View>
    );
  }

  _updateText(text) {
    text = text.replace(/-/g,'').split('').join('-')
    this.setState({value: text});
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
