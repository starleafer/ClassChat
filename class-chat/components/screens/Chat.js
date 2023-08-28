import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../contexts/AuthContext';

const fetchAllMessages = async () => {
  const {accessToken, isLoggedIn} = useContext(AuthContext);
  try {
      
      const response = await fetch("https://chat-api-with-auth.up.railway.app/messages", {
          method: 'GET',
          headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + {accessToken},
          },
          // body: JSON.stringify(
          //     {
          //         username: username,
          //         password: password
          //     })
          });
          
          const msgLog = await response.json();
          console.log('MESSAGES ->'+msgLog)

  } catch (error) {
      console.log('fetchAllMessages catch ->'+error)
  }
  useEffect( ()=> {
    // isLoggedIn();
    fetchAllMessages();
  })
}


const Chat = () => {
  return (
    <View style={styles.container}>
      <Text>Chat</Text>
    </View>
  )
}

export default Chat

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'skyblue'
    }
})