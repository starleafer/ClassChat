import { StyleSheet, Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'
import Profile from '../screens/Profile';
import Chat from '../screens/Chat';
import CameraView from '../screens/CameraView';
import { Feather } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();




const ProfileNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Profile page" 
        component={Profile}
        options={{headerShown: false}} />
      <Tab.Screen 
        name="Camera" 
        component={CameraView} 
        options={{
          headerShown: false,
          tabBarLabelStyle: {color: '#298758'},
          tabBarIcon: ({ color, size }) => (
            <Feather name="camera" size={24} color="#298758" />
            ),
          }}       
      />
    </Tab.Navigator> 
  )
}

export default ProfileNavigator

const styles = StyleSheet.create({})