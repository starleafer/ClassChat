import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { FlatList } from "react-native-gesture-handler";

const Chat = () => {
  const { accessToken, isLoggedIn } = useContext(AuthContext);
  const [messages, setMessages] = useState("");

  const fetchAllMessages = async () => {
    try {
      const response = await fetch(
        "https://chat-api-with-auth.up.railway.app/messages",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken,
          },
          // body: JSON.stringify(
          //     {
          //         username: username,
          //         password: password
          //     })
        }
      );

      const msgLog = await response.json();
      console.log("MESSAGES ->" + msgLog.data[0].content);
      setMessages(msgLog);
    } catch (error) {
      console.log("fetchAllMessages catch ->" + error);
    }
  };

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
          <View key={item._id} style={styles.textContainer}>
            <Text style={styles.message}>{item.date}{item.content}</Text>
          </View>
        )} />
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
  }
});
