import { useEffect, useState } from 'react';
import { Alert, BackHandler, Text, View, ViewStyle } from 'react-native';
import { useLocalSearchParams, useRouter } from "expo-router";
import { Audio } from "expo-av";
import * as Haptics from "expo-haptics";

import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { Easing, interpolate, useAnimatedStyle, useSharedValue, withSequence, withTiming, useAnimatedScrollHandler, Extrapolation, runOnJS } from 'react-native-reanimated';

import { OverlayFeedback } from '@/components/OverlayFeedback';
import { QUIZ } from '../../data/quiz';
import { historyAdd } from '../../storage/quizHistoryStorage';
import { Loading } from '../../components/Loading';
import { Question } from '../../components/Question';
import { QuizHeader } from '../../components/QuizHeader';
import { ConfirmButton } from '../../components/ConfirmButton';
import { OutlineButton } from '../../components/OutlineButton';
import { ProgressBar } from '@/components/ProgressBar';
import { colors } from '@/styles/colors';

interface Params {
  id: string;
}

type QuizProps = typeof QUIZ[0];

const CARD_INCLINATION = 10
const CARD_SKIP_AREA = (-200)

export default function Quiz() {
  const [points, setPoints] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [statusReplay, setStatusReplay] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quiz, setQuiz] = useState<QuizProps>({} as QuizProps);
  const [alternativeSelected, setAlternativeSelected] = useState<null | number>(null);

  const shake = useSharedValue(0)
  const scrollY = useSharedValue(0)
  const cardPosition = useSharedValue(0)

  const router = useRouter();

  const { id } = useLocalSearchParams();

  async function playSound(isCorrect: boolean) {
    const file = isCorrect ? require("@/assets/correct.mp3") : require("@/assets/wrong.mp3");
    const { sound } = await Audio.Sound.createAsync(file, { shouldPlay: true });

    await sound.setPositionAsync(0);
    await sound.playAsync();

  }

  function handleSkipConfirm() {
    Alert.alert('Pular', 'Deseja realmente pular a questão?', [
      { text: 'Sim', onPress: () => handleNextQuestion() },
      { text: 'Não', onPress: () => { } }
    ]);
  }

  async function handleFinished() {
    await historyAdd({
      id: new Date().getTime().toString(),
      title: quiz.title,
      level: quiz.level,
      points,
      questions: quiz.questions.length
    });

    router.navigate({
      pathname: "/finish",
      params: {
        points: String(points),
        total: String(quiz.questions.length)
      }
    })
  }

  function handleNextQuestion() {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(prevState => prevState + 1)
    } else {
      handleFinished();
    }
  }

  async function handleConfirm() {
    if (alternativeSelected === null) {
      return handleSkipConfirm();
    }

    if (quiz.questions[currentQuestion].correct === alternativeSelected) {
      setPoints(prevState => prevState + 1);
      await playSound(true);
      setStatusReplay(1);
      handleNextQuestion();
    } else {
      await playSound(false);
      setStatusReplay(2);
      shakeAnimation();
    }

    setAlternativeSelected(null);

  }

  function handleStop() {
    Alert.alert('Parar', 'Deseja parar agora?', [
      {
        text: 'Não',
        style: 'cancel',
      },
      {
        text: 'Sim',
        style: 'destructive',
        onPress: () => router.navigate('/')
      },
    ]);

    return true;
  }

  async function shakeAnimation() {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    shake.value = withSequence(withTiming(3, { duration: 400, easing: Easing.bounce }), withTiming(0, undefined, (finished) => {
      'worlet';
      if (finished) {
        runOnJS(handleNextQuestion)();
      }
    }))
  }

  const shakeStyleAnimated = useAnimatedStyle(() => {
    return {
      transform: [{
        translateX: interpolate(
          shake.value,
          [0, 0.5, 1, 1.5, 2, 2.5, 3],
          [0, -15, 0, 15, 0, -15, 0]
        )
      }]
    }
  })

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    }
  })

  const fixedProgressBarStyles = useAnimatedStyle(() => {
    return {
      position: "absolute",
      zIndex: 1,
      paddingTop: 50,
      backgroundColor: colors.grey[500],
      width: "110%",
      left: "-5%",
      opacity: interpolate(scrollY.value, [50, 90], [0, 1], Extrapolation.CLAMP),
      transform: [
        {
          translateY: interpolate(scrollY.value, [60, 100], [-40, 0], Extrapolation.CLAMP)
        }
      ]
    }
  })

  const headerStyles = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [60, 90], [1, 0], Extrapolation.CLAMP)
    }
  })

  const onPan = Gesture
    .Pan()
    .activateAfterLongPress(200)
    .onUpdate((event) => {
      const moveToLeft = event.translationX < 0;
      if (moveToLeft) {
        cardPosition.value = event.translationX;
      }
    })
    .onEnd((event) => {
      if (event.translationX < CARD_SKIP_AREA) {
        runOnJS(handleSkipConfirm)();
      }
      cardPosition.value = withTiming(0);
    })

  const dragStyles = useAnimatedStyle<ViewStyle>(() => {
    const rotateZ = cardPosition.value / CARD_INCLINATION;
    return {
      transform: [
        { translateX: cardPosition.value },
        { rotateZ: `${rotateZ}deg` }
      ] as ViewStyle['transform'],
    }
  })

  useEffect(() => {
    const quizSelected = QUIZ.filter(item => item.id === id)[0];
    setQuiz(quizSelected);
    setIsLoading(false);
  }, []);

   useEffect(() => {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        handleStop,
      );
  
      return () => backHandler.remove();
    }, [])

  if (isLoading) {
    return <Loading />
  }

  return (
    <View className='flex-1 bg-gray-900'>
      <OverlayFeedback status={statusReplay} />
      <Animated.View style={fixedProgressBarStyles}>
        <Text className='font-bold text-lg text-grey-100 mb-[7px] text-center'>
          {quiz.title}
        </Text>

        <ProgressBar
          total={quiz.questions.length}
          current={currentQuestion + 1}
        />
      </Animated.View>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: "center",
          paddingTop: 100,
          paddingBottom: 300,
          padding: 32
        }}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <Animated.View className="w-full" style={headerStyles}>
          <QuizHeader
            title={quiz.title}
            currentQuestion={currentQuestion + 1}
            totalOfQuestions={quiz.questions.length}
          />
        </Animated.View>

        <GestureDetector gesture={onPan}>


          <Animated.View style={[shakeStyleAnimated, dragStyles]}>
            <Question
              key={quiz.questions[currentQuestion].title}
              question={quiz.questions[currentQuestion]}
              alternativeSelected={alternativeSelected}
              setAlternativeSelected={setAlternativeSelected}
              onUnmount={() => setStatusReplay(0)}
            />
          </Animated.View>
        </GestureDetector>

        <View className='flex-row mt-6'>
          <OutlineButton title="Parar" onPress={handleStop} />
          <ConfirmButton onPress={handleConfirm} />
        </View>
      </Animated.ScrollView>
    </View >
  );
}