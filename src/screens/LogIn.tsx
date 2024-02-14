import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
// import {TopBarNav} from '../components/TopBarNav';
import {Header} from '../components/Header';
import {Input} from '../components/Input';
import {useAuth} from '../config/AuthContext';
import {PairButton} from '../components/PairButton';
import {SafeAreaView} from 'react-native';
import {Button} from '../components/Button';
import {IUser, IHttpException} from '../interfaces/API/User';

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../App';

import {apiUrl} from '../config/global';
export function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {login} = useAuth();

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  // const [isEmailValid, setEmailValid] = useState(false);
  // const [isPasswordValid, setPasswordValid] = useState(false);

  const primaryButtonText = 'Sign In';
  const secondaryButtonText = 'Register';
  const handleSecondaryPress = () => {
    console.log(secondaryButtonText);
    // Tu lógica aquí
  };

  const [loginSuccess, setLoginSuccess] = useState(true); // Add state variable for login success
  const [loginError, setLoginError] = useState(false); // Add state variable for login error

  const handlePrimaryPress = async () => {
    const user = await fetchUser();

    if (user) {
      login(user); // Aquí guardamos el usuario en el contexto
      // Navigate to the home screen or perform any other action
      navigation.navigate('CoachHome');
    } else {
      setLoginError(true); // Set login success state to false
      setTimeout(() => setLoginError(false), 5000); // Hide error message after 5 seconds
      // Display an error message or perform any other action
    }
  };
  async function fetchUser(): Promise<IUser | null> {
    try {
      const response = await fetch(`${apiUrl}/users/login`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password}),
      });
      if (response.ok) {
        // Si el código de estado HTTP indica éxito (200-299)
        const data: IUser = await response.json();

        return data; // Devuelve el usuario
      } else {
        // Maneja los casos de error, como 404 o 401, leyendo el cuerpo de la respuesta para obtener el mensaje de error
        const errorData = await response.json(); // O asume una estructura para errores y ajusta según tu API

        throw new Error(errorData.message); // Lanza un error con el mensaje de error de la API
      }
    } catch (error) {
      console.error(error);
      return null; // Indica que hubo un fallo al obtener el usuario
    }
  }

  const handleForgotPasswordPress = () => {
    console.log('Forgot my password');
    // Tu lógica aquí
  };
  return (
    <SafeAreaView>
      <View>
        {/* <TopBarNav pageName={'logIn'} hideBackButton={true} /> */}
        <Header />
        <View style={styles.container}>
          <View style={styles.divTitle}>
            <Text style={styles.welcomeBackText}>Welcome Back</Text>
            <Text style={styles.logInText}>Log in to continue</Text>
          </View>
          <Input
            title="Email"
            placeholder="juan@example.com"
            onChange={setEmail}
          />
          <Input
            title="Password"
            placeholder="******"
            type="password"
            onChange={setPassword}
          />
          <PairButton
            secondaryText={secondaryButtonText}
            primaryText={primaryButtonText}
            onSecondaryPress={handleSecondaryPress}
            onPrimaryPress={handlePrimaryPress}
          />
          <Button
            text="Forgot my password"
            onPress={handleForgotPasswordPress}
            type="primary"
          />
        </View>
        {/* <RNButton
          title="Go to User Registration"
          onPress={() => navigation.navigate('UserRegistration')}
        /> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: 10,
    margin: 10,
  },
  divTitle: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    // padding: 12,
  },
  welcomeBackText: {
    alignSelf: 'stretch',
    color: '#000000',
    fontFamily: 'Roboto-Medium',
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 24,
    marginVertical: 8, // Añade un pequeño margen vertical para separar el texto
  },
  logInText: {
    alignSelf: 'stretch',
    color: '#00000080', // Un poco más oscuro que el texto original
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    marginBottom: 12, // Añade un pequeño margen en la parte inferior para separar el texto
  },
  successText: {
    color: 'green',
    alignSelf: 'center',
    marginTop: 10,
  },
  errorText: {
    color: 'red',
    alignSelf: 'center',
    marginTop: 10,
  },
});
