import { StyleProp, TextStyle, ViewStyle } from "react-native";

export type BadgeProps = {
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  badge: number;
};
