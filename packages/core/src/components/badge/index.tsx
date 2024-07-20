import React, { forwardRef, useMemo } from "react";
import { View, Text } from "react-native";

import { styles } from "./styles";
import { BadgeProps } from "./types";
import { usePropsToStyle } from "../../hooks/usePropsToStyle";

export * from "./types";

export const Badge = forwardRef<View, BadgeProps>(
  ({ style, textStyle, badge = 0, theme, themes = {}, ...props }, ref) => {
    const _theme = useMemo(() => themes[theme], [theme, themes]);
    const { viewStyles, textStyles } = usePropsToStyle(props);

    if (!badge) {
      return null;
    }

    return (
      <View ref={ref} style={[styles.badge, _theme?.style, style, viewStyles]}>
        <Text
          numberOfLines={1}
          style={[styles.badgeText, _theme?.textStyle, textStyle, textStyles]}
        >
          {badge > 99 ? "99+" : badge}
        </Text>
      </View>
    );
  }
);
