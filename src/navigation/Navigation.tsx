import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ClientsManagment from '../screens/ClientsManagment';
import Icon from 'react-native-vector-icons/FontAwesome5';
const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Clients"
        component={ClientsManagment}
        options={{
          tabBarLabel: 'Clients',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({color, size}) => (
            <Icon name="user" color={color} size={size} solid />
          ),
        }}
      />
      <Tab.Screen name="Workouts" component={ClientsManagment} />
    </Tab.Navigator>
  );
}
