import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';

import {TopBarNav} from '../components/TopBarNav';

import {useAuth} from '../config/AuthContext';
import {ListPlan} from '../components/ListPlans';
import {IWorkout} from '../interfaces/API/Workout';
import {useRoute} from '@react-navigation/native';

import {Button} from '../components/Button';
import {useNavigationHelper} from '../utils/navigateTo';
import {fetchClientPlans} from '../api/coach';

const ClientPlanList = () => {
  const [workouts, setRoutines] = useState<IWorkout[]>([]);
  const [clientId, setClient] = useState(null);
  const {navigateToWithParams} = useNavigationHelper();
  const redirect = (clientId: number) => () => {
    if (clientId !== null) {
      navigateToWithParams('PlanList' as keyof RootStackParamListIds, {
        id: clientId,
      });
    }
  };
  const route = useRoute();

  useEffect(() => {
    async function fetchData() {
      const clientRoutines = await fetchClientPlans(clientId);
      if (clientRoutines) {
        setRoutines(clientRoutines);
      }
    }
    fetchData();
  }, [clientId]);

  useEffect(() => {
    if (route.params) {
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
