import { useWindowDimensions } from "react-native";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withSequence, withTiming } from "react-native-reanimated";
import { BlurMask, Canvas, Rect } from "@shopify/react-native-skia"
import { colors } from "@/styles/colors";
import { useEffect } from "react";

const STATUS = ["transparent", colors.brand_light, colors.danger_light]

type Props = {
    status: number
}

export function OverlayFeedback({ status }: Props) {
    const opacity = useSharedValue(0);

    const { height, width } = useWindowDimensions();

    const styleAnimated = useAnimatedStyle(() => {
        return {
            opacity: opacity.value
        }
    })
    
    const color = STATUS[status];
    
    useEffect(() => {
        opacity.value = withSequence(withTiming(1, { duration: 400, easing: Easing.bounce }), withTiming(0))
    }, [status])

    return (
        <Animated.View style={[{ height, width, position: "absolute" }, styleAnimated]}>
            <Canvas style={{ flex: 1 }} >
                <Rect
                    x={0}
                    y={0}
                    width={width}
                    height={height}
                    color={color}
                />
                <BlurMask blur={50} style="inner" />
            </Canvas>

        </Animated.View>
    )
}