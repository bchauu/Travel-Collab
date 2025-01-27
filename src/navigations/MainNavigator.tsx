import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProfileScreen from '../screens/ProfileScreen';
import HomeStackNavigator from './HomeStackNavigator';
import TripStackNavigator from './TripStackNavigator';
import {TripProvider} from '../context/TripContext';

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  return (
    <TripProvider>
      <Tab.Navigator>
        <Tab.Screen name="Search" component={HomeStackNavigator} />
        <Tab.Screen name="Trips" component={TripStackNavigator} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </TripProvider>
  );
};

export default MainNavigator;
