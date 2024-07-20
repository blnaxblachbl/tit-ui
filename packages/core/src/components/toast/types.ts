import { ReactNode } from "react";
import { StyleProp, TextStyle, ViewStyle } from "react-native";

export enum DefaultThems {
  Error = "error",
  Info = "info",
  Warning = "warning",
  Success = "success",
}

export type ToastTheme = {
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  titleStyle?: StyleProp<TextStyle>;
};

export type ToastThemes = {
  [name: string]: ToastTheme;
};

export type ToastMessage = ToastTheme & {
  id: number;
  text: string;
  duration?: number | "infinite";
  title?: string;
  closeOnTap?: boolean;
};

export type ToastProps = ToastTheme & {
  maxToShow?: number;
  duration?: number | "infinite";
  themes?: ToastThemes;
  renderToast?: (props: RenderToastProps) => ReactNode;
};

export type ToastHandler = {
  showToast: (options: MessageOption) => number;
};

export type MessgeProps = ToastMessage & {
  renderToast?: (props: MessgeProps) => ReactNode;
  removeToast: (id: number) => void;
  index: number;
};

export type RenderToastProps = ToastMessage & {
  removeToast: (id: number) => void;
  index: number;
};

export type MessageOption = {
  text: string;
  title?: string;
  theme?: string;
  duration?: number | "infinite";
  closeOnTap?: boolean;
  renderToast?: (props: RenderToastProps) => ReactNode;
};
