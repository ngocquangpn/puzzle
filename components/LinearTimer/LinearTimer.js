"use strict";

import * as React from "react";
import PropTypes from "prop-types";
import { Text, View, StyleSheet, ViewPropTypes } from "react-native";

const ViewPropTypesStyle = ViewPropTypes ? ViewPropTypes.style : View.propTypes.style;

export default class LinearTimer extends React.Component {

  static propTypes = {
    min: PropTypes.number.isRequired,
    height: PropTypes.number,
    endThreshold: PropTypes.number,
    elapsedIndicatorColor: PropTypes.string,
    remainingIndicatorColor: PropTypes.string,
    endIndicatorColor: PropTypes.string,
    style: ViewPropTypesStyle,
    textStyle: Text.propTypes.style,
    onTimeElapsed: PropTypes.func,
  };

  static defaultProps = {
    height: 38,
    endThreshold: 10,
    elapsedIndicatorColor: "#A8C3BC",
    remainingIndicatorColor: "#0E3657",
    endIndicatorColor: "#cc0000",
    style: null,
    textStyle: null,
    onTimeElapsed: () => {
    },
  };

  _initialState = min => ({
    width: "100%",
    remainingTime: min * 60,
  });

  constructor (props) {
    super(props);

    this.state = this._initialState(props.min);
  }

  componentDidMount () {
    this.timeWidth = undefined;

    this.timer = setInterval(() => {
      const { min, onTimeElapsed } = this.props,
        { remainingTime: previousTime } = this.state,
        remainingTime = previousTime - 1;

      this.setState(
        {
          remainingTime,
          width: `${((remainingTime / (min * 60)) * 100).toFixed(1)}%`,
        },
        () => {
          if (remainingTime === 0) {
            clearInterval(this.timer);
            onTimeElapsed();
          }
        },
      );
    }, 1000);
  }

  componentDidUpdate (prevProps) {
    if (prevProps &&this.props && prevProps.min &&this.props.min &&(prevProps.min !== this.props.min))
      this._reset();
  }

  _reset = () => {
    const {
      min,
    } = this.props;

    this.setState(this._initialState(min));
  };

  componentWillUnmount () {
    if (this.timer) clearInterval(this.timer);
  }

  render () {
    const {
        height: containerHeight,
        style,
        endThreshold,
        elapsedIndicatorColor,
        remainingIndicatorColor,
        endIndicatorColor,
      } = this.props,
      { width } = this.state,
      height = 6;

    return (
      <View
        style={{
          ...__styles.container,
          ...style,
          height: 6,
        }}
      >

        <View
          style={{
            ...__styles.elapsedIndicator,
            backgroundColor: elapsedIndicatorColor,
            height,
          }}
        >
          <View
            style={{
              backgroundColor:
                parseFloat(width) < endThreshold ? endIndicatorColor : remainingIndicatorColor,
              width,
              height,
            }}
          />
        </View>
      </View>
    );
  }
}

const __styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "transparent",
  },
  timerView: {
    marginVertical: 4,
    justifyContent: "center",
  },
  time: {
    paddingHorizontal: 0,
    fontSize: 12,
    lineHeight: 14,
  },
  elapsedIndicator: {},
});
