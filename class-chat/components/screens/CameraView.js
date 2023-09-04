import { Camera, CameraType, FlashMode } from 'expo-camera';
import { useContext, useEffect, useRef, useState } from 'react';
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import ImagePreview from './ImagePreview';
import { AuthContext } from '../contexts/AuthContext';
import { API_ROOT_URL } from '../constants/General';
import { Feather } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 


export default function CameraView({navigation}) {
    const {accessData, image, setImage} = useContext(AuthContext)
    
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

  //Saving picture to profile
  const savePicture = async () => {
      try {
        const response = await fetch(API_ROOT_URL+'users', { 
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + accessData.accessToken
          },
          body: JSON.stringify({
            image: picture.uri
          }),

        });
  
        const user = await response.json();
        console.log(user)
        setImage(picture.uri)

      } catch(error) {
        console.log(error)
      }

      try {
          const asset = await MediaLibrary.createAssetAsync(picture.uri)
          const album = await MediaLibrary.getAlbumAsync('Expo')
          
          if(album == null) {
              await MediaLibrary.createAlbumAsync('Expo', asset, false)
          } else {
              await MediaLibrary.addAssetsToAlbumAsync(asset, album.id, false ) 
          }

          console.log(picture.uri)
          // setFetchedUser({image:picture.uri})
          setPicture(null)
          navigation.navigate('Profile page');
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
            <ImagePreview 
              picture={picture}
              setPicture={setPicture}
              savePicture={savePicture}
            />
            // <View style={styles.container}>
            //     <Image source={{uri: picture.uri}} style={{flex: 1}} />
            // <View>
            //     <TouchableOpacity onPress={() => {setPicture(null)}}>
            //         <Text>NEW IMAGE ICON GOES HERE</Text>
            //     </TouchableOpacity>
            //     <TouchableOpacity onPress={() => {savePicture()}}>
            //         <Text>SAVE IMAGE ICON GOES HERE</Text>
            //     </TouchableOpacity>
            // </View>
            // </View>
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
                    {/* <Text style={styles.text}>Flip Camera</Text> */}
                    <Feather style={{bottom: 5,}} name="refresh-cw" size={40} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity style={[
                    styles.button, 
                    {
                      borderWidth: 3, 
                      borderColor: 'white', 
                      borderRadius: 50,
                      left: 5,
                      }
                  ]} onPress={takePicture}>
                  <Feather name="camera" style={{margin: 5}} size={40} color="white" />
                    {/* <Text style={styles.text}>Take Picture</Text> */}
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.button, {bottom: 5,}]} onPress={toggleFlash}>
                    { flash === FlashMode.on
                      ? 
                       (<Ionicons name="flash-outline" size={40} color="white"/>)
                      :
                       (<Ionicons name="flash-off-outline" size={40} color="white"/>)
                    }
                    {/* <Text style={styles.text}>Toggle Flash</Text> */}
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
    marginBottom: 30,
    alignItems: 'center',
    gap: 50,
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
