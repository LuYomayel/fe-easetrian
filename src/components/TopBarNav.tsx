import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import IconButton from '../components/IconButton';
interface TopBarNavProps {
  pageName: string;
  hideBackButton?: boolean;
}
export function TopBarNav({pageName, hideBackButton = false}: TopBarNavProps) {
  const {t} = useTranslation();
  return (
    <View style={styles.content}>
      {!hideBackButton && <IconButton navigationPage={'LogIn'} />}
      <Text style={styles.title}>{t(`${pageName}`)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 12,
    // paddingHorizontal: 8,
    position: 'relative',
    backgroundColor: '#fff',
    // height: 120,
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
    fontSize: 30,

    fontWeight: '700',
    letterSpacing: 0,
    // lineHeight: 24,
    marginTop: -1,
    position: 'relative',
    paddingLeft: 5,
  },
});
