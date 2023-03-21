import React, {
  useState,
  useEffect,
  useMemo,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  RefObject,
} from "react";
import {
  LayoutAnimation,
  Platform,
  UIManager,
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";

import { normalize } from "../../functions/normalize";

export type SwitchProps = {
  containerStyle?: StyleProp<ViewStyle>;
  circleStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  enabledCircleColor?: string;
  disabledCircleColor?: string;
  enabledBackgroundColor?: string;
  disabledBackgroundColor?: string;
  enabledText?: string;
  disabledText?: string;
  onChangeState?: (value: boolean) => void;
  initValue?: boolean;
  value?: boolean;
};

export type SwitchHandler = {
  value: boolean;
  setValue: (value: boolean) => void;
  containerRef: RefObject<View>;
};

const Switch = forwardRef<SwitchHandler, SwitchProps>(
  (
    {
      containerStyle,
      circleStyle,
      textStyle,
      enabledCircleColor = "#fff",
      disabledCircleColor = "#fff",
      enabledBackgroundColor = "#4666ff",
      disabledBackgroundColor = "#ccc",
      enabledText = "",
      disabledText = "",
      onChangeState = () => {},
      initValue = false,
      value,
    },
    ref
  ) => {
    const refs = useRef(new Map()).current;
    const [active, setActive] = useState(initValue);

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
    const backgroundColor = useMemo(
      () => (_value ? enabledBackgroundColor : disabledBackgroundColor),
      [_value, enabledBackgroundColor, disabledBackgroundColor]
    );
    const switchCircleColor = useMemo(
      () => (_value ? enabledCircleColor : disabledCircleColor),
      [_value, enabledCircleColor, disabledCircleColor]
    );
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
            {
              alignItems: switchContainerAlign,
              backgroundColor,
            },
            containerStyle,
          ]}
        >
          <View
            style={[
              styles.switchCircleStyle,
              {
                backgroundColor: switchCircleColor,
              },
              circleStyle,
            ]}
          >
            {circleText ? (
              <Text style={[styles.switchTextStyle, textStyle]}>
                {circleText}
              </Text>
            ) : null}
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
);

export default Switch;

const styles = StyleSheet.create({
  switchContainerStyle: {
    width: 55,
    borderRadius: 25,
    padding: 4,
    justifyContent: "center",
  },
  switchCircleStyle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#fff", // rgb(102,134,205)
    alignItems: "center",
    justifyContent: "center",
  },
  switchTextStyle: {
    color: "#000",
    fontSize: normalize(14),
    fontWeight: "bold",
  },
});
