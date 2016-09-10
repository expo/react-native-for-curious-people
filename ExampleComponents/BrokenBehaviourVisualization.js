/**
 * Copyright 2015-present 650 Industries. All rights reserved.
 *
 * @providesModule BrokenBehaviourVisualization
 */

import React from 'react';
import {
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import CodeBlock from 'CodeBlock';
import ExTextInput from 'ExTextInput';

const exampleCode = `
<TextInput
  value={this.state.text}
  onChangeText={(text) => this.setState({text}) }
  controlled={true} />
`

const STEPS = [
  {},
  { input: "User types 'R'",
    js: "Does not receive input until next frame - does nothing.",
    ui: "'R' is sent to the JS queue",
    display: 'R'},
  { input: "User types 'e'",
    js: "Receives 'R', sends 'R' back to native as current JS value.",
    ui: "'Re' is sent to the JS queue. Value is set to 'R' in response to JS update.",
    display: 'R'},
  { input: "User types 'a'",
    js: "Receives 'Re', sends 'Re' back to native as current JS value.",
    ui: "'Ra' is sent to the JS queue",
    display: 'Re' },
  { input: "None",
    js: "Receives 'Ra', sends 'Ra' back to native as current JS value.",
    ui: "Value is set back to 'Ra' in response to JS update. The 'e' character has been dropped!",
    display: 'Ra' },
];

export default class BrokenBehaviourVisualization extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      step: 0,
      value: '',
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <CodeBlock code={exampleCode} />

        {this._renderTable()}

        <View style={styles.shadow}>
          <ExTextInput
            value={this.state.value}
            editable={false}
            ref={(view) => { this._textInput = view; }}
            style={styles.textInput} />
        </View>

        {this._renderStartButton()}
      </View>
    );
  }

  _renderStartButton() {
    if (this.state.step !== 0) {
      return;
    }

    return (
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.startButton}
          onPress={this._goToNextStep.bind(this)}>
          <Text style={styles.startButtonText}>
            Start this example
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  _goToNextStep() {
    let { step } = this.state;
    step = step + 1;

    if (step <= STEPS.length - 1) {
      this.setState({step, value: STEPS[step].display});
    }
  }

  _resetSteps() {
    this.setState({step: 1, value: STEPS[1].display});
  }

  _renderTable() {
    let { step } = this.state;

    return (
      <View style={styles.table}>
        <View style={styles.header}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText}>
              Frame {step}/{STEPS.length - 1}
            </Text>
          </View>

          { step > 0 && step < STEPS.length - 1 &&
            <TouchableOpacity
              style={styles.nextStepButton}
              onPress={this._goToNextStep.bind(this)}>
              <Text style={styles.nextStepButtonText}>Next Frame ⟩</Text>
            </TouchableOpacity> }

          { step === STEPS.length - 1 &&
            <TouchableOpacity
              style={styles.nextStepButton}
              onPress={this._resetSteps.bind(this)}>
              <Text style={styles.nextStepButtonText}>Reset</Text>
            </TouchableOpacity> }
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
    paddingLeft: 10,
    paddingRight: 10,
  },

  headerTextContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    paddingHorizontal: 10,
  },

  headerText: {
    fontSize: 15,
  },

  body: {
  },

  row: {
    height: 80,
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

  overlay: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 1,
  },

  startButton: {
    marginTop: 50,
    padding: 15,
    borderRadius: 5,
    alignSelf: 'center',
    backgroundColor: 'black',
  },

  startButtonText: {
    color: '#fff',
    fontSize: 18,
  },

  nextStepButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },

  nextStepButtonText: {
    color: '#fff',
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
