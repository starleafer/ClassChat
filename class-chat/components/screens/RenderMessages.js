import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const RenderMessages = () => {
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
                      <TouchableOpacity onLongPress={() => {deleteMessage(item._id)}} delayLongPress={2000}>
                        <ImageBackground  source={item.user.image !== null ? item.user.image : ''}>
                            <Text style={styles.userMessage}>
                            {item.content}{item.user.username}
                            </Text>
                        </ImageBackground>
                      </TouchableOpacity>
                    ) : (
                    <ImageBackground source={item.user.image !== null ? item.user.image : ''}>
                        <Text style={[styles.message]}>
                            {item.user.username}
                            {item.date}
                        {item.content}
                        </Text>
                    </ImageBackground>
                    )
                  ) : (
                    <Text style={styles.message}>
                      {/* {item.date}
                      {item.content} */}
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
            <TouchableOpacity
              style={styles.icon}
              onPress={() => createMessage()}
            >
              <Ionicons name="send" size={30} color="#F7ECE1" /> 
            </TouchableOpacity>
          </View> 
          {/* <Button title="Skicka" onPress={() => createMessage()} /> */}
        </View>
      );
}

export default RenderMessages

const styles = StyleSheet.create({})