import React, { ForwardedRef, forwardRef, RefObject, useMemo } from "react";
import {
  View,
  StyleSheet,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";

import { normalize } from "../../functions/normalize";

export type BadgeProps = {
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  badge: number;
};

const Badge = forwardRef<View, BadgeProps>(
  ({ style, textStyle, badge = 0 }, ref) => {
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
      <View ref={ref} style={[styles.badge, style]}>
        <Text numberOfLines={1} style={[styles.badgeText, textStyle]}>
          {_badge}
        </Text>
      </View>
    );
  }
);

export default Badge;

const styles = StyleSheet.create({
  badge: {
    minWidth: 25,
    height: 25,
    backgroundColor: "#fd1a0b",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
  },
  badgeText: {
    color: "#ffffff",
    fontSize: normalize(12),
    fontWeight: "bold",
    maxWidth: 70,
  },
});
