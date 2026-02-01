import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";
import { useSelector } from "react-redux";
import RazorpayCheckout from 'react-native-razorpay';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import services from "@api/services";
import Header from '@components/Header';

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
        value: "PartialPay",
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

const PAYMENT_OPTIONS = {
    PAY_NOW: 'PayNow',
    PARTIAL_PAY: 'PartialPay',
};

const PAYMENT_TYPE_MAP = {
    PayNow: 'Full',
    PartialPay: 'Partial',
};

const PaymentScreen = ({ route, navigation }) => {

    const { BookingId, isPayAtHotelEnabled = true } = route?.params
    const { userDetail } = useSelector((state) => state.auth)

    const filteredPaymentOptions = paymentOptions.filter(option => {
        if (!isPayAtHotelEnabled && option.value === "PayAtHotel") {
            return false;
        }
        return true;
    });

    const [selected, setSelected] = useState(null);

    const bookHandler = async (option) => {
        setSelected(option)

        let paymentType = PAYMENT_TYPE_MAP[option] || '';

        // 🔹 Online / Partial payment
        if (option === PAYMENT_OPTIONS.PAY_NOW || option === PAYMENT_OPTIONS.PARTIAL_PAY) {
            const resp = await services.paymentGatewayService(
                BookingId,
                paymentType
            )
            console.log('resp', resp)
            const { order_id, amount } = resp?.data?.data || {};

            openRazorpay(
                order_id,
                amount,
                paymentType,
                BookingId,
                option
            )
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
            if (res?.data?.status) {
                setTimeout(() => {
                    navigation.navigate('BookingConfirmed', { BookingId })
                }, 1000)
            }
        }
    }

    const openRazorpay = async (orderId, amount, paymentType, bookingId, option) => {
        const paidAmount = amount / 100;

        const options = {
            key: 'rzp_test_Eqmw0XU2XIG31l',
            amount: amount,
            currency: 'INR',
            name: 'RROOMS',
            description: 'RRooms Hotel Booking Payment',
            image: 'https://rrooms.in/logo.webp',
            order_id: orderId,
            prefill: {
                name: userDetail?.name,
                email: userDetail?.email,
                contact: userDetail?.mobile,
            },
            theme: { color: '#fb961b' },
        };

        try {
            const response = await RazorpayCheckout.open(options);

            // 🔹 Razorpay Success
            await axios.post(
                `https://rrooms.in/rrooms/api/rrooms-property/razorpay-status-update`,
                {
                    booking_id: bookingId,
                    paymentType,
                    paidAmount,
                    userId: userDetail?.id,
                    dueAmount:
                        paymentType === 'Full'
                            ? 0
                            : bookingDetail?.dueAmount - paidAmount,

                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature,
                }
            );

            const paymentMode =
                option === 'PayNow' || option === 'PartialPay' ? 1 : 0;

            await services.updateBookingModeStatusService(bookingId, {
                status: 1,
                paymentMode,
                paymentAmount: paymentType,
            });

            navigation.navigate('BookingConfirmed', { bookingId });

        } catch (error) {
            // 🔹 Payment Failed / Cancelled
            console.log('Razorpay Error:', error);
        }
    };

    // https://rrooms.in/rrooms/api/rrooms-property/initiate-payment-razorpay?booking_id=67173&paymentType=Full
    // https://rrooms.in/rrooms/api/rrooms-property/initiate-payment-razorpay?booking_id=67178&paymentType=Full


    return (
        <View style={styles.screenWrapper}>
            <Header showBack={'Select Payment Method'} profileIcon={false} />
            <ScrollView>
                {
                    filteredPaymentOptions?.map((option) => {
                        return (
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
                        )
                    })}
            </ScrollView>
        </View>
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
