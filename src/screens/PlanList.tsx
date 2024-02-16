import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';

import {TopBarNav} from '../components/TopBarNav';

import {apiUrl} from '../config/global';
import {useAuth} from '../config/AuthContext';
import {ListPlan} from '../components/ListPlans';
import {IWorkout} from '../interfaces/API/Workout';
import {useRoute} from '@react-navigation/native';
const PlanList = () => {
  const [workouts, setRoutines] = useState<IWorkout[]>([]);
  const {user} = useAuth();
  const [clientId, setClient] = useState(null);

  const route = useRoute();

  useEffect(() => {
    const fetchStudents = async () => {
      console.log('user.id :', user.id);
      console.log('clientId :', clientId);
      const response = await fetch(
        `${apiUrl}/workout/coachId/${user.id}/clientId/${clientId}`,
      );
      const data = await response.json();
      setRoutines(data);
      console.log('Data: ', data);
      return;
      //   const students = data.filter(
      //     (student: IClient) => student.userType === EUserType.Client,
      //   );
    };
    fetchStudents();
  }, [user.id, clientId]);

  useEffect(() => {
    if (route.params) {
      // Lógica para agregar los ejercicios seleccionados al plan de entrenamiento
      if (route.params.id) {
        setClient(route.params.id);
      }
    }
  }, [route.params?.id]);
  return (
    <SafeAreaView>
      <View>
        <TopBarNav pageName={'planList'} />
        <View>
          {workouts.length > 0 ? (
            <ListPlan workouts={workouts} clientId={clientId} />
          ) : (
            <View>
              <Text>No hay planes de entrenamiento</Text>
            </View>
          )}
          {/* <ListPlan workouts={workouts} clientId={clientId} /> */}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PlanList;
