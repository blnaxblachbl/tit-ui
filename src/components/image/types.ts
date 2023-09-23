import {
  ImageProps,
  StyleProp,
  ImageStyle,
  ViewStyle,
  ActivityIndicatorProps,
} from "react-native";

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
export interface TImageProps extends ImageProps {
  canScale?: boolean;
  showLoading?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  loadingContainerStyle?: StyleProp<ViewStyle>;
  loadingColor?: string;
  loadingSize?: ActivityIndicatorProps["size"];
  theme?: string;
  themes?: TImageThemesObject;
}
