/**
 * Copyright 2015-present 650 Industries. All rights reserved.
 *
 * @providesModule CodeBlock
 */

import React from 'react';
import {
  Text,
  View,
  ScrollView,
} from 'react-native';

import Prism from 'prism';

export default class CodeBlock extends React.Component {
  render() {
    let result = Prism.highlight(
      this.props.code,
      Prism.languages['javascript'],
      'javascript'
    );

    return (
      <View style={{marginTop: this.props.marginTop || 2, marginBottom: this.props.marginBottom || 10, backgroundColor: 'rgba(0,0,0,0.01)', borderRadius: 3}}>
        <ScrollView horizontal bounces={false} contentContainerStyle={{paddingHorizontal: 8}}>
          <Text style={{fontSize: 15,}}>
            {result}
          </Text>
        </ScrollView>
      </View>
    );
  }
};
