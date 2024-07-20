import {
  ImageSourcePropType,
  StyleProp,
  ViewStyle,
  ImageProps,
  ImageStyle,
  TextStyle,
} from "react-native";
import { StyleInProps } from "../../functions/propsToStyle";

export type AvatarTheme = {
  style?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  badgeStyle?: StyleProp<ViewStyle>;
  badgeTextStyle?: StyleProp<TextStyle>;
  letterStyle?: StyleProp<TextStyle>;
};

export type AvatarThemesObject = {
  [name: string]: AvatarTheme;
};

export type AvatarProps = StyleInProps & {
  source?: ImageSourcePropType;
  nameString?: string;
  onPress?: () => void;
  badge?: number;
  style?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  badgeStyle?: StyleProp<ViewStyle>;
  badgeTextStyle?: StyleProp<TextStyle>;
  letterStyle?: StyleProp<TextStyle>;
  imageProps?: ImageProps;
  theme?: string;
  themes?: AvatarThemesObject;
};
