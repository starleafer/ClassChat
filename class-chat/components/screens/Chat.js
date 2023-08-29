import { Button, StyleSheet, Text, View } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { FlatList, TextInput } from "react-native-gesture-handler";

const Chat = () => {
  const { accessToken, isLoggedIn, username } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [textMsg, setTextMsg] = useState("");

  const fetchAllMessages = async () => {
    console.log(username)
    try {
      const response = await fetch(
        "https://chat-api-with-auth.up.railway.app/messages",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken,
          },
        }
      );

      const msgLog = await response.json();
      // console.log("MESSAGES ->" + msgLog.data[0].content);
      setMessages(msgLog);
    } catch (error) {
      console.log("fetchAllMessages catch ->" + error);
    }
  };

  const createMessage = async () => {
    try {
      await fetch("https://chat-api-with-auth.up.railway.app/messages",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
        body: JSON.stringify(
            {
                content: textMsg
            })
      }
    );

    setTextMsg('')
    fetchAllMessages()
      
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    // isLoggedIn();
    fetchAllMessages();
  }, []);

  return (
    <View style={styles.container}>
      {/* {messages.status == 200 
        ? messages.data.map((message) => {
          <View key={message._id} style={styles.textContainer}>
            <Text>{message.content}</Text>
          </View>
        }) 
       : null} */}

      <FlatList
        data={messages.data}
        renderItem={({ item }) => (
          <View style={styles.textContainer}>
            {username == "testing53" 
              ? <Text style={styles.userMessage}>{item.date}{item.content}</Text>
              : <Text style={styles.message}>{item.date}{item.content}</Text>
            }
            {/* <Text style={styles.userMessage}>{item.date}{item.content}</Text> */}
             
          </View>
        )}
        keyExtractor={item => item._id} />
        

      <TextInput style={styles.msgInput} value={textMsg} onChangeText={(msg) =>setTextMsg(msg)}></TextInput>
      <Button title="Skicka" onPress={() => createMessage()}/>

    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "skyblue",
  },
  textContainer: {
    marginVertical: 10,
    borderWidth: 1,
  },
  message: {
    flexDirection: 'column',
    color: 'green',
  },
  msgInput: {
    borderWidth: 1,
    backgroundColor: '#fff',
    width: '100%',
    marginVertical: 10,
    padding: 5,
  },
  userMessage: {
    color: 'red',
  }
});
