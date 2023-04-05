import { ImageProps, StyleProp, ImageStyle, ViewStyle } from "react-native";

export type Point = [number, number];

export interface TImageProps extends ImageProps {
  canScale?: boolean;
  showLoading?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  loadingContainerStyle?: StyleProp<ViewStyle>;
  loadingColor?: string;
  loadingSize?: number | "large" | "small" | undefined;
}
