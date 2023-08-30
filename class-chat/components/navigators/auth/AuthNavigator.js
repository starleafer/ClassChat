import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import Login from '../../screens/auth/Login';
import Register from '../../screens/auth/Register';


const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="RegisterUser" component={Register} screenOptions={{
        headerShown: false,
      }} />
    </Stack.Navigator>
  )
}

export default AuthNavigator

