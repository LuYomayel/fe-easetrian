import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
export function Title({title}: {title: string}) {
  return (
    <View style={styles.div}>
      {/* <Text style={styles.title}> {t(`${title}`)} </Text> */}
      <Text style={styles.title}> {title} </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  div: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 24,
    letterSpacing: 0,
    marginTop: -1,
    marginRight: 0, // Removed marginRight
  },
});
