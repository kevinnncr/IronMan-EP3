import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FilmsScreen from './src/screen/Films';
import ScenesScreen from './src/screen/Scenes';
import CharactersScreen from './src/screen/Characters';

const Stack = createStackNavigator();

const App = () => {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Films">
          <Stack.Screen name="Films" component={FilmsScreen} />
          <Stack.Screen name="Scenes" component={ScenesScreen} />
          <Stack.Screen name="Characters" component={CharactersScreen} />
        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default App;
