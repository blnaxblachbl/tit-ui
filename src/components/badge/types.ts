import { StyleProp, TextStyle, ViewStyle } from "react-native";

export type BadgeTheme = {
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export type BadgeThemesObject = {
  [name: string]: BadgeTheme;
};

export type BadgeProps = {
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  badge: number;
  theme?: string;
  themes?: BadgeThemesObject;
};
