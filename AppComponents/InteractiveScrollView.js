/**
 * Copyright 2015-present 650 Industries. All rights reserved.
 *
 * @providesModule InteractiveScrollView
 */

import React, { PropTypes } from 'react';
import ReactNative, {
  Keyboard,
  ScrollView,
  TextInput,
  NativeModules,
  InteractionManager,
  Platform,
  View,
} from 'react-native';

import ExTextInput from 'ExTextInput';

var { UIManager, ScrollViewManager, } = NativeModules;

var FOCUS_AUTO = 'auto';
var FOCUS_TOP = 'top';
var FOCUS_CENTER = 'center';
var FOCUS_NONE = 'none';

var UNFOCUS_RETURN = 'return';
var UNFOCUS_NONE = 'none';

// TODO: This is an arbirtrary number to space out the
// view from the top of the screen, an offset should be exposed as
// a prop
var ARBITRARY_TOP_FOCUS_MARGIN = 15;
var ARBITRARY_AUTO_TOP_THRESHOLD = 100;

var InteractiveScrollView = React.createClass({
  scrollView: {},
  focusedNode: (null:?ReactElement),
  focusType: (null:?string),
  unfocusedScrollPosition: 0,

  getDefaultProps():Object {
    return {
      animateScroll: true,
    };
  },

  propTypes: {
    animateScroll: PropTypes.bool,
  },

  getChildContext():Object {
    return {
      focusNode: this.focusNode,
      unfocusNode: this.unfocusNode,
      isInsideInteractiveContext: true,
    }
  },

  childContextTypes: {
    focusNode: PropTypes.func,
    unfocusNode: PropTypes.func,
    isInsideInteractiveContext: PropTypes.bool,
  },

  getInitialState():Object {
    return {
      viewportHeight: 0,
    }
  },

  keyboardHeight: 0,

  updateFocusedNode() {
    this.focusedNode && this.focusNode(this.focusedNode, this.focusType || FOCUS_AUTO);
  },

  componentWillMount() {
    this._keyboardShow = Keyboard.addListener('keyboardWillShow', (frames) => {
      this.keyboardHeight = frames.endCoordinates.height;
      this.updateFocusedNode();
    });

    this._keyboardHide = Keyboard.addListener('keyboardDidHide', (frames) => {
      this.keyboardHeight = 0;

      InteractionManager.runAfterInteractions(() => {
        this.updateFocusedNode();
      });
    });
  },

  componentWillUnmount() {
    Keyboard.removeSubscription(this._keyboardShow);
    Keyboard.removeSubscription(this._keyboardHide);
  },

  availableHeight():number {
    return this.state.viewportHeight - this.keyboardHeight;
  },

  scrollTo(y) {
    if (!this.scrollView || Platform.OS === 'android') {
      return;
    }

    let scrollViewHandle = ReactNative.findNodeHandle(this.scrollView);
    ScrollViewManager.getContentSize(scrollViewHandle, ({height}) => {
      let lowestTop = height - (this.availableHeight());
      let scrollY;

      if (y > lowestTop) {
        scrollY = lowestTop;
      } else if (y < 0) {
        scrollY = 0;
      } else {
        scrollY = y;
      }

      if (this.props.animateScroll) {
        this.scrollView.scrollTo(scrollY, 0);
      } else {
        this.scrollView.scrollWithoutAnimationTo(scrollY, 0);
      }
    });
  },

  scrollToCenterForMeasurements(leftOffset:number, topOffset:number, width:number, height:number):void {
    var centerScrollPosition =
      topOffset -
      (this.availableHeight() / 2) + height / 2 -
      ARBITRARY_TOP_FOCUS_MARGIN; // TODO: Poor substitute for taking status bar height into focus

    var MAX_SCROLL = Infinity; // TODO: Replace MAX_SCROLL with something more reasonable, eg: the height of the ScrollView
    var MIN_SCROLL = 0;

    /* TODO: replace this with the clamp function */
    if (centerScrollPosition < MIN_SCROLL) {
      centerScrollPosition = MIN_SCROLL;
    } else if (centerScrollPosition > MAX_SCROLL) {
      centerScrollPosition = MAX_SCROLL;
    }

    this.scrollTo(centerScrollPosition);
  },

  scrollToTopForMeasurements(leftOffset:number, topOffset:number, width:number, height:number) {
    var topScrollPosition = topOffset - ARBITRARY_TOP_FOCUS_MARGIN;
    this.scrollTo(topScrollPosition);
  },

  focusNode(node:any, focus:string) {
    // Exit early if unmounted
    if (!ReactNative.findNodeHandle(node) || !ReactNative.findNodeHandle(this)) {
      return;
    }

    // TODO: topFocusOffset is only implemented for FOCUS_AUTO!
    var topFocusOffset = node.props.topFocusOffset ? node.props.topFocusOffset : 0;

    var targetHandle = ReactNative.findNodeHandle(node);
    var scrollViewHandle = ReactNative.findNodeHandle(this.scrollView);
    this.focusedNode = node;
    this.focusType = focus;

    var successCallback = null;
    if (focus === FOCUS_AUTO) {
      successCallback = (leftOffset, topOffset, width, height) => {
        if (height >= (this.availableHeight() - ARBITRARY_AUTO_TOP_THRESHOLD)) {
          this.scrollToTopForMeasurements(leftOffset, topOffset + topFocusOffset, width, height);
        } else {
          this.scrollToCenterForMeasurements(leftOffset, topOffset + topFocusOffset, width, height);
        }
      }
    } else if (focus === FOCUS_CENTER) {
      successCallback = this.scrollToCenterForMeasurements;
    } else if (focus === FOCUS_TOP) {
      successCallback = this.scrollToTopForMeasurements;
    }

    UIManager.measureLayout(
      targetHandle,
      scrollViewHandle,
      () => { /* handle error */ },
      successCallback,
    );
  },

  unfocusNode(node:any, scrollUnfocus:string) {
    this.focusedNode = null;
    this.focusType = null;

    if (scrollUnfocus === UNFOCUS_RETURN) {
      if (this.scrollView) {
        this.scrollView.scrollTo(this.unfocusedScrollPosition);
      }
    }
  },

  _onLayout(e:any) {
    var { y, height, } = e.nativeEvent.layout;

    // Doesn't make sense to consider y values less than 0 here, I think
    if (y < 0) { y = 0; }

    this.setState({viewportHeight: height - y});
  },

  _onScroll(e:any) {
    this.props.onScroll && this.props.onScroll(e);

    var { contentOffset, } = e.nativeEvent;

    if (!this.focusedNode) {
      this.unfocusedScrollPosition = contentOffset.y;
    }
  },

  setNativeProps(props) {
    this.scrollView.setNativeProps(props);
  },

  render() {
    return (
      <ScrollView {...this.props}
        keyboardDismissMode="none"
        ref={(view) => this.scrollView = view}
        onLayout={this._onLayout}
        scrollEventThrottle={20}
        onScroll={this._onScroll}>
        {this.props.children}
      </ScrollView>
    )
  }
});

