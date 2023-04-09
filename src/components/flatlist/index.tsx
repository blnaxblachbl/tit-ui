import React, { useMemo, forwardRef } from "react";
import { FlatList as List, RefreshControl, View, Text } from "react-native";

import { styles } from "./styles";
import {
  DefaultEmptyProps,
  TFlatListProps,
  TItem,
  EmptyComponentType,
} from "./types";

export * from "./types";

const DefaultEmpty = ({ text }: DefaultEmptyProps) => {
  return (
    <View style={styles.defaultEmptyContainer}>
      <Text style={styles.defaultEmptyText}>{text}</Text>
    </View>
  );
};

export const FlatList = forwardRef<List, TFlatListProps<TItem>>(
  (
    {
      data = [],
      loading = false,
      onRefresh = () => {},
      style,
      contentContainerStyle,
      LoadinComponent = null,
      useRefreshControl = true,
      emptyComponenText = "There is nothing here",
      ListEmptyComponent = <DefaultEmpty text={emptyComponenText} />,
      ...props
    },
    ref
  ) => {
    const refreshControl = useMemo(() => {
      if (useRefreshControl) {
        return <RefreshControl refreshing={loading} onRefresh={onRefresh} />;
      }
      return undefined;
    }, [useRefreshControl, loading, onRefresh]);

    const Empty = useMemo(() => {
      if (loading) {
        return LoadinComponent;
      }
      return ListEmptyComponent;
    }, [
      loading,
      LoadinComponent,
      ListEmptyComponent,
      DefaultEmpty,
    ]) as EmptyComponentType;

    const _contentContainerStyle = useMemo(
      () => [
        styles.contentContainer,
        data?.length === 0 ? styles.emptyContainer : undefined,
        contentContainerStyle,
      ],
      [data, contentContainerStyle]
    );

    return (
      <List
        ref={ref}
        data={data}
        style={[styles.container, style]}
        contentContainerStyle={_contentContainerStyle}
        refreshControl={refreshControl}
        ListEmptyComponent={Empty}
        {...props}
      />
    );
  }
);
