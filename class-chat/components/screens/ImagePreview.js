import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, {useState} from 'react'

const ImagePreview = ({picture, setPicture, savePicture}) => {



  return (
    <View style={styles.container}>
            <Image source={{uri: picture.uri}} style={{flex: 1}} />
        <View style={[styles.choiceContainer]}>
            <TouchableOpacity style={styles.deleteImg} onPress={() => {setPicture(null)}}>
                <Text style={{fontWeight: 'bold'}}>DELETE</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.saveImg]} onPress={() => {savePicture()}}>
                <Text style={{fontWeight: 'bold'}}>SAVE</Text>
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
        
      },
      deleteImg: {
        width: '50%',
        alignItems: 'center'
    },
    saveImg: {
        width: '50%',
        alignItems: 'center',
        borderLeftWidth:1
    },
})