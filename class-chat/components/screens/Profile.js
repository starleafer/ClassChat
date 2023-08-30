import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext';
import { TextInput } from 'react-native-gesture-handler';


const Profile = () => {

  const {handleLogout, accessToken} = useContext(AuthContext);
  const [fetchedUser, setFetchedUser] = useState({})
  const [firstname, setFirstname] = useState()
  const [lastname, setLastname] = useState()

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

  const updateUser = async () => {
    try {
      const response = await fetch('https://chat-api-with-auth.up.railway.app/users', { 
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + accessToken
        },
        body: JSON.stringify({
          firstname: firstname,
          lastname: lastname,
        }),

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

  // Break out "check for firstname / lastname" logic into a function
  
  return (
    <View style={styles.container}>
      <View style={styles.contents}>
        
        {
            "firstname" in fetchedUser && "lastname" in fetchedUser
           ? 
            <>
              <TextInput value={fetchedUser.firstname} onChangeText={(name) => setFirstname(name)}></TextInput>
              <TextInput value={fetchedUser.lastname} onChangeText={(name) => setLastname(name)}></TextInput>
              <Button title="Uppdatera" onPress={() => updateUser()} />
            </>
           : "firstname" in fetchedUser || "lastname" in fetchedUser
              ? "firstname" in fetchedUser
                ? <>
                    <TextInput value= {firstname} placeholder={fetchedUser.firstname} onChangeText={(name) => setFirstname(name)}></TextInput>
                    <TextInput value= {lastname} placeholder='Add a lastname' onChangeText={(name) => setLastname(name)}></TextInput>
                    <Button title="Uppdatera" onPress={() => updateUser()} />
                  </>
                : <>
                    <TextInput value= {firstname} placeholder='Add a firstname' onChangeText={(name) => setFirstname(name)}></TextInput>
                    <TextInput value= {lastname} placeholder={fetchedUser.lastname} onChangeText={(name) => setLastname(name)}></TextInput>
                    <Button title="Uppdatera" onPress={() => updateUser()} />
                  </>
              : <>
                  <TextInput value= {firstname} placeholder='Add a firstname' onChangeText={(name) => setFirstname(name)}></TextInput>
                  <TextInput value= {lastname} placeholder='Add a lastname' onChangeText={(name) => setLastname(name)}></TextInput>
                  <Button title="Uppdatera" onPress={() => updateUser()} />
                  
                </>
        }
        <Button title="Update user" onPress={() => {handleLogout()}} />
        <Button title="Delete user" onPress={() => {handleLogout()}} />
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
  }

})