import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";

import { styles } from "./styles";
import { RadioButtonHandler, RadioButtonProps } from "./types";
import { usePropsToStyle } from "../../hooks/usePropsToStyle";

export * from "./types";

export const Radio = forwardRef<RadioButtonHandler, RadioButtonProps>(
  (
    {
      containerStyle,
      innerCircleStyle,
      circleStyle,
      titleStyle,
      value = undefined,
      title,
      activeColor,
      inactiveColor,
      initValue = false,
      theme,
      themes = {},
      onPress = () => {},
      ...props
    },
    ref
  ) => {
    const containerRef = useRef<View>(null);
    const [innerValue, setInnerValue] = useState<boolean>(initValue);

    const { viewStyles, textStyles } = usePropsToStyle(props);
    const _theme = useMemo(() => themes[theme], [theme, themes]);
    const _activeColor = useMemo(
      () => activeColor || _theme?.activeColor || "#494043",
      [_theme, activeColor]
    );
    const _inactiveColor = useMemo(
      () => inactiveColor || _theme?.inactiveColor || "#494043",
      [_theme, inactiveColor]
    );
    const _value = useMemo(
      () => (typeof value === "boolean" ? value : innerValue),
      [innerValue, value]
    );
    const _circleStyle = useMemo(
      () => [
        styles.radioButton,
        _theme?.circleStyle,
        circleStyle,
        {
          borderColor: _value ? _activeColor : _inactiveColor,
        },
      ],
      [circleStyle, _value, _activeColor, _inactiveColor, _theme]
    );
    const _innerCircleStyle = useMemo(
      () => [
        styles.radioCircle,
        _theme?.innerCircleStyle,
        innerCircleStyle,
        {
          backgroundColor: _value ? _activeColor : _inactiveColor,
        },
      ],
      [innerCircleStyle, _value, _activeColor, _inactiveColor, _theme]
    );
    const _titleStyle = useMemo(
      () => [styles.radioText, _theme?.titleStyle, titleStyle, textStyles],
      [titleStyle, _theme, textStyles]
    );

    const _onPress = useCallback(() => {
      setInnerValue(!innerValue);
      onPress(!innerValue);
    }, [innerValue, onPress]);

    const getValue = useCallback(() => {
      return value;
    }, []);

    useImperativeHandle(
      ref,
      () => ({
        getValue,
        setValue: setInnerValue,
        containerRef,
      }),
      [_value, getValue, setInnerValue]
    );

    return (
      <TouchableWithoutFeedback onPress={_onPress}>
        <View
          ref={containerRef}
          style={[
            styles.container,
            _theme?.containerStyle,
            containerStyle,
            viewStyles,
          ]}
        >
          <View style={_circleStyle}>
            {_value ? <View style={_innerCircleStyle} /> : null}
          </View>
          {title ? <Text style={_titleStyle}>{title}</Text> : null}
        </View>
      </TouchableWithoutFeedback>
    );
  }
);
