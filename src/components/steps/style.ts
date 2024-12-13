import { StyleSheet } from "react-native";
import { colors, fontFamily} from "@/styles/theme"

export const s = StyleSheet.create({
  container: {
    gap: 40,
    flex: 1
  },
  title: {
    fontSize: 16,
    fontFamily: fontFamily.regular,
    color: colors.gray[500]
  }
})
