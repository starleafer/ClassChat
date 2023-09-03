import { StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, {useContext, useEffect} from 'react'
import AuthNavigator from './auth/AuthNavigator';
import Chat from '../screens/Chat';
import DrawerNavigator from './DrawerNavigator';
import { AuthContext } from '../contexts/AuthContext';


const Stack = createNativeStackNavigator();

const RootNavigator = () => {

  const {accessData, isLoggedIn} = useContext(AuthContext);

  // useEffect(() => {
  //   isLoggedIn();
  // },[])

  return (
    // <Stack.Navigator
    //   screenOptions={{
    //     headerShown: false
    //   }}
    // >
    //   <Stack.Screen name="Drawer" component={DrawerNavigator} />
    //   <Stack.Screen name="AuthNavigator" component={AuthNavigator} />
    // </Stack.Navigator>
    <>
      {
        accessData.accessToken !== null
          ? <DrawerNavigator />
          : <AuthNavigator />
      }
    </>
  )
}

export default RootNavigator

const styles = StyleSheet.create({})