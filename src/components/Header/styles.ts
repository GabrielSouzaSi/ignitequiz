import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.grey[600],
    paddingHorizontal: 32,
    paddingVertical: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    color: colors.grey[100],
    fontFamily: "Roboto_700Bold",
  },
  subtitle: {
    fontSize: 14,
    color: colors.grey[100],
    fontFamily: "Roboto_400Regular",
  },
  history: {
    width: 44,
    height: 44,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.grey[800]
  }
});