import { Button, Image, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { API_ROOT_URL } from '../constants/General';


const Profile = ({navigation}) => {

  const {handleLogout, accessData, image } = useContext(AuthContext);

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")

  const getUser = async () => {
 
    try {
      const response = await fetch(API_ROOT_URL+'users', { 
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + accessData.accessToken
        },
      });

      const user = await response.json();

      if(user.data.firstname) {
        setFirstName(user.data.firstname)
      }
      if(user.data.lastname) {
        setLastName(user.data.lastname)
      }
  
    } catch(error) {
      console.log(error)
    }
  }

  const updateUser = async () => {
    try {
      const response = await fetch(API_ROOT_URL+'users', { 
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + accessData.accessToken
        },
        body: JSON.stringify({
          firstname: firstName,
          lastname: lastName,
        }),

      });

      const user = await response.json();
  
    } catch(error) {
      console.log(error)
    }
  }

  const deleteUser = async () => {
    try {
      const response = await fetch(API_ROOT_URL + 'users', { 
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + accessData.accessToken
        },

      });

      const user = await response.json();

      handleLogout()
  
    } catch(error) {
      console.log(error)
    }
  }
  
  useEffect(() => {
    getUser(); 
  },[]);
  
  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image 
        source={{uri: image}}
        style={{width: 100, height: 100}}
        />
    
      </View>
      <View style={styles.contents}>

        <TextInput placeholder='Enter first name..' value={firstName ? firstName : ""} onChangeText={(name) => setFirstName(name)}></TextInput>
        <TextInput placeholder='Enter last name..' value={lastName ? lastName : ""} onChangeText={(name) => setLastName(name)}></TextInput>
        
        <TouchableOpacity style={[styles.buttons]} title="Update user" onPress={() => {updateUser()}}><Text>Update</Text></TouchableOpacity>
        {/* <Button title="Delete user" onPress={() => {deleteUser()}} /> */}
        <Button title="Logout user" onPress={() => {handleLogout()}} />
      </View>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: "100%",
    backgroundColor: 'wheat',
  },
  imgContainer: {
    borderWidth: 1,
    height: 100,
    width:100,
  },
  contents: {
    height: 400,
    width: 300,
    borderWidth: 1,
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

})