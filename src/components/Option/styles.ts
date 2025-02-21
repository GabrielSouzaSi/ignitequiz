import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: 76,
    backgroundColor: colors.grey[800],
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    marginBottom: 12,
  },
  title: {
    color: colors.grey[100],
    fontFamily: 'Roboto_400Regular',
    fontSize: 14,
    marginRight: 32,
    flex: 1,
  },
  checked: {
    borderWidth: 1,
    borderColor: colors.brand_light
  }
});