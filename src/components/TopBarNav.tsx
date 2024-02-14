import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useTranslation} from 'react-i18next';
import IconButton from '../components/IconButton';
import {Icon} from 'react-native-elements';

interface TopBarNavProps {
  pageName: string;
  hideBackButton?: boolean;
  onActionPress?: () => void;
  actionIcon?: JSX.Element;
  navigation?: any; // Añade esta línea
}

export function TopBarNav({
  pageName,
  hideBackButton = false,
  onActionPress,
  actionIcon,
  navigation,
}: TopBarNavProps) {
  const {t} = useTranslation();
  const backIcon = (
    <Icon name="arrow-left" type="font-awesome" size={25} color="black" />
);

  const handleBackButton = () => {
    navigation.goBack(); // Utiliza goBack() aquí
  };

  return (
    <View style={styles.content}>
      {!hideBackButton ? (
        <IconButton onPress={handleBackButton} icon={backIcon} />
      ) : (
        <View style={{width: 25}} /> // Placeholder para mantener el título centrado
      )}
      <Text style={styles.title}>{t(`${pageName}`)}</Text>
      {onActionPress ? (
        <TouchableOpacity onPress={onActionPress} style={styles.actionButton}>
          {actionIcon}
        </TouchableOpacity>
      ) : (
        <View style={{width: 25}} /> // Placeholder para mantener el título centrado
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Cambiado para distribuir el espacio
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 5, // Cambiado a 5 para cumplir con el padding especificado
    backgroundColor: '#fff',
  },
  title: {
    color: '#000',
    flex: 1,
    fontFamily: 'Roboto-Medium',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  actionButton: {
    padding: 10,
  },
});
