import {TouchableOpacity} from 'react-native';
import {useNavigationHelper} from '../utils/navigateTo';

interface IconButtonProps {
  onPress: () => void;
  icon: JSX.Element;
}

export function IconButton({onPress, icon}: IconButtonProps) {
  // Adjust the generic type to be more flexible
  const {goBack} = useNavigationHelper();

  return (
    <TouchableOpacity onPress={goBack}>
      {/* <Image source={require('../assets/ic-left.png')} style={styles.icLeft} /> */}
      {icon}
    </TouchableOpacity>
  );
}

export default IconButton;

// const styles = StyleSheet.create({
//   content: {
//     alignItems: 'center',
//     flexDirection: 'row',
//     paddingVertical: 12,
//     paddingHorizontal: 8,
//     position: 'relative',
//     backgroundColor: '#fff',
//   },
//   icLeft: {
//     height: 24,
//     width: 24,
//     position: 'relative',
//   },
//   title: {
//     color: '#000',
//     flex: 1,
//     fontFamily: 'Roboto-Medium',
//     fontSize: 20,
//     fontWeight: '500',
//     letterSpacing: 0,
//     lineHeight: 24,
//     marginTop: -1,
//     position: 'relative',
//     paddingLeft: 10,
//   },
// });
