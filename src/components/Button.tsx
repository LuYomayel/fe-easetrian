// src/components/ModularButton.js
import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

interface ModularButtonProps {
  text: string;
  onPress: () => void;
  type: 'primary' | 'secondary';
}

export const Button = ({text, onPress, type}: ModularButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        type === 'primary' ? styles.primary : styles.secondary,
      ]}
      onPress={onPress}>
      <Text
        style={[
          styles.text,
          type === 'primary' ? styles.primaryText : styles.secondaryText,
        ]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    // alignSelf: 'stretch',
    borderRadius: 8,
    justifyContent: 'center',
    padding: 10,
    width: '100%',
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 22,
    textAlign: 'center',
  },
  primary: {
    backgroundColor: '#000000',
  },
  primaryText: {
    color: '#ffffff',
  },
  secondary: {
    backgroundColor: '#ffffff',
    borderColor: '#000000',
    borderWidth: 1,
  },
  secondaryText: {
    color: '#000000',
  },
});
