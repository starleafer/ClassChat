import { StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, {useContext} from 'react'
import AuthNavigator from './auth/AuthNavigator';
import Chat from '../screens/Chat';


const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Chat" component={Chat} />
      {/* <Stack.Screen name="AuthNavigator" component={AuthNavigator} /> */}
    </Stack.Navigator>
  )
}

export default RootNavigator

const styles = StyleSheet.create({})