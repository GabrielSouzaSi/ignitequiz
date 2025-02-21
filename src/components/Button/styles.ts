import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 56,
    maxHeight: 56,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.brand_mid,
    marginHorizontal: 20
  },
  title: {
    color: colors.white,
    fontFamily: 'Roboto_700Bold',
    fontSize: 16
  }
});