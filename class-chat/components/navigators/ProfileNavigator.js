import { StyleSheet, Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'
import Profile from '../screens/Profile';
import Chat from '../screens/Chat';
import CameraView from '../screens/CameraView';


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
        component={CameraView} />
    </Tab.Navigator> 
  )
}

export default ProfileNavigator

const styles = StyleSheet.create({})