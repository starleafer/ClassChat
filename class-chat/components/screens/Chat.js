import { Button, Image, ImageBackground, StyleSheet, Text, View, } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { FlatList, TextInput, TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/Ionicons";
import { API_ROOT_URL } from "../constants/General";

const Chat = () => {
  const { accessData, isLoggedIn, username, image } =
    useContext(AuthContext);
  const [messages, setMessages] = useState([{}]);
  const [reversedData, setReversedData] = useState([]);
  const [textMsg, setTextMsg] = useState("");

  const fetchAllMessages = async () => {
    try {
      const response = await fetch(API_ROOT_URL + "messages", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessData.accessToken,
        },
      });

      const msgLog = await response.json();
      // console.log("MESSAGES ->" + msgLog.data);
      setMessages(msgLog);
      setReversedData(msgLog.data.reverse());
    } catch (error) {
      console.log("fetchAllMessages catch ->" + error);
    }
  };

  // DELETE
  const deleteMessage = async (messageId) => {
    try {
      const response = await fetch(API_ROOT_URL + "messages/" + messageId, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessData.accessToken,
        },
      });

      const msgLog = await response.json();
      fetchAllMessages();
    } catch (error) {
      console.log("fetchAllMessages catch ->" + error);
    }
  };

  const createMessage = async () => {
    try {
      await fetch(API_ROOT_URL + "messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessData.accessToken,
        },
        body: JSON.stringify({
          content: textMsg,
        }),
      });

      setTextMsg("");
      fetchAllMessages();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllMessages();
  }, []);
 
  return (
    <View style={styles.container}>
      <FlatList
        inverted
        data={reversedData}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => (
          <View style={styles.textContainer}>
            {messages.data !== null ? (
              item.user !== null ? (
                item.user.username === username ? (
                  item.user.image !== null ? (
                    <TouchableOpacity
                    style={styles.userTextContainer}
                      onLongPress={() => {
                        deleteMessage(item._id);
                      }}
                      delayLongPress={2000}
                    >
                      <Text style={{color: 'grey', margin: 5,}}>{item.user.username}</Text>
                      <View style={styles.textAndImage}>
                        <Text style={styles.userMessage}>
                          {item.content}
                          {/* {item.user.username} */}
                        </Text>
                        <Image 
                            source={{uri: image}}
                            style={styles.userImage}
                        />
                      </View>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                    style={styles.userTextContainer}
                      onLongPress={() => {
                        deleteMessage(item._id);
                      }}
                      delayLongPress={2000}
                    >
                      {/* <Image
                        source={{uri: image}}
                        style={styles.userImage}
                      /> */}
                      <Text style={{color: 'grey', margin: 5,}}>{item.user.username}</Text>
                      <Text style={styles.userMessage}>
                        {item.content}
                        {/* {item.user.username} */}
                      </Text>
                    </TouchableOpacity>
                  )
                ) : item.user.image !== undefined ? (
                  <View style={styles.othersTextContainer}>
                    <Text style={{color: 'grey', margin: 5}}>{item.user.username}</Text>
                    <View style={styles.othersTextAndImage}>
                      <Image 
                      style={{ 
                        width: 35, 
                        height: 35, 
                        borderRadius: 50, 
                        borderWidth: 1, 
                        marginTop: 3,
                        borderColor: 'pink' }}
                      // source={{ uri: item.user.image }}
                      />
                      <Text style={styles.message}>
                        {item.content}
                        {/* {item.user.username} */}
                        {/* {item.date} */}
                      </Text>
                    </View>
                  </View>
                ) : (
                  <View style={styles.othersTextContainer}>
                    <Text style={{color: 'grey', marginLeft: 5,}}>{item.user.username}</Text>
                    <Text style={styles.message}>
                      {item.content}
                      {/* {item.user.username} */}
                      {/* {item.date} */}
                    </Text>
                  </View>
                )
              ) : (
                <View style={styles.othersTextContainer}>
                  <Text style={styles.message}>
                    {/* {item.date} */}
                    {item.content}
                  </Text>
                </View>
              )
            ) : (
              <Text>Loading..</Text>
            )}
          </View>
        )}
      />
      <View style={styles.inputsContainer}>
        <TextInput
          style={styles.msgInput}
          value={textMsg}
          onChangeText={(msg) => setTextMsg(msg)}
        ></TextInput>
        <TouchableOpacity style={styles.icon} onPress={() => createMessage()}>
          <Ionicons name="send" size={30} color="lightgreen" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#242038",
    paddingHorizontal: 5,
  },
  textContainer: {
    marginVertical: 10,
  },
  message: {
    // flexDirection: "column",
    color: "#fff",
    textAlign: 'left',
    maxWidth: 250,
    padding: 10,
    marginHorizontal: 3,
    borderRadius: 15,
    backgroundColor: "#4c4c4d",
  },
  othersTextContainer: {
    alignItems: 'flex-start',
  },
  othersTextAndImage: {
    flexDirection: 'row',
  },
  userTextContainer: {
    alignItems: 'flex-end',
  },
  userMessage: {
    color: "#fff",
    backgroundColor: "#298758",
    textAlign: "right",
    borderRadius: 15,
    padding: 10,
    marginHorizontal: 3,
    padding: 10,
    maxWidth: 250,
  },
  userImage: {
    borderRadius: 50,
    marginTop: 3,
    width: 35,
    height: 35,
   borderWidth: 1,
   borderColor: '#298758',
  },
  textAndImage: {
    flexDirection: 'row'
  },
  inputsContainer: {
    flexDirection: "row",
  },
  msgInput: {
    borderWidth: 1,
    backgroundColor: "transparent",
    color: "#F7ECE1",
    borderColor: "#F7ECE1",
    borderRadius: 10,
    width: "80%",
    height: 60,
    marginVertical: 10,
    marginLeft: 10,
    padding: 5,
  },
  icon: {
    borderWidth: 1,
    borderRadius: 50,
    borderColor: "#F7ECE1",
    width: 60,
    height: 60,
    marginLeft: 5,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
