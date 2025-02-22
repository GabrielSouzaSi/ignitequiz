import { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { Trophy } from 'phosphor-react-native';
import { useRouter } from "expo-router";

import { Level } from '../components/Level';
import { Header } from '@/components/Header';
import { QuizCard } from '../components/QuizCard';

import { QUIZZES } from '../data/quizzes';

export default function Home() {
  const [quizzes, setQuizzes] = useState(QUIZZES);
  const [levels, setLevels] = useState([1, 2, 3]);

  const router = useRouter();

  function handleLevelFilter(level: number) {
    const levelAlreadySelected = levels.includes(level);

    if (levelAlreadySelected) {
      if (levels.length > 1) {
        setLevels(prevState => prevState.filter(item => item !== level));
      }
    } else {
      setLevels(prevState => [...prevState, level]);
    }
  }

  useEffect(() => {
    setQuizzes(QUIZZES.filter(quiz => levels.includes(quiz.level)));
  }, [levels]);

  return (
    <View className='flex-1 bg-gray-900 items-center'>
      <Header
        icon={Trophy}
        title="Vamos estudar"
        subtitle="Treine seus conhecimento"
        onPress={() => router.navigate("./history")}
      />

      <View className='w-full flex-row justify-center mt-8'>
        <Level title="Fácil" type="EASY" onPress={() => handleLevelFilter(1)} isChecked={levels.includes(1)} />
        <Level title="Médio" type="MEDIUM" onPress={() => handleLevelFilter(2)} isChecked={levels.includes(2)} />
        <Level title="Difícil" type="HARD" onPress={() => handleLevelFilter(3)} isChecked={levels.includes(3)} />
      </View>

      <FlatList
        data={quizzes}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <QuizCard
            index={index}
            data={item}
            onPress={() => router.navigate({
              pathname: "/quiz/[id]",
              params: { id: item.id }
            })}
          />
        )}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingTop: 32}}
      />
    </View>
  );
}