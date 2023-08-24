import {  } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import Login from '../../screens/Login';


const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      {/* <Stack.Screen name="Register" component={Register} /> */}
    </Stack.Navigator>
  )
}

export default AuthNavigator

