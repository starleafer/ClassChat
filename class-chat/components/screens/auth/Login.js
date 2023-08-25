import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet, TextInput, Button } from 'react-native'
import { AuthContext } from '../../contexts/AuthContext'

export default function Login({ navigation }) {

  const {handleLogin} = useContext(AuthContext);
  const [username, setUsername] = useState('testing53');
    const [password, setPassword] = useState('123');

  return (
    <View style={styles.container}>
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
        <Button style={styles.buttons} title="Login" onPress={() => handleLogin(username, password)} />
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
      padding: 10,

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
