import { View, Text } from 'react-native'
import React, { createContext, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_ROOT_URL } from '../constants/General';

export const AuthContext = createContext()

const AuthProvider = ({children}) => {

    const [accessToken, setAccessToken] = useState(null);

    const fetchAuthToken = async (username, password) => {
        try {
            console.log(username + password)
            
            const response = await fetch("https://chat-api-with-auth.up.railway.app/auth/token", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(
                    {
                        username: username,
                        password: password
                    })
                });
                
                const authorization = await response.json();
                console.log(authorization)

                if(authorization.status == 401) {
                    if(authorization.message === 'Incorrect user information') {
                        return alert('FU')
                    }
                    else return authorization.message
                }

                setAccessToken(authorization.data.accessToken)

        } catch (error) {
            console.log(error)
        }
    }

    const handleLogin = async (username, password) => {
        try {
            fetchAuthToken(username, password)
            await AsyncStorage.setItem('accessToken', accessToken)
            
        } catch (error) {
            console.log(error)
        }
    }

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('accessToken')
            setAccessToken(null)
            
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <AuthContext.Provider value={{accessToken, handleLogin, handleLogout}}>
          {children}
        </AuthContext.Provider>
      )
}

export default AuthProvider