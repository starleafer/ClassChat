import { Button, Image, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { API_ROOT_URL } from '../constants/General';


const Profile = ({navigation}) => {

  const {handleLogout, accessData, setAccessData, fetchedUser, setFetchedUser} = useContext(AuthContext);

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

      console.log(user)

      // "firstname" in user.data && "lastname" in user.data
      //   ? setFetchedUser({firstName: user.data.firstname, lastName: user.data.lastname})
      //   : "firstname" in user.data || "lastname" in user.data
      //     ? "firstname" in user.data
      //       ? setFetchedUser({firstName: user.data.firstname})
      //       : setFetchedUser({lastName:user.data.lastname})
      //     : setFetchedUser({firstName: "", lastName: ""})
  
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
          firstname: accessData.firstName,
          lastname: accessData.lastName,
        }),

      });

      const user = await response.json();
  
      setAccessData({firstName:user.data.firstname, lastName:user.data.lastname})

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
    // console.log(fetchedUser.image)
    console.log(accessData.firstName)
    // getUser();
  }, []);
  
  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        {/* <Image 
        source={require(fetchedUser.image)}
        style={{width: 40, height: 40}}
        /> */}
        {/* 
        '../../assets/favicon.png'
        (fetchedUser.image ? fetchedUser.image : '.') 
        
        */}
      </View>
      <View style={styles.contents}>

        <TextInput placeholder='Enter first name..' value={accessData.firstName ? accessData.firstName : ""} onChangeText={(name) => setAccessData({firstName: name})}></TextInput>
        <TextInput placeholder='Enter last name..' value={accessData.lastName ? accessData.lastName : ""} onChangeText={(name) => setAccessData({lastName: name})}></TextInput>
        
        <TouchableOpacity style={[styles.buttons]} title="Update user" onPress={() => {updateUser()}}><Text>Update</Text></TouchableOpacity>
        <Button title="Delete user" onPress={() => {deleteUser()}} />
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