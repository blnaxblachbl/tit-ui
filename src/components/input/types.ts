import { ReactNode } from "react";
import {
  TextInputProps,
  StyleProp,
  TextStyle,
  ViewStyle,
  TextInput,
  View,
} from "react-native";
import { StyleInProps } from "../../functions/propsToStyle";

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
export type InputProps = TextInputProps &
  StyleInProps & {
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
  };

export type InputHandler = {
  inputRef: TextInput | null;
  containerRef: View | null;
  inputContainerRef: View | null;
  setValue: (text: string) => void;
  getValue: () => string;
};
