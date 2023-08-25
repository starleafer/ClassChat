import React, {useState} from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";


export default function Register({ navigation }) {
 

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput style={styles.inputs} placeholder="Username" />
        <TextInput style={styles.inputs} placeholder="Password" />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.buttons, { borderColor: "green" }]}
          
        >
          <Text style={{ color: "green" }}>Register</Text>
        </TouchableOpacity>
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
