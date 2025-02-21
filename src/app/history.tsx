import { useEffect, useState } from 'react';
import { useRouter } from "expo-router";
import { View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { HouseLine } from 'phosphor-react-native';

import { Header } from '../components/Header';
import { HistoryCard, HistoryProps } from '../components/HistoryCard';

import { historyGetAll, historyRemove } from '../storage/quizHistoryStorage';
import { Loading } from '../components/Loading';

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
        contentContainerStyle={{padding: 32}}
        showsVerticalScrollIndicator={false}
      >
        {
          history.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => handleRemove(item.id)}
            >
              <HistoryCard data={item} />
            </TouchableOpacity>
          ))
        }
      </ScrollView>
    </View>
  );
}