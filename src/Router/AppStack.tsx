import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import Home from '../Screens/Home'

export type AppStackParamList = {
    Home: undefined
}

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from "@react-navigation/native"


const Stack = createNativeStackNavigator<AppStackParamList>();

const AppStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTitleAlign: 'center',
                headerBackVisible: false
            }}
        >
            <Stack.Screen
                name='Home'
                component={Home}
            />
        </Stack.Navigator>
    )
}

export default AppStack

const styles = StyleSheet.create({})