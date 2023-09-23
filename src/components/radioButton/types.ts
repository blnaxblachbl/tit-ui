import { RefObject } from "react";
import { StyleProp, ViewStyle, View, TextStyle } from "react-native";

export type RadioButtonProps = {
  containerStyle?: StyleProp<ViewStyle>;
  innerCircleStyle?: StyleProp<ViewStyle>;
  circleStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  value?: boolean;
  onPress?: (value: boolean) => void;
  title?: string;
  activeColor?: string;
  inactiveColor?: string;
  initValue?: boolean;
  name?: string;
  theme?: string;
  themes?: RadioButtonThemesObject;
};

export type RadioButtonHandler = {
  value: boolean;
  setValue: (value: boolean) => void;
  containerRef: RefObject<View>;
};

export type RadioButtonTheme = {
  containerStyle?: StyleProp<ViewStyle>;
  innerCircleStyle?: StyleProp<ViewStyle>;
  circleStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  activeColor?: string;
  inactiveColor?: string;
};
export type RadioButtonThemesObject = {
  [name: string]: RadioButtonTheme;
};
