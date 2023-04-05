import { ReactNode } from "react";
import { StyleProp, ViewStyle } from "react-native";

export type AnyObject = { [name: string]: any };

export type FormProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  onSubmit: (args: { data: object | null; errors: object | null }) => void;
  initValues: AnyObject | undefined;
};

export type FormHandler = {
  submit: () => void;
};
