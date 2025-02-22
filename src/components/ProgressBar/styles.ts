import { colors } from '@/styles/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  track: {
    height: 8,
    width: '100%',
    borderRadius: 8,
    backgroundColor: colors.grey[500]
  },
  progress: {
    height: 8,
    backgroundColor: colors.brand_light,
    borderRadius: 8,
  }
});