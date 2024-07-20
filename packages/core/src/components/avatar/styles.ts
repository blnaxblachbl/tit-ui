import { StyleSheet } from "react-native";

import { normalize } from "../../functions/normalize";

export const styles = StyleSheet.create({
  container: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#bdbdbd",
  },
  letter: {
    fontSize: normalize(30),
    fontWeight: "bold",
    color: "#ffffff",
  },
  badge: {
    position: "absolute",
    bottom: 2,
    right: -2,
  },
});
