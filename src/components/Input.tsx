import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {InputProps} from '../interfaces/InputProps';

export function Input({
  title,
  placeholder,
  onChange,
}: InputProps & {onChange: (text: string) => void}) {
  const [textValue, setTextValue] = useState('');

  useEffect(() => {
    onChange(textValue);
  }, [textValue, onChange]);

  return (
    <View style={styles.input}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.textfield}>
        <TextInput
          style={styles.text}
          placeholder={placeholder}
          value={textValue}
          onChangeText={setTextValue}
          secureTextEntry={title === 'Password'}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    // padding: 12,
  },
  title: {
    color: '#000',
  },
  textfield: {
    display: 'flex',
    flexGrow: 1,
    // margin: 5,
    borderColor: '#0000001a',
    borderWidth: 1,
    borderRadius: 6,
    padding: 0,
    paddingStart: 10,
    height: 40,
    width: '100%',
  },
  text: {
    color: '#000',
    margin: 0,
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
    textAlignVertical: 'center',
    textAlign: 'left',
    flex: 1,
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    fontWeight: '400',
    // minHeight: 20,
  },
});
