import { Dimensions, StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';

const dimensions = Dimensions.get('window');

const CARDS_PER_ROW = 2;
const HORIZONTAL_PADDING_SCREEN = 32 * 2;
const MARGIN = 6 * 2;

const CARD_WIDTH = (dimensions.width - HORIZONTAL_PADDING_SCREEN - MARGIN) / CARDS_PER_ROW;

export const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    height: 169,
    backgroundColor: colors.grey[700],
    borderRadius: 6,
    padding: 16,
    margin: MARGIN,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 6,
    backgroundColor: colors.grey[600],
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Roboto_400Regular",
    color: colors.grey[100],
    marginTop: 24
  },
});