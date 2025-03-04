import { useEffect } from 'react';
import { Text, View, BackHandler, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { Button } from '@/components/Button';
import { Stars } from '@/components/Stars';

export default function Finish() {
  const router = useRouter();
  const { points, total } = useLocalSearchParams();

  function back() {
    router.navigate("/")
    return true
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      back,
    );

    return () => backHandler.remove();
  }, [])

  return (
    <View className='flex-1 justify-center bg-gray-800'>
      <View className='items-center mb-20'>
        <Stars />
        <Text className='color-gray-100 font-roboto-700-bold text-2xl mt-10'>
          Parabéns!
        </Text>

        <Text className='color-gray-100 font-roboto-400-regular text-base mt-2'>
          Você acertou {points} de {total} questões
        </Text>
      </View>
      <View className=''>
        <Button
          title="Ir para o início"
          onPress={() => router.push('/')}
        />
      </View>
    </View>
  );
}