import React, { useContext, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../../contexts/AuthContext";


export default function Register({ navigation }) {
  const {registerUser, errormsg} = useContext(AuthContext)
  const [regUsername, setRegUsername] = useState('');
  const [regPassword, setRegPassword] = useState('');

  const confirmRegister = () => {
    registerUser(regUsername, regPassword)
    console.log('State error message '+errormsg)
    if ( errormsg == null ) {
      // console.log('reroute to Login')
      navigation.navigate('Login')
    }
    if(regPassword == '') {
      return alert('Password is required.')
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.inputs} 
          placeholder="Username"
          value={regUsername}
          onChangeText={username => setRegUsername(username)}
        />
        <TextInput 
          style={styles.inputs} 
          placeholder="Password"
          value={regPassword}
          onChangeText={password => setRegPassword(password)}
        />
      </View>
      <View style={styles.buttonContainer}>

        {/* Register button */}
        <TouchableOpacity 
          style={[styles.buttons, { borderColor: "green" }]}
          onPress={confirmRegister}
        >
          <Text style={{ color: "green" }}>Register</Text>
        </TouchableOpacity>

        {/* Back button */}
        <TouchableOpacity 
          style={styles.buttons} 
          onPress={() => navigation.navigate('Login')}
        >
          <Text >&lt; Back to Login page</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: "bisque",
    height: 730,
  },
  inputContainer: {
    marginTop: 100,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  inputs: {
    height: 50,
    borderWidth: 1,
    marginTop: 20,
    marginHorizontal: 40,
    padding: 10,
  },
  buttons: {
    marginTop: 40,
    borderWidth: 2,
    height: 60,
    width: 180,
    justifyContent: "center",
    alignItems: "center",
  },
});
