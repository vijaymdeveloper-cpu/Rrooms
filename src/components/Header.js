import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { baseImgUrl } from '@api/client';
import { isValidImage } from '@utils';
import ROUTES from "../navigation/routes";

const Header = ({ showBack = false, profileIcon = true }) => {

    const navigation = useNavigation();

    const { userDetail } = useSelector((state) => state.auth);

    return (
        <View style={styles.header}>
            {showBack ? (
                <View style={styles.backButton}>
                    <TouchableOpacity style={styles.btncircle} onPress={() => navigation.goBack()}>
                        <Icon name="arrow-back" size={24} />
                    </TouchableOpacity>
                    <Text style={styles.title}>{showBack}</Text>
                </View>
            ) : (
                <View>
                    <Image
                        source={require("@assets/images/logo.png")}
                        style={styles.logo}
                    />
                </View>
            )}
            {
                !showBack &&
                <Text style={styles.textLogo}>
                    <Text style={{ color: '#ff9d25' }}>R</Text>ROOMS
                </Text>
            }

            {
                profileIcon &&
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => navigation?.navigate('Tabs', { screen: ROUTES.ACCOUNT })}>
                    <Image
                        source={
                            isValidImage(userDetail?.profileImage)
                                ? { uri: `${baseImgUrl}${userDetail?.profileImage}` }
                                : require('@assets/images/img-profile.png')
                        }
                        style={styles.profile}
                    />
                </TouchableOpacity>
            }

        </View>
    );
};

export default Header;


const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 40,
        marginBottom: 10
    },
    textLogo: {
        color: '#000',
        fontWeight: '900',
        fontSize: 22
    },
    logo: {
        width: 32,
        height: 40,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    btncircle: {
        width: 40,
        height: 40,
        justifyContent: 'center'
    },
    title: {
        fontWeight: '700',
        fontSize: 18,
        lineHeight: 40,
        marginLeft: 2
    },
    profile: {
        width: 40,
        height: 40,
        borderRadius: 20,
    }
});