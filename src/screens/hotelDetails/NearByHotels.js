import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from "react-native";
import services from "@api/services";
import Icon from "react-native-vector-icons/Ionicons";
import moment from "moment";
import HotelCardSkeleton from '@components/skeletons/HotelCardSkeleton'

const NearByHotels = ({ hotelId, baseImgUrl, commonStyles,onPolularHotelPress }) => {

    const [nearestProperty, setNearestProperty] = useState([]);
    const dummyImage = require('@assets/images/hotelPlaceholder.png');

    const fetchNearestProperty = async (hotelId) => {
        try {
            const res = await services.nearByPropertiesService(hotelId)
            if (res.status === 200 && res.data.status === true) {
                setNearestProperty(res?.data?.data)
            }
        }
        catch { }
    }

    useEffect(() => {
        fetchNearestProperty(hotelId)
    }, [hotelId])

    return (
        <View style={commonStyles.mt_5}>
            <View style={[commonStyles.flexBetween, commonStyles.mb_3]}>
                <Text style={commonStyles.text_4}>{'Popular Near By'}</Text>
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContainer}
            >
                {nearestProperty.length > 0 ?
                    nearestProperty.map((item, index) => {
                        const img = item?.PropertyImages[0]?.image
                        const primaryImg = item?.PropertyImages?.find((data) => data.id == item?.profileImageID)?.image
                        const city = item?.slug?.startsWith("/Lucknow")
                        const today = moment();
                        let xPrice = []
                        let mPrice = 0
                        item?.Rooms.forEach((items) => {
                            const fromDate = moment(items?.fromDate);
                            const toDate = moment(items?.toDate);
                            const isTodayInRange =
                                today.isSameOrAfter(fromDate, "day") &&
                                today.isSameOrBefore(toDate, "day");
                            const offerPriceRaw = JSON.parse(items?.offerPrice || "null");
                            const offerPrice =
                                offerPriceRaw && Object.keys(offerPriceRaw).length > 0
                                    ? offerPriceRaw
                                    : null;
                            xPrice.push(isTodayInRange ? offerPrice[moment(items?.fromDate).format('YYYY-MM-DD')]?.find((room) => room.slot === "FullDay").price : items?.regularPrice);
                            mPrice = Math.min(...xPrice);
                        });
                        return (
                            <TouchableOpacity 
                            onPress={() => onPolularHotelPress(item)} 

                            key={index} 
                            style={styles.card}>
                                {item?.allowHourly === 1 && (
                                    <View style={{
                                        position: 'absolute',
                                        zIndex: 1,
                                        backgroundColor: '#000000',
                                        padding: 8,
                                        borderTopLeftRadius: 12,
                                        borderBottomRightRadius: 8,
                                        top: 0,
                                        right: 0
                                    }}>
                                        <Text style={{ color: '#fff', fontSize: 14, fontWeight: 'bold' }} >Hourly</Text>
                                    </View>
                                )}
                                <Image
                                    source={
                                        primaryImg
                                            ? { uri: `${baseImgUrl}${primaryImg}` }
                                            : img
                                                ? { uri: `${baseImgUrl}${img}` }
                                                : dummyImage
                                    }
                                    style={styles.image}
                                />

                                <View style={{ padding: 5 }}>
                                    <Text
                                        style={[commonStyles.text_5, commonStyles.fwBold]}
                                        numberOfLines={2}
                                        ellipsizeMode="tail">
                                        {item?.name}
                                    </Text>

                                    <Text style={styles.location}>
                                        {item?.locality}
                                    </Text>

                                    <View style={commonStyles.rowBetween}>
                                        <Text style={styles.price}>
                                            ₹{mPrice}/night
                                        </Text>

                                        <Text style={commonStyles.text_6}>
                                            <Icon name="star" size={14} color="#FFD700" />{" "}
                                            {item?.rating || 4.8}
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    }) : <HotelCardSkeleton />
                }
            </ScrollView>
        </View>
    );
};

export default NearByHotels;

const styles = StyleSheet.create({
    card: {
        width: 180,
        backgroundColor: "#fff",
        marginRight: 14
    },
    image: {
        width: '100%',
        height: 120,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    location: {
        fontSize: 12,
        color: '#666',
        marginVertical: 2,
    },
    price: {
        fontSize: 14,
        fontWeight: 'bold'
    },
})
