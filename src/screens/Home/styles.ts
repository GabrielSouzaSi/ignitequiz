import { StyleSheet } from 'react-native';

import { colors } from '@/styles/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grey[800],
    alignItems: 'center'
  },
  levels: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 32
  },
  cards: {
    paddingTop: 32,
  }
});