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
        userName:null,
        firstName:null,
        lastName:null,
    });
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
                        // return alert(authorization.message)
                        // Ersätt med ett state för error meddelanden
                    }
                    else return authorization.message
                }
                setApiMessage("")
                await AsyncStorage.setItem('accessToken', authorization.data.accessToken)
                setAccessData({accessToken:authorization.data.accessToken})
                setAccessData({userId:authorization.data._id})
                setAccessData({userName:authorization.data.username})
                if(authorization.data.firstname)
                    setAccessData({firstName:authorization.data.firstname})
                if(authorization.data.lastname)
                    setAccessData({lastName:authorization.data.lastname})
                
                

        } catch (error) {
            console.log('fetchAuthToken catch -> '+error)
        }
    }
    
    const isLoggedIn = async () => {
        try {
            const token = await AsyncStorage.getItem('accessToken')
            setAccessData({accessToken:token})
        } catch (error) {
            console.log(error)
        }
    }
    
    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('accessToken')
            setAccessData({accessToken:null})
            
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

                if(registration.status == 200) {
                    return setApiMessage(registration.message)
                    //   navigatimilon.navigate('Login')
                    
                }

                if(registration.status == 409 || registration.status == 500 ) {
                    if(registration.message === 'Username already exists') {
                       return setApiMessage('Username already exists')
                        // return alert('Username already exists')
                    } else if (registration.message === "User validation failed: username: Path `username` is required.") {
                       return setApiMessage('Must enter a username')
                        // return alert('Must enter a username')
                    }
                    // else return alert(registration.message)
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
            fetchedUser,
            setFetchedUser
        }}>
          {children}
        </AuthContext.Provider>
      )
}

export default AuthProvider