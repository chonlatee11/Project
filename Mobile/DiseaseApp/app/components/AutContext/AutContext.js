import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export const AuthContex = createContext();

export const AuthProvider = ({children}) => {
    const [isLoading, setisLoading] = useState(false);
    const [userToken, setUserToken] = useState(null);

    const Login = () => {
        setUserToken('abc');
        setisLoading(true);
        AsyncStorage.setItem('userToken', 'abc');
        setisLoading(false);
    }
    const Logout = () => {
        setisLoading(true);
        setUserToken(null);
        AsyncStorage.removeItem('userToken');
        setisLoading(false);
    }

    const IsLogin = async () => {
        try {
            setisLoading(true);
            let userToken = await AsyncStorage.getItem('userToken');
            setUserToken(userToken);
            setisLoading(false);
        } catch (error) {
            Alert.alert('Error', error);
        }
    }

    useEffect(() => {
        IsLogin();
    }, []);

    return (
        <AuthContex.Provider value={{Login, Logout, userToken, isLoading}}>
        {children}
        </AuthContex.Provider>
    );
};