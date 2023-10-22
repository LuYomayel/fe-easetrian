import React from 'react';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../App';

interface IconButtonProp {
  navigationPage: keyof RootStackParamList; // Specify the type as a key of RootStackParamList
}

const IconButton = ({navigationPage}: IconButtonProp) => {
  // Adjust the generic type to be more flexible
  const navigation =
    useNavigation<
      StackNavigationProp<RootStackParamList, typeof navigationPage>
    >();

  const handlePress = () => {
    navigation.navigate(navigationPage || 'UserRegistration');
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Image source={require('../assets/ic-left.png')} style={styles.icLeft} />
    </TouchableOpacity>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 8,
    position: 'relative',
    backgroundColor: '#fff',
  },
  icLeft: {
    height: 24,
    width: 24,
    position: 'relative',
  },
  title: {
    color: '#000',
    flex: 1,
    fontFamily: 'Roboto-Medium',
    fontSize: 20,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 24,
    marginTop: -1,
    position: 'relative',
    paddingLeft: 10,
  },
});
