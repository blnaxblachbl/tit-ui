import { ReactNode } from "react";
import { StyleProp, ViewStyle } from "react-native";

export type AnyObject = { [name: string]: any };

export type FormSubmitArgs<T> = {
  data: T | null;
  errors: Errors<T> | null;
};

export type FormProps<T> = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  onSubmit: (args: FormSubmitArgs<T>) => void;
  initValues: T | undefined;
  theme?: string;
  themes?: FormThemesObject;
};

export type FormHandler = {
  submit: () => void;
};

export type Errors<T> = {
  [K in keyof T]?: string;
};

export type FormTheme = {
  style?: StyleProp<ViewStyle>;
};

export type FormThemesObject = {
  [name: string]: FormTheme;
};
