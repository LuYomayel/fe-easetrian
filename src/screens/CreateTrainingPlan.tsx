import React, {useEffect, useState} from 'react';
import {View, TextInput, StyleSheet, ScrollView, FlatList} from 'react-native';
import {TopBarNav} from '../components/TopBarNav';
import {useTranslation} from 'react-i18next';

import {useNavigationHelper} from '../utils/navigateTo';
import {RootStackParamList} from '../../App';
import {useRoute} from '@react-navigation/native'; // Importa useRoute

import {Text} from 'react-native';
import ExerciseDetailComponent from '../components/ExerciseDetailComponent';
import {PairButton} from '../components/PairButton';
import {apiUrl} from '../config/global';

const CreateTrainingPlan = () => {
  const [planDetails, setPlanDetails] = useState({
    planName: '', // Nombre del plan de entrenamiento
    groups: [], // Podría ser un array de objetos con detalles de los grupos
  });

  const route = useRoute();

  const {t} = useTranslation();

  const {navigateTo, navigateToWithParams} = useNavigationHelper();
  const redirect = (page: string) => () => {
    // console.log('Redirecting :', planDetails);
    // Just put every exercise in a single array
    const allExercises = planDetails.groups.reduce(
      (acc, group) => [...acc, ...group.exercises],
      [],
    );
    if (planDetails.groups.length === 0) {
      navigateTo(page as keyof RootStackParamList);
    } else {
      navigateToWithParams(page as keyof RootStackParamList, {
        exerciseList: allExercises,
      });
    }
  };

  useEffect(() => {
    if (route.params) {
      // console.log('Selected exercises: 123 ', route.params.selectedExercises);
      // Lógica para agregar los ejercicios seleccionados al plan de entrenamiento
      if (route.params.selectedExercises) {
        if (planDetails.groups.length > 0) {
          let firstGroup = planDetails.groups[0];
          const allExercises = planDetails.groups.reduce(
            (acc, group) => [...acc, ...group.exercises],
            [],
          );

          const justNewExercises = route.params.selectedExercises.filter(
            exercise => !allExercises.some(e => e.id === exercise.id),
          );

          firstGroup = {
            ...firstGroup,
            exercises: [...firstGroup.exercises, ...justNewExercises],
          };
          setPlanDetails({
            ...planDetails,
            groups: [firstGroup, ...planDetails.groups.slice(1)],
          });
        } else {
          //
          setPlanDetails({
            ...planDetails,
            groups: [
              {
                id: 0,
                set: 3,
                rest: 180, // Tiempo de descanso en segundos
                exercises: route.params.selectedExercises,
              },
            ],
          });
        }
      }
    }
  }, [route.params]);

  const removeExerciseFromGroup = (exerciseId, groupId) => {
    // console.log('Removing exercise:', exerciseId, 'from group:', groupId);
    setPlanDetails(prevPlanDetails => ({
      ...prevPlanDetails,
      groups: prevPlanDetails.groups.map(group =>
        group.id === groupId
          ? {
              ...group,
              exercises: group.exercises.filter(
                exercise => exercise.id !== exerciseId,
              ),
            }
          : group,
      ),
    }));
  };

  const moveExerciseToGroup = (exerciseId, fromGroup, whereTo) => {
    // console.log('Moving exercise:', exerciseId, 'from group:', fromGroup);

    if (fromGroup === -1) {
      console.log('Invalid groups', fromGroup);
      return;
    }
    // Encuentra el grupo
    const groupFromMove = planDetails.groups.findIndex(g => g.id === fromGroup);
    if (groupFromMove === -1) {
      console.log('Group not found');
      return;
    }
    // Encuentra el ejercicio en el grupo de origen
    const exerciseToMove = planDetails.groups[
      groupFromMove
    ].exercises.findIndex(e => e.id === exerciseId);
    if (exerciseToMove === -1) {
      console.log('Exercise not found');
      return;
    } // Verifica que el ejercicio exista

    if (whereTo === 'up') {
      // Mueve el ejercicio hacia arriba
      if (exerciseToMove === 0 && groupFromMove === 0) {
        console.log('Exercise is already at the top');
        return;
      }
      // Verificar si el hay mas de un ejercicio en el grupo, si no hay mas de un ejercicio, no se puede mover
      if (planDetails.groups[groupFromMove].exercises.length === 1) {
        // Si solo hay un ejercicio en el grupo pero es el ultimo grupo, se puede mover hacia arriba eliminando el grupo final
        if (groupFromMove === planDetails.groups.length - 1) {
          // Mueve el ejercicio al grupo anterior
          const newGroups = planDetails.groups.map(group => {
            if (group.id === fromGroup) {
              return {
                ...group,
                exercises: group.exercises.filter(
                  exercise => exercise.id !== exerciseId,
                ),
              };
            }
            if (group.id === fromGroup - 1) {
              return {
                ...group,
                exercises: [
                  ...group.exercises,
                  planDetails.groups[groupFromMove].exercises[exerciseToMove],
                ],
              };
            }
            // Falta agregarlo al grupo anterior
            return group;
          });
          const newPlanDetails = {
            ...planDetails,
            groups: newGroups,
          };
          // Ahora elimina el grupo final
          // Primero corroborar que el grupo final no tenga ejercicios
          if (
            newPlanDetails.groups[newPlanDetails.groups.length - 1].exercises
              .length === 0
          ) {
            newPlanDetails.groups.pop();
          }

          setPlanDetails(newPlanDetails);

          return;
        }
      }

      if (exerciseToMove === 0) {
        // Mueve el ejercicio al grupo anterior
        const newGroups = planDetails.groups.map(group => {
          if (group.id === fromGroup) {
            return {
              ...group,
              exercises: group.exercises.filter(
                exercise => exercise.id !== exerciseId,
              ),
            };
          }
          if (group.id === fromGroup - 1) {
            return {
              ...group,
              exercises: [
                ...group.exercises,
                planDetails.groups[groupFromMove].exercises[exerciseToMove],
              ],
            };
          }
          // Falta agregarlo al grupo anterior
          return group;
        });
        const newPlanDetails = {
          ...planDetails,
          groups: newGroups,
        };
        setPlanDetails(newPlanDetails);
        return;
      } else {
        // Mueve el ejercicio una posicion arriba dentro del mismo grupo
        const newGroups = planDetails.groups.map(group => {
          if (group.id === fromGroup) {
            const newExercises = [...group.exercises];
            const temp = newExercises[exerciseToMove];
            newExercises[exerciseToMove] = newExercises[exerciseToMove - 1];
            newExercises[exerciseToMove - 1] = temp;
            return {...group, exercises: newExercises};
          }
          return group;
        });
        const newPlanDetails = {
          ...planDetails,
          groups: newGroups,
        };
        setPlanDetails(newPlanDetails);
      }
    } else {
      // Mueve el ejercicio hacia abajo
      if (
        exerciseToMove ===
        planDetails.groups[groupFromMove].exercises.length - 1
      ) {
        // Piuede moverse al siguiente grupo
        if (groupFromMove === planDetails.groups.length - 1) {
          // Si el grupo es el ultimo y hay mas de un ejercicio, se puede mover hacia abajo creando un nuevo grupo
          // Mueve el ejercicio al siguiente grupo
          if (planDetails.groups[groupFromMove].exercises.length === 1) {
            console.log('Exercise is the only one in the group');
            return;
          }
          // Agregar un grupo vacio a la lista
          const newGroups = [
            ...planDetails.groups,
            {
              id: planDetails.groups[groupFromMove].id + 1,
              set: 3,
              rest: 180, // Tiempo de descanso en segundos
              exercises: [],
            },
          ];
          const newnewGroups = newGroups.map(group => {
            if (group.id === fromGroup) {
              return {
                ...group,
                exercises: group.exercises.filter(
                  exercise => exercise.id !== exerciseId,
                ),
              };
            }
            if (group.id === fromGroup + 1) {
              return {
                ...group,
                exercises: [
                  planDetails.groups[groupFromMove].exercises[exerciseToMove],
                  ...group.exercises,
                ],
              };
            }
            // Falta agregar el ejercicio al siguiente grupo
            return group;
          });
          const newPlanDetails = {
            ...planDetails,
            groups: newnewGroups,
          };
          setPlanDetails(newPlanDetails);

          console.log('Exercise is already at the bottom');
          return;
        }
        // Verifica que queda un ejercicio en el grupo luego de mover este ejercicio. Es decir, verificar que hay un total de 2 ejericcios en el grupo
        if (planDetails.groups[groupFromMove].exercises.length === 1) {
          console.log('Exercise is the only one in the group');
          return;
        }
        // Mueve el ejercicio al siguiente grupo
        const newGroups = planDetails.groups.map(group => {
          if (group.id === fromGroup) {
            console.log('Group:', group.id, fromGroup);
            return {
              ...group,
              exercises: group.exercises.filter(
                exercise => exercise.id !== exerciseId,
              ),
            };
          }
          // Falta agregar el ejercicio al siguiente grupo
          if (group.id === fromGroup + 1) {
            return {
              ...group,
              exercises: [
                planDetails.groups[groupFromMove].exercises[exerciseToMove],
                ...group.exercises,
              ],
            };
          }
          return group;
        });
        const newPlanDetails = {
          ...planDetails,
          groups: newGroups,
        };
        setPlanDetails(newPlanDetails);
        console.log('Exercise is already at the bottom');
        return;
      }
      // Mueve el ejercicio una posicion abajo dentro del mismo grupo
      const newGroups = planDetails.groups.map(group => {
        if (group.id === fromGroup) {
          const newExercises = [...group.exercises];
          const temp = newExercises[exerciseToMove];
          newExercises[exerciseToMove] = newExercises[exerciseToMove + 1];
          newExercises[exerciseToMove + 1] = temp;
          return {...group, exercises: newExercises};
        }
        return group;
      });
      const newPlanDetails = {
        ...planDetails,
        groups: newGroups,
      };
      setPlanDetails(newPlanDetails);
    }
  };

  const handleSavePlan = () => {
    // Lógica para guardar el plan de entrenamiento
    console.log('Plan details:', planDetails);
    // Enviar planDetails a tu backend o API
    try {
      const response = fetch(`${apiUrl}/workout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(planDetails),
      });
      console.log('Response:', response);
    } catch (error) {
      console.error('Error saving workout:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TopBarNav pageName={t('createTrainingPlan')} />
      {/* Campos del formulario aquí */}
      <ScrollView style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder={t('planName')}
          onChangeText={text =>
            setPlanDetails({...planDetails, planName: text})
          }
        />
        {planDetails.groups.map((group, index) => (
          <View key={index} style={styles.groupContainer}>
            <Text style={styles.groupTitle}>{`Group ${index + 1}`}</Text>
            <Text
              style={
                styles.groupDetails
              }>{`Sets: ${group.set}, Rest: ${group.rest} seconds`}</Text>
            <FlatList
              data={planDetails.groups[index].exercises}
              renderItem={({item}) => (
                <View style={styles.exerciseContainer}>
                  <ExerciseDetailComponent
                    exercise={item}
                    isSelected={true}
                    onToggle={() => removeExerciseFromGroup(item.id, group.id)}
                    movingUp={() =>
                      moveExerciseToGroup(item.id, group.id, 'up')
                    }
                    movingDown={() =>
                      moveExerciseToGroup(item.id, group.id, 'down')
                    }
                  />
                </View>
              )}
              keyExtractor={item => item.id.toString()}
            />
          </View>
        ))}
        <PairButton
          secondaryText={t('addExercise')}
          onSecondaryPress={redirect('ExerciseList')}
          primaryText={t('savePlan')}
          onPrimaryPress={handleSavePlan}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: -1,
  },
  overlayContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000, // Asegúrate de que este zIndex sea suficientemente alto
  },
  zIndex: {
    zIndex: 100,
  },
  form: {
    padding: 10,
  },
  input: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
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
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 10,
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 2,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  groupContainer: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#f7f7f7',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 3,
  },
  groupTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  groupDetails: {
    fontSize: 16,
    marginBottom: 10,
  },
  exerciseDetailComponent: {
    // elevation: 4,
    // zIndex: 100,
  },
  // Más estilos según sea necesario
});

export default CreateTrainingPlan;
