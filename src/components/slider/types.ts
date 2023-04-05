import { ReactElement } from "react";
import { StyleProp, ViewStyle, View, ViewProps } from "react-native";

export interface SliderProps extends ViewProps {
  minValue?: number;
  maxValue?: number;
  trackStyle?: StyleProp<ViewStyle>;
  circleStyle?: StyleProp<ViewStyle>;
  circleSize?: number;
  circleIsScale?: boolean;
  circleMaxScale?: number;
  onValueChange?: (value: number) => void;
  CustomCircle?: ReactElement;
}

export type SliderSetValueOpotion = {
  animated?: boolean;
};

export type SliderHandler = {
  value: number;
  setValue?: (value: number, options?: SliderSetValueOpotion) => void;
  containerRef: View | null;
};
