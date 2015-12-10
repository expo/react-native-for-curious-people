/**
 * Copyright 2015-present 650 Industries. All rights reserved.
 *
 * @providesModule TextInputArticle
 */
'use strict';

import React, {
  Animated,
  AppRegistry,
  Easing,
  Image,
  PixelRatio,
  Platform,
  ScrollView,
  StatusBarIOS,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import Colors from 'Colors';
import ImageUris from 'ImageUris';
import NavBar from 'NavBar';
import TextInputArticle from 'TextInputArticle';

import { isIOS, isAndroid } from 'Platforms';
import { serif } from 'Fonts';

class Hero extends React.Component {
  render() {
    return (
      <View style={styles.heroContainer}>
        <View style={styles.heroImageContainer}>
          <Image source={{uri: ImageUris.logoLarge}} style={styles.heroImage} />
        </View>

        <View style={styles.heroTextContainer}>
          <Text style={styles.heroTitleText}>React Native</Text>
          <Text style={styles.heroSubtitleText}>for curious people</Text>
        </View>
      </View>
    );
  }
}

class Main extends React.Component {
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
      <View style={styles.container}>
        <Hero />

        <ScrollView style={styles.body}>
          {this._renderFunnyThing()}
          {this._renderArticleList()}
          {this._renderFooter()}
        </ScrollView>
      </View>
    );
  }

  _renderFunnyThing() {
    return (
      <View style={{position: 'absolute', top: -50, left: 0, right: 0, alignItems: 'center', justifyContent: 'center',}}>
        <Text style={{color: Colors.fadedText}}>Nothing to see here! Look down below</Text>
      </View>
    );
  }

  _renderArticleList() {
    return (
      <View style={styles.articleListContainer}>

        <View style={styles.articlePreviewContainer}>
          <View stlye={styles.articlePreviewHeader}>
            <Text style={styles.articlePreviewCategoryText}>
              INTRODUCTION
            </Text>
            <Text style={styles.articlePreviewTitleText}>
              Read this first!
            </Text>
          </View>

          <View style={styles.articlePreviewBody}>
            <Text style={styles.articlePreviewBodyText}>
              What is this? Why does this exist? Who am I?
              How did I get here? How do I work this?
              What is that large automobile?
            </Text>
          </View>
        </View>

        <View style={styles.articlePreviewContainer}>
          <View stlye={styles.articlePreviewHeader}>
            <Text style={styles.articlePreviewCategoryText}>
              BRIDGE
            </Text>
            <Text style={styles.articlePreviewTitleText}>
              How TextInput works
            </Text>
          </View>

          <View style={styles.articlePreviewBody}>
            <Text style={styles.articlePreviewBodyText}>
              You know that it works, you have used it. But
              how does it do it’s thing behind the scenes?
              In this article I attempt to explain that, with
              the help of some examples.
            </Text>
          </View>
        </View>

      </View>
    );
  }

  _renderFooter() {
    return (
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>
          That’s all for now! This is a brand new project
          and more articles will be coming soon. If
          you would like to be notified by e-mail of
          updates, sign up for the <Link url="http://reactnative.cc">React Native Newsletter</Link>
        </Text>
      </View>
    )
  }
}

class Link extends React.Component {

  render() {
    return (
      <Text onPress={() => alert('hi') } style={[styles.link, this.props.style]}>
        {this.props.children}
      </Text>
    )
  }

}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  link: {
    textDecorationLine: 'underline',
    color: Colors.brand,
  },
  body: {
    backgroundColor: Colors.greyBackground,
    paddingTop: 20,
  },
  footerContainer: {
    marginTop: 25,
    paddingHorizontal: 30,
  },
  footerText: {
    color: Colors.fadedText,
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 20,
  },
  articleListContainer: {
    backgroundColor: '#fff',
  },
  articlePreviewContainer: {
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 25,
    borderColor: Colors.greyBorder,
    borderTopWidth: 1,
  },
  lastArticlePreviewContainer: {
    borderBottomWidth: 1,
  },
  articlePreviewCategoryText: {
    color: Colors.fadedText,
    fontSize: 15,
  },
  articlePreviewTitleText: {
    fontSize: 23,
    fontWeight: '700',
    marginTop: 3,
    marginBottom: 3,
  },
  articlePreviewBody: {
  },
  articlePreviewBodyText: {
    fontSize: 16,
    lineHeight: 26,
  },
  header: {
    marginTop: 40,
    marginBottom: 5,
  },
  heroContainer: {
    backgroundColor: Colors.brand,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    paddingTop: 23,
    paddingBottom: 15,
  },
  heroImageContainer: {
    padding: 10,
  },
  heroImage: {
    width: 90,
    height: 70,
  },
  heroTextContainer: {
    flexDirection: 'column',
    paddingVertical: 10,
    paddingLeft: 5,
  },
  heroTitleText: {
    color: '#fff',
    fontSize: 35,
    lineHeight: 35,
    fontWeight: '700',
  },
  heroSubtitleText: {
    marginTop: -2,
    color: '#fff',
    opacity: 0.8,
    fontSize: 23,
    lineHeight: 25,
    fontWeight: '300',
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
});

AppRegistry.registerComponent('main', () => Main);
