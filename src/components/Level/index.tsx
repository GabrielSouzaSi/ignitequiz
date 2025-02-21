import { TouchableOpacity, TouchableOpacityProps, Text, View } from 'react-native';

import { colors } from "@/styles/colors";
import { styles } from './styles';

const TYPE_COLORS = {
  EASY: colors.brand_light,
  HARD: colors.danger_light,
  MEDIUM: colors.warning_light,
}

type Props = TouchableOpacityProps & {
  title: string;
  isChecked?: boolean;
  type?: keyof typeof TYPE_COLORS;
}

export function Level({ title, type = 'EASY', isChecked = false, ...rest }: Props) {

  const COLOR = TYPE_COLORS[type];

  return (
    <TouchableOpacity {...rest}>
      <View style={
        [
          styles.container,
          { borderColor: COLOR, backgroundColor: isChecked ? COLOR : 'transparent' }
        ]
      }>
        <Text style={
          [
            styles.title,
            { color: isChecked ? colors.grey[100] : COLOR }
          ]}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}