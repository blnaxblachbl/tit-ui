import {ReactNode} from 'react';
import {
  GestureResponderEvent,
  StyleProp,
  TextStyle,
  ViewStyle,
  ActivityIndicatorProps,
} from 'react-native';

export type RepresentColor =
  | 'red'
  | 'orange'
  | 'yellow'
  | 'lime'
  | 'green'
  | 'blue'
  | 'purple';

export type TagProps = {
  text: string;
  onPress?: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  color?: RepresentColor;
  Left?: ReactNode;
  Right?: ReactNode;
  loading?: boolean;
  loadingProps?: ActivityIndicatorProps;
};
