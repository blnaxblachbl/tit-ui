import React, { useMemo, forwardRef } from "react";
import { FlatList as List, RefreshControl, View, Text } from "react-native";

import { styles } from "./styles";
import { DefaultEmptyProps, TFlatListProps, TItem } from "./types";

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
      indicatorStyle,
      columnWrapperStyle,
      ListFooterComponentStyle,
      ListHeaderComponentStyle,
      LoadinComponent = null,
      useRefreshControl = true,
      emptyComponenText = "There is nothing here",
      ListEmptyComponent = <DefaultEmpty text={emptyComponenText} />,
      theme,
      themes = {},
      ...props
    },
    ref
  ) => {
    const _theme = useMemo(() => themes[theme], [theme, themes]);
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
    }, [loading, LoadinComponent, ListEmptyComponent, DefaultEmpty]);

    const _contentContainerStyle = useMemo(
      () => [
        styles.contentContainer,
        data?.length === 0 ? styles.emptyContainer : undefined,
        _theme?.contentContainerStyle,
        contentContainerStyle,
      ],
      [data, contentContainerStyle, _theme]
    );

    return (
      <List
        ref={ref}
        data={data}
        style={[styles.container, _theme?.style, style]}
        contentContainerStyle={_contentContainerStyle}
        indicatorStyle={indicatorStyle || _theme?.indicatorStyle}
        columnWrapperStyle={(_theme?.columnWrapperStyle, columnWrapperStyle)}
        ListFooterComponentStyle={[
          _theme?.ListFooterComponentStyle,
          ListFooterComponentStyle,
        ]}
        ListHeaderComponentStyle={[
          _theme?.ListHeaderComponentStyle,
          ListHeaderComponentStyle,
        ]}
        refreshControl={refreshControl}
        ListEmptyComponent={Empty}
        {...props}
      />
    );
  }
);