class BaseInteractiveComponent extends React.Component {
  _onFocus:Function;
  _onBlur:Function;

  getContext():any {
    // TODO: contextTypes
    return this.context;
  }

  _onFocus() {
    var context = this.getContext();
    if (!context.isInsideInteractiveContext) { return; }
    this.unfocusing = false;

    var { scrollFocus, } = this.props;

    if ([FOCUS_AUTO, FOCUS_CENTER, FOCUS_TOP].indexOf(scrollFocus) >= 0) {
      context.focusNode(this, scrollFocus);
    } else {
      if (scrollFocus !== FOCUS_NONE) {
        logging.warn(
          `You set scrollFocus to ${scrollFocus}, which is not a permitted value`
        );
      }
    }

    this.props.onFocus && this.props.onFocus();
  }

  _onBlur() {
    var context = this.getContext();
    if (!context.isInsideInteractiveContext) { return; }

    // We reset this variable if we focus again, so we don't quickly focus/focus/unfocus
    // and lose our second focus state
    this.unfocusing = true;
    requestAnimationFrame(() => {
      if (this.unfocusing) {
        context.unfocusNode(this, this.props.scrollUnfocus);
      }
    });

    this.props.onBlur && this.props.onBlur();
  }

  render() {
    return <View />;
  }
}

BaseInteractiveComponent.defaultProps = {
  scrollFocus: FOCUS_AUTO,
  scrollUnfocus: UNFOCUS_RETURN,
}

BaseInteractiveComponent.propTypes = {
  scrollFocus: PropTypes.oneOf([
    FOCUS_AUTO, FOCUS_TOP, FOCUS_CENTER, FOCUS_NONE,
  ]),

  scrollUnfocus: PropTypes.oneOf([
    UNFOCUS_RETURN, UNFOCUS_NONE,
  ])
}

BaseInteractiveComponent.contextTypes = {
  focusNode: PropTypes.func,
  unfocusNode: PropTypes.func,
}

class InteractiveGroup extends BaseInteractiveComponent {
  getChildContext():Object {
    return {
      focusNode: this.interceptFocusNode.bind(this),
      unfocusNode: this.interceptUnfocusNode.bind(this),
    }
  }

  focus(opts={animate: true}) {
    this.interceptFocusNode(opts);
  }

  blur() {
    this.interceptUnfocusNode();
  }

  interceptFocusNode(opts={}) {
    var context = this.getContext();
    if (!context.isInsideInteractiveContext) { return; }

    context.focusNode(this, opts.scrollFocus || this.props.scrollFocus);
  }

  interceptUnfocusNode(...unused) {
    var context = this.getContext();
    if (!context.isInsideInteractiveContext) { return; }

    context.unfocusNode(this, this.props.scrollUnfocus);
  }

  render() {
    return (
      <View {...this.props}>
        {this.props.children}
      </View>
    )
  }
}

InteractiveGroup.propTypes = BaseInteractiveComponent.propTypes;
InteractiveGroup.defaultProps = BaseInteractiveComponent.defaultProps;

InteractiveGroup.childContextTypes = {
  focusNode: PropTypes.func,
  unfocusNode: PropTypes.func,
}

class InteractiveTextInput extends BaseInteractiveComponent {
  _onFocus:Function;
  _onBlur:Function;

  // Pass focus along
  focus() {
    this.refs.node.focus();
  }

  // Pass blur along to the original ref
  blur() {
    this.refs.node.blur();
  }


  // Pass setNativeProps along
  setNativeProps(props) {
    this.refs.node.setNativeProps(props);
  }

  render() {
    if (Platform.OS === 'android') {
      return (
        <ExTextInput {...this.props} />
      );
    } else {
      return (
        <ExTextInput {...this.props}
          ref="node"
          onFocus={this._onFocus.bind(this)}
          onBlur={this._onBlur.bind(this)} />
      );
    }
  }
}

InteractiveTextInput.BaseInteractiveComponent = BaseInteractiveComponent;
InteractiveScrollView.TextInput = InteractiveTextInput;
InteractiveScrollView.Group = InteractiveGroup;

module.exports = InteractiveScrollView;
