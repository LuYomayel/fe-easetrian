// UserInformation.js
import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const UserInformation = () => {
  return (
    <View style={styles.container}>
      {/* <Image
        source={require('./path_to_avatar_image.png')}
        style={styles.avatar}
      /> */}
      <View style={styles.userInfo}>
        <Text style={styles.userName}>John Doe</Text>
        <Text style={styles.userLabel}>User Information</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center', // este valor es correcto
    padding: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userLabel: {
    fontSize: 16,
    color: '#888',
  },
});

export default UserInformation;
