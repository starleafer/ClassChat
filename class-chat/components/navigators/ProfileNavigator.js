import { StyleSheet, Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'
import Profile from '../screens/Profile';
import Chat from '../screens/Chat';


const Tab = createBottomTabNavigator();




const ProfileNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Profile page" 
        component={Profile}
        options={{headerShown: false}} />
      {/* <Tab.Screen name="Chat" component={Chat} /> */}
    </Tab.Navigator> 
  )
}

export default ProfileNavigator

const styles = StyleSheet.create({})