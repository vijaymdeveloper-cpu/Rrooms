import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from "react-native";
import moment from "moment";
import { baseImgUrl } from "@api/client";
import HotelCardSkeleton from '@components/skeletons/HotelCardSkeleton';
import { getTodaySlotPricing } from '@utils/slotPricing'

const RecommendedHotels = ({ data = [], commonStyles, navigation }) => {

    let checkToday = moment(new Date()).format('YYYY-MM-DD')

    return (
        <View style={commonStyles.mt_2}>
            <View style={[commonStyles.rowBetween, commonStyles.mb_3]}>
                <Text style={commonStyles.text_4}>{'Recommended For You'}</Text>
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={[styles.scrollContainer, { paddingBottom: 16 }]}
            >
                {data.length > 0 ?
                    data?.map((item, index) => {

                        const priceInfo = getTodaySlotPricing(item, checkToday);

                        return (
                            <TouchableOpacity key={index} style={styles.card}
                                onPress={() => {
                                    navigation.navigate("HotelDetails", {
                                        hotel: {
                                            hotelId: item.id,
                                            hotelName: item?.name,
                                            img: baseImgUrl + item?.PropertyImages[0]?.image
                                        },
                                        bookingType: 'Full_Day_Plan'
                                    })
                                }}>
                                <Image
                                    source={{ uri: baseImgUrl + item?.PropertyImages[0]?.image }}
                                    style={styles.itemCardImage}
                                />

                                <View style={{ padding: 10 }}>
                                    <Text style={[commonStyles.text_6, { fontWeight: '500' }]} numberOfLines={2} ellipsizeMode="tail">
                                        {item?.name}
                                    </Text>

                                    <Text style={styles.itemLocation}>
                                        {item?.locality}
                                    </Text>
                                    <View style={commonStyles.rowAligned}>
                                        <Text style={styles.price}>₹{priceInfo?.fullDayPrice}</Text>
                                        <Text style={styles.oldPrice}>₹ {priceInfo?.fullDayTaxableAmount}</Text>
                                        <Text style={{color: '#2d9105ff'}}>16% Off</Text>
                                        {/* <Text>{fullDayPrice}</Text> */}
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

export default RecommendedHotels;

const styles = StyleSheet.create({
    card: {
        width: 180,
        backgroundColor: "#fff",
        borderRadius: 14,
        overflow: 'hidden',
        marginRight: 14,
    },
    itemCardImage: {
        width: '100%',
        height: 120
    },
    itemLocation: {
        fontSize: 12,
        color: '#666',
        marginVertical: 4
    },
    price: { fontWeight: "700", fontSize: 16 },
    oldPrice: { textDecorationLine: "line-through", color: '#666', marginHorizontal: 6 },
})
