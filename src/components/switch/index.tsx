import React, {
  useState,
  useEffect,
  useMemo,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
} from "react";
import {
  LayoutAnimation,
  Platform,
  UIManager,
  View,
  Text,
  TouchableWithoutFeedback,
} from "react-native";

import { styles } from "./styles";
import { SwitchHandler, SwitchProps } from "./types";

export * from "./types";

export const Switch = forwardRef<SwitchHandler, SwitchProps>(
  (
    {
      containerStyle,
      circleStyle,
      textStyle,
      enabledCircleColor,
      disabledCircleColor,
      enabledBackgroundColor,
      disabledBackgroundColor,
      enabledText = "",
      disabledText = "",
      onChangeState = () => {},
      initValue = false,
      value,
      theme,
      themes = {},
    },
    ref
  ) => {
    const refs = useRef(new Map()).current;
    const [active, setActive] = useState(initValue);

    const _theme = useMemo(() => themes[theme], [theme, themes]);

    const _value = useMemo(
      () => (typeof value === "boolean" ? value : active),
      [active, value]
    );

    useEffect(() => {
      if (Platform.OS === "android") {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    }, []);

    const toggleSwitch = useCallback(() => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setActive(!_value);
      if (typeof onChangeState === "function") {
        onChangeState(!_value);
      }
    }, [_value, onChangeState, setActive]);

    const switchContainerAlign = useMemo(
      () => (!_value ? "flex-start" : "flex-end"),
      [_value]
    );

    const backgroundColor = useMemo(() => {
      const _enabledBackgroundColor =
        enabledBackgroundColor || _theme?.enabledBackgroundColor || "#4666ff";
      const _disabledBackgroundColor =
        disabledBackgroundColor || _theme?.disabledBackgroundColor || "#ccc";

      return _value ? _enabledBackgroundColor : _disabledBackgroundColor;
    }, [_value, enabledBackgroundColor, disabledBackgroundColor]);

    const switchCircleColor = useMemo(() => {
      const _enabledCircleColor =
        enabledCircleColor || _theme?.enabledCircleColor || "#fff";
      const _disabledCircleColor =
        disabledCircleColor || _theme?.disabledCircleColor || "#fff";

      return _value ? _enabledCircleColor : _disabledCircleColor;
    }, [_value, enabledCircleColor, disabledCircleColor, _theme]);

    const circleText = useMemo(
      () => (_value ? enabledText : disabledText),
      [_value, enabledText, disabledText]
    );

    useImperativeHandle(
      ref,
      () => ({
        value: _value,
        setValue: setActive,
        containerRef: refs.get("container"),
      }),
      [_value, refs]
    );

    return (
      <TouchableWithoutFeedback onPress={toggleSwitch}>
        <View
          ref={(r) => refs.set("container", r)}
          style={[
            styles.switchContainerStyle,
            _theme?.containerStyle,
            containerStyle,
            {
              alignItems: switchContainerAlign,
              backgroundColor,
            },
          ]}
        >
          <View
            style={[
              styles.switchCircleStyle,
              _theme?.circleStyle,
              circleStyle,
              {
                backgroundColor: switchCircleColor,
              },
            ]}
          >
            {circleText ? (
              <Text
                style={[styles.switchTextStyle, _theme?.textStyle, textStyle]}
              >
                {circleText}
              </Text>
            ) : null}
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
);
