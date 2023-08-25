import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext';

const Profile = () => {

  const {handleLogout} = useContext(AuthContext);

  return (
    <View>
      <Text>Profile</Text>
      <Button title="Logout" onPress={() => {handleLogout()}} />
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({})