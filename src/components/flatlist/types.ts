import { ReactElement } from "react";
import { FlatListProps } from "react-native";

export type DefaultEmptyProps = { text: string };

export type FlatListTheme = {
  style?: FlatListProps<any>["style"];
  indicatorStyle?: FlatListProps<any>["indicatorStyle"];
  contentContainerStyle?: FlatListProps<any>["contentContainerStyle"];
  columnWrapperStyle?: FlatListProps<any>["columnWrapperStyle"];
  ListFooterComponentStyle?: FlatListProps<any>["ListFooterComponentStyle"];
  ListHeaderComponentStyle?: FlatListProps<any>["ListHeaderComponentStyle"];
};

export type FlatListThemesObject = {
  [name: string]: FlatListTheme;
};
export interface TFlatListProps<TItem> extends FlatListProps<TItem> {
  loading?: boolean;
  onRefresh?: () => void;
  LoadinComponent?: ReactElement;
  useRefreshControl?: boolean;
  emptyComponenText?: string;
  theme?: string;
  themes?: FlatListThemesObject;
}

export type TItem = any | null | undefined;
