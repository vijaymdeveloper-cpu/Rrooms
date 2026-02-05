import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert, KeyboardAvoidingView, Platform, ActivityIndicator } from "react-native";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { commonStyles } from '@assets/styles/commonStyles'
import { daysDiffernceWithMinOne, formatINR, reverseApplyTax, getHoursArray, getTimeRangeFromSlot } from '@utils'
import services from "@api/services";
import Ionicons from "react-native-vector-icons/Ionicons";
import Counter from './Counter';
import MealPlan from './MealPlan';
import Wallet from './Wallet';
import CalendarModal from '@utils/Calendar';
import { showToast } from '@utils/Toaster';
import HourPopupPicker from '@utils/HourPopupPicker';
import { saveCouponDiscount } from '@store/slices/authSlice';
import Header from '@components/Header';


const meal_Modes = {
  ep: 0,
  cp: 1,
  ap: 2,
  map: 3,
}

const BookHotelScreen = ({ route, navigation }) => {

  const dispatch = useDispatch();
  const { control, watch, trigger, formState: { errors } } = useForm({ mode: "onChange", });
  const { name, mobile } = watch()

  const { hotelData, roomCategories } = route?.params
  const { slotWiseData } = hotelData
  const { userDetail, walletMoney, coupons, couponDiscount } = useSelector((state) => state.auth)

  const [show, setShow] = useState(false);
  const [showHours, setShowHours] = useState(false);
  const [selectedHour, setSelectedHour] = useState(hotelData?.selectedCheckinTime)
  const [reservedSlot, setReservedSlot] = useState(hotelData?.slot)
  const [availableRooms, setAvailableRooms] = useState(hotelData?.avilableRoomCount);
  const [statusData, setStatusData] = useState(null)
  const [checkinDate, setCheckinDate] = useState(null);
  const [checkoutDate, setCheckoutDate] = useState(null);
  const [isHourlyBooking, setIsHourlyBooking] = useState(false);
  const [adult, setAdult] = useState(1);
  const [child, setChild] = useState(0);
  const [room, setRoom] = useState(1);
  const [tax, setTax] = useState({});
  const [showOtherPersonForm, setShowOtherPersonForm] = useState(false);
  const [nights, setNights] = useState(1);
  const [mealPlan, setMealPlan] = useState('ep');
  const [walletDiscount, setWalletDiscount] = useState(0)
  const [couponCode, setCouponCode] = useState('')
  const [paymentState, setPaymentState] = useState(0)
  const [mealCharges, setMealCharges] = useState({
    ep: 0,
    breakFastPrice: hotelData?.breakFastPrice,
    ap: hotelData?.ap,
    map: hotelData?.map
  })
  const [priceSummary, setPriceSummary] = useState({
    basePrice: 0,
    instantDiscount: 0,
    amountBeforeTax: 0,
    breakfastAmount: 0,
    subTotal: 0,
    taxesAndFees: 0,
    couponAmount: 0,
    totalPayable: 0,
    finalPayable: 0
  });
  const [bookingDetail, setBookingDetail] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkSoldOut, setCheckSoldOut] = useState(false)


  useEffect(() => {
    if (hotelData?.checkinBookingDate && hotelData?.checkoutBookingDate) {
      setCheckinDate(hotelData.checkinBookingDate)
      setCheckoutDate(hotelData.checkoutBookingDate)
    }
  }, [hotelData]);

  useEffect(() => {
    setIsHourlyBooking(hotelData?.bookingType == "Hourly")
  }, [hotelData])

  useEffect(() => {
    if (!hotelData?.priceLast) return;

    let breakfastAmount = 0;
    const days = daysDiffernceWithMinOne(checkinDate, checkoutDate);
    if (mealPlan) {
      breakfastAmount = mealCharges[mealPlan] * days * adult;
    }
    const discountedPrice = hotelData?.priceLast
    const originalPrice = reverseApplyTax(discountedPrice);
    const instantDiscount = (originalPrice - discountedPrice);
    const amountBeforeTax = Math.round(discountedPrice / (1 + tax?.amount / 100));

    const originalPriceTotal = originalPrice * room * days;
    const instantDiscountTotal = instantDiscount * room * days;
    const amountBeforeTaxTotal = amountBeforeTax * room * days;

    const taxAmount = Math.round(((originalPriceTotal - instantDiscountTotal) * (tax?.amount || 0)) / 100);
    const subTotal = originalPriceTotal - instantDiscountTotal + taxAmount;
    const couponAmount = subTotal * (couponDiscount / 100)
    const amountAfterAllDiscount = subTotal - walletDiscount - couponAmount
    const breakfastAmountWithTax = breakfastAmount * 1.05;
    const totalPayable = amountAfterAllDiscount + breakfastAmountWithTax

    setPaymentState(subTotal)

    setPriceSummary(prev => ({
      ...prev,
      basePrice: originalPriceTotal,
      instantDiscount: instantDiscountTotal,
      amountBeforeTax: originalPriceTotal - instantDiscountTotal,
      breakfastAmount: breakfastAmount,
      subTotal: subTotal,
      taxesAndFees: taxAmount,
      couponAmount: couponAmount,
      totalPayable: totalPayable,
    }));
    setNights(days)

  }, [hotelData, room, adult, checkinDate, checkoutDate, tax, mealPlan, walletDiscount, couponDiscount]);

  useEffect(() => {
    return () => {
      dispatch(saveCouponDiscount(0))
    };
  }, []);

  const fetchTaxs = async () => {
    try {
      const res = await services.getTaxService();
      if (res.status === 200) {
        setTax(res?.data?.data);
      }
    } catch (error) { }
  };

  useEffect(() => {
    fetchTaxs()
  }, [])

  const MAX_ROOMS = availableRooms > 5 ? 5 : availableRooms;


  const updateOccupancy = ({
    newAdult = adult,
    newChild = child,
    newRoom = room,
  }) => {
    // 1️⃣ Room manual (1–5)
    let finalRoom = Math.min(Math.max(1, newRoom), MAX_ROOMS);
    // 2️⃣ Adult min 1
    let finalAdult = Math.max(1, newAdult);
    // 3️⃣ Adult overflow → room auto increase
    const requiredRooms = Math.ceil(finalAdult / 2);
    if (requiredRooms > finalRoom) {
      finalRoom = Math.min(requiredRooms, MAX_ROOMS);
    }
    // 4️⃣ Adult cap by room capacity
    finalAdult = Math.min(finalAdult, finalRoom * 2);
    // 5️⃣ Child max 1 per room
    let finalChild = Math.min(Math.max(0, newChild), finalRoom);
    // 6️⃣ Update state
    setRoom(finalRoom);
    setAdult(finalAdult);
    setChild(finalChild);
  };


  const onApplyPress = async () => {
    if (couponCode != "") {
      setLoading(true);
      const res = await services.applyCouponService(hotelData?.propertyId, userDetail?.id, couponCode)
      if (res?.data?.status) {
        dispatch(saveCouponDiscount(res?.data?.data?.amount))
        showToast('message', 'Coupon applied successfully!');
      }
      else if (res?.data?.status == false) {
        showToast('error', res?.data?.msg);
      }
      setLoading(false);

    }
    else {
      Alert.alert('Please Enter Coupon Code')
    }
  }

  const onRemoveCoupon = () => {
    dispatch(saveCouponDiscount(0))
  }

  const checkRoomAvailabilityOnCheckIn = async (value) => {
    try {
      setLoading(true);
      setSelectedHour(value)
      let payload = {
        propertyId: hotelData?.propertyId,
        propertyRoomsCategoryId: 1,
        date: checkinDate,
        bookingType: hotelData?.slot,
        startTime: value,
        duration: hotelData?.slot?.slice(0, 2)
      }
      const res = await services.checkRoomAvailabilityService(payload)
      if (res.data.status === true) {
        setAvailableRooms(res?.data?.data?.availableRooms)
        setStatusData(res?.data?.soldOutStatus)
        if (res?.data?.data?.availableRooms == 0) {
          showToast('error', `No room available`);
        }
        // else {
        //   showToast('message', `${res?.data?.data?.availableRooms} rooms available`);
        // }
      }

      return res?.data?.data
    }
    catch (err) { console.log(err) }
    finally {
      setLoading(false);
    }
  }

  const checkFullDayRoomAvaility = async () => {
    if (!checkinDate || !checkoutDate) return;

    try {
      const payload = {
        propertyId: hotelData?.propertyId,
        propertyRoomsCategoryId: hotelData?.categoryId,
        fromDate: checkinDate,
        toDate: checkoutDate
      }
      const res = await services.checkRoomAvailabilityByRangeService(payload)
      if (res.status == 200) {
        setAvailableRooms(res?.data?.data[0]?.availableRooms)
        setStatusData(res?.data?.soldOutStatus);
        if (res?.data?.data[0]?.availableRooms == 0) {
          showToast('error', `No room available`);
        }
      }
    }
    catch (err) { console.log(err) }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (isHourlyBooking) {
      if (Object.keys(hotelData).length) {
        checkRoomAvailabilityOnCheckIn(hotelData?.selectedCheckinTime)
      }
    }
  }, [hotelData, checkinDate])

  useEffect(() => {
    if (Object.keys(hotelData)?.length > 1 && isHourlyBooking == false) {
      checkFullDayRoomAvaility()
    }
  }, [checkoutDate, hotelData])

  const createBooking = async () => {
    setLoading(true);
    const payload = {
      propertyId: hotelData?.propertyId,
      propertyRoomsCategoryId: hotelData.categoryId,
      userId: userDetail.id,
      fromDate: checkinDate,
      noOfRooms: room,
      adults: adult,
      children: child,
      paymentMode: 0,
      PaymentStatus: 0,
      bookingStatus: 0,
      bookingAmout: Math.round(priceSummary?.totalPayable),
      dueAmount: Math.round(priceSummary?.totalPayable),
      guestDetails: [],
      otherPersonName: name,
      otherPersonNumber: mobile,
      source: "RRooms",
      breakFast: meal_Modes[mealPlan],
      bookingHours: reservedSlot,
      discountAmount: Math.round(priceSummary?.couponAmount),
      platform: 1,
    }
    if (hotelData?.slot == '24') {
      payload.bookingType = 'Daily'
      payload.toDate = checkoutDate
    }
    if (hotelData?.slot != '24') {
      payload.bookingType = 'Hourly'
      payload.bookingSlot = hotelData?.slot?.slice(0, 3)
      payload.bookingHours = getTimeRangeFromSlot(selectedHour, hotelData?.slot)

      const slotHours = parseInt(hotelData.slot, 10);
      let bookingHours = payload.bookingHours
      const [, endTime] = bookingHours.split(" to ");
      if (endTime === "00:00") {
        payload.bookingHours = `${bookingHours.split(" to ")[0]} to 23:59`;
      }
      const checkInMoment = moment(
        `${moment(checkinDate).format("YYYY-MM-DD")} ${bookingHours.split(" to ")[0]}`,
        "YYYY-MM-DD HH:mm"
      );
      const checkOutMoment = checkInMoment.clone().add(slotHours, "hours");
      payload.toDate = endTime === "00:00" ? moment(checkinDate).format("YYYY-MM-DD") : checkOutMoment.format("YYYY-MM-DD");
    }
    try {
      if (showOtherPersonForm) {
        const isValid = await trigger(["name", "mobile"]);
        if (!isValid) {
          showToast("error", "Please Enter Valid Other Person Name and Mobile Number");
          return;
        }
      }
      const res = await services.bookHotelService(payload);
      if (res.status === 200) {
        setBookingDetail(res?.data?.data);
        navigation.navigate('Payment', {
          BookingId: res?.data?.data?.id,
          amount: priceSummary?.totalPayable,
          bookingType: isHourlyBooking ? 'Hourly' : 'FullDay',
          partialPayment: hotelData?.partialPayment,
          payAtHotel: hotelData?.payAtHotel,
          bookingDetail: bookingDetail
        });
      }

    }
    catch (err) { console.log(err) }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!statusData || !checkinDate || Object.keys(hotelData || {}).length < 1) {
      setCheckSoldOut(false);
      return;
    }
    if (isHourlyBooking) {
      const isSoldOut =
        statusData?.[checkinDate]?.some(
          (item) =>
            item?.slot === hotelData?.slot &&
            item?.status === "Sold-Out"
        ) || false;

      setCheckSoldOut(isSoldOut);
      return;
    }
    if (!checkoutDate) {
      setCheckSoldOut(false);
      return;
    }

    const start = new Date(checkinDate);
    const end = new Date(checkoutDate);
    let isSoldOut = false;
    for (let d = new Date(start); d < end; d.setDate(d.getDate() + 1)) {
      const key = d.toISOString().slice(0, 10);
      const daySlots = statusData[key];
      if (!Array.isArray(daySlots)) continue;
      const hasFullDaySoldOut = daySlots.some(
        x => x.slot === "FullDay" && x.status === "Sold-Out"
      );
      if (hasFullDaySoldOut) {
        isSoldOut = true;
        break;
      }
    }
    setCheckSoldOut(isSoldOut);
  }, [statusData, checkinDate, checkoutDate, isHourlyBooking, hotelData?.slot]);


  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 120 : 0}
    >
      {loading && (
        <View style={commonStyles.loadingView}>
          <ActivityIndicator size={'large'} color={'#000'} />
        </View>
      )}
      <View style={{ flex: 1 }}>
        <View style={{ paddingHorizontal: 16 }}>
          <Header showBack={true} />
        </View>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 20,
          }}
        >
          <View style={styles.header}>
            <Text style={styles.title}>{hotelData?.propertyName}</Text>
            <Text style={styles.roomType}>{hotelData?.categoryName}</Text>

            <View style={[commonStyles.row, commonStyles.mt_2]}>
              <Ionicons name="location-outline" style={{ marginTop: 3 }} size={14} color="#c5c5c5ff" />
              <Text style={styles.locationText}>
                {hotelData?.address}
              </Text>
            </View>
          </View>

          <View style={{ padding: 16 }}>

            <View style={styles.card}>
              <View style={[commonStyles.rowBetweenAligned]}>
                <TouchableOpacity onPress={() => setShow(true)}>
                  <Text style={styles.label}>Check-in</Text>
                  <Text style={styles.dateText}>
                    {moment(checkinDate).format('DD-MM-YYYY')}
                  </Text>
                </TouchableOpacity>

                {
                  <View style={commonStyles.badge}>
                    <Text style={commonStyles.badgeText}>
                      {isHourlyBooking ? hotelData?.slot : `${nights} Nights`}
                    </Text>
                  </View>
                }

                {!isHourlyBooking && (
                  <TouchableOpacity onPress={() => setShow(true)}>
                    <Text style={styles.label}>Check-out</Text>
                    <Text style={styles.dateText}>
                      {moment(checkoutDate).format('DD-MM-YYYY')}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryText}>
                  {adult} Adult | {child} Children | {room} Room
                </Text>
              </View>
            </View>

            <View style={styles.card}>
              {/* <Text style={styles.subTitle}>Room Details</Text> */}

              <View style={commonStyles.rowBetweenAligned}>
                <Counter label="Room" value={room} setValue={(val) => updateOccupancy({ newRoom: val })} />
                <Counter label="Adults" value={adult} setValue={(val) => updateOccupancy({ newAdult: val })} />
                <Counter label="Child" value={child} setValue={(val) => updateOccupancy({ newChild: val })} />
              </View>

              {isHourlyBooking && (
                <TouchableOpacity style={styles.timeBox} onPress={() => setShowHours(true)}>
                  <Text style={styles.counterLabel}>Check-in Time</Text>
                  <View style={styles.timePicker}>
                    <Text style={styles.timeText}>{selectedHour || "Check-In Time"}</Text>
                    <Ionicons name="chevron-down" size={16} />
                  </View>
                </TouchableOpacity>
              )}
              <HourPopupPicker
                show={showHours}
                setShow={setShowHours}
                hoursArray={getHoursArray(slotWiseData?.checkIn, slotWiseData?.checkOut, checkinDate)}
                selectedHour={selectedHour}
                onChange={(value) =>
                  checkRoomAvailabilityOnCheckIn(value)
                }
              />
              {
                availableRooms == 0 ?
                  <Text style={[commonStyles.error, commonStyles.text_7, commonStyles.mt_1]}>
                    No rooms available, {isHourlyBooking ? 'Try another Checkin Time or Date.' : 'Try another Date'}
                  </Text> : null
              }

            </View>

            {
              !isHourlyBooking && (
                <MealPlan
                  isHourlyBooking={isHourlyBooking}
                  mealCharges={mealCharges}
                  mealPlan={mealPlan}
                  setMealPlan={setMealPlan}
                />
              )
            }

            <View style={styles.priceCard}>
              <Text style={styles.subTitle}>Price Details</Text>

              <PriceRow label={isHourlyBooking ? "Room Tariff / Room" : "Room Tariff / Room / Night"} value={formatINR(priceSummary?.basePrice)} />
              <PriceRow label="Instant Discount" value={formatINR(priceSummary?.instantDiscount)} />
              <PriceRow label="Base Price" value={formatINR(priceSummary?.amountBeforeTax)} />
              <PriceRow label="Taxes & Fee" value={formatINR(priceSummary?.taxesAndFees)} />
              {
                walletDiscount ? <PriceRow label="Wallet Discount" value={formatINR(walletDiscount)} /> : null
              }
              {
                couponDiscount > 0 ? <PriceRow label="Coupon Discount" value={formatINR(priceSummary?.couponAmount)} /> : null
              }
              {
                priceSummary?.breakfastAmount > 0 ? <PriceRow label="Meal Plan" value={formatINR(priceSummary?.breakfastAmount)} /> : null
              }


              <View style={styles.divider} />

              <View style={commonStyles.rowBetweenAligned}>
                <Text style={styles.totalLabel}>Total Amount</Text>
                <Text style={styles.totalAmount}>{formatINR(priceSummary?.totalPayable)}</Text>
              </View>
            </View>

            <Wallet
              walletBalance={walletMoney?.balance?.toFixed(2)}
              payableAmount={paymentState}
              walletDiscount={walletDiscount}
              setWalletDiscount={setWalletDiscount}
            />

            {
              (!isHourlyBooking && couponDiscount == 0) ? (
                <View style={styles.card}>
                  <View style={[styles.couponView, commonStyles.row, commonStyles.mb_2]}>
                    <TextInput
                      placeholder="Enter coupon code"
                      placeholderTextColor='#777'
                      value={couponCode}
                      onChangeText={setCouponCode}
                      style={styles.input}
                      autoCapitalize="characters"
                    />
                    <TouchableOpacity
                      style={[
                        commonStyles.btn, commonStyles.btnPrimary, commonStyles.btnSm
                        // !couponCode && { opacity: 0.5 }
                      ]}
                      // disabled={!couponCode}
                      onPress={onApplyPress}
                    >
                      <Text style={commonStyles.btnText}>Apply</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity style={commonStyles.rowEnd} onPress={() => navigation.navigate('Coupons', { propertyId: hotelData?.propertyId })}>
                    <Text style={commonStyles.btnLink}>Explore Offers</Text>
                  </TouchableOpacity>
                </View>
              ) : null
            }

            {
              (!isHourlyBooking && couponDiscount > 0) ?
                <View style={styles.card}>
                  <TouchableOpacity onPress={onRemoveCoupon}>
                    <Text style={{ color: '#f00', textAlign: 'center' }}>Remove Coupon</Text>
                  </TouchableOpacity>
                </View> : null
            }

            <View style={styles.card}>
              <TouchableOpacity
                style={[commonStyles.rowBetween, commonStyles.itemsCenter]}
                onPress={() => setShowOtherPersonForm(!showOtherPersonForm)}
              >
                <Text style={[styles.subTitle, commonStyles.mb_0]}>Book for Someone Else</Text>
                <Ionicons name="add" size={24} color="black" />
              </TouchableOpacity>
              {
                showOtherPersonForm && (
                  <View style={{ paddingTop: 20 }}>
                    <View style={{ marginBottom: 20 }}>
                      <Controller
                        control={control}
                        name="name"
                        rules={{ required: "Name is required" }}
                        render={({ field: { onChange, value } }) => (
                          <TextInput
                            style={styles.input2}
                            value={value}
                            onChangeText={onChange}
                            placeholder="Enter Other Person Name"
                            placeholderTextColor='#777'
                          />
                        )}
                      />
                      {errors.name && <Text style={{ color: "red" }}>{errors.name.message}</Text>}
                    </View>

                    {/* Mobile Input */}
                    <View style={{ marginBottom: 20 }}>
                      <Controller
                        control={control}
                        name="mobile"
                        rules={{
                          required: "Mobile number is required",
                          pattern: {
                            value: /^\d{10}$/,
                            message: "Mobile number must be 10 digits",
                          },
                        }}
                        render={({ field: { onChange, value } }) => (
                          <TextInput
                            style={styles.input2}
                            value={value}
                            onChangeText={onChange}
                            placeholder="Enter Other Person Mobile Number"
                            placeholderTextColor='#777'
                            keyboardType="number-pad"
                          />
                        )}
                      />
                      {errors.mobile && <Text style={{ color: "red" }}>{errors.mobile.message}</Text>}
                    </View>
                  </View>
                )
              }
            </View>

          </View>


          {
            isHourlyBooking ? (
              <CalendarModal
                visible={show}
                title="Select Date"
                mode="single"
                minDate={new Date()}
                selectedDate={{ checkinDate }}
                onChange={({ checkinDate }) => {
                  setCheckinDate(checkinDate);
                }}
                onApply={() => setShow(false)}
                onClose={() => setShow(false)}
              />

            ) :
              (
                <CalendarModal
                  visible={show}
                  title="Select Date Range"
                  mode="range"
                  minDate={new Date()}
                  dateRange={{ checkinDate, checkoutDate }}
                  onChange={({ checkinDate, checkoutDate }) => {
                    setCheckinDate(checkinDate);
                    setCheckoutDate(checkoutDate);
                  }}
                  onClose={() => setShow(false)}
                />
              )
          }

        </ScrollView>
      </View>
      <View style={styles.bottomBar}>
        {
          (checkSoldOut || availableRooms === 0) &&
          <Text
            style={[
              commonStyles.textCenter,
              commonStyles.mb_2,
              { color: 'rgb(226, 10, 10)', paddingHorizontal: 15 }
            ]}>
            Room not available on selected date range. Please choose another date
          </Text>
        }
        <TouchableOpacity
          style={[
            commonStyles.btn,
            commonStyles.btnSecondary,
            (availableRooms === 0 || checkSoldOut) && commonStyles.btnDisabled
          ]}
          onPress={createBooking}
          disabled={availableRooms === 0 || checkSoldOut}>
          <Text style={commonStyles.btnText}>Confirm your Booking</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default BookHotelScreen;

const PriceRow = ({ label, value }) => {
  label == "Instant Discount"
  return (
    <View style={[commonStyles.rowBetweenAligned, commonStyles.mb_1]}>
      <Text style={styles.priceLabel}>{label}</Text>
      <Text style={[styles.priceValue, label == "Instant Discount" && { color: '#090' }]}>{value}</Text>
    </View>
  )
};


const styles = StyleSheet.create({
  bottomBar: {
    width: '100%',
    backgroundColor: '#fff',
    elevation: 10,
    padding: 20
  },
  couponView: {
    backgroundColor: '#f1eeeeff',
    borderRadius: 12,
    padding: 6
  },
  input: {
    flex: 1,
    textTransform: 'uppercase',
    paddingHorizontal: 12
  },
  input2: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  title: { fontSize: 20, fontWeight: '700', color: '#ffffffff' },
  subTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12
  },
  header: {
    backgroundColor: '#000',
    // borderBottomWidth: 1,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },

  roomType: { color: '#eeeeeeff', marginTop: 4 },
  locationText: { fontSize: 14, color: '#c5c5c5ff', lineHeight: 20, marginLeft: 4, },

  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  label: { fontSize: 12, color: '#313131' },
  dateText: { fontSize: 14, fontWeight: '600' },

  summaryRow: {
    borderTopWidth: 1,
    borderColor: '#EEE',
    paddingTop: 8,
    marginTop: 12,
  },
  summaryText: { fontSize: 14 },


  timeBox: { marginTop: 16 },
  timePicker: {
    backgroundColor: '#eee',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    marginTop: 6,
  },
  timeText: { fontWeight: '600' },

  priceCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12
  },
  priceLabel: { color: '#555' },
  priceValue: { fontWeight: '600' },

  divider: {
    height: 1,
    backgroundColor: '#EEE',
    marginVertical: 12
  },
  totalLabel: { fontSize: 16, fontWeight: '700' },
  totalAmount: { fontSize: 18, fontWeight: '700', color: '#2979FF' }
});
