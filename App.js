import React from 'react';
import { View, StyleSheet } from 'react-native';
import Home from './screens/Home';
import MemoryGame from './screens/MemoryGame';
import MultipleAnswers from './screens/MultipleAnswers';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import games from './assets/data/games.json'

const Stack = createNativeStackNavigator();

export default App = () => {

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name={"Home"} component={Home} initialParams={{games}} />
          <Stack.Screen name={"Memory Game"} component={MemoryGame} />
          <Stack.Screen name={"Multiple Answers Quiz"} component={MultipleAnswers} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
