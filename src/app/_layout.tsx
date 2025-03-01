import "@/styles/global.css";
import { Stack } from "expo-router"
import { StatusBar, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto"

import { Loading } from "@/components/Loading"
import { colors } from "@/styles/colors"

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  })

  if (!fontsLoaded) {
    return <Loading />
  }

  return (
    <GestureHandlerRootView className="flex-1 bg-gray-900">
        <StatusBar className="bg-gray-900" barStyle="light-content" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: colors.grey[800] },
          }}
        />
    </GestureHandlerRootView>
  )
}
