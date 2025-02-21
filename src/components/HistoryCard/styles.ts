import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 90,
    borderRadius: 6,
    backgroundColor: colors.grey[700],
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  title: {
    color: colors.grey[100],
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
  },
  subtitle: {
    color: colors.grey[300],
    fontSize: 12
  }
});