import { StyleSheet } from "react-native";
import { colors, fontFamily } from "@/styles/theme";

export const s = StyleSheet.create({
  container: {
    backgroundColor: colors.green.light,
    borderRadius: 10,
    height: 56,
    maxHeight: 56,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  title:{
    color: "white",
    fontFamily: fontFamily.bold,
    fontSize: 16,
    shadowColor: colors.green.soft
  }
})