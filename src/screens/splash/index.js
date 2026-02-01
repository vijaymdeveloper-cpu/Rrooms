import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, ImageBackground, Image, View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "@store/slices/authSlice";

const splashImage = require('@assets/images/bg-sp24.png');

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

        setTimeout(() => {
            checkToken()
        }, 3000)
    }, []);

    if (loading) {
        return (
            <ImageBackground source={splashImage} style={styles.container} resizeMode="cover">


                <View style={styles.container}>
                    {/* <View style={styles.logoContainer}>
                    <Image source={require('@assets/images/logo.png')} style={styles.imgLogo} />
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[styles.textLogo, { color: '#fb961b', marginRight: 5 }]}>R</Text>
                        <Text style={styles.textLogo}>ROOMS</Text>
                    </View>
                </View> */}
                    {/* <Image source={splashImage} style={{
                    width: '100%',
                    height: 500
                }} /> */}



                </View>
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="small" color="#2884EF" />
                    <Text style={{ color: '#000000', marginTop: 10 }}>Find your perfect stay</Text>
                </View>
            </ImageBackground>
        );
    }

    return children;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 58,
        // backgroundColor: "#fff6f6",
    },
    logoContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        marginBottom: 20
    },
    textLogo: {
        color: '#3C4043',
        fontWeight: '900',
        fontSize: 30,
        letterSpacing: 2,
        paddingTop: 8
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
        position: 'absolute',
        bottom: 38,
    },
    imgLogo: {
        width: 50,
        height: 65,
        resizeMode: 'contain'
    }
});
