import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
// import {TopBarNav} from '../components/TopBarNav';
import {Header} from '../components/Header';
import {Input} from '../components/Input';

import {PairButton} from '../components/PairButton';
import {SafeAreaView} from 'react-native';
import {Button} from '../components/Button';
import {IUser} from '../interfaces/API/User';

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../App';

export function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  // const [isEmailValid, setEmailValid] = useState(false);
  // const [isPasswordValid, setPasswordValid] = useState(false);

  const primaryButtonText = 'Sign In';
  const secondaryButtonText = 'Register';
  const handleSecondaryPress = () => {
    console.log(secondaryButtonText);
    // Tu lógica aquí
  };

  const [loginSuccess, setLoginSuccess] = useState(false); // Add state variable for login success

  const handlePrimaryPress = async () => {
    console.log(primaryButtonText);

    const user = await fetchUser();
    if (user) {
      console.log('User logged in:', user);
      setLoginSuccess(true); // Set login success state to true
      setTimeout(() => setLoginSuccess(false), 5000); // Hide success message after 5 seconds
      // Navigate to the home screen or perform any other action
    } else {
      console.log('Invalid email or password');
      // Display an error message or perform any other action
    }
  };
  async function fetchUser(): Promise<IUser | null> {
    try {
      const response = await fetch('http://192.168.0.113:3100/users/login', {
        // Fix URL
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password}),
      });
      const data = await response.json();
      console.log('apiresult :', data);
      if (data) {
        navigation.navigate('CoachHome');
        console.log('data :', data);
        return data; // Assuming the API returns an array of users and we only need the first one
      } else {
        return null;
      }
    } catch (error) {
      console.error('Aca muestro el error', error);
      return null;
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
          {loginSuccess && ( // Conditionally render success message
            <Text style={styles.successText}>Login successful!</Text>
          )}
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
});
