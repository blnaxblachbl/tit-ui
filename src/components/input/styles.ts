import { StyleSheet } from "react-native";

import { normalize } from "../../functions/normalize";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  inputContainer: {
    width: "100%",
    borderRadius: 6,
    paddingHorizontal: normalize(12),
    backgroundColor: "#fff",
    height: normalize(42),
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#A9A9A9",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    flex: 1,
    fontSize: normalize(14),
    height: "100%",
  },
  label: {
    marginBottom: 6,
    fontSize: normalize(12),
    fontWeight: "bold",
    color: "#3c4043",
    width: "100%",
  },
  note: {
    fontSize: normalize(12),
    color: "#3c4043",
    width: "100%",
  },
  required: {
    fontSize: 12,
    color: "red",
    letterSpacing: 3,
  },
});
