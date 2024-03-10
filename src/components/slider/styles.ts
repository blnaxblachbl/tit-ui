import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    height: 5,
    justifyContent: "center",
    width: "100%",
  },
  track: {
    flexDirection: "row",
    alignItems: "center",
    height: 5,
    backgroundColor: "#4666ff",
    borderRadius: 2,
    position: "relative",
  },
  circleContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    alignSelf: "center",
  },
  circle: {
    borderRadius: 15,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#000",
  },
});
