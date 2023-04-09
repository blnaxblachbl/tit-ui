import { RefObject } from "react";
import { StyleProp, ViewStyle, View } from "react-native";

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
  name?: string;
};

export type RadioButtonHandler = {
  value: boolean;
  setValue: (value: boolean) => void;
  containerRef: RefObject<View>;
};
