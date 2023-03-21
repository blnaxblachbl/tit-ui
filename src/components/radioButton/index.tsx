import React, {
  forwardRef,
  RefObject,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  StyleProp,
  ViewStyle,
} from "react-native";
import { normalize } from "../../functions/normalize";

export type RadioButtonProps = {
  containerStyle?: StyleProp<ViewStyle>;
  innerCircleStyle?: StyleProp<ViewStyle>;
  circleStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<ViewStyle>;
  value?: boolean;
  onPress?: (value: boolean) => void;
  title?: string;
  activeColor?: string;
  inactiveColor?: string;
  initValue?: boolean;
};

export type RadioButtonHandler = {
  value: boolean;
  setValue: (value: boolean) => void;
  containerRef: RefObject<View>;
};

const RadioButton = forwardRef<RadioButtonHandler, RadioButtonProps>(
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

export default RadioButton;

const styles = StyleSheet.create({
  container: {
    flexWrap: "nowrap",
    flexDirection: "row",
    width: "100%",
  },
  radioButton: {
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#494043",
    marginRight: 6,
  },
  radioText: {
    flex: 1,
    fontSize: normalize(14),
    color: "#494043",
    textAlignVertical: "top",
  },
  radioCircle: {
    width: 12,
    height: 12,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    backgroundColor: "#FF004A",
  },
});
