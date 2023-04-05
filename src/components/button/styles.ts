import { StyleSheet } from "react-native";

import { normalize } from "../../functions/normalize";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#4666ff",
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: 12,
    height: normalize(42),
  },
  text: {
    color: "#FFFFFF",
  },
});
