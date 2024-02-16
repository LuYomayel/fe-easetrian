import React, {useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import {useNavigationHelper} from '../utils/navigateTo';
import {RootStackParamListIds} from '../../App';
import Icon from 'react-native-vector-icons/FontAwesome'; // Asegúrate de importar Icon correctamente
import {IWorkout} from '../interfaces/API/Workout';
import {useRoute} from '@react-navigation/native';

interface ListPlanProps {
  workouts: IWorkout[];
  clientId: number;
}
export const ListPlan: React.FC<ListPlanProps> = ({workouts, clientId}) => {
  const {navigateToWithParams} = useNavigationHelper();

  const redirect = (workout: IWorkout | null) => () => {
    console.log('clientId :', clientId, workout);
    // return;
    if (workout !== null) {
      navigateToWithParams(
        'CreateTrainingPlan' as keyof RootStackParamListIds,
        {existingPlan: workout, clientId: clientId},
      );
    }
  };

  return (
    <View style={styles.list}>
      {workouts.map(workout => (
        <TouchableOpacity key={workout.id} onPress={redirect(workout || null)}>
          <View style={styles.item}>
            <View style={styles.frame}>
              <Icon name="user" size={20} color="#4F4F4F" />
            </View>
            <View style={styles.div}>
              <Text style={styles.title}>
                {workout.planName ? workout.planName : 'N/A'}
              </Text>
              {/* <Text style={styles.subtitle}>
                {student.client ? student.client.surname : 'N/A'}
              </Text> */}
            </View>
            <Icon name="search" size={20} color="#4F4F4F" />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    alignItems: 'center',
    flexDirection: 'column',
    padding: 12,
    width: '100%', // Asegúrate de que la lista ocupa el ancho completo
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF', // Fondo blanco para los items
    marginBottom: 12,
    padding: 15,
    borderRadius: 10, // Bordes redondeados
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4, // Sombra para darle profundidad
    width: '100%', // Asegúrate de que los items ocupan el ancho completo
  },
  frame: {
    backgroundColor: '#E0E0E0',
    borderRadius: 25,
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 24,
    color: '#4F4F4F',
  },
  div: {
    flex: 1,
    marginLeft: 12, // Agrega un margen para separar el icono del texto
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold', // Texto más grueso para el nombre
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666', // Color más suave para el apellido
  },
  // Otros estilos...
});
