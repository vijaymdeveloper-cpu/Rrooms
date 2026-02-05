import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";
import { useSelector } from "react-redux";
import RazorpayCheckout from 'react-native-razorpay';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import services from "@api/services";
import Header from '@components/Header';
import { mainUrl } from '@api/client'

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
        title: "Pay to Book",
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

    const [selected, setSelected] = useState(null);
    const { BookingId, amount, bookingType, payAtHotel, partialPayment, bookingDetail, redirectTo } = route?.params;
    const { userDetail } = useSelector((state) => state.auth)


    const isHourly = bookingType === "Hourly";
    const isFullDay = bookingType === "FullDay";
    const perSlotAmount = Math.floor(Number(amount) / 4);

    const filteredPaymentOptions = paymentOptions.filter((option) => {
        if (isHourly) {
            return option.id === 1;
        }
        if (option.id === 2) {
            return isFullDay && partialPayment === 1;
        }
        if (option.id === 3) {
            return payAtHotel === 1;
        }
        return true;
    });

    const bookHandler = async (option) => {
        try {
            setSelected(option)

            let paymentType = PAYMENT_TYPE_MAP[option] || '';

            if (option === PAYMENT_OPTIONS.PAY_NOW || option === PAYMENT_OPTIONS.PARTIAL_PAY) {
                const resp = await services.paymentGatewayService(
                    BookingId,
                    paymentType
                )
                const { order_id, amount } = resp?.data?.data || {};

                openRazorpay(order_id, amount, paymentType, BookingId, option, resp?.data?.data?.key)
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
                        navigation.navigate('BookingConfirmed', { bookingId: BookingId })
                    }, 1000)
                }
            }
        }
        catch (err) { console.log(err) }
    }

    const openRazorpay = async (orderId, amount, paymentType, bookingId, option, key) => {

        const paidAmount = Math.round(amount / 100);

        const options = {
            key: key,
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

            const res = await axios.post(
                `${mainUrl}/api/rrooms-property/razorpay-status-update` +
                `?booking_id=${bookingId}` +
                `&paymentType=${paymentType}` +
                `&paidAmount=${paidAmount}` +
                `&userId=${userDetail?.id}` +
                `&dueAmount=${paymentType === 'Full' ? 0 : bookingDetail?.dueAmount - paidAmount}`,
                {
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature,
                }
            );
            const paymentMode =
                option === 'PayNow' || option === 'PartialPay' ? 1 : 0;

            const newPayload = {
                status: 1,
                paymentMode,
                paymentAmount: paymentType,
            }
            if (paymentType == "Full" && paymentMode == 1) {
                newPayload.fullPayAmount = paidAmount
            }
            if (paymentType == "Partial" && paymentMode == 1) {
                newPayload.partialPayAmount = paidAmount
            }

            const x = await services.updateBookingModeStatusService(bookingId, newPayload);
            if (redirectTo == 'Bookings') {
                navigation?.navigate('Tabs', {screen: 'Bookings',});
            }
            else {
                navigation.navigate('BookingConfirmed', { bookingId });
            }

        } catch (error) {
            // 🔹 Payment Failed / Cancelled
            console.log('Razorpay Error:', error);
        }
    };

    console.log('redirectTo', redirectTo)


    return (
        <View style={styles.screenWrapper}>
            <Header showBack={'Select Payment Method'} profileIcon={false} />
            <ScrollView>
                {filteredPaymentOptions.map((option) => {

                    const isFullDayPartialPay =
                        bookingType === "FullDay" && option.id === 2;

                    const title = isFullDayPartialPay
                        ? `Pay @ ₹${perSlotAmount} to Book`
                        : option.title;

                    return (
                        <TouchableOpacity
                            key={option.id}
                            activeOpacity={0.8}
                            style={[
                                styles.card,
                                selected === option.value && {
                                    borderColor: option.color,
                                    backgroundColor: "#FFF8F0",
                                },
                            ]}
                            onPress={() => bookHandler(option.value)}
                        >
                            <View style={styles.cardHeader}>
                                <Image source={option.icon} style={styles.icon} />
                                <View style={{ flex: 1, marginLeft: 12 }}>
                                    <Text style={styles.title}>{title}</Text>
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
                                        style={styles.imgPaymentOptions}
                                    />
                                </View>
                            )}
                        </TouchableOpacity>
                    );
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
    },
    imgPaymentOptions: {
        width: 310,
        height: 36
    }
});

export default PaymentScreen;
