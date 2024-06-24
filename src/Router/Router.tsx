import { View, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'

import { NavigationContainer } from "@react-navigation/native"
import Loading from '../components/Loading'
import AppStack from './AppStack'
import AuthStack from './AuthStack'
import { AppwriteContext } from '../appwrite/AppwriteContext'

export const Router = () => {
    const [loading, setLoading] = useState<boolean>(true)
    const { appwrite, isLoggedIn, setIsLoggedIn } = useContext(AppwriteContext)

    useEffect(() => {
        appwrite
            .getCurrentUser()
            .then(res => {
                setLoading(false)
                if (res) {
                    setIsLoggedIn(true)
                }
            })
            .catch(_ => {
                setIsLoggedIn(false)
                setIsLoggedIn(false)
            })
    }, [appwrite, setIsLoggedIn])

    if (loading) {
        return <Loading />
    }
    return (
        <NavigationContainer >
            {isLoggedIn ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    )
}