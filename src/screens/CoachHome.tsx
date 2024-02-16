import React, {useEffect} from 'react';
import {Text, StyleSheet, TouchableOpacity, View} from 'react-native';
import {TopBarNav} from '../components/TopBarNav';
import {SafeAreaView} from 'react-native-safe-area-context';

import {useNavigationHelper} from '../utils/navigateTo';
import {RootStackParamList} from '../../App';
import {useAuth} from '../config/AuthContext';
import {useTranslation} from 'react-i18next';
const CoachHome = () => {
  const {user} = useAuth();
  const {t} = useTranslation();
  const {navigateTo} = useNavigationHelper();
  const redirect = (page: string) => () => {
    navigateTo(page as keyof RootStackParamList);
  };

  useEffect(() => {
    // console.log('user :', user);
  }, [user]);
  return (
    <SafeAreaView style={styles.safeArea}>
      <TopBarNav pageName="home" hideBackButton={true} />
      <View style={styles.container}>
        {/* Acceso directo a la gestión de estudiantes */}
        <TouchableOpacity
          style={styles.card}
          onPress={redirect('ClientsManagment')}>
          <Text style={styles.cardText}>{t('manageStudents')}</Text>
        </TouchableOpacity>

        {/* Acceso directo a la creación de planes de entrenamiento */}
        <TouchableOpacity
          style={styles.card}
          onPress={redirect('CreateTrainingPlan')}>
          <Text style={styles.cardText}>{t('createTrainingPlan')}</Text>
        </TouchableOpacity>

        {/* Acceso directo a la creación de ejercicios */}
        <TouchableOpacity
          style={styles.card}
          onPress={redirect('CreateExercise')}>
          <Text style={styles.cardText}>{t('createExercise')}</Text>
        </TouchableOpacity>

        {/* Acceso directo a la biblioteca de ejercicios */}
        <TouchableOpacity
          style={styles.card}
          onPress={redirect('ExerciseLibrary')}>
          <Text style={styles.cardText}>{t('exerciseLibrary')}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    backgroundColor: '#F0F0F0',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CoachHome;
