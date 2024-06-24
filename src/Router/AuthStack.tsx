import { StyleSheet, Text, View } from 'react-native'
import React from 'react'


import SignUp from '../Screens/SignUp'

import Login from '../Screens/Login'

export type AuthStackParamList = {
    SignUp: undefined,
    Login: undefined
}

import { createNativeStackNavigator } from '@react-navigation/native-stack'


const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTitleAlign: 'center',
                headerBackVisible: false
            }}
        >
            <Stack.Screen
                name='Login'
                component={Login}
            />
            <Stack.Screen
                name='SignUp'
                component={SignUp}
            />
        </Stack.Navigator>
    )
}

export default AuthStack

const styles = StyleSheet.create({})