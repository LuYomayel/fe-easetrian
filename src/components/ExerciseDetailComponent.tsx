import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import 'react-native-gesture-handler';

const ExerciseDetailComponent = ({
  exercise,
  isSelected,
  onToggle,
  movingUp,
  movingDown,
}) => {
  const renderDetail = (value, unit, iconName) => {
    if (!value) {
      return null;
    }
    return (
      <View style={styles.detailContainer}>
        <Icon name={iconName} size={20} color="#666" />
        <Text style={styles.detailText}>{`${value} ${unit}`}</Text>
      </View>
    );
  };
  // <PanGestureHandler onGestureEvent={gestureHandler}>
  // <GestureDetector gesture={onGestureEvent}>
  //   <Animated.View style={[styles.itemContainer, animatedStyle]}>
  if (!exercise) {
    console.error('ExerciseDetailComponent se llamó sin un ejercicio válido');
    return null; // O un placeholder hasta que el ejercicio esté disponible
  }
  return (
    <View style={[styles.itemContainer]}>
      <View style={styles.headerRow}>
        <Text style={styles.exerciseName}>{exercise.name}</Text>
        <TouchableWithoutFeedback
          onPress={() => movingDown(exercise)}
          style={styles.actionButton}>
          <Icon name="arrow-downward" size={25} color="black" />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => movingUp(exercise)}
          style={styles.actionButton}>
          <Icon name="arrow-upward" size={25} color="black" />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => onToggle(exercise)}
          style={styles.actionButton}>
          <Icon name={isSelected ? 'remove' : 'add'} size={25} color="black" />
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.detailsContainer}>
        {/* Renderiza los detalles aquí */}
        {renderDetail(exercise.details.repetitions, 'reps', 'repeat')}
        {renderDetail(exercise.details.sets, 'sets', 'layers')}
        {renderDetail(exercise.details.weight, 'kg', 'fitness-center')}
        {renderDetail(exercise.details.time, 's', 'timer')}
        {renderDetail(exercise.details.restInterval, 's', 'hourglass-bottom')}
        {renderDetail(exercise.details.tempo, '', 'speed')}
        {renderDetail(exercise.details.notes, '', 'note')}
        {renderDetail(exercise.details.difficulty, '', 'star')}
        {renderDetail(exercise.details.duration, 's', 'timer')}
        {/* Agrega los demás detalles como se requiera */}
      </View>
    </View>
  );
};

// Tus estilos aquí
const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
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
    marginBottom: 3,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    color: '#333',
    marginBottom: 8,
  },
  detailsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
    marginBottom: 8,
  },
  detailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  detailText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#666',
  },
  actionButton: {
    padding: 5,
    marginLeft: 10,
  },
});

export default ExerciseDetailComponent;
