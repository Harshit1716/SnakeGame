import {TouchableOpacity, StyleSheet, View, Text} from 'react-native';

import {Colors} from '../styles/colors';

interface HeaderProps {
  reloadGame: () => void;
  pauseGame: () => void;
  children: JSX.Element;
  isPaused: boolean;
}

export default function Header({
  children,
  reloadGame,
  pauseGame,
  isPaused,
}: HeaderProps): JSX.Element {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={reloadGame}>
        <Text>Reload</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={pauseGame}>
        <Text>Pause</Text>
      </TouchableOpacity>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.05,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: Colors.primary,
    borderWidth: 12,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomWidth: 0,
    padding: 15,
    backgroundColor: Colors.background,
  },
});
