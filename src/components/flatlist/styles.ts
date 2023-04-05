import { StyleSheet } from "react-native";

import { normalize } from "../../functions/normalize";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  contentContainer: {
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
  },
  defaultEmptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    width: "100%",
  },
  defaultEmptyText: {
    fontSize: normalize(14),
    textAlign: "center",
    color: "#ccc",
  },
});
