import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, {useState} from 'react'

const ImagePreview = ({picture, setPicture, savePicture}) => {



  return (
     <View style={styles.container}>
                <Image source={{uri: picture.uri}} style={{flex: 1}} />
            <View>
                <TouchableOpacity onPress={() => {setPicture(null)}}>
                    <Text>DELETE IMAGE</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {savePicture()}}>
                    <Text>SAVE IMAGE</Text>
                </TouchableOpacity>
            </View>
            </View>
  )
}

export default ImagePreview

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
      },
})