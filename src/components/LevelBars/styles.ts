import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';

export const styles = StyleSheet.create({
  bars: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  level: {
    width: 4,
    backgroundColor: colors.grey[500],
    borderRadius: 6,
    marginLeft: 4
  },
  level1: {
    height: 6,
  },
  level2: {
    height: 12,
  },
  level3: {
    height: 20,
  },
});