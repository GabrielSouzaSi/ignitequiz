import { StyleSheet } from 'react-native';

import { colors } from '@/styles/colors';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 21,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 40,
  },
  title: {
    fontFamily: "Roboto_700Bold",
    color: colors.grey[100],
    fontSize: 16,
  },
  question: {
    color: '#C4C4CC'
  },
  length: {
    color: '#C4C4CC'
  },
});