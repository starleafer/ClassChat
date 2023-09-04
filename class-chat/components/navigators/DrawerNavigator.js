import { StyleSheet, Text, View } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';

import React from 'react'
import Chat from '../screens/Chat';
import Profile from '../screens/Profile';
import ProfileNavigator from './ProfileNavigator';

const Drawer = createDrawerNavigator();


const DrawerNavigator = () => {
  return (
    <Drawer.Navigator screenOptions={{
        drawerLabelStyle: {
          color: '#F7ECE1', 
        },
        drawerActiveTintColor: 'lightgreen', 
        drawerStyle: {
          backgroundColor: '#2b2642',
          width: 250, 
        },
      }}
    >
        <Drawer.Screen 
            name="Chat"
            component={Chat}
            options={{
              headerTintColor: '#F7ECE1',
              headerStyle: {
                backgroundColor: '#242038',  
                elevation: 0,                
              }, 
            }}
            
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