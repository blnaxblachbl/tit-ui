import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
    flexDirection: "row",
    backgroundColor: `#fafafa`,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#d9d9d9",
    marginRight: 6,
    marginBottom: 6,
  },
  text: {
    fontSize: 14,
    color: "#1e1e1e",
    marginTop: -3,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: 0,
    zIndex: 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fafafa",
  },
  red: {
    backgroundColor: "#fff1f0",
    borderWidth: 1,
    borderColor: "#ffa39e",
  },
  redText: {
    color: "#cf1322",
  },
  orange: {
    backgroundColor: "#fff7e6",
    borderWidth: 1,
    borderColor: "#ffd591",
  },
  orangeText: {
    color: "#d46b08",
  },
  yellow: {
    backgroundColor: "#fffbe6",
    borderWidth: 1,
    borderColor: "#ffe58f",
  },
  yellowText: {
    color: "#d48806",
  },
  lime: {
    backgroundColor: "#fcffe6",
    borderWidth: 1,
    borderColor: "#eaff8f",
  },
  limeText: {
    color: "#7cb305",
  },
  green: {
    backgroundColor: "#f6ffed",
    borderWidth: 1,
    borderColor: "#b7eb8f",
  },
  greenText: {
    color: "#389e0d",
  },
  blue: {
    backgroundColor: "#e6f4ff",
    borderWidth: 1,
    borderColor: "#91caff",
  },
  blueText: {
    color: "#0958d9",
  },
  purple: {
    backgroundColor: "#f9f0ff",
    borderWidth: 1,
    borderColor: "#d3adf7",
  },
  purpleText: {
    color: "#531dab",
  },
});
