import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {TopBarNav} from '../components/TopBarNav';
import {Header} from '../components/Header';
import {Input} from '../components/Input';
import {Selection} from '../components/Selection';
import {PairButton} from '../components/PairButton';
import {SafeAreaView} from 'react-native';

export function CoachRegistration() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');

  const primaryButtonText = 'Register';
  const secondaryButtonText = 'Terms and Conditions';

  const handleSecondaryPress = () => {
    // Tu lógica aquí
  };

  const handlePrimaryPress = () => {
    // Tu lógica aquí
  };
  return (
    <SafeAreaView>
      <View>
        <TopBarNav pageName={'coachRegistration'} />
        <Header />
        <View style={styles.container}>
          <Input title="Full name" placeholder="Juan" onChange={setFullName} />
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
          <Selection title="Gender" options={['Male', 'Female', 'Other']} />
          <Input
            title="Date of Birth"
            placeholder="DD/MM/YYYY"
            onChange={setDateOfBirth}
          />
          <PairButton
            secondaryText={secondaryButtonText}
            primaryText={primaryButtonText}
            onSecondaryPress={handleSecondaryPress}
            onPrimaryPress={handlePrimaryPress}
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
});
