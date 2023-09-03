import {
  Button,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import {
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/Ionicons";
import { API_ROOT_URL } from "../constants/General";

const Chat = () => {
  const { accessData, isLoggedIn, username, fetchedUser } =
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
    // isLoggedIn();
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
                      onLongPress={() => {
                        deleteMessage(item._id);
                      }}
                      delayLongPress={2000}
                    >
                      <Image
                        // style={{ flex: 1, width: 100, height: 100 }}
                        // source={{ uri: fetchedUser.image }}
                      />
                      <Text style={styles.userMessage}>
                        {item.content}
                        {item.user.username}
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onLongPress={() => {
                        deleteMessage(item._id);
                      }}
                      delayLongPress={2000}
                    >
                      <Image
                        // style={{ flex: 1, width: 100, height: 100 }}
                        // source={{ uri: fetchedUser.image }}
                      />
                      <Text style={styles.userMessage}>
                        {item.content}
                        {item.user.username}
                      </Text>
                    </TouchableOpacity>
                  )
                ) : item.user.image !== undefined ? (
                  <View>
                    <Image 
                    style={{ flex: 1, width: 20, height: 20, backgroundColor: 'blue' }}
                    // source={{ uri: item.user.image }}
                    />
                    <Text style={styles.message}>
                      {item.user.username}
                      {item.date}
                      {item.content}
                    </Text>
                  </View>
                ) : (
                  <View>
                    <Text style={styles.message}>
                      {item.user.username}
                      {item.date}
                      {item.content}
                    </Text>
                  </View>
                )
              ) : (
                <Text style={styles.message}>
                  {item.date}
                  {item.content}
                </Text>
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
          <Ionicons name="send" size={30} color="#F7ECE1" />
        </TouchableOpacity>
      </View>
      {/* <Button title="Skicka" onPress={() => createMessage()} /> */}
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#242038",
  },
  textContainer: {
    marginVertical: 10,
    // borderWidth: 1,
    // paddingHorizontal: 5,
    // width: '70%'
  },
  message: {
    flexDirection: "column",
    color: "#fff",
    width: 250,
    padding: 10,
    marginHorizontal: 3,
    borderRadius: 15,
    backgroundColor: "gray",
  },
  userMessage: {
    color: "#fff",
    backgroundColor: "tomato",
    textAlign: "right",
    borderRadius: 15,
    paddingHorizontal: 5,
    marginHorizontal: 3,
    marginLeft: "38%",
    padding: 10,
    width: 250,
    // justifyContent: "flex-end",
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
