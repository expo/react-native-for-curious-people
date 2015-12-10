/**
 * Copyright 2015-present 650 Industries. All rights reserved.
 *
 * @providesModule FixedBehaviourVisualization
 */
'use strict';

import React, {
  PixelRatio,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import CodeBlock from 'CodeBlock';
import ExTextInput from 'ExTextInput';

const isSmallScreen = Dimensions.get('window').width <= 320;

const exampleCode = `
<TextInput
  value={this.state.text}
  onChangeText={(text) => {
    this.setState({text})
  }}
/>
`

const STEPS = [
  {},
  { input: "User types 'R'",
    js: "Does not receive input until next frame - does nothing.",
    ui: "'R' and eventCount of 1 are sent to the JS queue.",
    display: 'R'},
  { input: "User types 'e'",
    js: "Receives 'R', sends 'R' back to native with eventCount 1.",
    ui: "'Re' and eventCount of 2 are sent to the JS queue. JS tells native to update to 'R' for eventCount 1, but it is ignored becuase nativeEventCount is currently 2.",
    display: 'Re'},
  { input: "User types 'a'",
    js: "Receives 'Re', sends 'Re' back to native with eventCount 2.",
    ui: "'Rea' and eventCount of 3 are sent to the JS queue. JS tells native to update to 'Re' for eventCount 2, but it is ignored becuase nativeEventCount is currently 3.",
    display: 'Rea' },
  { input: "None",
    js: "Receives 'Rea', sends 'Rea' back to native with eventCount 3.",
    ui: "Receives 'Rea' with eventCount 3, matching nativeEventCount -- sets value to 'Rea' (no change).",
    display: 'Rea' },
];

export default class FixedBehaviourVisualization extends React.Component {

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

          <View style={[styles.row]} key="user-input-row">
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

          <View style={[styles.row, {height: isSmallScreen ? 130 : 85}]} key="js-thread-row">
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

          <View style={[styles.row, {height: isSmallScreen ? 130 : 85}]} key="main-thread-row">
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
    height: 85,
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
    borderRadius: 3,
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
