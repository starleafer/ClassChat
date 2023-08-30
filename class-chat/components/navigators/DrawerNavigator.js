import { StyleSheet, Text, View } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';

import React from 'react'
import Chat from '../screens/Chat';
import Profile from '../screens/Profile';
import ProfileNavigator from './ProfileNavigator';

const Drawer = createDrawerNavigator();


const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
        <Drawer.Screen 
            name="Chat"
            component={Chat}
        />
        <Drawer.Screen 
            name="Profile"
            component={ProfileNavigator}
        />
    </Drawer.Navigator>
  )
}

export default DrawerNavigator

const styles = StyleSheet.create({})