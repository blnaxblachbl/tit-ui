import { RefObject } from "react";
import { StyleProp, ViewStyle, TextStyle, View } from "react-native";

import { StyleInProps } from "../../functions/propsToStyle";

export type SwitchProps = StyleInProps & {
  containerStyle?: StyleProp<ViewStyle>;
  circleStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  enabledCircleColor?: string;
  disabledCircleColor?: string;
  enabledBackgroundColor?: string;
  disabledBackgroundColor?: string;
  enabledText?: string;
  disabledText?: string;
  initValue?: boolean;
  value?: boolean;
  name?: string;
  theme?: string;
  themes?: SwitchThemesObject;
  onChangeState?: (value: boolean) => void;
};

export type SwitchHandler = {
  containerRef: RefObject<View>;
  getValue: () => boolean;
  setValue: (value: boolean) => void;
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
