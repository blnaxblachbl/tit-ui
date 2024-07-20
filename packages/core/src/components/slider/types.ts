import { ReactElement } from "react";
import { StyleProp, ViewStyle, View, ViewProps } from "react-native";

import { StyleInProps } from "../../functions/propsToStyle";

export type SliderProps = ViewProps &
  StyleInProps & {
    minValue?: number;
    maxValue?: number;
    trackStyle?: StyleProp<ViewStyle>;
    circleStyle?: StyleProp<ViewStyle>;
    circleSize?: number;
    circleIsScale?: boolean;
    circleMaxScale?: number;
    CustomCircle?: ReactElement;
    initValue?: number;
    name?: string;
    theme?: string;
    themes?: SliderThemesObject;
    onValueChange?: (value: number) => void;
  };

export type SliderSetValueOpotion = {
  animated?: boolean;
};

export type SliderHandler = {
  getValue: () => number;
  setValue?: (value: number, options?: SliderSetValueOpotion) => void;
  containerRef: View | null;
};

export type SliderTheme = {
  style?: StyleProp<ViewStyle>;
  trackStyle?: StyleProp<ViewStyle>;
  circleStyle?: StyleProp<ViewStyle>;
  circleSize?: number;
};
export type SliderThemesObject = {
  [name: string]: SliderTheme;
};
