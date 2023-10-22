import React from 'react';

import './src/utils/i18n';
import {CoachRegistration} from './src/screens/CoachRegistration';
import {UserRegistration} from './src/screens/UserRegistration';

import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {LogIn} from './src/screens/LogIn';
import CoachHome from './src/screens/CoachHome';
const Stack = createStackNavigator();

export type RootStackParamList = {
  UserRegistration: undefined;
  CoachRegistration: undefined;
  LogIn: undefined;
  CoachHome: undefined;
  // ... other screen names
};

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LogIn"
        screenOptions={{
          headerShown: false, // Esta línea oculta la barra de navegación
        }}>
        <Stack.Screen name="LogIn" component={LogIn} />
        <Stack.Screen name="CoachHome" component={CoachHome} />
        <Stack.Screen name="CoachRegistration" component={CoachRegistration} />
        <Stack.Screen name="UserRegistration" component={UserRegistration} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
