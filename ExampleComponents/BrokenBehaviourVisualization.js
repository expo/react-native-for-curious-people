/**
 * Copyright 2015-present 650 Industries. All rights reserved.
 *
 * @providesModule BrokenBehaviourVisualization
 */
'use strict';

import React, {
  PixelRatio,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import CodeBlock from 'CodeBlock';

const exampleCode = `
<TextInput
  value={this.state.text}
  onChangeText={(text) => this.setState({text})}
  controlled={true} />
`

const STEPS = [
  { input: "User types 'R'",
    ui: "'R' is sent to the JS queue",
    js: "Does not receive input until next frame - does nothing." },
  { input: "User types 'e'",
    ui: "'Re' is sent to the JS queue. Value is set to 'R' in response to JS update.",
    js: "Receives 'R', sends 'R' back to native as current JS value." },
  { input: "User types 'a'",
    ui: "'Ra' is sent to the JS queue",
    js: "Receives 'Re', sends 'Re' back to native as current JS value."},
  { input: "None",
    ui: "Value is set back to 'Ra' in response to JS update. The 'e' character has been dropped!",
    js: "Receives 'Ra', sends 'Ra' back to native as current JS value."},
];

export default class BrokenBehaviourVisualization extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      step: 0,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <CodeBlock code={exampleCode} />

        {this._renderTable()}

        <View style={styles.shadow}>
          <TextInput
            value={this.state.value}
            editable={false}
            ref={(view) => { this._textInput = view; }}
            style={styles.textInput} />
        </View>
      </View>
    );
  }

  _renderTable() {
    let { step } = this.state;

    return (
      <View style={styles.table}>
        <View style={styles.header}>
          <Text>Next Step</Text>
        </View>
        <View style={styles.body}>

          <View style={styles.row} key="user-input-row">
            <View style={styles.labelCol}>
              <Text style={styles.labelText}>
                User Input
              </Text>
            </View>
            <View style={styles.outputCol}>
              <Text>
                {STEPS[step].input}
              </Text>
            </View>
          </View>

          <View style={styles.row} key="main-thread-row">
            <View style={styles.labelCol}>
              <Text style={styles.labelText}>
                UI thread
              </Text>
            </View>
            <View style={styles.outputCol}>
              <Text>
                {STEPS[step].ui}
              </Text>
            </View>
          </View>

          <View style={styles.row} key="js-thread-row">
            <View style={styles.labelCol}>
              <Text style={styles.labelText}>
                JS Thread
              </Text>
            </View>
            <View style={styles.outputCol}>
              <Text>
                {STEPS[step].js}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },

  /* table */
  table: {
    borderWidth: 1,
    borderColor: '#EBEBEB',
    marginBottom: 15,
  },

  header: {
    backgroundColor: '#F1F1F1',
    flex: 1,
    height: 38,
    paddingRight: 10,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },

  body: {

  },

  row: {
    height: 50,
    flexDirection: 'row',
  },

  labelCol: {
    width: 110,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
  },

  labelText: {
  },

  outputCol: {
    flex: 1,
    paddingLeft: 5,
    justifyContent: 'center',
  },

  /* input */
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
