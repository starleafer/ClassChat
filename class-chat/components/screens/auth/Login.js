import React from 'react'
import { View, Text, StyleSheet, TextInput, Button } from 'react-native'

export default function Login({ navigation }) {
  return (
    <View style={styles.container}>
      <TextInput style={styles.inputs}>Username</TextInput>
      <TextInput style={styles.inputs}>Password</TextInput>
      <View style={styles.btnContainer}>
        <Button style={styles.buttons} title="Login" />
        <Button style={styles.buttons} title="Register user" onPress={() => navigation.navigate('RegisterUser')} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 750,
    backgroundColor: 'rgb(54, 209, 139)',
    paddingVertical: 100,
    },
    inputs: {
      height: 50,
      borderWidth: 1,
      marginTop: 20,
      marginHorizontal: 40,
    },
    btnContainer: {
      marginTop: 60,
      marginHorizontal: 20,
      height: 110,
      justifyContent: 'space-between',

    },
    buttons: {
    }
})
