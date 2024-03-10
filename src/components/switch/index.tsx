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
import { usePropsToStyle } from "../../hooks/usePropsToStyle";

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
      initValue = false,
      value,
      theme,
      themes = {},
      onChangeState = () => {},
      ...props
    },
    ref
  ) => {
    const containerRef = useRef<View>(null);
    const [active, setActive] = useState(initValue);

    const { viewStyles, textStyles } = usePropsToStyle(props);
    const _theme = useMemo(() => themes[theme], [theme, themes]);

    const _value = useMemo(
      () => (typeof value === "boolean" ? value : active),
      [active, value]
    );

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

    const getValue = useCallback(() => _value, [_value]);

    const toggleSwitch = useCallback(() => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setActive(!_value);
      onChangeState(!_value);
    }, [_value, onChangeState, setActive]);

    useEffect(() => {
      if (Platform.OS === "android") {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    }, []);

    useImperativeHandle(
      ref,
      () => ({
        containerRef,
        setValue: setActive,
        getValue,
      }),
      [_value, getValue]
    );

    return (
      <TouchableWithoutFeedback onPress={toggleSwitch}>
        <View
          ref={containerRef}
          style={[
            styles.switchContainerStyle,
            _theme?.containerStyle,
            containerStyle,
            viewStyles,
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
                style={[
                  styles.switchTextStyle,
                  _theme?.textStyle,
                  textStyle,
                  textStyles,
                ]}
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
