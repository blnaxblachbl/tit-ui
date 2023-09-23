import { RefObject, ReactNode, Ref } from "react";
import {
  TextInputProps,
  StyleProp,
  TextStyle,
  ViewStyle,
  TextInput,
  View,
} from "react-native";

export type InputTheme = {
  containerStyle?: StyleProp<ViewStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  labelStyle?: StyleProp<TextStyle>;
  noteStyle?: StyleProp<TextStyle>;
  requiredTextStyle?: StyleProp<TextStyle>;
  focusedBorderColor?: string;
  focusedLabelColor?: string;
};
export type InputThemesObject = {
  [name: string]: InputTheme;
};
export interface InputProps extends TextInputProps {
  containerStyle?: StyleProp<ViewStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  labelStyle?: StyleProp<TextStyle>;
  noteStyle?: StyleProp<TextStyle>;
  note?: string;
  label?: string;
  Left?: ReactNode;
  Right?: ReactNode;
  focusedBorderColor?: string;
  focusedLabelColor?: string;
  initValue?: string;
  required?: boolean;
  requiredTextStyle?: StyleProp<TextStyle>;
  requiredText?: string;
  name?: string;
  theme?: string;
  themes?: InputThemesObject;
}

export type InputHandler = {
  inputRef: TextInput;
  containerRef: View;
  focused: boolean;
  value: string;
  setValue: (text: string) => void;
};
