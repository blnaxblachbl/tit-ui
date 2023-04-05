import { RefObject } from "react";
import { StyleProp, ViewStyle, TextStyle, View } from "react-native";

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
