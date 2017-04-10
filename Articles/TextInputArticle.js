
/**
 * Copyright 2015-present 650 Industries. All rights reserved.
 *
 * @providesModule TextInputArticle
 */

import React from 'react';
import {
  Animated,
  AppRegistry,
  Easing,
  Image,
  InteractionManager,
  PixelRatio,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import ArticleLoadingIndicator from 'ArticleLoadingIndicator';
import BrokenBehaviourVisualization from 'BrokenBehaviourVisualization';
import FixedBehaviourVisualization from 'FixedBehaviourVisualization';
import CharacterDroppingSimulator from 'CharacterDroppingSimulator';
import CodeBlock from 'CodeBlock';
import CommitLink from 'CommitLink';
import Heading from 'Heading';
import LiveRewriteSlowSetState from 'LiveRewriteSlowSetState';
import LiveRewriteCursorPosition from 'LiveRewriteCursorPosition';
import Paragraph from 'Paragraph';
import PersonLink from 'PersonLink';
import MaxLengthExamples from 'MaxLengthExamples';
import NavBar from 'NavBar';
import InteractiveScrollView from 'InteractiveScrollView';

import { isIOS, isAndroid } from 'Platforms';
import { serif } from 'Fonts';

export default class TextInputArticle extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({isReady: true});
    });
  }

  render() {
    return (
      <View style={styles.outerContainer}>
        <InteractiveScrollView
          ref={(view) => { this._scrollView = view; }}
          style={styles.articleScrollView}
          contentContainerStyle={styles.articleContentContainer}>

          <View style={styles.header}>
            <Text style={styles.headerText}>
              How TextInput works
            </Text>

            <Text style={styles.headerSubtitleText}>
              TextInput is a great component to look at to better
              understand how the bridge works.. and why it
              sometimes doesn’t.
            </Text>
          </View>

          <View style={styles.hr} />

          {this.renderArticle()}

        </InteractiveScrollView>

        <NavBar onPress={this._scrollToTop.bind(this)} />
        <StatusBar hidden={true} />
      </View>
    );
  }

  renderArticle() {
    if (this.state.isReady) {
      return (
        <View>
          <Paragraph>
            If you used React Native when it was first released, you might
            remember how janky the TextInput component was -- I mean it
            worked great if you typed slowly and your JS responded
            immediately, but if you typed quickly or there was any delay on
            the JS end, you would drop characters. You had to disable the
            controlled prop on any TextInput to get an acceptable user
            experience.
          </Paragraph>

          <CharacterDroppingSimulator
            exampleText="This is dropping characters"
            placeholder="Tap in here and type as quickly as you can"
            subtitle="An exaggerated simulation of the behavior described above" />

          <Paragraph>
            Thankfully this was fixed by <PersonLink github="sahrens" /> in <CommitLink repo="facebook/react-native" commit="961c1e">this commit</CommitLink> many moons ago. But how?  And why was this a problem in the first place?
          </Paragraph>

          <Heading>The JavaScript Bridge</Heading>

          <Paragraph>
            React Native uses a batched, asynchronous bridge. If you need to access a value synchronously from JS or native code, the value has to live on that same side of the bridge. This becomes a bit of a problem in situations where ownership over a value can’t be entirely claimed by one side of the bridge. TextInput is one of these situations.
          </Paragraph>

          <Paragraph>
            The value of a text field on iOS must live in UIKit, because that’s just how the framework is built, and React Native sits on top of it. But if we want TextInput to be a controlled component in React, then it must live in JavaScript too. Who do you go to at any given time to retrieve the true value? The answer is: it depends.
          </Paragraph>

          <Heading>Visualizing the problem</Heading>

          <BrokenBehaviourVisualization />

          <View style={styles.hr} />

          <Heading>
            The problem is that we don’t know on the native side if the update from JavaScript has taken into account the most recent input event
          </Heading>

          <Paragraph>
            Both the native and JS sides of the bridge believe that they have posses the canonical value of the TextInput, and insist that the other update to that value even if the value has already changed on that side.
          </Paragraph>

          <Heading>
            Towards a solution
          </Heading>

          <Paragraph>
            A possible solution for this is for the native side to not update the text field value in response to a JavaScript command that is based on anything but the most recent input event.
          </Paragraph>

          <Paragraph>
            This is the strategy that <PersonLink github="sahrens" /> went for. Specifically, the implementation keeps a counter of input events on the native text field and we increment it every time the text field value changes (in response to textFieldDidChange), and include the counter in our event object that we pass to JS in onChange. The JS side stores the counter in its state and passes it back to the native side along with any update command that results from handling the onChange callback. 
          </Paragraph>

          <Heading>Visualizing the solution</Heading>

          <FixedBehaviourVisualization />

          <View style={styles.hr} />

          <Heading>Limitations of this approach</Heading>

          <Paragraph>
            <Text style={{fontWeight: 'bold'}}>There is still a frame of delay between the value being set on the text field and having the change event handled by JS.</Text> If we were to try to implement a maximum length of 5 characters for a text field using this approach, there would be a flash each time you press a new key at 5 characters because the value is actually set on the input, passed to JS, and JS tells native to remove the last character in the text field in the subsequent frame.
          </Paragraph>

          <Paragraph>
            To get around this limitation, maxLength is implemented natively and must be specified as a prop. The same thing applies generally to preventing user input -- if you don’t want the user to enter anything, don’t just setState to empty string on change - set the editable prop to false. In these cases the logic can be run synchronously on the native thread, rather than waiting for the next frame (or worse if it’s blocked) for the JS thread to respond.
          </Paragraph>

          <MaxLengthExamples />

          <Heading>
            Remaining Work
          </Heading>

          <Paragraph>
            Any live re-writing of text, for example changing all letters to uppercase, introduces a delay of at least one frame but potentially more depending on how long it takes for the JS thread to process the batch. This is part of a greater issue where we need to have some way to execute logic synchronously on the main thread sometimes - which is the solution that we used for maxLength above.
          </Paragraph>

          <LiveRewriteSlowSetState />

          <Paragraph>
            Another issue with live re-writing is the cursor position: let’s say that we want to add a dash between every character that is input and we enter "ABC", we would see this: |, A|, A-|B, A-C|-B
            { Platform.OS === 'android' && " -- except you're on Android, so you won't, because it works properly here! If you are interested in why this is the case, you curious devil you, go check out the source!"}
          </Paragraph>

          <LiveRewriteCursorPosition />

          <Text style={styles.attribution}>
            Made for <Text style={styles.expo}>EXPO</Text>
          </Text>
        </View>
      );
    } else {
      return <ArticleLoadingIndicator />;
    }
  }

  _scrollToTop() {
    this._scrollView.scrollTo(0, 0);
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  articleScrollView: {
    flex: 1,
  },
  articleContentContainer: {
    paddingHorizontal: 15,
  },
  header: {
    marginTop: 40,
    marginBottom: 5,
  },
  hr: {
    backgroundColor: '#000',
    opacity: 0.1,
    height: 1.0 / PixelRatio.get(),
    flex: 1,
    marginVertical: 15,
  },
  headerText: {
    fontFamily: serif,
    fontSize: isAndroid ? 30 : 35,
    fontWeight: isAndroid ? 'bold' : 'normal',
    lineHeight: 40,
    marginBottom: 5,
  },
  headerSubtitleText: {
    lineHeight: 25,
    fontSize: 17,
    color: '#848484',
  },
  outerContainer: {
    flex: 1,
    paddingTop: NavBar.HEIGHT - 10,
  },
  attribution: {
    color: '#999',
    fontWeight: '300',
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 18,
    marginHorizontal: 15,
  },
  expo: {
    color: '#777',
    fontWeight: '200',
    letterSpacing: 3,
  },
});
