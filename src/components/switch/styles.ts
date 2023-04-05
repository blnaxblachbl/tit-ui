import { StyleSheet } from "react-native";

import { normalize } from "../../functions/normalize";

export const styles = StyleSheet.create({
  switchContainerStyle: {
    width: 55,
    borderRadius: 25,
    padding: 4,
    justifyContent: "center",
  },
  switchCircleStyle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#fff", // rgb(102,134,205)
    alignItems: "center",
    justifyContent: "center",
  },
  switchTextStyle: {
    color: "#000",
    fontSize: normalize(14),
    fontWeight: "bold",
  },
});
