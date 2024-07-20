import { StyleSheet } from "react-native";

import { normalize } from "../../functions/normalize";
import { hexToRgba } from "../../functions/hexToRgba";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  picker: {
    width: "100%",
    flexDirection: "row",
    borderRadius: 6,
    backgroundColor: "#fff",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D3D3D3",
    height: normalize(42),
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
  list: {
    width: "100%",
    maxHeight: 200,
    position: "absolute",
    opacity: 0,
    borderWidth: 1,
    borderColor: "#D3D3D3",
    borderRadius: 6,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  listContainer: {
    alignItems: "stretch",
  },
  value: {
    flex: 1,
    color: "#000",
    paddingHorizontal: normalize(12),
  },
  listItemText: {
    minHeight: normalize(42),
    textAlignVertical: "center",
    paddingHorizontal: normalize(12),
  },
  selectedItem: {
    backgroundColor: hexToRgba("#4666ff", 0.2),
    fontWeight: "bold",
  },
  required: {
    fontSize: 12,
    color: "red",
    letterSpacing: 3,
  },
});
