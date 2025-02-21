import { Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { Button } from '@/components/Button';

export default function Finish() {
  const router = useRouter();
  const { points, total } = useLocalSearchParams();

  return (
    <View className='flex-1 justify-center bg-gray-800'>
      <View className='items-center mb-20'>
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