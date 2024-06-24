import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Snackbar from 'react-native-snackbar';
import { FAB } from '@rneui/base';
import { AppwriteContext } from '../appwrite/AppwriteContext';

type userObj = {
    names: string,
    email: string
};

const Home = () => {
    const [userData, setUserData] = useState<userObj | null>(null); // Initialize with null


    const { appwrite, setIsLoggedIn } = useContext(AppwriteContext);


    const handleLogout = () => {
        appwrite.logout()
            .then(() => {
                setIsLoggedIn(false);
                Snackbar.show({
                    text: "Logout successfully",
                    duration: Snackbar.LENGTH_SHORT
                });
            });
    };

    useEffect(() => {
        appwrite.getCurrentUser()
            .then((res) => {
                if (res) {
                    const user: userObj = {
                        names: res.name,
                        email: res.email
                    };
                    setUserData(user); // Update state with fetched user data
                }
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
            });
    }, [appwrite]);

    return (
        <View style={styles.container}>
            <Text>Home</Text>
            {userData && (
                <View>
                    <Text>Name: {userData.names}</Text>
                    <Text>Email: {userData.email}</Text>
                </View>
            )}
            <FAB
                onPress={handleLogout}
                icon={{ name: "logout ", color: "#FFFFFF" }}
            />
        </View>

    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
