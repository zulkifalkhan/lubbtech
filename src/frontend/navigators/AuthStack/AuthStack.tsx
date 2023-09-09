import login from '../../screens/login/index';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Welcome from '../../screens/Welcome/index';
import signup from '../../screens/signUp/signup';

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={'Welcome'} component={Welcome}></Stack.Screen>
      <Stack.Screen name={'Login'} component={login}></Stack.Screen>
      <Stack.Screen name={'SignUp'} component={signup}></Stack.Screen>
    </Stack.Navigator>
  );
};
