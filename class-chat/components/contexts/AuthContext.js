import { View, Text } from 'react-native'
import React, { createContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_ROOT_URL } from '../constants/General';

export const AuthContext = createContext()

const AuthProvider = ({children}) => {
    
    const [errormsg, setErrorMsg] = useState(null);
    const [accessToken, setAccessToken] = useState('');
    const [username, setUsername] = useState('Emil&Tobias');
    const [password, setPassword] = useState('CrazyHorse');
    const [fetchedUser, setFetchedUser] = useState({
        firstName: "",
        lastName: "",
        image: "",
      })
    
    const handleLogin = async (username, password) => {
        try {
            // console.log(username + password)
            
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

                if(authorization.status == 401) {
                    if(authorization.message === 'Incorrect user information') {
                        return alert(authorization.message)
                        // Ersätt med ett state för error meddelanden
                    }
                    else return authorization.message
                }

                await AsyncStorage.setItem('accessToken', authorization.data.accessToken)
                setAccessToken(authorization.data.accessToken)
                
                

        } catch (error) {
            console.log('fetchAuthToken catch -> '+error)
        }
    }
    
    const isLoggedIn = async () => {
        try {
            const token = await AsyncStorage.getItem('accessToken')
            setAccessToken(token)
        } catch (error) {
            console.log(error)
        }
    }
    
    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('accessToken')
            setAccessToken(null)
            
        } catch (error) {
            console.log('handleLogout catch -> '+ error)
        }
    }
    
    useEffect(() => {
        isLoggedIn()
    },[])

    // !----REGISTER LOGIC STARTS----!

    const registerUser = async (regUsername, regPassword, navigation) => {
        try {
            const response = await fetch("https://chat-api-with-auth.up.railway.app/auth/register", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(
                    {
                        username: regUsername,
                        password: regPassword
                    })
                });

                const registration = await response.json();
                // console.log(registration)

                if(registration.status == 409 || registration.status == 500 ) {
                    if(registration.message === 'Username already exists') {
                        setErrorMsg('Username already exists')
                        return alert('Username already exists')
                    } else if (registration.message === "User validation failed: username: Path `username` is required.") {
                        setErrorMsg('Must enter a username')
                        return alert('Must enter a username')
                    }
                    else return alert(registration.message)
                }
        } catch (error) {
            console.log('registerUser catch -> '+error)
        }
    }

    // !----REGISTER LOGIC ENDS----!


    return (
        <AuthContext.Provider value={{
            accessToken, 
            handleLogin, 
            handleLogout, 
            registerUser, 
            errormsg, 
            isLoggedIn,
            username,
            password,
            setUsername,
            setPassword,
            fetchedUser,
            setFetchedUser
        }}>
          {children}
        </AuthContext.Provider>
      )
}

export default AuthProvider