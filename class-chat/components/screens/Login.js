import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function Login() {
  return (
    <View style={styles.loginContainer}>
        <Text>Log in</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  loginContainer: {
        backgroundColor: 'tomato'
    }
})
