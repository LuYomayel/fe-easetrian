import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';

import {TopBarNav} from '../components/TopBarNav';

import {apiUrl} from '../config/global';
import {useAuth} from '../config/AuthContext';
import {ListPlan} from '../components/ListPlans';
import {IWorkout} from '../interfaces/API/Workout';
import {useRoute} from '@react-navigation/native';
import {PairButton} from '../components/PairButton';
import {Button} from '../components/Button';
import {useNavigationHelper} from '../utils/navigateTo';

const ClientPlanList = () => {
  const [workouts, setRoutines] = useState<IWorkout[]>([]);
  const {user} = useAuth();
  const [clientId, setClient] = useState(null);
  const {navigateToWithParams} = useNavigationHelper();
  const redirect = (clientId: number) => () => {
    console.log('client :', clientId);

    if (clientId !== null) {
      navigateToWithParams('PlanList' as keyof RootStackParamListIds, {
        id: clientId,
      });
    }
  };
  const route = useRoute();

  useEffect(() => {
    const fetchStudents = async () => {
      console.log('user.id :', user.id);
      const response = await fetch(`${apiUrl}/workout/clientId/${clientId}`);
      const data = await response.json();
      setRoutines(data);
      console.log('Data: ', data);
      return;
      //   const students = data.filter(
      //     (student: IClient) => student.userType === EUserType.Client,
      //   );
    };
    fetchStudents();
  }, [clientId]);

  useEffect(() => {
    if (route.params) {
      console.log('route params:  ', route.params.id);
      // Lógica para agregar los ejercicios seleccionados al plan de entrenamiento

      if (route.params.id) {
        setClient(route.params.id);
      }
    }
  }, [route.params?.id]);
  return (
    <SafeAreaView>
      <View>
        <TopBarNav pageName={'clientPlanList'} />
        <View>
          {workouts.length > 0 ? (
            <ListPlan workouts={workouts} clientId={clientId} />
          ) : (
            <View>
              <Text>No tiene planes de entrenamiento asignados</Text>
            </View>
          )}
          {
            // <ListPlan workouts={workouts} clientId={clientId} />
          }
          <Button type="primary" text="Add Plan" onPress={redirect(clientId)} />
          {/* <PairButton
            secondaryText={t('addExercise')}
            onSecondaryPress={redirect('ExerciseList')}
            primaryText={t('savePlan')}
            onPrimaryPress={handleSavePlan}
          /> */}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ClientPlanList;
