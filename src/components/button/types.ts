import { ReactNode } from "react";
import {
  StyleProp,
  ViewStyle,
  GestureResponderEvent,
  TextStyle,
} from "react-native";

export type ButtonProps = {
  style?: StyleProp<ViewStyle>;
  onPress?: (event: GestureResponderEvent) => void;
  text?: string;
  loading?: boolean;
  textStyle?: StyleProp<TextStyle>;
  loadingColor?: string;
  children?: ReactNode;
  type?: string;
};
