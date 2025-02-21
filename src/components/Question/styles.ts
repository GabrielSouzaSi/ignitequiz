import { Dimensions, StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';

const { width } = Dimensions.get('window');

const MARGIN_HORIZONTAL = 24 * 2;

export const styles = StyleSheet.create({
  container: {
    width: width - MARGIN_HORIZONTAL,
    backgroundColor: colors.grey[700],
    borderRadius: 12,
    padding: 22,
  },
  title: {
    fontFamily: 'Roboto_700Bold',
    color: colors.white,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 18
  },
});