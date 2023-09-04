import { View, Text } from 'react-native'
import React, { createContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_ROOT_URL } from '../constants/General';

export const AuthContext = createContext()

const AuthProvider = ({children}) => {
    
    const [apiMessage, setApiMessage] = useState(null);
    const [accessData, setAccessData] = useState({
        accessToken: null,
        userId: null,
        userName: null,
    });
    const [username, setUsername] = useState('EmilTobias');
    const [password, setPassword] = useState('1234');
    // const [image, setImage] = useState('https://img.freepik.com/free-photo/3d-rendering-emotions_23-2149081943.jpg?w=900&t=st=1693827529~exp=1693828129~hmac=c0d9113e4276dfba35e19475e250d4a8059cb02a0f6647add1328b6609d2e879');
    const [image, setImage] = useState(null);
    
    
    const handleLogin = async (username, password) => {
        try {
            const response = await fetch(API_ROOT_URL+"auth/token", {
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
                    return setApiMessage(authorization.message)
                }
                else return authorization.message
            }
            setApiMessage("")
            await AsyncStorage.setItem('accessToken', authorization.data.accessToken)

            setAccessData({
                ...accessData, 
                accessToken:authorization.data.accessToken, 
                userId:authorization.data._id, 
                userName:authorization.data.username
            })  

        } catch (error) {
            console.log('fetchAuthToken catch -> '+error)
        }
    }
    
    const isLoggedIn = async () => {
        try {
            const token = await AsyncStorage.getItem('accessToken')
            setAccessData({...accessData, accessToken:token})
        } catch (error) {
            console.log(error)
        }
    }
    
    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('accessToken')
            setAccessData({
                ...accessData, 
                accessToken:null, 
                userId:null, 
                userName:null,
            })
            
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
            const response = await fetch(API_ROOT_URL+"auth/register", {
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

                // if(registration.status == 200) {
                //     return setApiMessage(registration.message)
                //     //   navigatimilon.navigate('Login')
                // }

                if(registration.status === 200) {
                    setApiMessage(registration.message)
                    return true;
                    // navigation.navigate('Login');
                }

                if(registration.status == 409 || registration.status == 500 ) {
                    if(registration.message === 'Username already exists') {
                       return setApiMessage('Username already exists')

                    } else if (registration.message === "User validation failed: username: Path `username` is required.") {
                       return setApiMessage('Must enter a username')
                    }

                }
        } catch (error) {
            console.log('registerUser catch -> '+error)
        }
    }

    // !----REGISTER LOGIC ENDS----!


    return (
        <AuthContext.Provider value={{
            accessData, 
            setAccessData,
            handleLogin, 
            handleLogout, 
            registerUser, 
            apiMessage, 
            setApiMessage,
            isLoggedIn,
            username,
            password,
            setUsername,
            setPassword,
            image,
            setImage
        }}>
          {children}
        </AuthContext.Provider>
      )
}

export default AuthProvider