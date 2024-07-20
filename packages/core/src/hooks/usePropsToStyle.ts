import { useMemo } from "react";
import { StyleProp, TextStyle, ViewStyle } from "react-native";

import {
  propsToStyle,
  extractStyleProps,
  StyleInProps as _StyleInProps,
} from "../functions/propsToStyle";

export type StyleInProps = _StyleInProps;

export const usePropsToStyle = (
  props: object
): {
  textStyles: StyleProp<TextStyle>;
  viewStyles: StyleProp<ViewStyle>;
} => {
  return useMemo(() => {
    return propsToStyle(extractStyleProps(props));
  }, [extractStyleProps(props)]);
};
