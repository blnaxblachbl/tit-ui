import {
  ImageSourcePropType,
  StyleProp,
  ViewStyle,
  ImageProps,
  ImageStyle,
  TextStyle,
} from "react-native";

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

export type AvatarProps = {
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
