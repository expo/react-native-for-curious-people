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
  View,
} from 'react-native';

import CharacterDroppingSimulator from 'CharacterDroppingSimulator';
import CommitLink from 'CommitLink';
import Paragraph from 'Paragraph';
import PersonLink from 'PersonLink';

class TextInputArticle extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state= {};
  }

  render() {
    return (
      <View style={styles.outerContainer}>
        <ScrollView
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

          <View style={styles.hr} />

          <Text style={styles.attribution}>
            Made for <Text style={styles.exponent}>EXPONENT</Text>
          </Text>
        </ScrollView>

        <View style={styles.navbar}>
          <Text style={styles.navbarText}>
            React Native for curious people
          </Text>
        </View>
      </View>
    );
  }

  componentDidMount() {
    if (StatusBarIOS) {
      StatusBarIOS.setHidden(true, 'none');
    }
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
    marginTop: 25,
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
    lineHeight: 19,
    fontSize: 14,
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
