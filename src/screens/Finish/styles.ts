import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.grey[800],
    padding: 32
  },
  message: {
    alignItems: 'center',
    marginBottom: 80,
  },
  title: {
    color: colors.grey[100],
    fontFamily: "Roboto_700Bold",
    fontSize: 24,
    marginTop: 41
  },
  subtitle: {
    color: colors.grey[100],
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    marginTop: 8
  },
});