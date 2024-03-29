import React, {useEffect} from 'react';
import {View, Button, StyleSheet, Alert} from 'react-native';
import {Input} from '../components/Input'; // Asegúrate de que la ruta sea correcta
import {TopBarNav} from '../components/TopBarNav';
import {useTranslation} from 'react-i18next';
import {SafeAreaView} from 'react-native-safe-area-context';

import MultiSelect from '../components/MultiSelect'; // Asegúrate de que la ruta sea correcta
import {KeyboardAvoidingView} from 'react-native';
import {fetchBodyParts} from '../api/workout'; // Asegúrate de que la ruta sea correcta
import {fetchNewExercise} from '../api/workout';
const CreateExerciseScreen = () => {
  const [exerciseDetails, setExerciseDetails] = React.useState({
    name: '',
    description: '',
    multimedia: '',
    exerciseType: '',
    equipmentNeeded: '',
    bodyArea: [],
    // Agrega otros campos según sea necesario
  });

  const [bodyParts, setBodyParts] = React.useState([]); // Asegúrate de que el estado inicial sea correcto

  const handleBodyAreasChange = selectedAreas => {
    setExerciseDetails(prevDetails => ({
      ...prevDetails,
      bodyArea: selectedAreas.map(area => area.id),
    }));
  };
  useEffect(() => {
    async function fetch() {
      const data = await fetchBodyParts();
      const formattedData = data.map(part => ({
        item: part.name, // Asume que SelectBox espera una propiedad 'item'
        id: part.id.toString(), // Asegúrate de que 'id' sea una cadena
      }));
      setBodyParts(formattedData);
    }
    fetch();

    console.log('bodyParts 123:', bodyParts);
  }, []);

  const {t} = useTranslation();
  const handleChange = (name, value) => {
    setExerciseDetails(prevDetails => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSelectedValuesChange = selectedValues => {
    console.log('Valores seleccionados:', selectedValues);
    handleBodyAreasChange(selectedValues);
    // Aquí puedes hacer algo con los valores seleccionados, como actualizar el estado
  };

  const handleSubmit = async () => {
    // Aquí implementarías la lógica para enviar los datos al backend
    try {
      // Aquí enviarías los datos al backend
      const body = JSON.stringify(exerciseDetails);
      await fetchNewExercise(body);

      Alert.alert('Exercise created successfully');
    } catch (error) {
      console.error('Error creating exercise:', error);
      Alert.alert('Error creating exercise');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TopBarNav pageName={t('createExercise')} />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0} // Ajusta según sea necesario
      >
        {/* <View style={styles.container}> */}
        <View style={styles.innerContainer}>
          <Input
            title="Name"
            placeholder="Enter exercise name"
            onChange={value => handleChange('name', value)}
          />

          <Input
            title="Description"
            placeholder="Enter exercise description"
            onChange={value => handleChange('description', value)}
          />
          <MultiSelect
            options={bodyParts}
            onSelectedValuesChange={handleSelectedValuesChange}
          />
          {/* Repite el componente Input para otros campos como multimedia, exerciseType, etc. */}
          <Input
            title="Multimedia"
            placeholder="Enter multimedia"
            onChange={value => handleChange('multimedia', value)}
          />
          <Input
            title="Exercise Type"
            placeholder="Enter exercise type"
            onChange={value => handleChange('exerciseType', value)}
          />
          <Input
            title="Equipment Needed"
            placeholder="Enter equipment needed"
            onChange={value => handleChange('equipmentNeeded', value)}
          />

          {/* Agrega más campos según sea necesario */}
          <View style={styles.buttonContainer}>
            <Button title="Submit" onPress={handleSubmit} />
          </View>
        </View>
        {/* </View> */}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
  innerContainer: {
    flex: 1,
    padding: 10,
    // Puede ser necesario ajustar el estilo para acomodar el KeyboardAvoidingView
  },
  // Puedes agregar más estilos según sea necesario
});

export default CreateExerciseScreen;
