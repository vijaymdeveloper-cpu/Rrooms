import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import services from "@api/services";

const paymentOptions = [
    {
        id: 1,
        title: "Pay Now",
        value: "PayNow",
        description: "Visa, MasterCard, Amex, Rupay and more",
        icon: require('@assets/images/payment1.png'),
        color: "#FF8C00",
    },
    {
        id: 2,
        title: "Pay @464 to Book",
        value: "ParcialPay",
        description: "Secure your booking now",
        icon: require('@assets/images/payment2.png'),
        color: "#00B050",
    },
    {
        id: 3,
        title: "Pay at Hotel",
        value: "PayAtHotel",
        description: "Flexible payment on arrival",
        icon: require('@assets/images/payment3.png'),
        color: "#1E90FF",
    },
];

const PaymentScreen = ({ route, navigation }) => {

    const { BookingId } = route?.params

    const [selected, setSelected] = useState(null);

    const bookHandler = async (option) => {
        setSelected(option)

        if (option === 'PayNow' || option === 'ParcialPay') {
        }
        else {
            const res = await services.updateBookingModeStatusService(
                BookingId,
                {
                    status: 1,
                    paymentMode: 0,
                    paymentAmount: false
                }
            )
            if(res?.data?.status){
                setTimeout(()=>{
                    navigation.navigate('BookingConfirmed', { BookingId })
                }, 1000)
            }
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.screenWrapper}>


            <Text style={styles.heading}>Select Payment Method</Text>

            {
                paymentOptions.map((option) => (
                    <TouchableOpacity
                        key={option.id}
                        activeOpacity={0.8}
                        style={[
                            styles.card,
                            selected === option.value && { borderColor: option.color, backgroundColor: "#FFF8F0" },
                        ]}
                        onPress={() => bookHandler(option?.value)}
                    >
                        <View style={styles.cardHeader}>
                            <Image source={option.icon} style={styles.icon} />
                            <View style={{ flex: 1, marginLeft: 12 }}>
                                <Text style={styles.title}>{option.title}</Text>
                                <Text style={styles.description}>{option.description}</Text>
                            </View>
                            {selected === option.value && (
                                <Ionicons name="checkmark-circle" size={24} color={option.color} />
                            )}
                        </View>

                        {option.id !== 3 && (
                            <View style={styles.paymentLogos}>
                                <Image
                                    source={require('@assets/images/payment-methods.png')}
                                    style={styles.logo}
                                />
                            </View>
                        )}
                    </TouchableOpacity>
                ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screenWrapper: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 10
    },
    heading: {
        fontSize: 22,
        fontWeight: "700",
        color: "#333",
        marginBottom: 14,
    },
    card: {
        backgroundColor: "#fff",
        borderWidth: 2,
        borderColor: "#eee",
        borderRadius: 16,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        padding: 16,
        marginBottom: 12,
    },
    cardHeader: {
        flexDirection: "row",
        alignItems: "center",
    },
    icon: {
        width: 40,
        height: 40,
        marginRight: 12,
    },
    title: {
        fontSize: 18,
        fontWeight: "600",
        color: "#222",
    },
    description: {
        fontSize: 13,
        color: "#555",
        marginTop: 4,
    },
    paymentLogos: {
        marginTop: 18
    }
});

export default PaymentScreen;
