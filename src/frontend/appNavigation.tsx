import BottomNavigator from './navigators/BottomNavigator/index';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
const AppStack = createStackNavigator();

const AppNavigation = () => {
  return (
    <AppStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <AppStack.Screen name={' '} component={BottomNavigator}></AppStack.Screen>
    </AppStack.Navigator>
  );
};
export default AppNavigation;
