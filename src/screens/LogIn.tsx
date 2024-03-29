import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
// import {TopBarNav} from '../components/TopBarNav';
import {Header} from '../components/Header';
import {Input} from '../components/Input';
import {useAuth} from '../config/AuthContext';
import {PairButton} from '../components/PairButton';
import {SafeAreaView} from 'react-native';
import {Button} from '../components/Button';

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {fetchUser} from '../api/login';
export function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {user, login} = useAuth();

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  // const [isEmailValid, setEmailValid] = useState(false);
  // const [isPasswordValid, setPasswordValid] = useState(false);

  const primaryButtonText = 'Sign In';
  const secondaryButtonText = 'Register';
  const handleSecondaryPress = () => {
    console.log(secondaryButtonText);
    // Tu lógica aquí
  };

  const [loginError, setLoginError] = useState(false); // Add state variable for login error

  const handlePrimaryPress = async () => {
    const userFetched = await fetchUser(email, password);
    if (userFetched) {
      login(userFetched); // Aquí guardamos el usuario en el contexto
      // Navigate to the home screen or perform any other action
      navigation.navigate('CoachHome');
    } else {
      setLoginError(true); // Set login success state to false
      setTimeout(() => setLoginError(false), 5000); // Hide error message after 5 seconds
      // Display an error message or perform any other action
    }
  };

  useEffect(() => {
    const loadStoredUser = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        login(JSON.parse(storedUser));
        navigation.navigate('CoachHome');
      }
    };
    loadStoredUser();
  }, []);

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
        {loginError && (
          <Text style={styles.errorText}>Invalid email or password</Text>
        )}
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
