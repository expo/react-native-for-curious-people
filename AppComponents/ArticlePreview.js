/**
 * Copyright 2015-present 650 Industries. All rights reserved.
 *
 * @providesModule ArticlePreview
 */

import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import Colors from 'Colors';
import ExRouter from 'ExRouter';

export default class ArticlePreview extends React.Component {

  render() {
    return (
      <TouchableHighlight
        onPress={this._navigateToArticle.bind(this)}
        style={styles.articlePreviewContainer}
        underlayColor='#FFF3F3'>
        <View>
          <View stlye={styles.articlePreviewHeader}>
            <Text style={styles.articlePreviewCategoryText}>
              {this.props.category}
            </Text>
            <Text style={styles.articlePreviewTitleText}>
              {this.props.title}
            </Text>
          </View>

          <View style={styles.articlePreviewBody}>
            <Text style={styles.articlePreviewBodyText}>
              {this.props.children}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  _navigateToArticle() {
    this.props.navigator.push(ExRouter.getArticleRoute(this.props.id));
  }

}

let styles = StyleSheet.create({
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
    fontSize: 15,
    lineHeight: 24,
  },
});
