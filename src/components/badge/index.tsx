import React, { forwardRef, useMemo } from "react";
import { View, Text } from "react-native";

import { styles } from "./styles";
import { BadgeProps } from "./types";

export * from "./types";

export const Badge = forwardRef<View, BadgeProps>(
  ({ style, textStyle, badge = 0, theme, themes = {} }, ref) => {
    const _theme = useMemo(() => themes[theme], [theme, themes]);

    const _badge = useMemo(() => {
      if (typeof badge == "number") {
        return badge > 99 ? "99+" : badge;
      }
      if (typeof badge === "string") {
        return badge;
      }
      return null;
    }, [badge]);

    if (!_badge) {
      return null;
    }

    return (
      <View ref={ref} style={[styles.badge, _theme?.style, style]}>
        <Text
          numberOfLines={1}
          style={[styles.badgeText, _theme?.textStyle, textStyle]}
        >
          {_badge}
        </Text>
      </View>
    );
  }
);
