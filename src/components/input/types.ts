import { RefObject, ReactNode } from "react";
import {
  TextInputProps,
  StyleProp,
  TextStyle,
  ViewStyle,
  TextInput,
  View,
} from "react-native";

export interface InputProps extends TextInputProps {
  containerStyle?: StyleProp<ViewStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<ViewStyle>;
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
}

export type InputHandler = {
  inputRef: RefObject<TextInput>;
  containerRef: RefObject<View>;
  focused: boolean;
  value: string;
  setValue: (text: string) => void;
};
