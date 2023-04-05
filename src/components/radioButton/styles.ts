import { StyleSheet } from "react-native";

import { normalize } from "../../functions/normalize";

export const styles = StyleSheet.create({
  container: {
    flexWrap: "nowrap",
    flexDirection: "row",
    width: "100%",
  },
  radioButton: {
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#494043",
    marginRight: 6,
  },
  radioText: {
    flex: 1,
    fontSize: normalize(14),
    color: "#494043",
    textAlignVertical: "top",
  },
  radioCircle: {
    width: 12,
    height: 12,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    backgroundColor: "#FF004A",
  },
});
