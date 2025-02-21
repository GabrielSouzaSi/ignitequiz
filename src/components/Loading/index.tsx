import { ActivityIndicator, View } from "react-native";
import { colors } from "@/styles/colors";

import { styles } from "./styles";

export function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={colors.brand_light} />
    </View>
  );
}