import { StyleSheet } from "react-native";

import { normalize } from "../../functions/normalize";

export const styles = StyleSheet.create({
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
