import { Check } from 'phosphor-react-native';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { styles } from './styles';
import { colors } from "@/styles/colors";

export function ConfirmButton({ ...rest }: TouchableOpacityProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.container}
      {...rest}
    >
      <Text style={styles.title}>
        Confirmar
      </Text>

      <Check
        color={colors.white}
        weight="bold"
        size={24}
      />
    </TouchableOpacity>
  );
}