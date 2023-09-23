import { ReactElement } from 'react';
import {
  StyleProp,
  ViewStyle,
  TextStyle,
  PressableProps,
  ActivityIndicatorProps,
} from 'react-native';

export type ButtonTheme = {
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  loadingColor?: ActivityIndicatorProps['color'];
  loadingSize?: ActivityIndicatorProps['size'];
};

export type ButtonThemesObject = {
  [name: string]: ButtonTheme;
};

export type ButtonProps = PressableProps & {
  text?: string;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabledStyle?: StyleProp<ViewStyle>;
  disabledTextStyle?: StyleProp<TextStyle>;
  loadingColor?: ActivityIndicatorProps['color'];
  loadingSize?: ActivityIndicatorProps['size'];
  theme?: string;
  themes?: ButtonThemesObject;
  Left?: ReactElement;
  Right?: ReactElement;
};
