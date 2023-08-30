import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext';
import { TextInput } from 'react-native-gesture-handler';


const Profile = () => {

  const {handleLogout, accessToken} = useContext(AuthContext);
  const [fetchedUser, setFetchedUser] = useState({})

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
  
      setFetchedUser(user.data)
      console.log(fetchedUser)
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
        
        {
            "firstname" in fetchedUser && "lastname" in fetchedUser
           ? 
            <>
              <TextInput value={fetchedUser.firstname}></TextInput>
              <TextInput value={fetchedUser.lastname}></TextInput>
            </>
           : 
            <>
            <TextInput placeholder='Add a firstname'></TextInput>
            <TextInput placeholder='Add a lastname'></TextInput>
            </>
        }
        <TextInput></TextInput>
        <Button title="Update user" onPress={() => {handleLogout()}} />
        <Button title="Delete user" onPress={() => {handleLogout()}} />
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
  }

})