import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Linking,
  Pressable
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";
import { commonStyles } from '@assets/styles/commonStyles';
import { FOOD_PLAN, BOOKING_STATUS, PAYMENT_STATUS, PAYMENT_STATUS_COLOR } from '@constants';
import { baseImgUrl } from "@api/client";
import moment from "moment";
import Header from '@components/Header'
import services from "@api/services";
import BookingsSkeleton from '@components/skeletons/BookingsSkeleton';
import { daysDiffernceWithMinOne } from '@utils';
import CancelModal from './CancelModal';
import FoodOrderModal from './FoodOrderModal';
import MenuModal from './MenuModal';


const BookingScreen = ({ navigation }) => {

  const [activeTab, setActiveTab] = useState("upcoming");
  const [bookings, setBookings] = useState([]);
  const [filtered, setFiltered] = useState([])
  const [selectedBooking, setSelectedBooking] = useState({});
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [refreshing, setRefreshing] = useState(false);
  const [show, setShow] = useState(false);
  const [singleItem, setSingleItem] = useState({})
  const [foodPopup, setFoodPopup] = useState(false);
  const [foodList, setFoodList] = useState([]);
  const [assignedRooms, setAssignedRooms] = useState([])
  const [showMenu, setShowMenu] = useState(false);

  const { userDetail } = useSelector((state) => state.auth)

  const fetchBookedHotels = async () => {
    setLoading(true)
    try {
      const res = await services.getBookingsService(userDetail?.id)
      if (res.status === 200) {
        setBookings(res?.data?.data || [])
        setPage(res?.data?.pagination)
      }
    }
    catch (err) { console.log(err) }
    finally { setLoading(false) }
  }

  useEffect(() => {
    fetchBookedHotels()
  }, [])

  useMemo(() => {
    const upcomingStatus = [1, 2];
    let filterData;

    if (activeTab == 'upcoming') {
      filterData = bookings?.filter(item => upcomingStatus.includes(item.bookingStatus))
      setFiltered(filterData)
    }
    else {
      filterData = bookings?.filter(item => !upcomingStatus.includes(item.bookingStatus))
      setFiltered(filterData)
    }
  }, [bookings, activeTab])

  const formatDate = (date, format = "DD MMM YYYY") => {
    if (!date) return "";
    return moment(date).format(format);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchBookedHotels(true);
    setRefreshing(false);
  };

  const handleNeedHelp = () => {
    let phoneNumber;
    if (Platform.OS !== "android") {
      phoneNumber = `telprompt:7377378030 `;
    } else {
      phoneNumber = `tel:7377378030 `;
    }
    Linking.openURL(phoneNumber);
  };

  const onCanceClose = (item) => {
    setShow(true)
    setSingleItem(item)
  }

  const fetchFoodList = async (data) => {
    try {
      const res = await services.foodListService(data?.propertyId)
      if (res?.data?.status) {
        setSelectedBooking(data)
        setFoodList(res?.data?.data)
        setAssignedRooms(data?.assignRoomNo?.split(","))
        setFoodPopup(true)
      }
    }
    catch (err) { console.log(err) }
  }

  const handlePayment = (id) => {
    navigation.navigate('Payment', {
      BookingId: id,
      isPayAtHotelEnabled: false
    });
  }

  return (
    <View style={commonStyles.screenWrapper}>
      {/* <Header showBack={'My Bookings'} profileIcon={false} /> */}

      <View style={styles.tabWrapper}>
        <View style={styles.tabContainer}>
          <TabButton
            title="Upcoming"
            active={activeTab === "upcoming"}
            onPress={() => setActiveTab("upcoming")}
          />
          <TabButton
            title="Previous"
            active={activeTab === "previous"}
            onPress={() => setActiveTab("previous")}
          />
        </View>
      </View>
      {
        loading ? <BookingsSkeleton /> : (
          <View>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 120 }}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  colors={["#1e90ff"]}
                  tintColor="#1e90ff"
                />
              }>
              {filtered.length === 0 ?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
                  <Text style={{ fontSize: 16, fontWeight: 'bold' }}>  No bookings found</Text>
                </View>
                :
                filtered?.map((item) => {
                  return (
                    <View style={styles.card} key={item?.id}>
                      <View>
                        <View style={commonStyles.rowBetween}>
                          <View
                            style={[
                              styles.statusPill,
                              commonStyles.row,
                              { backgroundColor: BOOKING_STATUS[item?.bookingStatus]?.bg }
                            ]}
                          >
                            <Ionicons
                              name="checkmark-circle"
                              size={14} color={BOOKING_STATUS[item?.bookingStatus]?.color}
                            />
                            <Text style={[styles.statusText, { color: BOOKING_STATUS[item?.bookingStatus]?.color }]}>
                              {BOOKING_STATUS[item?.bookingStatus]?.label}
                            </Text>
                          </View>
                        </View>
                        <Text style={[styles.hotelName, commonStyles.text_3]}>{item?.PropertyMaster?.name}</Text>
                        <Text style={styles.address}>
                          {item?.PropertyMaster?.locality}, {item?.PropertyMaster?.city}
                        </Text>
                      </View>

                      {/* Image */}
                      <Image
                        source={{ uri: `${baseImgUrl}${item?.PropertyMaster?.PropertyImages[0]?.image}` }}
                        style={styles.image}
                      />

                      {/* Dates */}
                      <View style={[styles.dateRow, commonStyles.row, commonStyles.itemsCenter]}>
                        <DateBlock title="Check-In" value={formatDate(item?.fromDate)} />
                        <View style={styles.dateDivider} />
                        <DateBlock title="Check-Out" value={formatDate(item?.toDate)} />
                        <View style={styles.dateDivider} />
                        <DateBlock title="Nights" value={daysDiffernceWithMinOne(item?.fromDate, item?.toDate)} />
                        {/* <DateBlock title="Nights" value={item?.noOfRooms} /> */}
                      </View>

                      {/* Details */}
                      <InfoRow label="Booking ID" value={item?.bookingCode} />
                      <InfoRow label="Guests" value={`${item?.adults} Adult • ${item?.children} Child`} />
                      <InfoRow label="Room Type" value={`${FOOD_PLAN[item?.breakFast]} | ${item?.roomCategoryName}`} />
                      <InfoRow label="Number of Rooms" value={`${item?.noOfRooms} Room`} />
                      <InfoRow label="Assign Rooms" value={item?.assignRoomNo ?? "N/A"} />

                      {/* Payment */}
                      <View style={styles.paymentBox}>
                        <InfoRow label="Total Amount" value={`₹ ${item?.bookingAmout}`} bold />
                        <Text style={[styles.paidText, { color: PAYMENT_STATUS_COLOR[item?.PaymentStatus] }]}>
                          {PAYMENT_STATUS[item?.PaymentStatus]}
                        </Text>
                      </View>

                      {/* Actions */}
                      <View style={[commonStyles.rowBetween, commonStyles.mt_3, { gap: 10, flexWrap: "wrap" }]}>
                        {
                          item?.bookingStatus < 2 &&
                          <TouchableOpacity
                            style={[
                              commonStyles.btn, commonStyles.btnDanger, commonStyles.row, styles.button
                            ]}
                            onPress={() => onCanceClose(item)}
                          >
                            <Ionicons name="close" size={14} color="#fff" />
                            <Text style={[commonStyles.btnText, styles.btnText, { marginLeft: 6 }]}>Cancel</Text>
                          </TouchableOpacity>
                        }
                        {
                          item?.bookingStatus === 2 &&
                          <TouchableOpacity style={[commonStyles.btn, commonStyles.btnPrimary, commonStyles.row, styles.button]}
                            onPress={() => {
                              setShowMenu(true);
                              setSelectedBooking(item)
                            }}>
                            <Ionicons name="fast-food-outline" size={14} color="#fff" />
                            <Text style={[commonStyles.btnText, styles.btnText, { marginLeft: 6 }]}>Menu</Text>
                          </TouchableOpacity>
                        }
                        {
                          item?.bookingStatus === 2 &&
                          <TouchableOpacity
                            style={[commonStyles.btn, commonStyles.btnSuccess, commonStyles.row, styles.button]}
                            onPress={() => fetchFoodList(item)}>
                            <Ionicons name="restaurant" size={14} color="#fff" />
                            <Text style={[commonStyles.btnText, styles.btnText, { marginLeft: 6 }]}>Order Food</Text>
                          </TouchableOpacity>
                        }
                        {(item?.PaymentStatus === 0 && item?.bookingStatus === 1) &&
                          <TouchableOpacity
                            style={[commonStyles.btn, commonStyles.btnSecondary, commonStyles.row, styles.button]}
                            onPress={() => handlePayment(item?.id)}>
                            <Text style={[commonStyles.btnText, styles.btnText]}>Pay Now</Text>
                          </TouchableOpacity>
                        }
                        <TouchableOpacity style={[commonStyles.btnOutline, commonStyles.btnOutlineDark, styles.button]} onPress={handleNeedHelp}>
                          <Text style={[commonStyles.btnOutlineDarkText, styles.btnText]}>Need Help?</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )
                })
              }

            </ScrollView>
          </View>
        )
      }

      <FoodOrderModal
        show={foodPopup}
        setShow={setFoodPopup}
        foodList={foodList}
        assignedRooms={assignedRooms}
        booking={selectedBooking}
      />

      <MenuModal
        show={showMenu}
        setShow={setShowMenu}
        propertyId={selectedBooking?.propertyId}
      />

      <CancelModal
        show={show}
        setShow={setShow}
        bookingData={singleItem || {}}
        fetchBookedHotels={fetchBookedHotels}
      />
    </View>
  );
};

