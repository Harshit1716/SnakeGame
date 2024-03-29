import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {Colors} from '../styles/colors';
import {Direction, Coordinate, GestureEventType} from '../types/types';
import {checkEatsFood} from '../utils/checkEatsFood';
import {checkGameOver} from '../utils/checkGameOver';
import {randomFoodPosition} from '../utils/randomFoodPosition';
import Food from './Food';
import Header from './Header';
import Score from './Score';
import Snake from './Snake';

const SNAKE_INITIAL_POSITION = [{x: 5, y: 5}];
const FOOD_INITIAL_POSITION = {x: 10, y: 10};
const GAME_BOUNDS = {xMin: 1, xMax: 32, yMin: 0, yMax: 51};
const MOVE_INTERVAL = 50;
const SCORE_INCREMENT = 10;

console.log(Dimensions.get('window'));

export default function Game(): JSX.Element {
  const [direction, setDirection] = useState<Direction>(Direction.Right);
  const [snake, setSnake] = useState<Coordinate[]>(SNAKE_INITIAL_POSITION);
  const [food, setFood] = useState<Coordinate>(FOOD_INITIAL_POSITION);
  const [score, setScore] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const MemoizedFood = React.memo(Food);
  useEffect(() => {
    if (!isGameOver) {
      const intervalId = setInterval(() => {
        !isPaused && moveSnake();
      }, MOVE_INTERVAL);
      return () => clearInterval(intervalId);
    }
  }, [snake, isGameOver, isPaused]);

  const moveSnake = () => {
    const snakeHead = snake[0];
    const newHead = {...snakeHead}; // create a new head object to avoid mutating the original head

    // GAME OVER
    if (checkGameOver(snakeHead, GAME_BOUNDS)) {
      setIsGameOver(prev => !prev);
      return;
    }

    switch (direction) {
      case Direction.Up:
        newHead.y -= 1;
        break;
      case Direction.Down:
        newHead.y += 1;
        break;
      case Direction.Left:
        newHead.x -= 1;
        break;
      case Direction.Right:
        newHead.x += 1;
        break;
      default:
        break;
    }

    if (checkEatsFood(newHead, food, 2)) {
      setFood(randomFoodPosition(GAME_BOUNDS.xMax, GAME_BOUNDS.yMax));
      setSnake([newHead, ...snake]);
      setScore(score + SCORE_INCREMENT);
    } else {
      setSnake([newHead, ...snake.slice(0, -1)]);
    }
  };

  const handleGesture = (event: GestureEventType) => {
    const {translationX, translationY} = event.nativeEvent;
    if (Math.abs(translationX) > Math.abs(translationY)) {
      if (translationX > 0) {
        setDirection(Direction.Right);
      } else {
        setDirection(Direction.Left);
      }
    } else {
      if (translationY > 0) {
        setDirection(Direction.Down);
      } else {
        setDirection(Direction.Up);
      }
    }
  };

  const reloadGame = () => {
    setSnake(SNAKE_INITIAL_POSITION);
    setFood(FOOD_INITIAL_POSITION);
    setIsGameOver(false);
    setScore(0);
    setDirection(Direction.Right);
    setIsPaused(false);
  };

  const pauseGame = () => {
    setIsPaused(!isPaused);
  };

  // console.log(JSON.stringify(snake, null, 0));

  return (
    <PanGestureHandler onGestureEvent={handleGesture}>
      <SafeAreaView style={styles.container}>
        <Header
          reloadGame={reloadGame}
          pauseGame={pauseGame}
          isPaused={isPaused}>
          <Score score={score} />
        </Header>
        <View style={styles.boundaries}>
          <Snake snake={snake} />
          <MemoizedFood x={food.x} y={food.y} />
        </View>
        {isGameOver && (
          <View
            style={{
              flex: 1,
              height: Dimensions.get('window').height,
              width: Dimensions.get('window').width,
              // backgroundColor: 'transparent',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
            }}>
            <Image
              resizeMode="contain"
              style={{
                height: Dimensions.get('window').height * 0.6,
                width: '60%',
              }}
              source={require('../assets/gameOver.png')}
            />
            <TouchableOpacity
              style={{
                padding: '5%',
                marginTop: '-10%',
                width: '80%',
                backgroundColor: Colors.secondary,
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={reloadGame}>
              <Text>Reload</Text>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  boundaries: {
    flex: 1,
    borderColor: Colors.primary,
    borderWidth: 12,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: Colors.background,
  },
});
