import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    // padding: 20,
    backgroundColor: '#f1f1f1',
  },
  logo: {
    width: '100%', // Cubre todo el ancho de la pantalla
    height: 200, // Altura fija de 100 unidades
    resizeMode: 'cover', // Cubre todo el espacio disponible
  },
});

export function Header() {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
    </View>
  );
}
