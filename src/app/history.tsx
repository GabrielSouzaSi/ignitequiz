import { useEffect, useRef, useState } from 'react';
import { useRouter } from "expo-router";
import { View, ScrollView, Alert, Pressable, TouchableOpacity, FlatList } from 'react-native';
import Animated, { Easing, FadeIn, FadeOut, LinearTransition, SlideInRight, SlideOutRight } from 'react-native-reanimated';
import { HouseLine, Trash } from 'phosphor-react-native';
import Swipeable, { SwipeableMethods } from "react-native-gesture-handler/ReanimatedSwipeable";

import { Header } from '../components/Header';
import { HistoryCard, HistoryProps } from '../components/HistoryCard';

import { historyGetAll, historyRemove } from '../storage/quizHistoryStorage';
import { Loading } from '../components/Loading';
import { colors } from '@/styles/colors';

export default function History() {
  const [isLoading, setIsLoading] = useState(true);
  const [history, setHistory] = useState<HistoryProps[]>([]);

  const router = useRouter();

  const swipeableRef = useRef<SwipeableMethods | null>(null)

  async function fetchHistory() {
    const response = await historyGetAll();
    setHistory(response);
    setIsLoading(false);
  }

  async function remove(id: string) {
    await historyRemove(id);

    fetchHistory();
  }

  // function handleRemove(id: string) {
  //   remove(id)
  // }
  function handleRemove(id: string, index: number) {
    remove(id)
  }

  function closePreviousSwipeable(
    direction: "left" | "right",
    open: SwipeableMethods | null
  ) {
    // if (direction === "left") {
    //   console.warn("REMOVER")
    // }

    if (swipeableRef.current) {
      swipeableRef.current.close()
    }

    // Define o Swipeable atual como o aberto
    swipeableRef.current = open
  }

  useEffect(() => {
    fetchHistory();
  }, []);

  if (isLoading) {
    return <Loading />
  }

  return (
    <View className='flex-1 bg-gray-900'>
      <Header
        title="Histórico"
        subtitle={`Seu histórico de estudos${'\n'}realizados`}
        icon={HouseLine}
        onPress={() => router.back()}
      />

      {/* <ScrollView
        contentContainerStyle={{ padding: 32 }}
        showsVerticalScrollIndicator={false}
      >
        {
          history.map((item) => (
            <Animated.View key={item.id} layout={LinearTransition} >
              <TouchableOpacity
                onPress={() => handleRemove(item.id)}
              >
                <HistoryCard data={item} />
              </TouchableOpacity>
            </Animated.View>
          ))
        }
       </ScrollView> */}


      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        contentContainerClassName='p-8'
        renderItem={({ item, index }) => {

          let current: SwipeableMethods | null = null

          return (
            <Animated.View key={item.id} entering={SlideInRight} exiting={SlideOutRight} layout={LinearTransition}>
              <Swipeable
                ref={(swipeable) => (current = swipeable)}
                overshootLeft={false}
                containerStyle={{ width: "100%", height: 90, marginBottom: 12, backgroundColor: colors.grey[700], borderRadius: 6 }}
                renderLeftActions={() => (
                  <Pressable
                    className='w-[90px] h-[90px] rounded-md bg-red-500 items-center justify-center'
                    onPress={() => handleRemove(item.id, index)}
                  >
                    <Trash size={32} color={colors.grey[100]} />
                  </Pressable>
                )}
                onSwipeableWillOpen={(direction) =>
                  closePreviousSwipeable(direction, current)
                }
                leftThreshold={50}
              >

                <HistoryCard data={item} />

              </Swipeable>
            </Animated.View>
          )
        }}
        contentContainerStyle={{ gap: 14 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}