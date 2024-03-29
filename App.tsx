import React from 'react';

import './src/utils/i18n';
import {CoachRegistration} from './src/screens/CoachRegistration';
import {UserRegistration} from './src/screens/UserRegistration';

import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {LogIn} from './src/screens/LogIn';
import CoachHome from './src/screens/CoachHome';
import ClientsManagment from './src/screens/ClientsManagment';
import {AuthProvider} from './src/config/AuthContext';
import NewRoutine from './src/screens/CreateTrainingPlan';
import CreateExerciseScreen from './src/screens/CreateExercise';
import CreateTrainingPlan from './src/screens/CreateTrainingPlan';
import ExerciseList from './src/screens/ExerciseList';
import {IExercise} from './src/interfaces/API/Exercise';
import ExerciseDetailsForm from './src/screens/ExerciseDetailForm';
import PlanList from './src/screens/PlanList';
import {IWorkout} from './src/interfaces/API/Workout';
import ClientPlanList from './src/screens/ClientPlanList';
import Navigation from './src/navigation/Navigation';
const Stack = createStackNavigator();
export type RootStackParamList = {
  UserRegistration: undefined;
  CoachRegistration: undefined;
  LogIn: undefined;
  CoachHome: undefined;
  ClientsManagment: undefined;
  CreateExercise: undefined;
  CreateTrainingPlan:
    | {selectedExercises: IExercise[]}
    | {existingPlan: IWorkout; clientId: number}
    | undefined;
  ExerciseList:
    | {updatedExercise: IExercise; exerciseList?: IExercise[]}
    | undefined;
  ExerciseDetailsForm: {exercise: IExercise};
  PlanList: {id: number};
  ClientPlanList: {id: number};
  // ... other screen names
};

export type RootStackParamListIds = {
  NewRoutine: {id: number};
};

function App(): JSX.Element {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Navigation />
        {/* <Stack.Navigator
          initialRouteName="LogIn"
          screenOptions={{
            headerShown: false, // Esta línea oculta la barra de navegación
          }}>
          <Stack.Screen name="LogIn" component={LogIn} />
          <Stack.Screen name="CoachHome" component={CoachHome} />
          <Stack.Screen
            name="CoachRegistration"
            component={CoachRegistration}
          />
          <Stack.Screen name="UserRegistration" component={UserRegistration} />
          <Stack.Screen name="ClientsManagment" component={ClientsManagment} />
          <Stack.Screen name="NewRoutine" component={NewRoutine} />
          <Stack.Screen
            name="CreateExercise"
            component={CreateExerciseScreen}
          />
          <Stack.Screen
            name="CreateTrainingPlan"
            component={CreateTrainingPlan}
          />
          <Stack.Screen name="ExerciseList" component={ExerciseList} />
          <Stack.Screen name="PlanList" component={PlanList} />
          <Stack.Screen
            name="ExerciseDetailsForm"
            component={ExerciseDetailsForm}
          />
          <Stack.Screen name="ClientPlanList" component={ClientPlanList} />
        </Stack.Navigator> */}
      </NavigationContainer>
    </AuthProvider>
  );
}

export default App;
