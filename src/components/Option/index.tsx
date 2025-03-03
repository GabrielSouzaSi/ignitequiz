import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Canvas, Skia, Path } from '@shopify/react-native-skia';
import { styles } from './styles';
import { colors } from '@/styles/colors';

type Props = TouchableOpacityProps & {
  checked: boolean;
  title: string;
}

const CHECK_SIZE = 28;
const CHECK_STROKE = 2;

export function Option({ checked, title, ...rest }: Props) {

  const RADIUS = (CHECK_SIZE - CHECK_STROKE) / 2;
  const path = Skia.Path.Make();
  path.addCircle(CHECK_SIZE, CHECK_SIZE, RADIUS);
  return (
    <TouchableOpacity
      style={
        [
          styles.container,
          checked && styles.checked
        ]
      }
      {...rest}
    >
      <Text style={styles.title}>
        {title}
      </Text>
      <Canvas style={{ width: CHECK_SIZE * 2, height: CHECK_SIZE * 2 }}>
        <Path path={path} color={colors.grey[500]} style="stroke" strokeWidth={CHECK_STROKE} />
        <Path path={path} color={colors.brand_light} style="stroke" strokeWidth={CHECK_STROKE} start={0} end={0.4} />
      </Canvas>
    </TouchableOpacity>
  );
}