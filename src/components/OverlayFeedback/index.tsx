import { useWindowDimensions } from "react-native";
import Animated from "react-native-reanimated";
import { BlurMask, Canvas, Rect } from "@shopify/react-native-skia"
import { colors } from "@/styles/colors";

const STATUS = ["transparent", colors.brand_light, colors.danger_light]

type Props = {
    status: number
}

export function OverlayFeedback({status}: Props) {
    const { height, width } = useWindowDimensions();

    const color = STATUS[status];

    return (
        <Animated.View style={{ height, width, position: "absolute" }}>
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