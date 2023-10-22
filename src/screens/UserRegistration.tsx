import React from 'react';
import {View, StyleSheet} from 'react-native';
import {TopBarNav} from '../components/TopBarNav';
import {Header} from '../components/Header';
import {Input} from '../components/Input';
import {Selection} from '../components/Selection';
import {PairButton} from '../components/PairButton';
import {SafeAreaView} from 'react-native';

export function UserRegistration() {
  const handleSecondaryPress = () => {
    // Tu lógica aquí
  };

  const handlePrimaryPress = () => {
    // Tu lógica aquí
  };
  return (
    <SafeAreaView>
      <View>
        <TopBarNav pageName={'userRegistration'} />
        <Header />

        <View style={styles.container}>
          <Input title="Full name" placeholder="Juan" />
          <Input title="Email" placeholder="juan@example.com" />
          <Input title="Password" placeholder="******" type="password" />
          <Selection title="Gender" options={['Male', 'Female', 'Other']} />
          <Input title="Date of Birth" placeholder="DD/MM/YYYY" />
          <PairButton
            secondaryText="Terms and Conditions"
            primaryText="Register"
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
