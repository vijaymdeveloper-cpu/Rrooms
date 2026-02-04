import React, { useState, useMemo } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
} from "react-native";
import moment from "moment";
import services from "@api/services";
import Ionicons from "react-native-vector-icons/Ionicons";
import CalendarModal from '@utils/Calendar';
import HourPopupPicker from './HourPopupPicker'
import { calculateFinalPrice ,reverseApplyTax} from '@utils';

const ALL_SLOTS = ["3Hrs", "6Hrs", "9Hrs", "FullDay", "FullDayStatus"];

const SlotBookingCard = ({
    checkToday,
    setCheckToday,
    hotelDetails,
    applyTax,
    roomCategories,
    navigation
}) => {

    const [show, setShow] = useState(false);
    const [selectedTimes, setSelectedTimes] = useState({});
    const [saveCheckinTime, setSaveCheckinTime] = useState({});
    const [selectedRoomCate, setSelectedRoomCate] = useState('')
    const [selectedCheckinTime, setSelectedCheckinTime] = useState('')
    const [roomAvilablty, setRoomAvilablty] = useState({})

    const safeParse = (value) => {
        try {
            if (!value) return {};
            if (typeof value === "object") return value;
            if (typeof value === "string") return JSON.parse(value);
            return {};
        } catch (e) {
            console.error("Parse error:", value);
            return {};
        }
    };

    const mergeAllSlotsForDate = (statusData, priceData, date, slotRegularPrices, timePeriods, fullDayStatusData) => {
        const statusSlots = statusData?.[date] || [];
        const priceSlots = priceData?.[date] || [];
        const timeSlots = timePeriods?.[date] || [];
        const fullDayStatus = fullDayStatusData?.[date] || []

        return ALL_SLOTS.map(slot => {
            const statusItem = statusSlots.find(s => s.slot === slot);
            const priceItem = priceSlots.find(p => p.slot === slot);
            const timeItem = timeSlots.find(t => t.slot === slot);

            let fallbackPrice = null;
            switch (slot) {
                case "3Hrs":
                    fallbackPrice = slotRegularPrices?.threeHrPrice;
                    break;
                case "6Hrs":
                    fallbackPrice = slotRegularPrices?.sixHrPrice;
                    break;
                case "9Hrs":
                    fallbackPrice = slotRegularPrices?.nineHrPrice;
                    break;
                case "FullDay":
                    fallbackPrice = slotRegularPrices?.regularPrice;
                    break;
            }

            return {
                slot,
                status: statusItem ? statusItem.status : "Available",
                price: Number(priceItem?.price || fallbackPrice),
                checkIn: timeItem?.checkIn || null,
                checkOut: timeItem?.checkOut || null
            };
        });
    };

    let room = hotelDetails?.Rooms?.find(r => r?.categoryId == 1);
    let threeHrStatus = safeParse(room?.threeHrStatus, {});
    let threeHrOfferPrice = safeParse(room?.threeHrOfferPrice, {});
    let slotRegularPrices = room;
    let timePeriods = safeParse(room?.threeHrCheckIn, {});
    let fullDayStatusData = safeParse(room?.status || []);

    const slotWiseData = useMemo(() => {
        return {
            [checkToday]: mergeAllSlotsForDate(
                threeHrStatus,
                threeHrOfferPrice,
                checkToday,
                slotRegularPrices,
                timePeriods,
                fullDayStatusData
            )
        };
    }, [hotelDetails, checkToday]);

    // console.log('slotWiseData', slotWiseData);


    function getHoursArray(checkIn, checkOut) {
        const startTime = checkIn && checkIn.trim() !== '' ? checkIn : '00:00';
        const endTime = checkOut && checkOut.trim() !== '' ? checkOut : '23:00';
        const start = parseInt(startTime.split(':')[0], 10);
        const end = parseInt(endTime.split(':')[0], 10);
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        let minStart = start;
        const todayStr = moment().format("YYYY-MM-DD");
        if (checkToday === todayStr) {
            const nextHour = currentMinute > 0 ? currentHour + 1 : currentHour;
            if (nextHour > minStart) {
                minStart = nextHour;
            }
        }
        const hours = [];
        for (let h = minStart; h <= end; h++) {
            hours.push(`${h.toString().padStart(2, '0')}:00`);
        }

        return hours;
    }

    const checkRoomAvailabilityOnCheckIn = async (value, slot, idx, checkInTime, checkOutTime) => {
        setSaveCheckinTime({
            checkInTime: checkInTime,
            checkOutTime: checkOutTime
        })
        setSelectedCheckinTime(value)
        let payload = {
            propertyId: hotelDetails?.id,
            propertyRoomsCategoryId: 1,
            date: checkToday,
            bookingType: slot,
            startTime: value,
            duration: slot?.slice(0, 2)
        }
        setSelectedTimes(prev => ({ ...prev, [idx]: value }));
        setSelectedRoomCate(value)
        const res = await services.checkRoomAvailabilityService(payload)
        if (res.data.status === true) {
            setRoomAvilablty(res?.data?.data)
        }
    }

    function getBookingRange(startTime, bookingSlot) {
        const hours = parseInt(bookingSlot, 10);

        const [h, m] = startTime.split(":").map(Number);
        const start = new Date();
        start.setHours(h);
        start.setMinutes(m);

        const end = new Date(start.getTime() + hours * 60 * 60 * 1000);

        const pad = (n) => String(n).padStart(2, "0");
        const endStr = `${pad(end.getHours())}:${pad(end.getMinutes())}`;

        return `${startTime} to ${endStr}`;
    }

    const handleSlotWiseBooking = (i, slot, priceLast) => {
        if (!selectedTimes[i]) {
            alert("Please select check-in Time.");
            return;
        }
        let roomData = hotelDetails?.Rooms.find((item) => item.categoryId == 1)
        const hotelData = {
            ...roomData,
            categoryName: 'STANDARD DOUBLE BED',
            propertyName: hotelDetails?.name,
            address: hotelDetails?.address,
            city: hotelDetails?.city,
            landmark: hotelDetails?.landmark,
            partialPayment: hotelDetails?.partialPayment,
            slot,
            priceLast,

            bookingSlot: slot?.slice(0, 3),
            bookingType: 'Hourly',
            bookingHours: getBookingRange(selectedTimes[i], slot),
            selectedCheckinTime: selectedCheckinTime,
            avilableRoomCount: roomAvilablty?.availableRooms,
            checkinBookingDate: checkToday,
            checkoutBookingDate: checkToday,
            slotWiseData: slotWiseData,
            partialPayment: hotelDetails?.partialPayment,
            payAtHotel: hotelDetails?.payAtHotel
        };

        navigation.navigate('BookHotel', {
            hotelData,
            roomCategories
        })

    };

    return (
        <>
            <TouchableOpacity
                style={[styles.dateRow]}
                onPress={() => {
                    setShow(true)
                }}>
                <Text style={styles.dateText}>
                    {moment(checkToday).format('DD-MM-YYYY')}
                </Text>
                <Ionicons name="calendar-outline" size={16} color="#2563eb" />
            </TouchableOpacity>
            <View style={styles.card}>
                <View style={styles.row}>
                    {slotWiseData[checkToday]?.slice(0, 3)?.map((item, index) => {
                        const isDisabled =
                            item?.status === "Sold-Out" ||
                            getHoursArray(item?.checkIn, item?.checkOut)?.length === 0 ||
                            item?.price === 0 ||
                            (roomAvilablty?.availableRooms === 0 && roomAvilablty?.bookingType === item?.slot);

                        return (
                            <View
                                key={item.id || index}
                                style={[
                                    styles.column,

                                ]}
                            >
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <View>
                                        <Text style={styles.hours}>{item.slot} Slot</Text>
                                        <Text style={{ fontSize: 10, color: '#666' }}>Flexible Check-in</Text>
                                    </View>

                                    <View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                            <Text style={[styles.price, { fontSize: item?.price === 0 ? 10 : 14 }]}>{item?.price > 0 ? `₹${item.price}` : 'Not Available'} </Text>
                                            <Text style={[styles.oldPrice]}> ₹{reverseApplyTax(item?.price)}</Text>
                                        </View>
                                        <Text style={{ fontSize: 10, color: '#666' }}>{`+₹${calculateFinalPrice(item?.price).tax} taxes`}</Text>
                                    </View>
                                    <View style={styles.offerBadge}>
                                        <Text style={styles.offerText}>20% OFF</Text>
                                    </View>
                                </View>

                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        borderTopWidth: 1,
                                        borderTopColor: '#ebebeb',
                                        paddingTop: 8,
                                        marginTop: 12
                                    }}>
                                    <HourPopupPicker
                                        hoursArray={getHoursArray(item?.checkIn, item?.checkOut)}
                                        selectedHour={selectedTimes[index]}
                                        disabled={isDisabled}
                                        onChange={(value) =>
                                            checkRoomAvailabilityOnCheckIn(
                                                value,
                                                item?.slot,
                                                index,
                                                item?.checkIn,
                                                item?.checkOut
                                            )
                                        }
                                    />

                                    <TouchableOpacity
                                        style={[styles.bookBtn, isDisabled && styles.bookBtnDisabled]}
                                        disabled={isDisabled}
                                        activeOpacity={isDisabled ? 1 : 0.7}
                                        onPress={() => {
                                            handleSlotWiseBooking(index, item?.slot, item?.price, item?.checkIn, item?.checkOut)
                                        }}
                                    >
                                        <Text style={styles.bookText}>Book Now</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    })}
                </View>
            </View>

            <CalendarModal
                visible={show}
                title="Select Date"
                mode="single"
                minDate={new Date()}
                selectedDate={{ checkinDate: checkToday }}
                onChange={({ checkinDate }) => {
                    setCheckToday(checkinDate);
                }}
                onApply={() => setShow(false)}
                onClose={() => setShow(false)}
            />
        </>
    );
};

export default SlotBookingCard;

const styles = StyleSheet.create({
    column: {
        backgroundColor: '#fff',
        borderRadius: 16,
        elevation: 4,
        padding: 14,
        marginTop: 16,
    },
    hours: {
        fontSize: 14,
        color: '#374151',
        fontWeight: "600",
        marginBottom: 2,
    },
    price: {
        fontSize: 18,
        fontWeight: "700",
        color: '#000',
    },
    oldPrice: {
        fontSize: 12,
        color: "#9CA3AF",
        textDecorationLine: "line-through",
    },
    checkinRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    checkin: {
        fontSize: 12,
        color: "#2563eb",
        marginLeft: 4
    },
    bookBtn: {
        backgroundColor: "#000000",
        paddingHorizontal: 14,
        paddingVertical: 14,
        borderRadius: 8,
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
    offerBadge: {
        backgroundColor: '#16A34A',
        borderRadius: 10,
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    offerText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: '600',
    },
});
