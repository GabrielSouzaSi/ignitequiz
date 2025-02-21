import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';

export const styles = StyleSheet.create({
  container: {
    width: 84,
    height: 35,
    borderRadius: 4,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 6
  },
  title: {
    textTransform: 'uppercase',
    fontSize: 14,
    fontFamily: "Roboto_700Bold",
    color: 'white'
  }
});