import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Game from './src/components/Game';

const App = () => {
  const MemoizedGame = React.memo(Game);
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <MemoizedGame />
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({});
