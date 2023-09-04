import React, { useCallback, useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native'
import { AuthContext } from '../../contexts/AuthContext'
import { Feather } from '@expo/vector-icons'; 



export default function Login({ navigation }) {
  
  const {handleLogin, username, password, setUsername, setPassword, apiMessage} = useContext(AuthContext);


  return (
    <ScrollView
     contentContainerStyle={styles.container}
     keyboardShouldPersistTaps="never" 
    >
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={[
            styles.header, {fontWeight: '600', right: 10}]}>Class</Text>
            <View style={styles.chatAndIcon}>
              <Text style={[styles.header, {fontWeight: '600', top: -35, left: 20, }]}>Chat</Text>
              <Feather name="message-square" size={55} style={{bottom: 10}} color="lightgreen" />
            </View>
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
        {apiMessage !== "Successfully registered" 
          ? <Text style={{color: 'red', width: 210, fontSize: 16}}>{apiMessage}</Text> 
          : null}
        {apiMessage === "Successfully registered"
            ?  <Text style={{color: 'lightgreen', width: 200, fontSize: 16}}>{apiMessage }</Text> 
            : null}
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
        </View>
      </View>
    </ScrollView>
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
      width: 190,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 25,
    },
    header: {
      height: 110,
      width: 180,
      color: '#F7ECE1',
      fontSize: 65,
    },
    chatAndIcon: {
      flexDirection: 'row',
      left: 20,
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
      backgroundColor: 'lightgreen',
      
    },
    register: {
      borderColor: '#F7ECE1',
   
    },
})
