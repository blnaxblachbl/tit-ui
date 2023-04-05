import {
  ReactNode,
  ReactElement,
  ComponentType,
  JSXElementConstructor,
} from "react";
import { FlatListProps } from "react-native";

export type DefaultEmptyProps = { text: string };

export interface TFlatListProps<TItem> extends FlatListProps<TItem> {
  loading?: boolean;
  onRefresh?: () => void;
  LoadinComponent?: ReactNode | null;
  useRefreshControl?: boolean;
  emptyComponenText?: string;
}

export type TItem = any | null | undefined;

export type EmptyComponentType =
  | ReactElement<any, string | JSXElementConstructor<any>>
  | ComponentType<any>
  | null
  | undefined;
