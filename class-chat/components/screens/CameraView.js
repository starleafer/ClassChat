import { Camera, CameraType, FlashMode } from 'expo-camera';
import { useEffect, useRef, useState } from 'react';
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as MediaLibrary from 'expo-media-library';

export default function CameraView() {
    
    const [hasCameraPermission, setHasCameraPermission] = useState(null)
    const [hasMediaPermission, setHasMediaPermission] = useState(null)
    
    useEffect(() => {
        (async () => {
            const CameraPermissions = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(CameraPermissions.status == 'granted')
            const MediaPersmissions = await MediaLibrary.requestPermissionsAsync();
            setHasMediaPermission(MediaPersmissions.status == 'granted')
        })();
    })

    const cameraRef = useRef(null)
    const [type, setType] = useState(CameraType.front);
    const [flash, setFlash] = useState(FlashMode.off);
    
    const takePicture = async () => {
        if (cameraRef.current) {
            try {
                const picture = await cameraRef.current.takePictureAsync();
                console.log(picture)
                setPicture(picture)
            } catch (error) {
                console.log(error)
            }
        }
    }

    const toggleCameraType = () => {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }
  const toggleFlash = () => {
    setFlash(current => (current === FlashMode.off ? FlashMode.on : FlashMode.off));
  }
  const [picture, setPicture] = useState(null);

  const savePicture = async () => {
      try {
          const asset = await MediaLibrary.createAssetAsync(picture.uri)
          const album = await MediaLibrary.getAlbumAsync('Expo')
          
          if(album == null) {
              await MediaLibrary.createAlbumAsync('Expo', asset, false)
          } else {
              await MediaLibrary.addAssetsToAlbumAsync(asset, album.id, false ) 
          }

          setPicture(null)

      } catch (error) {
          console.log(error)
      }
  }

  if (hasCameraPermission === null || hasMediaPermission === null) 
    return <View><Text>Waiting</Text></View>;

  if (hasCameraPermission === false || hasMediaPermission === false)
    return <View><Text>Denied</Text></View>;

    if(picture !== null) {
        return (
            // Replace with ImagePreview component
            <View style={styles.container}>
                <Image source={{uri: picture.uri}} style={{flex: 1}} />
            <View>
                <TouchableOpacity onPress={() => {setPicture(null)}}>
                    <Text>NEW IMAGE ICON GOES HERE</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {savePicture()}}>
                    <Text>SAVE IMAGE ICON GOES HERE</Text>
                </TouchableOpacity>
            </View>
            </View>
        )
    } else {
        return (
            <View style={styles.container}>
              <Camera
                style={styles.camera} 
                type={type} 
                flashMode={flash} 
                ref={cameraRef}
            >
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
                    <Text style={styles.text}>Flip Camera</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={toggleFlash}>
                    <Text style={styles.text}>Toggle Flash</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={takePicture}>
                    <Text style={styles.text}>Take Picture</Text>
                  </TouchableOpacity>
                </View>
              </Camera>
            </View>
          );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
