import {
  ImageSourcePropType,
  StyleProp,
  ViewStyle,
  ImageProps,
  ImageStyle,
  TextStyle,
} from "react-native";

export type AvatarProps = {
  source?: ImageSourcePropType;
  nameString?: string;
  onPress?: () => void;
  badge?: number;
  style?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  badgeStyle?: StyleProp<ViewStyle>;
  badgeTextStyle?: StyleProp<TextStyle>;
  imageProps?: ImageProps;
  letterStyle?: StyleProp<TextStyle>;
};
