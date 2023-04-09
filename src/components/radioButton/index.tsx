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

export * from "./types";

export const Radio = forwardRef<RadioButtonHandler, RadioButtonProps>(
  (
    {
      containerStyle,
      innerCircleStyle,
      circleStyle,
      titleStyle,
      value = undefined,
      onPress = () => {},
      title,
      activeColor = "#494043",
      inactiveColor = "#494043",
      initValue = false,
    },
    ref
  ) => {
    const refs = useRef(new Map()).current;
    const [innerValue, setInnerValue] = useState<boolean>(initValue);

    const _value = useMemo(
      () => (typeof value === "boolean" ? value : innerValue),
      [innerValue, value]
    );

    const _onPress = useCallback(() => {
      setInnerValue((v) => !v);
      if (typeof onPress === "function") {
        onPress(!innerValue);
      }
    }, [onPress, innerValue]);

    const _circleStyle = useMemo(
      () => [
        styles.radioButton,
        circleStyle,
        {
          borderColor: _value ? activeColor : inactiveColor,
        },
      ],
      [circleStyle, _value, activeColor, inactiveColor]
    );

    const _innerCircleStyle = useMemo(
      () => [
        styles.radioCircle,
        innerCircleStyle,
        {
          backgroundColor: _value ? activeColor : inactiveColor,
        },
      ],
      [innerCircleStyle, _value, activeColor, inactiveColor]
    );

    const _titleStyle = useMemo(
      () => [styles.radioText, titleStyle],
      [titleStyle]
    );

    useImperativeHandle(
      ref,
      () => ({
        value: _value,
        setValue: setInnerValue,
        containerRef: refs.get("container"),
      }),
      [_value, refs]
    );

    return (
      <TouchableWithoutFeedback onPress={_onPress}>
        <View
          ref={(r) => refs.set("container", r)}
          style={[styles.container, containerStyle]}
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
