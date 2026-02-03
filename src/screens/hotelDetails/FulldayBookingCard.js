import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    FlatList,
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import moment from "moment";
import services from "@api/services";
import Ionicons from "react-native-vector-icons/Ionicons";
import { getNextDay, reverseApplyTax } from "@utils";
import CalendarModal from '@utils/Calendar';
import { calculateFinalPrice } from '@utils';


const FulldayBookingCard = ({
    room = [],
    roomCategories = [],
    filterAmenities,
    baseImgUrl,
    hotelDetails,
}) => {

    const navigation = useNavigation();
    const today = moment().format('YYYY-MM-DD');
    const tomorrow = moment().add(1, 'day').format('YYYY-MM-DD');

    const [show, setShow] = useState(false);
    const [availRooms, setAvailRooms] = useState([])
    const [roomAvilablty, setRoomAvilablty] = useState({})
    const [dateRange, setDateRange] = useState([today, tomorrow]);
    const [startDate, endDate] = dateRange;

    const checkFullDayRoomAvaility = async (sDate = startDate, eDate = endDate) => {
        const payload = {
            propertyId: hotelDetails?.id,
            propertyRoomsCategoryId: hotelDetails?.Rooms?.map((item) => item?.categoryId),
            fromDate: moment(sDate).format("YYYY-MM-DD"),
            toDate: moment(eDate).format("YYYY-MM-DD")
        }
        const res = await services.checkRoomAvailabilityByRangeService(payload)
        if (res.status == 200) {
            setAvailRooms(res?.data?.data)
            setShow(false);
        }
    }

    const handleDailyBooking = async (data, slot, priceLast) => {
        try {
            let payload = {
                propertyId: hotelDetails?.id,
                propertyRoomsCategoryId: data.categoryId,
                date: startDate,
                bookingType: 'Daily',
            }
            const res = await services.checkRoomAvailabilityService(payload)
            if (res.data.status === true) {
                setRoomAvilablty(res?.data?.data);
                handleGoToBookHotelScreenWithData(data, slot, priceLast);
            }
        }
        catch { }
    }

    const handleGoToBookHotelScreenWithData = (data, slot, priceLast) => {
        const hotelData = {
            ...data,
            categoryName: roomCategories?.find((cate) => cate.id == data.categoryId)?.name,
            propertyName: hotelDetails?.name,
            address: hotelDetails?.address,
            city: hotelDetails?.city,
            landmark: hotelDetails?.landmark,
            partialPayment: hotelDetails?.partialPayment,
            slot,
            priceLast,
            checkinBookingDate: startDate,
            checkoutBookingDate: endDate,
            partialPayment: hotelDetails?.partialPayment,
            payAtHotel: hotelDetails?.payAtHotel
        };

        navigation.navigate('BookHotel', {
            hotelData,
            roomCategories
        })

    };

    function safeParse(value, fallback = []) {
        if (value == null) return fallback;
        if (Array.isArray(value)) return value;
        if (typeof value === "string") {
            if (value.trim() === "") return fallback;
            try {
                const parsed = JSON.parse(value);
                return Array.isArray(parsed) ? parsed : fallback;
            } catch {
                return fallback;
            }
        }
        return fallback;
    }


    const renderItem = ({ item }) => {

        const roomFrom = new Date(item.fromDate);
        const roomTo = new Date(item.toDate);
        const selectedFrom = new Date();
        const selectedTo = new Date(endDate);
        const isSameDay = roomFrom.toDateString() === selectedFrom.toDateString();
        const isWithinRange = selectedFrom <= roomTo && selectedTo >= roomFrom;
        const applyOffer = isSameDay || isWithinRange;
        const parsedOffer =
            typeof item?.offerPrice === "string"
                ? JSON.parse(item.offerPrice)
                : item?.offerPrice || {};

        const xPrice = +(
            parsedOffer?.[startDate]?.find((data) => data?.slot == "FullDay")?.price ?? 0
        );
        const finalPrice = xPrice ? xPrice : item?.regularPrice;

        const isFullDayBlocked = JSON.parse(item?.fullDayStatus)?.[startDate]?.find(data => data?.slot === "FullDay") || null;
        const checkStatus = item?.status ? safeParse(item?.status || [])?.find(data => data?.date == moment(startDate).format("YYYY-MM-DD")) : {};

        let notAvail = availRooms?.find((data) => data?.propertyRoomsCategoryId == item?.categoryId)?.availableRooms

        const isDisabled =
            notAvail === 0 ||
            hotelDetails?.status !== 1 ||
            isFullDayBlocked?.status === "Sold-Out" ||
            checkStatus?.soldOut === true;

        return (
            <View style={styles.card}>
                <View style={styles.imageBox}>
                    <Image
                        source={{ uri: baseImgUrl + item?.RoomImages[0]?.imageName }}
                        style={styles.image}
                    />
                </View>
                <View style={styles.info}>
                    <Text style={styles.title}>
                        {roomCategories?.find((data) => data?.id == item.categoryId)?.name}
                    </Text>
                    <Text style={styles.amenities}>
                        {filterAmenities('room', item?.RoomAmenities)?.map(item => (item?.name + ' · '))}
                    </Text>

                    <View style={styles.priceRow}>
                        <Text style={styles.price}>₹{finalPrice}
                            <Text style={{ fontSize: 12 }} >{` + ₹${calculateFinalPrice(finalPrice).tax} taxes`}</Text>
                        </Text>

                        {finalPrice && (
                            <Text style={styles.oldPrice}>₹{`${Math.round(reverseApplyTax(finalPrice))}`}</Text>
                        )}
                        <View style={styles.saveBadge}>
                            <Text style={styles.saveText}>
                                20% OFF
                            </Text>
                        </View>
                    </View>
                    <View style={{ marginTop: 3 }}>
                        <TouchableOpacity
                            style={[styles.bookBtn, isDisabled && styles.bookBtnDisabled]}
                            disabled={
                                notAvail == 0 ||
                                (hotelDetails?.status != 1) ||
                                (isFullDayBlocked?.status == "Sold-Out") ||
                                checkStatus?.soldOut == true
                            }
                            onPress={() => handleDailyBooking(item, 24, finalPrice)}
                        >
                            <Text style={styles.bookText}>Book</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    };

    return (
        <>
            <TouchableOpacity
                style={[styles.dateRow]}
                onPress={() => {
                    setShow(true)
                }}>
                <Text style={styles.dateText}>
                    {moment(startDate).format('DD-MM-YYYY')} / {moment(endDate).format('DD-MM-YYYY')}
                </Text>
                <Ionicons name="calendar-outline" size={16} color="#2563eb" />
            </TouchableOpacity>
            <FlatList
                data={room}
                keyExtractor={(data, index) =>
                    data?.id ? data.id.toString() : index.toString()
                }
                renderItem={renderItem}
                ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
            />

            <CalendarModal
                visible={show}
                title="Select Date Range"
                minDate={new Date()}
                mode="range"
                dateRange={dateRange}
                onChange={setDateRange}
                onClose={() => setShow(false)}
            />
        </>

    );
};

export default FulldayBookingCard;


const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        elevation: 4,
        flexDirection: 'row',
        padding: 14,
        marginTop: 15,
    },
    imageBox: {
        width: 100,
        height: 100,
        borderRadius: 10,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%',
    },
    info: {
        flex: 1,
        paddingLeft: 12
    },
    title: {
        fontSize: 14,
        fontWeight: "600",
    },
    amenities: {
        fontSize: 11,
        color: "#777",
        marginTop: 4,
        flexWrap: 'wrap',
        maxWidth: '98%'
    },
    priceRow: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 4
    },
    price: {
        fontSize: 14,
        fontWeight: "700",
        color: "#000",
    },
    oldPrice: {
        fontSize: 13,
        color: "#999",
        textDecorationLine: "line-through",
        marginLeft: 6,
    },
    saveBadge: {
        backgroundColor: "#e6f9ee",
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 6,
        marginLeft: 6,
    },
    saveText: {
        fontSize: 10,
        color: "#16a34a",
        fontWeight: "600",
    },
    bookBtn: {
        width: '80',
        backgroundColor: "#000",
        borderRadius: 8,
        textAlign: 'center',
        paddingHorizontal: 18,
        paddingVertical: 8,
    },
    bookText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "600",
        textAlign: 'center'
    },
    bookBtnDisabled: {
        backgroundColor: "#9CA3AF",
        opacity: 0.6,
    },
    dateRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 14,
    },
    dateText: {
        fontSize: 16,
        fontWeight: '600'
    },
});
