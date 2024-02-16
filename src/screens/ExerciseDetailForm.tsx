import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Button} from '../components/Button';
import {useRoute} from '@react-navigation/native'; // Importa useRoute
import {IExercise} from '../interfaces/API/Exercise';
import {TopBarNav} from '../components/TopBarNav';
import {useTranslation} from 'react-i18next';
import {Input} from '../components/Input';
import {IExerciseDetails} from '../interfaces/API/Exercise';

import {useNavigationHelper} from '../utils/navigateTo';
const ExerciseDetailsForm = () => {
  const [exercise, setExercise] = useState<IExercise>({
    id: 0,
    name: '',
  }); // Aquí deberías inicializar el estado con los detalles del ejercicio seleccionado
  const [details, setDetails] = useState<IExerciseDetails>({
    repetitions: undefined,
    sets: undefined,
    weight: undefined,
    time: undefined,
    restInterval: undefined,
    tempo: undefined,
    notes: undefined,
    difficulty: undefined,
    duration: undefined,
    distance: undefined,
  });

  const {navigateToWithParams} = useNavigationHelper();

  const route = useRoute();

  useEffect(() => {
    if (route.params) {
      console.log('Selected exercise xd: 123 ', route.params.exercise);
      // Lógica para agregar los ejercicios seleccionados al plan de entrenamiento
      if (route.params.exercise) {
        setExercise({...route.params.exercise});
      }
    }
  }, [route.params]);

  const handleChange = (name: string, value: string) => {
    let newValue: string | number = value;
    if (
      name === 'repetitions' ||
      name === 'sets' ||
      name === 'weight' ||
      name === 'time' ||
      name === 'restInterval' ||
      name === 'duration' ||
      name === 'distance'
    ) {
      newValue = parseInt(value, 10);
    }
    setDetails(prevDetails => ({...prevDetails, [name]: newValue}));
  };

  // En handleSubmit de ExerciseDetailsForm
  const handleSubmit = () => {
    const updatedExercise = {
      exercise: exercise,
      ...details,
    };

    // Asumiendo que navigateToWithParams puede manejar estos parámetros correctamente
    navigateToWithParams('ExerciseList', {updatedExercise: updatedExercise});
  };

  const {t} = useTranslation();

  return (
    <View>
      <TopBarNav pageName={t('exerciseDetails')} />
      <View style={{padding: 12}}>
        {/* Inputs para cada detalle, por ejemplo: */}
        <Input
          title={t('repetitions')}
          placeholder={t('repetitions')}
          onChange={text => handleChange('repetitions', text)}
        />
        {/* <Input
          title={t('sets')}
          placeholder={t('sets')}
          onChange={text => handleChange('sets', text)}
        /> */}
        <Input
          title={t('weight')}
          placeholder={t('weight')}
          onChange={text => handleChange('weight', text)}
        />
        <Input
          title={t('time')}
          placeholder={t('time')}
          onChange={text => handleChange('time', text)}
        />
        {/* <Input
          title={t('restInterval')}
          placeholder={t('restInterval')}
          onChange={text => handleChange('restInterval', text)}
        /> */}
        {/* <Input
          title={t('tempo')}
          placeholder={t('tempo')}
          onChange={text => handleChange('tempo', text)}
        /> */}
        <Input
          title={t('difficulty')}
          placeholder={t('difficulty')}
          onChange={text => handleChange('difficulty', text)}
        />
        <Input
          title={t('duration')}
          placeholder={t('duration')}
          onChange={text => handleChange('duration', text)}
        />
        <Input
          title={t('distance')}
          placeholder={t('distance')}
          onChange={text => handleChange('distance', text)}
        />
        <Input
          title={t('notes')}
          placeholder={t('notes')}
          onChange={text => handleChange('notes', text)}
        />

        <Button text={t('submit')} onPress={handleSubmit} type="primary" />
      </View>
    </View>
  );
};

export default ExerciseDetailsForm;
