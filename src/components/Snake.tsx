import {Fragment} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {Colors} from '../styles/colors';
import {Coordinate} from '../types/types';

interface SnakeProps {
  snake: Coordinate[];
}

export default function Snake({snake}: SnakeProps): JSX.Element {
  return (
    <Fragment>
      {snake.map((segment: any, index: number) => {
        const segmentStyle = {
          left: segment.x * 10, // adjust for the size of each segment
          top: segment.y * 10,
        };
        return (
          <>
            <Text key={index} style={[styles.snake, segmentStyle]}>
              <Image
                key={index}
                style={[styles.snake, segmentStyle]}
                source={require('../assets/head.png')}
              />
            </Text>
          </>
          // </View>
        );
      })}
    </Fragment>
  );
}
const styles = StyleSheet.create({
  snake: {
    width: 20,
    height: 20,
    // borderRadius: 7,
    // backgroundColor: 'White',
    position: 'absolute',
  },
});
