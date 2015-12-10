/**
 * Copyright 2015-present 650 Industries. All rights reserved.
 *
 * @providesModule MaxLengthExamples
 */
'use strict';

import React, {
  PixelRatio,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import InteractiveScrollView from 'InteractiveScrollView';

const CHAR_LIMIT = 5;

export default class MaxLengthExamples extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      setStateValue: '',
      setStateExpensiveValue: '',
      maxLengthValue: '',
    };

    this._updateSetStateValue = this._updateSetStateValue.bind(this);
  }

  _updateSetStateValue(text) {
    if (text.length <= 5) {
      this.setState({setStateValue: text});
    }
  }

  render() {
    let { setStateValue, maxLengthValue } = this.state;

    return (
      <View style={styles.container}>

        <View style={{marginBottom: 20}}>
          <View style={styles.shadow}>
            <InteractiveScrollView.TextInput
              value={this.state.setStateValue}
              onChangeText={this._updateSetStateValue}
              style={styles.textInput} />
            <View style={styles.characterLimit}>
              <Text style={[{fontSize: 13}, setStateValue.length >= CHAR_LIMIT ? {color: 'red'} : {color: 'green'}]}>
                {CHAR_LIMIT - setStateValue.length} characters remaining
              </Text>
            </View>
          </View>
          <Text style={styles.subtitle}>
            Using setState to enforce a maximum length
          </Text>
        </View>

        <View>
          <View style={styles.shadow}>
            <InteractiveScrollView.TextInput
              value={this.state.maxLengthValue}
              onChangeText={(text) => this.setState({maxLengthValue: text})}
              style={styles.textInput}
              maxLength={5} />
            <View style={styles.characterLimit}>
              <Text style={[{fontSize: 13}, maxLengthValue.length >= CHAR_LIMIT ? {color: 'red'} : {color: 'green'}]}>
                {CHAR_LIMIT - maxLengthValue.length} characters remaining
              </Text>
            </View>
          </View>
          <Text style={styles.subtitle}>
            Using maxLength
          </Text>
        </View>
      </View>
    );
  }

  _updateText(text) {
    let { value, lastChange } = this.state;
    let currentChange = new Date();
    let n = parseInt(Math.random() * 10);
    let randomize = n % 2 === 0;

    if (randomize && text.length >= 2 && currentChange - lastChange <= 200) {
      let newValue = text.substr(0, text.length - 2) + text[text.length - 1];
      this.setState({value: newValue, lastChange: currentChange});
    } else {
      this.setState({value: text, lastChange: currentChange});
    }
  }
}

let styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 25,
  },
  characterLimit: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: 45,
    backgroundColor: 'transparent',
    paddingRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
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
