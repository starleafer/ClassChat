import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';


const Profile = ({navigation}) => {

  const {handleLogout, accessToken} = useContext(AuthContext);
  const [fetchedUser, setFetchedUser] = useState({
    firstName: "",
    lastName: ""
  })

  const getUser = async () => {
    try {
      const response = await fetch('https://chat-api-with-auth.up.railway.app/users', { 
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + accessToken
        },
      });

      const user = await response.json();

      "firstname" in user.data && "lastname" in user.data
        ? setFetchedUser({firstName: user.data.firstname, lastName: user.data.lastname})
        : "firstname" in user.data || "lastname" in user.data
          ? "firstname" in user.data
            ? setFetchedUser({firstName: user.data.firstname})
            : setFetchedUser({lastName:user.data.lastname})
          : setFetchedUser({firstName: "", lastName: ""})
  
    } catch(error) {
      console.log(error)
    }
  }

  const updateUser = async () => {
    try {
      const response = await fetch('https://chat-api-with-auth.up.railway.app/users', { 
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + accessToken
        },
        body: JSON.stringify({
          firstname: fetchedUser.firstName,
          lastname: fetchedUser.lastName,
        }),

      });

      const user = await response.json();
  
      setFetchedUser(user.data)

    } catch(error) {
      console.log(error)
    }
  }

  const deleteUser = async () => {
    try {
      const response = await fetch('https://chat-api-with-auth.up.railway.app/users', { 
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + accessToken
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
  }, []);
  
  return (
    <View style={styles.container}>
      <View style={styles.contents}>

        <TextInput placeholder='Enter first name..' value={fetchedUser.firstName} onChangeText={(name) => setFetchedUser({firstName: name})}></TextInput>
        <TextInput placeholder='Enter last name..' value={fetchedUser.lastName} onChangeText={(name) => setFetchedUser({lastName: name})}></TextInput>
        
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