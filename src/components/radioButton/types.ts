import { RefObject } from "react";
import { StyleProp, ViewStyle, View, TextStyle } from "react-native";
import { StyleInProps } from "../../functions/propsToStyle";

export type RadioButtonProps = StyleInProps & {
  containerStyle?: StyleProp<ViewStyle>;
  innerCircleStyle?: StyleProp<ViewStyle>;
  circleStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  value?: boolean;
  title?: string;
  activeColor?: string;
  inactiveColor?: string;
  initValue?: boolean;
  name?: string;
  theme?: string;
  themes?: RadioButtonThemesObject;
  onPress?: (value: boolean) => void;
};

export type RadioButtonHandler = {
  setValue: (value: boolean) => void;
  getValue: () => boolean;
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
