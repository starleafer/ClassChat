import React, { useCallback, useContext, useState } from 'react'
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native'
import { AuthContext } from '../../contexts/AuthContext'
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

// SplashScreen.preventAutoHideAsync();



export default function Login({ navigation }) {
  
  const {handleLogin, username, password, setUsername, setPassword} = useContext(AuthContext);
  // const [username, setUsername] = useState('testing53');
  // const [password, setPassword] = useState('123');
  
  // const [fontsLoaded] = useFonts({
  //   'Pacifico': require('../../../assets/fonts/Pacifico-Regular.ttf'),
  // });

  // const onLayoutRootView = useCallback(async () => {
  //   if (fontsLoaded) {
  //     await SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded]);

  // if (!fontsLoaded) {
  //   return null;
  // }

  // console.log('fontsLoaded:', fontsLoaded);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={[styles.header, {right: 10}]}>Class</Text>
        <Text style={[styles.header, {top: -35, left: 20, }]}>Chat</Text>
      </View>
      <TextInput 
        style={styles.inputs} 
        value={username}
        onChangeText={username => setUsername(username)}>
      </TextInput>
      <TextInput 
        style={styles.inputs} 
        value={password} 
        onChangeText={password => setPassword(password)}>
      </TextInput>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          title="Login"
          style={[styles.buttons, styles.login]}
          onPress={() => handleLogin(username, password)}>
          <Text style={{fontWeight: '700'}}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          title="Register"
          style={[styles.buttons, styles.register]}
          onPress={() => navigation.navigate('RegisterUser')}>
          <Text style={{color: '#F7ECE1', fontWeight: '700'}}>Register</Text>
        </TouchableOpacity>

        {/* <Button style={styles.buttons} title="Login" onPress={() => handleLogin(username, password)} />
        <Button style={styles.buttons} title="Register user" onPress={() => navigation.navigate('RegisterUser')} /> */}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: '#242038',
    paddingVertical: 100,
    justifyContent: 'center',
    alignItems: 'center',
    },
    headerContainer: {
      width: 180,
      // borderWidth: 1,
      marginBottom: 40,
      justifyContent: 'center',
      alignItems: 'center',
      
    },
    header: {
      height: 110,
      // borderWidth: 1,
      width: 170,
      color: '#F7ECE1',
      fontSize: 65,
      // fontFamily: 'Pacifico',
    },
    inputs: {
      height: 50,
      width: 300,
      borderWidth: 1,
      marginTop: 20,
      marginHorizontal: 40,
      padding: 10,
      borderRadius: 10,
      borderColor: "#F7ECE1",
      color: "#F7ECE1"
    },
    btnContainer: {
      marginTop: 100,
      height: 60,
      width: "100%",
      justifyContent: 'center',
      alignItems: 'center',
      
    },
    buttons: {
      width: 250,
      height: 60,
      marginTop: 25,
      borderRadius: 10,
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    login: {
      backgroundColor: '#F7ECE1',
      
    },
    register: {
      borderColor: '#F7ECE1',
   
    },
})
