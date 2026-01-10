import React, { useEffect, useState, useRef } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    FlatList,
    ScrollView,
    Dimensions,
    StatusBar,
    TouchableOpacity,
    Share
} from "react-native";
import moment from "moment";
// import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
// import DateTimePicker from '@react-native-community/datetimepicker';
import Ionicons from "react-native-vector-icons/Ionicons";
import useHotelsController from "@controllers/hotelDetailsController";
import Icon from "react-native-vector-icons/Ionicons";
import { baseImgUrl } from "@api/client";
import { commonStyles } from '@assets/styles/commonStyles';
import HotelDetailSkeleton from '@components/skeletons/HotelDetailSkeleton'
import TabButton from '@components/TabButton'
import SlotBookingCard from './SlotBookingCard'
import FulldayBookingCard from './FulldayBookingCard'
import NearByHotels from './NearByHotels';

const { width } = Dimensions.get("window");

export default function HotelDetailsScreen({ route, navigation }) {

    const { bookingType } = route?.params || {};
    const { hotelId, hotelName, img } = route?.params?.hotel || {};

    const {
        fetchPropertyDetail,
        hotelDetails,
        checkToday,
        setCheckToday,
        loading,
        showPolicy,
        plan,
        setPlan,
        PLAN_TABS,
        filterAmenities,
        getAmenityIcon,
        showAllAmenities,
        setShowAllAmenities,
        roomCategories,
        applyTax,
        propertyPolicy
    } = useHotelsController();

    useEffect(() => {
        fetchPropertyDetail(hotelId)
    }, [hotelId])

    useEffect(() => {
        if (bookingType) {
            setPlan(bookingType);
        } else if (hotelDetails?.allowHourly === 1) {
            setPlan('Hourly_Plan');
        } else if (hotelDetails) {
            setPlan('Full_Day_Plan');
        }
    }, [bookingType, hotelDetails]);

    const onShare = async () => {
        try {
            const result = await Share.share({
                message: `https://staging.rrooms.in/best-hourly-hotel/${hotelDetails?.slug}`,
                url: `https://staging.rrooms.in/best-hourly-hotel/${hotelDetails?.slug}`,
                title: "Share App",
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    console.log("Shared with activity type: ", result.activityType);
                } else {
                    console.log("Shared successfully!");
                }
            } else if (result.action === Share.dismissedAction) {
                console.log("Share dismissed");
            }
        } catch (error) {
            console.error(error.message);
        }
    };


    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

            {
                loading ? (
                    <View>
                        <View style={styles.imageWrapper}>
                            <Image
                                source={{ uri: img }}
                                style={styles.image}
                            />
                        </View>
                        <View style={styles.content}>
                            <Text style={[styles.title, { marginTop: 20 }]}>{hotelName}</Text>

                            <HotelDetailSkeleton />
                        </View>
                    </View>
                ) :
                    <View>
                        <View style={styles.imageWrapper}>
                            <FlatList
                                data={hotelDetails?.PropertyImage || []}
                                horizontal
                                pagingEnabled
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={(img, index) => index.toString()}
                                renderItem={({ item: img }) => (
                                    <Image
                                        source={{ uri: baseImgUrl + img.image }}
                                        style={styles.image}
                                    />
                                )}
                            />
                            <View style={styles.topButton}>
                                <TouchableOpacity style={styles.btnCircle} onPress={() => navigation.goBack()}>
                                    <Icon name="arrow-back" size={24} color="#000" />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.btnCircle} onPress={onShare}>
                                    <Ionicons name="share-outline" size={22} color="#000" />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={[commonStyles.rowCenter, { marginTop: -30 }]}>
                            {
                                hotelDetails?.PropertyImage?.slice(0, 4)?.map((item) => {
                                    return (
                                        <View style={styles.thumbBox} key={item?.id}>
                                            <Image source={{ uri: baseImgUrl + item.image }} style={styles.thumbImg} />
                                        </View>
                                    )
                                })
                            }
                        </View>

                        <View style={styles.content}>

                            <Text style={styles.title}>{hotelDetails?.name}</Text>

                            <View style={[commonStyles.row, commonStyles.itemsCenter, commonStyles.mb_3]}>
                                <Text style={styles.location}>
                                    {hotelDetails?.address}
                                </Text>
                            </View>
                            <View style={commonStyles.row}>
                                <View style={styles.featureBadge}>
                                    <Ionicons name="cash-outline" size={12} color="#fff" />
                                    <Text style={styles.featureText}> Pay at Hotels</Text>
                                </View>
                                <View style={styles.featureBadge}>
                                    <Ionicons name="heart-outline" size={12} color="#fff" />
                                    <Text style={styles.featureText}> Couple Friendly</Text>
                                </View>
                                <View style={styles.featureBadge}>
                                    <Ionicons name="card-outline" size={12} color="#fff" />
                                    <Text style={styles.featureText}> Local ID Accepted</Text>
                                </View>
                            </View>

                            <View style={styles.amenitiesWrapper}>
                                <Text
                                    style={[commonStyles.text_4, commonStyles.mb_1]}>
                                    Amenities
                                </Text>
                                <View
                                    style={[commonStyles.row, commonStyles.flexWrap, { width: '100%' }]}>
                                    {
                                        filterAmenities('property')?.map(item => (
                                            <View key={item.id} style={[styles.amenityItem]}>
                                                <View style={styles.amenityImg}>
                                                    <Ionicons name={getAmenityIcon(item.name)} size={18} color="#333" />
                                                </View>
                                                <Text style={styles.amenityText}>{item?.name}</Text>
                                            </View>
                                        ))
                                    }
                                    <TouchableOpacity
                                        style={[styles.amenityItem]}
                                        onPress={() => setShowAllAmenities(showAllAmenities ? false : true)}
                                    >
                                        <View style={styles.amenityImg}>
                                            <Ionicons name={getAmenityIcon('More')} size={18} color="#333" />
                                        </View>
                                        <Text style={styles.amenityText}>{showAllAmenities ? 'Show Less' : 'Show More'}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {
                                hotelDetails?.allowHourly ?
                                    <View style={[styles.tabWrapper]}>
                                        {PLAN_TABS.map((tab) => (
                                            <TabButton
                                                key={tab.value}
                                                label={tab.label}
                                                value={tab.value}
                                                activeValue={plan}
                                                onPress={setPlan}
                                                commonStyles={commonStyles}
                                            />
                                        ))}
                                    </View> :
                                    <Text style={[commonStyles.text_4, commonStyles.mb_2]}>Full Day Room Plan</Text>
                            }

                            <View>
                                {
                                    plan == 'Full_Day_Plan' ? (
                                        <FulldayBookingCard
                                            room={hotelDetails?.Rooms}
                                            roomCategories={roomCategories}
                                            checkToday={checkToday}
                                            filterAmenities={filterAmenities}
                                            baseImgUrl={baseImgUrl}
                                            navigation={navigation}
                                            hotelDetails={hotelDetails}
                                        />
                                    ) : (
                                        <SlotBookingCard
                                            checkToday={checkToday}
                                            setCheckToday={setCheckToday}
                                            hotelDetails={hotelDetails}
                                            applyTax={applyTax}
                                            roomCategories={roomCategories}
                                            navigation={navigation}
                                        />
                                    )
                                }
                            </View>

                            <View style={styles.policyWrapper}>
                                <Text style={[commonStyles.text_4, commonStyles.mb_2]}>Hotel Policies</Text>
                                {
                                    showPolicy?.map((policyIndex, i) => {
                                        const text = propertyPolicy[policyIndex]
                                        return (
                                            <View style={styles.bulletRow} key={i}>
                                                <View style={styles.bulletDot} />
                                                <Text style={styles.bulletText}>
                                                    {text}
                                                </Text>
                                            </View>
                                        );
                                    })

                                }
                                <Text style={[commonStyles.text_5, commonStyles.fwBold, commonStyles.mb_1]}>Restrictions</Text>
                                <PolicyView text="Guests can check in using any one of the following original ID proofs - Passport, Adhaar Card, Driving Licence, Voter ID" />
                                <PolicyView text="Softcopy of ID proofs not accepted." />

                                <Text style={[commonStyles.text_5, commonStyles.fwBold, commonStyles.mb_1]}>Hotel Cancellation Policy</Text>
                                <PolicyView text="Refund will be provided only if cancellation is done 24 hours prior to selected check-in time." />
                                <PolicyView text="In case booking has been done within 24 hours of check-in time, the refund will be provided only if the booking is cancelled within 15 minutes from the time of booking." />
                                <PolicyView text="There will be no refund, If you do not show up at the hotel." />
                                <PolicyView text="There will be no refund if you decide to cancel the booking in the middle of your stay." />
                                <PolicyView text="If eligible, refund will be initiated, which will reflect in your account within 5-7 business days." />
                            </View>

                            <View style={commonStyles.mb_4}>
                                <NearByHotels
                                    commonStyles={commonStyles}
                                    styles={styles}
                                    hotelId={hotelId}
                                    baseImgUrl={baseImgUrl}
                                    onViewAll={() => navigation.navigate("HotelDetails")}
                                />
                            </View>

                        </View>
                    </View>
            }
        </ScrollView>
    );
}

