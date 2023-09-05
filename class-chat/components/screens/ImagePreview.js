import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, {useState} from 'react'

const ImagePreview = ({picture, setPicture, savePicture}) => {



  return (
    <View style={styles.container}>
            <Image source={{uri: picture.uri}} style={{flex: 1}} />
        <View style={[styles.choiceContainer]}>
            <TouchableOpacity style={styles.deleteImg} onPress={() => {setPicture(null)}}>
                <Text>DELETE</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.saveImg]} onPress={() => {savePicture()}}>
                <Text>SAVE</Text>
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
      choiceContainer: {
        flexDirection: 'row',
        marginVertical: 20,
        backgroundColor: 'wheat'
        
      },
      deleteImg: {
        width: '50%',
        alignItems: 'center'
    },
    saveImg: {
        width: '50%',
        alignItems: 'center',
    },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.7,
        shadowRadius: 3,
    },
})