
/**
 * Copyright 2015-present 650 Industries. All rights reserved.
 *
 * @providesModule IntroductionArticle
 */
'use strict';

import React, {
  Animated,
  AppRegistry,
  Easing,
  Dimensions,
  Image,
  PixelRatio,
  Platform,
  ScrollView,
  StatusBarIOS,
  StyleSheet,
  InteractionManager,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import ArticleLoadingIndicator from 'ArticleLoadingIndicator';
import CodeBlock from 'CodeBlock';
import CommitLink from 'CommitLink';
import Heading from 'Heading';
import InteractiveScrollView from 'InteractiveScrollView';
import Paragraph from 'Paragraph';
import NavBar from 'NavBar';
import TinderExample from 'TinderExample';

import { isIOS, isAndroid } from 'Platforms';
import { serif } from 'Fonts';

export default class TextInputArticle extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state= {};
  }

  componentDidMount() {
    if (StatusBarIOS) {
      StatusBarIOS.setHidden(true, 'none');
    }

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
              Read this first!
            </Text>

            <Text style={styles.headerSubtitleText}>
              To find out what this is all about
            </Text>
          </View>

          <View style={styles.hr} />


          {this.renderArticle()}

        </InteractiveScrollView>

        <NavBar onPress={this._scrollToTop.bind(this)} />
      </View>
    );
  }

  renderArticle() {
    if (this.state.isReady) {
      return (
        <View>
          <Paragraph>
            React Native is powerful, so much so that it is can seem magical to
            the untrained eye. Call me boring if you like, but I do not like it
            when things are magical. I want to understand how and why they
            work, to be able to predict what happens when I do x and to be able
            to change that behaviour if I desire.
          </Paragraph>

          <Heading>Beyond the magic</Heading>

          <Paragraph>
            React Native for curious people is an ever-growing series of
            articles about React Native that are the antithesis of tutorials;
            we do not attempt to explain how to accomplish any specific task,
            but rather aim to teach how React Native does what it does. The
            slight-of-hand behind the magic, if you will. Of course, like most good
            things we don't take ourselves too seriously so if we get excited about
            something cool we learn and the only way to teach it is in the form of
            a tutorial, you might see that. What you won't see is anything like "How to create
            your own flashlight app in 10 minutes -- you'll never guess where the
            light comes from!" Nothing against tutorials, we've all read and
            perhaps even written our fair share, that's just not really what this is
            about. It's about understanding.
          </Paragraph>

          <Heading>
            I'm still reading but confused why this isn't just a website so
            please tell me before I quit
          </Heading>

          <Paragraph>
            A website is great for explaining how the web works. A React Native
            app is a great way to explain how React Native works. We can
            provide inline demos that actually run using React Native.
          </Paragraph>

          <View style={{width: Dimensions.get('window').width - 30, height: Dimensions.get('window').width, marginVertical: 10,}}>
            <TinderExample
              onStartInteraction={this._onStartInteraction.bind(this)}
              onEndInteraction={this._onEndInteraction.bind(this)} />
          </View>

          <Paragraph>
            In addition to inline examples, if you're anything like me you
            probably just press "Read Later" on every article you come across
            on the web and then catch up on them when you're in a plane,
            train or automobile. So this is conveniently already on your
            mobile device! And if you do happen to have an internet
            connection, we can also link between other Exponent experiences
            straight from the article.
          </Paragraph>

          <Paragraph>
            Thank you so much for checking this out. Check back for more updates
            in the near future!
          </Paragraph>

          <Text style={styles.attribution}>
            Made for <Text style={styles.exponent}>EXPONENT</Text>
          </Text>
        </View>
      );
    } else {
      return <ArticleLoadingIndicator />
    }
  }

  _onStartInteraction() {
    this._scrollView.setNativeProps({scrollEnabled: false});
  }

  _onEndInteraction() {
    this._scrollView.setNativeProps({scrollEnabled: true});
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
  exponent: {
    color: '#777',
    fontWeight: '200',
    letterSpacing: 3,
  },
});
