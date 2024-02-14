import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../App'; // Ajusta la importación según la ubicación de tu archivo App

export const useNavigationHelper = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  // Navega a una pantalla sin parámetros
  const navigateTo = (screenName: keyof RootStackParamList) => {
    navigation.navigate(screenName);
  };

  // Navega hacia atrás
  const goBack = () => {
    navigation.goBack();
  };

  // Navega a una pantalla con parámetros
  const navigateToWithParams = (
    screenName: keyof RootStackParamList,
    params: object,
  ) => {
    navigation.navigate(screenName, params);
  };

  return {
    navigateTo,
    goBack,
    navigateToWithParams,
  };
};
