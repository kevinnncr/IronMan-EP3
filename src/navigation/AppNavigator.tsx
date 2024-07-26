// navigation/AppNavigator.ts
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FilmsScreen from '../screens/FilmsScreen';
import ScenesScreen from '../screens/SceneScreen';
import CharactersScreen from '../screens/CharactersScreen';
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';

export type RootStackParamList = {
    Films: undefined;
    Scenes: { filmId: number };
    Characters: { sceneId: number };
    Register: undefined;
    Login: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Register">
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Films" component={FilmsScreen} />
                <Stack.Screen name="Scenes" component={ScenesScreen} />
                <Stack.Screen name="Characters" component={CharactersScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
