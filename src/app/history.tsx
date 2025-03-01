import { useEffect, useState } from 'react';
import { useRouter } from "expo-router";
import { View, ScrollView, Alert, Pressable } from 'react-native';
import Animated, { Easing, FadeIn, FadeOut, LinearTransition, SlideInRight, SlideOutRight } from 'react-native-reanimated';
import { HouseLine, Trash } from 'phosphor-react-native';
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";

import { Header } from '../components/Header';
import { HistoryCard, HistoryProps } from '../components/HistoryCard';

import { historyGetAll, historyRemove } from '../storage/quizHistoryStorage';
import { Loading } from '../components/Loading';
import { colors } from '@/styles/colors';

export default function History() {
  const [isLoading, setIsLoading] = useState(true);
  const [history, setHistory] = useState<HistoryProps[]>([]);

  const router = useRouter();

  async function fetchHistory() {
    const response = await historyGetAll();
    setHistory(response);
    setIsLoading(false);
  }

  async function remove(id: string) {
    await historyRemove(id);

    fetchHistory();
  }

  function handleRemove(id: string) {
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

      <ScrollView
        contentContainerStyle={{ padding: 32 }}
        showsVerticalScrollIndicator={false}
      >
        {
          history.map((item) => (
            <Animated.View key={item.id} layout={LinearTransition} >
              
              <Swipeable overshootLeft={false} containerStyle={{width: "100%", height: 90, marginBottom: 12, backgroundColor: colors.danger_light, borderRadius: 6}} renderLeftActions={() => (
                <Pressable className='w-[90px] h-[90px] rounded-md bg-red-500 items-center justify-center'>
                  <Trash size={32} color={colors.grey[100]} />
                </Pressable>
          )} >
              <HistoryCard data={item} />

              </Swipeable>

            </Animated.View>
          ))
        }
      </ScrollView>
    </View>
  );
}