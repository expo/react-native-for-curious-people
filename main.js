/**
 * Copyright 2015-present 650 Industries. All rights reserved.
 *
 * @providesModule main
 */
'use strict';

import React, {
  Animated,
  AppRegistry,
  Easing,
  Image,
  PixelRatio,
  ScrollView,
  StatusBarIOS,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

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
import InteractiveScrollView from 'InteractiveScrollView';

class TextInputArticle extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state= {};
  }

  componentDidMount() {
    if (StatusBarIOS) {
      StatusBarIOS.setHidden(true, 'none');
    }
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
            placeholder="Tap in here and type away as quickly as you can"
            subtitle="An exaggerated simulation of the behavior described above" />

          <Paragraph>
            Thankfully this was fixed by <PersonLink github="sahrens" /> in <CommitLink repo="facebook/react-native" commit="xyz">this commit</CommitLink> many moons ago. But how?  And why was this a problem in the first place?
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
          </Paragraph>

          <LiveRewriteCursorPosition />

          <Text style={styles.attribution}>
            Made for <Text style={styles.exponent}>EXPONENT</Text>
          </Text>
        </InteractiveScrollView>

        <TouchableWithoutFeedback onPress={this._scrollToTop.bind(this)}>
          <View style={styles.navbar}>
            <Text style={styles.navbarText}>
              React Native for curious people
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
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
    fontFamily: 'Georgia',
    fontSize: 35,
    marginBottom: 5,
  },
  headerSubtitleText: {
    lineHeight: 23,
    fontSize: 16,
    color: '#848484',
  },
  navbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 30,
    paddingHorizontal: 15,
    backgroundColor: '#123F74',
    justifyContent: 'center',
  },
  navbarText: {
    color: '#90B2DB',
    opacity: 0.8,
  },
  outerContainer: {
    flex: 1,
    paddingTop: 30,
  },
  attribution: {
    color: '#999',
    fontWeight: '300',
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 18,
    marginHorizontal: 15,
  },
  exponent: {
    color: '#777',
    fontWeight: '200',
    letterSpacing: 3,
  },
});

AppRegistry.registerComponent('main', () => TextInputArticle);
