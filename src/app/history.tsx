import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from "expo-router";
import { View, Alert, FlatList } from 'react-native';
import Animated, { LinearTransition, SlideInRight, SlideOutRight } from 'react-native-reanimated';
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

  // const swipeableRef = useRef<SwipeableMethods | null>(null)
  const swipeableRefs = useRef<Record<string, React.RefObject<SwipeableMethods>>>({});

  async function fetchHistory() {
    const response = await historyGetAll();
    setHistory(response);
    setIsLoading(false);
  }

  async function remove(id: string) {
    await historyRemove(id);

    fetchHistory();
  }
  const handleClose = (id: string) => {
    if (swipeableRefs.current[id]?.current) {
      swipeableRefs.current[id].current.close();
      Alert.alert(
        'Remover',
        'Deseja remover esse registro?',
        [
          {
            text: 'Sim', onPress: () => remove(id)
          },
          { text: 'Não', style: 'cancel' }
        ]
      );
    } else {
      console.warn(`swipeableRef para item ${id} é nulo.`);
    }
  };

  const renderItem = ({ item }) => {
      if (!swipeableRefs.current[item.id]) {
        swipeableRefs.current[item.id] = React.createRef<SwipeableMethods>();
      }

  return (
    <Animated.View key={item.id} entering={SlideInRight} exiting={SlideOutRight} layout={LinearTransition}>
      <Swipeable
        ref={swipeableRefs.current[item.id]}
        containerStyle={{ width: "100%", height: 90, marginBottom: 12, backgroundColor: colors.grey[700], borderRadius: 6 }}
        onSwipeableOpen={() => handleClose(item.id)}
        renderRightActions={() => null}
        renderLeftActions={() => (
          <View
            className='w-[90px] h-[90px] rounded-md bg-red-500 items-center justify-center'
          >
            <Trash size={32} color={colors.grey[100]} />
          </View>
        )}
        leftThreshold={10}
      >

        <HistoryCard data={item} />

      </Swipeable>
    </Animated.View>
  )
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

      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        contentContainerClassName='p-8'
        renderItem={renderItem}
        contentContainerStyle={{ gap: 14 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}