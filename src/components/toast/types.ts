import {ReactNode} from 'react';
import {StyleProp, TextStyle, ViewStyle} from 'react-native';

export enum DefaultThems {
  Error = 'error',
  Info = 'info',
  Warning = 'warning',
  Success = 'success',
}

export type Theme = {
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  titleStyle?: StyleProp<TextStyle>;
};

export type Themes = {
  [name: string]: Theme;
};

export type ToastMessage = Theme & {
  id: number;
  text: string;
  duration?: number | 'infinite';
  title?: string;
  closeOnTap?: boolean;
};

export type ToastProps = Theme & {
  maxToShow?: number;
  duration?: number | 'infinite';
  themes?: Themes;
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
  duration?: number | 'infinite';
  closeOnTap?: boolean;
  renderToast?: (props: RenderToastProps) => ReactNode;
};
