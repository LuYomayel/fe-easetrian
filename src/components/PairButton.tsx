import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

interface ButtonProps {
  secondaryText: string;
  primaryText: string;
  onSecondaryPress: () => void;
  onPrimaryPress: () => void;
}

export function PairButton({
  secondaryText,
  primaryText,
  onSecondaryPress,
  onPrimaryPress,
}: ButtonProps) {
  const [isSecondaryPressed, setSecondaryPressed] = React.useState(false);
  const [isPrimaryPressed, setPrimaryPressed] = React.useState(false);

  return (
    <View style={styles.button}>
      <TouchableOpacity
        style={[
          styles.secondary,
          isSecondaryPressed && styles.secondaryPressed,
        ]}
        onPressIn={() => setSecondaryPressed(true)}
        onPressOut={() => {
          setSecondaryPressed(false);
          onSecondaryPress();
        }}>
        <Text style={styles.title}>{secondaryText}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.primary, isPrimaryPressed && styles.primaryPressed]}
        onPressIn={() => setPrimaryPressed(true)}
        onPressOut={() => {
          setPrimaryPressed(false);
          onPrimaryPress();
        }}>
        <Text style={styles.textWrapper}>{primaryText}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row', // Cambiado a 'row' para que los botones estén uno al lado del otro
    // padding: 12,

    justifyContent: 'space-around',
  },
  secondary: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    padding: 10,
    flex: 1, // Asegura que el botón crezca para llenar el espacio disponible
    marginRight: 4, // Agregado para crear espacio entre los botones
  },
  title: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 22,
  },
  primary: {
    alignItems: 'center',
    backgroundColor: '#000000',
    borderRadius: 8,
    justifyContent: 'center',
    padding: 10,
    flex: 1, // Asegura que el botón crezca para llenar el espacio disponible
    marginLeft: 4, // Agregado para crear espacio entre los botones
  },
  textWrapper: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 22,
  },
  secondaryPressed: {
    backgroundColor: '#f2f2f2',
  },
  primaryPressed: {
    backgroundColor: '#333333', // Cambiado a un color ligeramente más claro que el negro original
  },
  textWrapperPressed: {
    color: '#232D3F',
  },
});
