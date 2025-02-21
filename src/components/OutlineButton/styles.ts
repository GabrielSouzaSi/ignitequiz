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
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.brand_mid,
    marginRight: 16,
  },
  title: {
    color: colors.brand_mid,
    fontFamily: 'Roboto_700Bold',
    fontSize: 16
  }
});