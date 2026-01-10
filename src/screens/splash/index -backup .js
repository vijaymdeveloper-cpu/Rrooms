import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { setToken } from "@store/slices/authSlice";

export default function SplashScreen({ children }) {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    const { access_token } = useSelector((state) => state.auth)

    useEffect(() => {
        const checkToken = async () => {
            try {
                const token = access_token;

                if (token) {
                    dispatch(setToken(token));
                }
            } catch (error) {
                console.log("Splash token check error:", error);
            } finally {
                setLoading(false);
            }
        };

        checkToken();
    }, []);

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#2884EF" />
            </View>
        );
    }

    return children;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
});