const PolicyView = ({ text }) => {
    return (
        <View style={styles.bulletRow}>
            <View style={styles.bulletDot} />
            <Text style={styles.bulletText}>
                {text}
            </Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1
    },

    imageWrapper: {
        width: width,
        height: 360,
    },
    image: {
        width: width,
        height: '100%',
        resizeMode: "cover"
    },
    topButton: {
        width: width - 30,
        position: "absolute",
        top: StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 40,
        left: 16,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    btnCircle: {
        backgroundColor: "#fff",
        borderRadius: 20,
        zIndex: 10,
        padding: 8,
    },
    thumbBox: {
        width: 80,
        height: 50,
        borderRadius: 6,
        borderWidth: 2,
        backgroundColor: '#fff',
        borderColor: "#fff",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 8,
        marginRight: 8,
    },
    thumbImg: {
        width: 76,
        height: 46,
        borderRadius: 6,
    },
    featureBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#16A34A",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        marginRight: 8
    },
    featureText: {
        color: "#fff",
        fontSize: 11,
        fontWeight: "600"
    },
    content: {
        padding: 20
    },
    title: {
        fontSize: 22,
        color: '#1A1A1A',
        fontWeight: "700",
        marginBottom: 8
    },
    location: {
        color: "#6B7280",
        fontSize: 14,
        lineHeight: 22
    },
    tabWrapper: {
        flexDirection: "row",
        backgroundColor: "#E5E7EB",
        borderRadius: 30,
        overflow: "hidden",
        marginBottom: 15
    },
    amenitiesWrapper: {
        marginVertical: 22
    },
    amenityItem: {
        width: "20%",
        // height: 52,
        alignItems: "center",
        paddingHorizontal: 6,
        marginTop: 12
    },
    amenityImg: {
        height: 20
    },
    amenityText: {
        fontSize: 10,
        color: "#374151",
        textAlign: "center",
        lineHeight: 14,
        marginTop: 6,
    },
    policyWrapper: {
        backgroundColor: '#eee',
        borderRadius: 12,
        padding: 15,
        marginTop: 24
    },
    bulletRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        paddingLeft: 10,
        marginBottom: 6,
    },
    bulletDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: "#555",
        marginTop: 7,
        marginRight: 6,
    },
    bulletText: {
        flex: 1,
        fontSize: 14,
        color: "#555",
        lineHeight: 20,
    },
});
