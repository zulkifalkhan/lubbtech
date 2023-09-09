import React, {FC, useEffect, useState} from 'react';
import {View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  Calendar,
  Bell,
  Chat,
  Users,
  UserSquare,
  Plus,
} from 'phosphor-react-native';
import explore from '../../screens/explore/index';
import chat from '../../screens/chat/index';
import notifications from '../../screens/notifications/index';
import profile from '../../screens/profile/index';

const Tab = createBottomTabNavigator();

const BottomNavigator: FC = () => {
  return (
    <>
      <Tab.Navigator
        initialRouteName="Explore"
        screenOptions={{
          tabBarActiveTintColor: '#f5726c',
          tabBarShowLabel: false,
          headerShown: true,
        }}>
        <Tab.Screen
          name="Explore"
          component={explore}
          options={{
            tabBarIcon: ({color, size}) => <Plus color={color} size={30} />,
            header: () => false,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={profile}
          options={{
            tabBarIcon: ({color, size}) => <Users color={color} size={30} />,
            header: () => false,
          }}
        />

        <Tab.Screen
          name="Notifications"
          component={notifications}
          options={{
            tabBarIcon: ({color, size}) => <Bell color={color} />,
            header: () => false,
          }}
        />

        <Tab.Screen
          name="Messages"
          component={chat}
          options={{
            tabBarIcon: ({color, size}) => <Chat color={color} size={30} />,
            header: () => false,
          }}
        />
      </Tab.Navigator>
    </>
  );
};
export default BottomNavigator;
