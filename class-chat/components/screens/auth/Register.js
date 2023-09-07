import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../../contexts/AuthContext";


export default function Register({ navigation }) {
  const {registerUser, apiMessage , setApiMessage} = useContext(AuthContext)
  const [regUsername, setRegUsername] = useState('');
  const [regPassword, setRegPassword] = useState('');

  const confirmRegister = async () => {
    if(regUsername == '')
     return setApiMessage('Must enter a username')
    if(regPassword == '') 
      return setApiMessage('Password required')
    
  
    const regSuccess = await registerUser(regUsername, regPassword)
    console.log(apiMessage)
    
    if (regSuccess) {
      navigation.navigate('Login')
    }
  }

  const Back = () => {
    navigation.navigate('Login')
    setApiMessage("")
  }

  return (
    <View style={styles.container}>
      <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 30}}>Register user</Text>
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.inputFields} 
          placeholder="Username"
          value={regUsername}
          onChangeText={username => setRegUsername(username)}
        />
        <TextInput 
          style={styles.inputFields} 
          placeholder="Password"
          value={regPassword}
          onChangeText={password => setRegPassword(password)}
        />
      </View>
        {apiMessage !== "Successfully registered"
          ?  <Text style={{color: 'red', width: 200, fontSize: 16}}>{apiMessage }</Text> : null}
        {/* Register button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.buttons, { backgroundColor: 'lightgreen' }]}
          onPress={confirmRegister}
        >
          <Text style={{fontWeight: 'bold'}}>Register</Text>
        </TouchableOpacity>

        {/* Back button */}
        <TouchableOpacity 
          style={[styles.buttons,{borderWidth: 1}]} 
          onPress={Back}
        >
          <Text style={{color: '#fff', fontWeight: 'bold'}}>&lt; Back to Login page</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#242038',
    height: '100%',
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  inputFields: {
    width: 250,
    height: 60,
    marginTop: 25,
    padding: 10,
    borderRadius: 10,
    fontWeight: 'bold',
    backgroundColor: '#fff',
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons: {
    width: 230,
    height: 50,
    marginTop: 25,
    borderRadius: 10,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