/* ---------- Small Components ---------- */

const DateBlock = ({ title, value }) => (
  <View style={styles.dateBlock}>
    <Text style={styles.dateTitle}>{title}</Text>
    <Text style={styles.dateValue}>{value}</Text>
  </View>
);

const InfoRow = ({ label, value, bold }) => (
  <View style={[commonStyles.rowBetween, styles.infoRow]}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={[styles.infoValue, bold && styles.bold]}>{value}</Text>
  </View>
);

const TabButton = ({ title, active, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.tabBtn, active && styles.activeTab]}
  >
    <Text style={[styles.tabText, active && styles.activeTabText]}>
      {title}
    </Text>
  </TouchableOpacity>
);

export default BookingScreen;


const styles = StyleSheet.create({
  tabWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 30,
    overflow: 'hidden',
    padding: 0,
  },
  tabBtn: {
    width: 120,
    paddingVertical: 12,
    alignItems: "center"
  },
  tabText: {
    color: "#777"
  },
  activeTab: {
    backgroundColor: "#1e90ff"
  },
  activeTabText: {
    fontWeight: "600",
    color: "#fff"
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
    marginBottom: 20
  },
  hotelName: {
    color: "#111",
    marginBottom: 3
  },
  statusPill: {
    backgroundColor: "#eafaf1",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 10
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#27ae60",
    marginLeft: 4,
  },
  address: {
    color: "#777",
    fontSize: 12
  },
  image: {
    width: "100%",
    height: 110,
    borderRadius: 14,
    marginTop: 14,
    marginBottom: 14
  },
  dateRow: {
    backgroundColor: "#fff7e6",
    borderRadius: 12,
    paddingVertical: 10,
    marginBottom: 14
  },
  dateBlock: {
    flex: 1,
    alignItems: "center"
  },
  dateTitle: {
    fontSize: 12,
    color: "#888"
  },
  dateValue: {
    fontSize: 14,
    fontWeight: "700",
    marginTop: 2
  },
  dateDivider: {
    width: 1,
    height: 30,
    backgroundColor: "#f7dfabff"
  },
  infoRow: {
    marginVertical: 4
  },
  infoLabel: {
    color: "#888",
    fontSize: 12
  },
  infoValue: {
    color: "#111",
    fontSize: 13
  },
  bold: {
    fontWeight: "700"
  },
  paymentBox: {
    borderTopWidth: 1,
    borderColor: "#eee",
    paddingTop: 10,
    marginTop: 12,
  },
  paidText: {
    textAlign: "right",
    fontWeight: "700",
    fontSize: 14,
    marginTop: 6,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginTop: 4
  },
  btnText: {
    fontSize: 14,
  },
});
