import React from 'react'
import { View, Text, StyleSheet, TextInput, Button } from 'react-native'

export default function Login({ navigation }) {
  return (
    <View>
      <TextInput>Username</TextInput>
      <TextInput>Password</TextInput>
      <Button title="Login" />
      <Button title="Register user" onPress={() => navigation.navigate('RegisterUser')} />
    </View>
  )
}

const styles = StyleSheet.create({
  loginContainer: {
        backgroundColor: 'tomato'
    }
})
