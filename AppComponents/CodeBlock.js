/**
 * Copyright 2015-present 650 Industries. All rights reserved.
 *
 * @providesModule CodeBlock
 */
'use strict';

import React, {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';

import Prism from 'prism';

export default class CodeBlock extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
    };
  }

  render() {
    let result = Prism.highlight(
      this.props.code,
      Prism.languages['javascript'],
      'javascript'
    );

    return (
      <View style={{marginTop: this.props.marginTop, marginBottom: this.props.marginBottom || 15, backgroundColor: 'rgba(0,0,0,0.02)'}}>
        <ScrollView
          horizontal
          bounces={false}
          contentContainerStyle={{paddingHorizontal: 10}}>
            <Text style={{fontSize: 13,}}>
              {result}
            </Text>
        </ScrollView>
      </View>
    );
  }
};
