import React, {useEffect, useState} from 'react';
import {View, TextInput, StyleSheet, FlatList, Alert} from 'react-native';
import {TopBarNav} from '../components/TopBarNav';
import {useTranslation} from 'react-i18next';

import {useNavigationHelper} from '../utils/navigateTo';
import {RootStackParamList} from '../../App';
import {useRoute} from '@react-navigation/native'; // Importa useRoute

import {Text} from 'react-native';
import ExerciseDetailComponent from '../components/ExerciseDetailComponent';
import {PairButton} from '../components/PairButton';
import {apiUrl} from '../config/global';
import {AssignWorkoutDto, IWorkout} from '../interfaces/API/Workout';
import {useAuth} from '../config/AuthContext';
import {fetchNewPlan} from '../api/workout';

const CreateTrainingPlan = () => {
  const [planDetails, setPlanDetails] = useState<IWorkout[]>([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editingTitle, setEditingTitle] = useState(false);
  const [creating, setCreating] = useState(false);
  const route = useRoute();
  const {getUser} = useAuth();
  const {t} = useTranslation();
  const [clientId, setClient] = useState(null);
  const {navigateTo, navigateToWithParams} = useNavigationHelper();
  const {user} = useAuth();
  const redirect = (page: string) => () => {
    // console.log('Redirecting :', planDetails);
    // Just put every exercise in a single array
    if (planDetails.groups) {
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
    } else {
      navigateTo(page as keyof RootStackParamList);
    }
  };

  useEffect(() => {
    if (route.params) {
      console.log('route params: ');
      // console.log('Selected exercises: 123 ', route.params.selectedExercises);
      // Lógica para agregar los ejercicios seleccionados al plan de entrenamiento
      if (route.params.selectedExercises) {
        setEditing(true);
        if (planDetails.groups) {
          // console.log('Entre aca');
          let firstGroup = planDetails.groups[0];
          const allExercises = planDetails.groups.reduce(
            (acc, group) => [...acc, ...group.exercises],
            [],
          );

          const justNewExercises = route.params.selectedExercises.filter(
            exercise =>
              !allExercises.some(e => e.exercise.id === exercise.exercise.id),
          );
          // console.log('Just new exercises:', justNewExercises);
          if (justNewExercises.length === 0) {
            return;
          }
          if (!firstGroup) {
            firstGroup = {
              ...firstGroup,
              id: 0,
              groupNumber: 1,
              set: 3,
              rest: 180,
              exercises: [...justNewExercises],
            };
            setPlanDetails({
              ...planDetails,
              groups: [firstGroup, ...planDetails.groups.slice(1)],
            });
            return;
          } else {
            firstGroup = {
              ...firstGroup,
              groupNumber: 1,
              exercises: [...firstGroup.exercises, ...justNewExercises],
            };
            setPlanDetails({
              ...planDetails,
              groups: [firstGroup, ...planDetails.groups.slice(1)],
            });
          }
        } else {
          //
          setPlanDetails({
            ...planDetails,
            groups: [
              {
                id: 0,
                groupNumber: 1,
                set: 3,
                rest: 180, // Tiempo de descanso en segundos
                exercises: route.params.selectedExercises,
              },
            ],
          });
        }
      } else if (route.params.existingPlan) {
        console.log('Client: ', route.params.clientId);
        setClient(route.params.clientId);
        setEditing(false);
        setEditingTitle(true);
        // Ordenar los grupos por groupNumber orden descendente
        route.params.existingPlan.groups.sort(
          (a, b) => a.groupNumber - b.groupNumber,
        );
        setPlanDetails({
          ...route.params.existingPlan,
          planName: route.params.existingPlan.planName,
        });
      }
    }
  }, [route.params]);

  useEffect(() => {
    if (!route.params) {
      setEditing(true);
      setEditingTitle(false);
      setCreating(true);
    }
  }, []);

  const removeExerciseFromGroup = (exerciseId, groupId) => {
    setPlanDetails(prevPlanDetails => {
      const updatedGroups = prevPlanDetails.groups.map(group => {
        if (group.groupNumber === groupId) {
          const updatedExercises = group.exercises.filter(
            exercise => exercise.exercise.id !== exerciseId,
          );

          if (updatedExercises.length === 0) {
            // Delete the group if there are no exercises left
            return null;
          }

          return {
            ...group,
            exercises: updatedExercises,
          };
        }

        return group;
      });

      // Remove null groups
      const filteredGroups = updatedGroups.filter(group => group !== null);

      return {
        ...prevPlanDetails,
        groups: filteredGroups,
      };
    });
  };

  const moveExerciseToGroup = (exerciseId, fromGroup, whereTo) => {
    // console.log('Moving exercise:', exerciseId, 'from group:', fromGroup);

    if (fromGroup === -1) {
      console.log('Invalid groups', fromGroup);
      return;
    }
    // Encuentra el grupo
    const groupFromMove = planDetails.groups.findIndex(
      g => g.groupNumber === fromGroup,
    );
    console.log('Group from move:', groupFromMove);
    if (groupFromMove === -1) {
      console.log('Group not found');
      return;
    }
    // Encuentra el ejercicio en el grupo de origen
    const exerciseToMove = planDetails.groups[
      groupFromMove
    ].exercises.findIndex(e => e.exercise.id === exerciseId);
    console.log(
      'Exercise to move:',
      exerciseId,
      planDetails.groups[groupFromMove],
    );
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
            if (group.groupNumber === fromGroup) {
              return {
                ...group,
                exercises: group.exercises.filter(
                  exercise => exercise.exercise.id !== exerciseId,
                ),
              };
            }
            if (group.groupNumber === fromGroup - 1) {
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
          if (group.groupNumber === fromGroup) {
            return {
              ...group,
              exercises: group.exercises.filter(
                exercise => exercise.exercise.id !== exerciseId,
              ),
            };
          }
          if (group.groupNumber === fromGroup - 1) {
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
          if (group.groupNumber === fromGroup) {
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
      console.log(
        exerciseToMove,
        planDetails.groups[groupFromMove].exercises.length - 1,
      );
      // Mueve el ejercicio hacia abajo
      if (
        exerciseToMove ===
        planDetails.groups[groupFromMove].exercises.length - 1
      ) {
        console.log('Aca');
        // Piuede moverse al siguiente grupo
        if (groupFromMove === planDetails.groups.length - 1) {
          console.log('Estot aca');
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
              groupNumber: planDetails.groups[groupFromMove].groupNumber + 1,
              set: 3,
              rest: 180, // Tiempo de descanso en segundos
              exercises: [],
            },
          ];
          const newnewGroups = newGroups.map(group => {
            if (group.groupNumber === fromGroup) {
              return {
                ...group,
                exercises: group.exercises.filter(
                  exercise => exercise.exercise.id !== exerciseId,
                ),
              };
            }
            if (group.groupNumber === fromGroup + 1) {
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
          if (group.groupNumber === fromGroup) {
            console.log('Group:', group.groupNumber, fromGroup);
            return {
              ...group,
              exercises: group.exercises.filter(
                exercise => exercise.exercise.id !== exerciseId,
              ),
            };
          }
          // Falta agregar el ejercicio al siguiente grupo
          if (group.groupNumber === fromGroup + 1) {
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
      console.log('Aca si');
      // Mueve el ejercicio una posicion abajo dentro del mismo grupo
      const newGroups = planDetails.groups.map(group => {
        if (group.groupNumber === fromGroup) {
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

  async function fetchData(body: any) {
    await fetchNewPlan(body);
  }

  const handleSavePlan = () => {
    // Lógica para guardar el plan de entrenamiento
    console.log('Plan details:', JSON.stringify(planDetails));

    setPlanDetails({
      ...planDetails,
      coach: {
        id: user.id,
      }, // ID del coach
    });

    const body = {
      ...planDetails,
      coachId: user.id,
    };
    // Enviar planDetails a tu backend o API
    try {
      const parsedBody = JSON.stringify(body);

      fetchData(parsedBody);
      Alert.alert('Plan guardado con éxito');
      if (editingTitle) {
        setEditing(false);
      } else if (creating) {
        navigateTo('CoachHome');
      } else {
        navigateToWithParams('PlanList', {id: currentUser.id});
      }

      // navigateToWithParams('PlanList', {id: currentUser.id});
      // Redirige a la pantalla de lista de planes
    } catch (error) {
      console.error('Error saving workout:', error);
    }
  };

  const handleAssingPlan = () => {
    // Lógica para asignar el plan de entrenamiento

    const body: AssignWorkoutDto = {
      planName: planDetails.planName,
      dayOfWeek: 'Monday',
      workoutId: planDetails.id,
      coachId: getUser().id,
      clientId: clientId,
    };
    console.log('Body:', body);
    // return;
    const currentUser = getUser();

    setPlanDetails({
      ...planDetails,
      coach: {
        id: currentUser.id,
      }, // ID del coach
    });
    // Enviar planDetails a tu backend o API
    try {
      const response = fetch(`${apiUrl}/workout/assignWorkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      console.log('Response:', response);

      Alert.alert('Plan asignado con éxito');
      navigateToWithParams('PlanList', {id: currentUser.id});
      // Redirige a la pantalla de lista de planes
    } catch (error) {
      console.error('Error saving workout:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TopBarNav
        pageName={
          editingTitle === false
            ? t('createTrainingPlan')
            : editing === true
            ? t('editTrainingPlan')
            : t('assignTrainingPlan')
        }
      />
      {/* Campos del formulario aquí */}
      <View style={styles.form}>
        <TextInput
          value={planDetails.planName}
          style={styles.input}
          placeholder={t('planName')}
          onChangeText={text =>
            setPlanDetails({...planDetails, planName: text})
          }
        />
        {planDetails.groups &&
          planDetails.groups.map((group, index) => (
            <View key={index} style={styles.groupContainer}>
              <Text
                style={styles.groupTitle}>{`Group ${group.groupNumber}`}</Text>
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
                      editing={editing}
                      onToggle={() =>
                        removeExerciseFromGroup(
                          item.exercise.id,
                          group.groupNumber,
                        )
                      }
                      movingUp={() =>
                        moveExerciseToGroup(
                          item.exercise.id,
                          group.groupNumber,
                          'up',
                        )
                      }
                      movingDown={() =>
                        moveExerciseToGroup(
                          item.exercise.id,
                          group.groupNumber,
                          'down',
                        )
                      }
                    />
                  </View>
                )}

                // keyExtractor={item => item.id.toString()}
              />
            </View>
          ))}
        {editing ? (
          <PairButton
            secondaryText={t('addExercise')}
            onSecondaryPress={redirect('ExerciseList')}
            primaryText={t('savePlan')}
            onPrimaryPress={handleSavePlan}
          />
        ) : (
          <PairButton
            secondaryText={t('editPlan')}
            onSecondaryPress={() => setEditing(true)}
            primaryText={t('assignPlan')}
            onPrimaryPress={handleAssingPlan}
          />
        )}
        {/* <PairButton
          secondaryText={t('addExercise')}
          onSecondaryPress={redirect('ExerciseList')}
          primaryText={t('savePlan')}
          onPrimaryPress={handleSavePlan}
        /> */}
      </View>
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
