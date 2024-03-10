import {
  ImageProps,
  StyleProp,
  ImageStyle,
  ViewStyle,
  ActivityIndicatorProps,
} from "react-native";
import { StyleInProps } from "../../functions/propsToStyle";

export type Point = [number, number];

export type TImageTheme = {
  imageStyle?: StyleProp<ImageStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  loadingContainerStyle?: StyleProp<ViewStyle>;
  loadingColor?: string;
  loadingSize?: ActivityIndicatorProps["size"];
};

export type TImageThemesObject = {
  [name: string]: TImageTheme;
};
export type TImageProps = ImageProps &
  StyleInProps & {
    canScale?: boolean;
    showLoading?: boolean;
    containerStyle?: StyleProp<ViewStyle>;
    imageStyle?: StyleProp<ImageStyle>;
    loadingContainerStyle?: StyleProp<ViewStyle>;
    loadingColor?: string;
    loadingSize?: ActivityIndicatorProps["size"];
    theme?: string;
    themes?: TImageThemesObject;
  };
