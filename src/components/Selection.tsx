import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

interface SelectionProps {
  title: string;
  options: string[];
}
export function Selection({title, options}: SelectionProps) {
  const [selectedOption, setSelectedOption] = useState(''); // Inicializa el estado con una cadena vacía

  const handleSelect = (option: string) => {
    setSelectedOption(option); // Actualiza el estado cuando se selecciona una opción
  };

  return (
    <View style={styles.selection}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.chipGroup}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.chip,
              selectedOption === option && styles.selectedChip, // Aplica el estilo condicionalmente
            ]}
            onPress={() => handleSelect(option)} // Maneja la selección
          >
            <Text style={styles.text}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  selection: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    // padding: 12,
  },
  title: {
    alignSelf: 'stretch',
    fontSize: 14,
    fontWeight: '500',
  },
  chipGroup: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'flex-start', // Alinea los elementos a la izquierda
  },
  chip: {
    alignItems: 'center',
    backgroundColor: '#0000000d',
    borderRadius: 6,
    padding: 8,
    width: 64,
    marginRight: 8, // Agrega un espacio a la derecha de cada chip
  },
  text: {
    fontSize: 14,
    color: '#000',
  },
  selectedChip: {
    backgroundColor: '#0000002d', // Cambia el color de fondo cuando se selecciona
  },
});
