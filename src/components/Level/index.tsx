import { Pressable, PressableProps, Text } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, interpolateColor } from "react-native-reanimated";

import { colors } from "@/styles/colors";
import { styles } from './styles';
import { useEffect } from 'react';

const PressableAnimated = Animated.createAnimatedComponent(Pressable);

const TYPE_COLORS = {
  EASY: colors.brand_light,
  HARD: colors.danger_light,
  MEDIUM: colors.warning_light,
}

type Props = PressableProps & {
  title: string;
  isChecked?: boolean;
  type?: keyof typeof TYPE_COLORS;
}

export function Level({ title, type = 'EASY', isChecked = false, ...rest }: Props) {
  const scale = useSharedValue(1);
  const checked = useSharedValue(1);

  const COLOR = TYPE_COLORS[type];

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      backgroundColor: interpolateColor(
        checked.value,
        [0, 1],
        ["transparent", COLOR]
      )
    }
  })
  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      color: interpolateColor(
        checked.value,
        [0, 1],
        [COLOR, colors.grey[100]]
      )
    }
  })

  function onPressIn() {
    scale.value = withTiming(1.2)
  }
  function onPressOut() {
    scale.value = withTiming(1)
  }

  useEffect(() => {
    checked.value = withTiming(isChecked ? 1 : 0)
  }, [isChecked])

  return (
    <PressableAnimated onPressIn={onPressIn} onPressOut={onPressOut} style={
      [
        styles.container,
        { borderColor: COLOR },
        animatedContainerStyle,
      ]
    } {...rest}>
      <Animated.Text style={
        [
          styles.title,
          animatedTextStyle
        ]}>
        {title}
      </Animated.Text>
    </PressableAnimated>
  );
}