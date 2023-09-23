import { RefObject, ReactNode, ReactElement } from "react";
import {
  VirtualizedListProps,
  ListRenderItemInfo,
  StyleProp,
  ViewStyle,
  TextStyle,
  View,
} from "react-native";

type DataObject = {
  value: string;
  title: string;
};

// type Modify<T, R> = Omit<T, keyof R> & R;

export type Data = DataObject | string;

export interface TListRenderItem extends ListRenderItemInfo<Data> {
  selected?: boolean;
  onPick?: (data: Data) => void;
}

export interface ListProps
  extends Omit<VirtualizedListProps<Data>, "renderItem"> {
  pickItem: (data: Data) => void;
  reverse?: boolean;
  _value?: Data;
  selectedItemStyle?: StyleProp<TextStyle>;
  emptyText?: string;
  itemStyle?: StyleProp<TextStyle>;
  _theme?: PickerTheme;
  renderItem?: (data: TListRenderItem) => ReactElement;
}

export type PickerProps = {
  containerStyle?: StyleProp<ViewStyle>;
  pickerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  noteStyle?: StyleProp<TextStyle>;
  textStyle?: StyleProp<TextStyle>;
  placeholderTextColor?: string;
  value?: Data;
  onPick?: (data: Data) => void;
  data?: Data[];
  placeholder?: string;
  label?: string;
  initValue?: Data;
  note?: string;
  onOpen?: () => void;
  onClose?: () => void;
  Left?: ReactNode;
  Right?: ReactNode;
  listProps?: ListProps;
  required?: boolean;
  requiredTextStyle?: StyleProp<TextStyle>;
  requiredText?: string;
  name?: string;
  theme?: string;
  themes?: PickerThemesObject;
};

export type PickerTheme = {
  containerStyle?: StyleProp<ViewStyle>;
  pickerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  noteStyle?: StyleProp<TextStyle>;
  textStyle?: StyleProp<TextStyle>;
  requiredTextStyle?: StyleProp<TextStyle>;
  placeholderTextColor?: string;
  listStyles?: {
    style?: StyleProp<ViewStyle>;
    contentContainerStyle?: StyleProp<ViewStyle>;
    selectedItemStyle?: StyleProp<TextStyle>;
    itemStyle?: StyleProp<TextStyle>;
  };
};
export type PickerThemesObject = {
  [name: string]: PickerTheme;
};

export type PickerHandler = {
  value: Data;
  setValue: (value: Data) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
  containerRef: RefObject<View>;
};
