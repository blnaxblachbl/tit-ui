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
  name?: string;
  theme?: string;
  themes?: SwitchThemesObject;
};

export type SwitchHandler = {
  value: boolean;
  setValue: (value: boolean) => void;
  containerRef: RefObject<View>;
};

export type SwitchTheme = {
  containerStyle?: StyleProp<ViewStyle>;
  circleStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  enabledCircleColor?: string;
  disabledCircleColor?: string;
  enabledBackgroundColor?: string;
  disabledBackgroundColor?: string;
};

export type SwitchThemesObject = {
  [name: string]: SwitchTheme;
};
