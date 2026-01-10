import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Dimensions } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import moment from "moment";
import { baseImgUrl } from "@api/client";
import { PROPERTY_CATEGORY_COLORS } from '@constants';
import { getTodaySlotPricing } from '@utils/slotPricing'

const { width } = Dimensions.get("window");

export default function HotelCard({ navigation, item, getAverageRating, mergeAllSlotsForDate, safeParse, commonStyles }) {

    const PayAtHotel = item?.travellerChoice ? item?.travellerChoice.split(',').find((anm) => anm == 16) : []
    let checkToday = moment(new Date()).format('YYYY-MM-DD')
    let priceInfo = getTodaySlotPricing(item, checkToday);

    const handleHotelPress = (bookingType) => {
        navigation.navigate("HotelDetails", {
            hotel: {
                hotelId: item.id,
                hotelName: item?.name,
                img: baseImgUrl + item?.PropertyImages[0]?.image
            },
            bookingType: bookingType
        })
    }

    return (
        <View style={styles.card}>
            <FlatList
                data={item?.PropertyImages || []}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item: img }) => {
                    const imageUrl = baseImgUrl + img?.image;
                    return (
                        <TouchableOpacity onPress={() => handleHotelPress("")}>
                            <Image
                                source={{ uri: imageUrl }}
                                style={styles.image}
                            />
                        </TouchableOpacity>
                    );
                }}
            />
            <View style={[styles.tag, { backgroundColor: PROPERTY_CATEGORY_COLORS[item?.PropertyCategory?.id] }]}>
                <Text style={styles.tagText}>{item?.PropertyCategory?.name}</Text>
            </View>
            <View style={styles.walletBadge}>
                <Text style={styles.walletText}>10% Wallet Discount</Text>
            </View>

            <View style={styles.content}>
                <View style={styles.featureRow}>
                    <View style={styles.ratingRow}>
                        <Ionicons name="star" size={14} color="#f5a623" />
                        <Text style={styles.rating}>
                            {getAverageRating(item?.Ratings)} ({item?.Ratings?.length})
                        </Text>
                    </View>
                    {PayAtHotel && (
                        <View style={styles.featureBadge}>
                            <Ionicons name="cash-outline" size={12} color="#fff" />
                            <Text style={styles.featureText}> Pay at Hotels</Text>
                        </View>
                    )}

                    {item?.coupleFriendly == 1 && (
                        <View style={styles.featureBadge}>
                            <Ionicons name="heart-outline" size={12} color="#fff" />
                            <Text style={styles.featureText}> Couple Friendly</Text>
                        </View>
                    )}
                </View>

                <Text style={styles.title}>{item?.name}</Text>
                <Text style={styles.location}>
                    {item?.locality}, {item?.city?.name}
                </Text>

                <View style={styles.priceRow}>
                    <Text style={styles.price}>₹{priceInfo?.fullDayPrice}/night</Text>
                    <Text style={styles.oldPrice}>₹ {priceInfo?.fullDayTaxableAmount}</Text>
                    <Text style={styles.discount}>16% Off</Text>
                    {/* <Text>{fullDayPrice}</Text> */}
                </View>

                {
                    item?.allowHourly ? (
                        <View style={styles.buttonRow}>
                            {
                                priceInfo?.slots?.slice(0, 3)?.map((item, i) => {
                                    const isDisabled = item?.status === "Sold-Out" || item?.price == 0;
                                    return (
                                        <TouchableOpacity
                                            key={i}
                                            disabled={isDisabled}
                                            style={[
                                                styles.timeBtn,
                                                isDisabled && styles.btnDisabled
                                            ]}
                                            onPress={() => { handleHotelPress('Hourly_Plan') }}
                                        >
                                            <Text
                                                style={[
                                                    styles.timeText,
                                                    isDisabled && styles.textDisabled
                                                ]}
                                            >
                                                {item?.price == 0 ? 'Not Available' : item?.price}
                                                {"\n"}{item?.slot}
                                            </Text>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                    ) : null
                }

                <View style={commonStyles.mt_3}>
                    <TouchableOpacity
                        style={[commonStyles.btn, commonStyles.btnPrimary]}
                        onPress={() => { handleHotelPress('Full_Day_Plan') }}
                    >
                        <Text style={commonStyles.btnText}>
                            {item?.allowHourly ? `Book Full Day @ ₹${priceInfo?.fullDayPrice}` : 'Book Now'}
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        borderRadius: 10,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
        marginBottom: 20,
    },
    image: { width: width - 1, height: 220, resizeMode: 'cover' },
    tag: {
        position: "absolute",
        left: 10,
        top: 10,
        backgroundColor: "#000",
        borderRadius: 6,
        paddingHorizontal: 10,
        paddingVertical: 4,
    },
    tagText: { color: '#fff', fontSize: 12, fontWeight: '600' },
    walletBadge: {
        position: "absolute",
        top: 10,
        right: 10,
        backgroundColor: "#d32f2f",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
        zIndex: 2
    },
    walletText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "600"
    },
    content: { paddingVertical: 12, paddingHorizontal: 10 },
    ratingRow: { flexDirection: "row", alignItems: "center" },
    rating: { marginLeft: 4, fontSize: 12 },
    title: { fontSize: 18, fontWeight: "600", marginVertical: 4 },
    location: { color: "#1e90ff", fontSize: 12 },
    greenText: { color: "green", fontSize: 12 },
    priceRow: { flexDirection: "row", marginTop: 6 },
    price: { fontWeight: "700", fontSize: 16 },
    oldPrice: { textDecorationLine: "line-through", marginLeft: 6 },
    discount: { color: "green", marginLeft: 6 },
    buttonRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 12 },
    timeBtn: { width: '32%', backgroundColor: '#3C4043', borderRadius: 6, padding: 10 },
    timeText: { textAlign: "center", color: "#fff", fontSize: 14, fontWeight: 'bold' },
    featureRow: {
        width: '100%',
        flexDirection: "row",
        gap: 6,
        zIndex: 2,
        marginBottom: 5
    },
    featureBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(45, 48, 2, 0.75)",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6
    },
    featureText: {
        color: "#fff",
        fontSize: 11,
        fontWeight: "600"
    },
    btnDisabled: {
        backgroundColor: "#d3d3d3ff",
        borderColor: "#ddd",
        opacity: 0.6,
    },
    textDisabled: {
        color: "#444",
    },
});
