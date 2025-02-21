import { View } from 'react-native';

import { colors } from "@/styles/colors";
import { styles } from './styles';

const LEVEL_COLORS = [
  colors.brand_light,
  colors.warning_light,
  colors.danger_light,
];

type Props = {
  level: number;
}

export function LevelBars({ level }: Props) {
  const backgroundColor = LEVEL_COLORS[level - 1];

  return (
    <View style={styles.bars}>
      <View style={[styles.level, styles.level1, { backgroundColor }]} />
      <View style={[styles.level, styles.level2, level > 1 && { backgroundColor }]} />
      <View style={[styles.level, styles.level3, level > 2 && { backgroundColor }]} />
    </View>
  );
}