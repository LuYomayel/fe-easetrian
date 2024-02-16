import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Icon} from 'react-native-elements';
import {TopBarNav} from '../components/TopBarNav';
import {apiUrl} from '../config/global';
import {useRoute} from '@react-navigation/native';
import {useNavigationHelper} from '../utils/navigateTo';

import {IExercise, IExerciseInstance} from '../interfaces/API/Exercise';
const ExerciseList = () => {
  const [exercises, setExercises] = useState<IExercise[]>([]);
  const [selectedExercises, setSelectedExercises] = useState<IExerciseInstance>(
    [],
  );
  const {navigateToWithParams} = useNavigationHelper();
  const route = useRoute();
  useEffect(() => {
    console.log('Fetching exercises');
    const fetchExercises = async () => {
      try {
        const response = await fetch(`${apiUrl}/exercise`);
        const data = await response.json();
        setExercises(data);
      } catch (error) {
        console.log('Error fetching exercises:', error);
      }
    };

    fetchExercises();
  }, []);

  useEffect(() => {
    if (route.params) {
      console.log('route params:  ', route.params.exerciseList);
      // Lógica para agregar los ejercicios seleccionados al plan de entrenamiento

      if (route.params.exerciseList) {
        setSelectedExercises(route.params.exerciseList);
      }
    }
  }, [route.params?.exerciseList]);

  useEffect(() => {
    // Si vienes de ExerciseDetailsForm con un ejercicio actualizado
    if (route.params?.updatedExercise) {
      const updatedExercise = route.params.updatedExercise;
      console.log('Updated exercise:', updatedExercise);
      // Aquí debes actualizar tu estado con el ejercicio actualizado
      // Esto podría ser agregarlo si no existe, o actualizarlo si ya está en la lista
      const index = selectedExercises.findIndex(
        e => e.id === updatedExercise.exercise.id,
      );
      console.log('Index:', index);
      if (index >= 0) {
        // Ejercicio ya existe, actualízalo
        const newSelectedExercises = [...selectedExercises];
        newSelectedExercises[index] = updatedExercise;
        setSelectedExercises(newSelectedExercises);
      } else {
        // Ejercicio no existe, agrégalo
        console.log('Exercise not found', updatedExercise);
        setSelectedExercises([...selectedExercises, updatedExercise]);
      }
    }
  }, [route.params?.updatedExercise]);

  const {t} = useTranslation();

  const handleToggleExercise = (exercise: IExercise) => {
    navigateToWithParams('ExerciseDetailsForm', {exercise});
    // setSelectedExercises(prevSelectedExercises => {
    //   const index = prevSelectedExercises.findIndex(e => e.id === exercise.id);
    //   console.log('Index:', index);
    //   if (index >= 0) {
    //     // Si el ejercicio ya está en el array, lo removemos
    //     return prevSelectedExercises.filter(e => e.id !== exercise.id);
    //   } else {
    //     console.log('Exercise not found', exercise);
    //     // Si el ejercicio no está en el array, lo agregamos
    //     return [...prevSelectedExercises, exercise];
    //   }
    // });
  };

  const handleDeselect = (exercise: IExercise) => {
    setSelectedExercises(prevSelectedExercises => {
      return prevSelectedExercises.filter(e => e.id !== exercise.id);
    });
  };
  const handleConfirmSelection = () => {
    console.log('Submit :', selectedExercises);
    navigateToWithParams('CreateTrainingPlan', {selectedExercises});
  };

  return (
    <View style={{flex: 1}}>
      <TopBarNav pageName={t('exerciseList')} />

      <FlatList
        data={exercises}
        renderItem={({item}) => {
          console.log('Item:', item);
          const isSelected =
            selectedExercises.find(e => e.exercise.id === item.id) !==
            undefined;
          return (
            <View style={styles.itemContainer}>
              <Text style={styles.exerciseName}>{item.name}</Text>
              <Text style={styles.exerciseDetails}>{item.details}</Text>
              <TouchableOpacity
                onPress={
                  isSelected
                    ? () => handleDeselect(item)
                    : () => handleToggleExercise(item)
                }
                style={styles.actionButton}>
                <Icon
                  name={isSelected ? 'remove' : 'add'}
                  type="material"
                  size={25}
                  color="black"
                />
              </TouchableOpacity>
            </View>
          );
        }}
        keyExtractor={item => item.id.toString()}
      />
      <TouchableOpacity style={styles.fab} onPress={handleConfirmSelection}>
        <Icon name="check" size={30} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 10,
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    color: '#333',
  },
  exerciseDetails: {
    fontSize: 14,
    color: '#666',
  },
  actionButton: {
    padding: 5,
  },
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: '#03A9F4',
    borderRadius: 28,
    elevation: 8,
  },
  fabIcon: {
    fontSize: 24,
    color: 'white',
  },
});

export default ExerciseList;
