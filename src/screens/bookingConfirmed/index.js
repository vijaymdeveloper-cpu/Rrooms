import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
  Platform,
} from "react-native";
import { useSelector } from "react-redux";
import moment from "moment";
import Ionicons from "react-native-vector-icons/Ionicons";
import services from "@api/services";
import { commonStyles } from '@assets/styles/commonStyles';
import { baseImgUrl } from '@api/client';

export default function BookingConfirmedScreen({ route, navigation }) {

  const { BookingId } = route?.params

  const [booking, setBooking] = useState({})
  const { userDetail } = useSelector((state) => state.auth)

  const fetchLatestBooking = async () => {
    try {
      const res = await services.getBookingService(BookingId)
      if (res?.data?.status) {

        setBooking(res?.data?.data)
        const reqData = {
          countryCode: "+91",
          phoneNumber: res.data.data.User.mobile,
          callbackData: "booking_callback",
          type: "Template",
          template: {
            name: "room_reservation_confirmation",
            languageCode: "en",
            bodyValues: [
              res.data.data.otherPersonName ??
              res.data.data.User.name ??
              "Guest",
              res.data.data.PropertyMaster.name,
              moment(res.data.data.createdAt).format("DD-MM-YYYY hh:mm A"),
            ],
            buttonValues: {
              0: ["View Booking"],
            },
          },
        };
        const data = await fetch(`https://api.interakt.ai/v1/public/message/`, {
          method: "post",
          headers: {
            Authorization: `Basic T1VZU0lGLXNyZzVXWENSengzdTdGSTdXWlNjbzBvWGJLSEQ4Y0VubWtXZzo=`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reqData),
        });

      }
    }
    catch (err) { console.log(err) }
  }

  useEffect(() => {
    if (BookingId) {
      fetchLatestBooking()
    }
  }, [BookingId])

  const openInMaps = () => {
    const lat = booking?.PropertyMaster?.latitude;
    const lng = booking?.PropertyMaster?.longitude;

    if (!lat || !lng) return;

    const url = Platform.select({
      ios: `comgooglemaps://?q=${lat},${lng}`,
      android: `geo:${lat},${lng}?q=${lat},${lng}`,
    });

    Linking.canOpenURL(url)
      .then(supported => {
        if (supported) {
          Linking.openURL(url);
        } else {
          // fallback to web
          Linking.openURL(`https://www.google.com/maps?q=${lat},${lng}`);
        }
      })
      .catch(err => console.error(err));
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* SUCCESS STRIP */}
        <View style={styles.successStrip}>
          <Ionicons name="checkmark-circle" size={26} color="#16a34a" />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.successTitle}>Booking Confirmed</Text>
            <Text style={styles.successSub}>
              Confirmation sent to {userDetail?.email}
            </Text>
          </View>
        </View>

        <View style={{ padding: 16 }}>

          {/* HOTEL CARD */}
          <View style={styles.card}>
            <Text style={[commonStyles.text_4, commonStyles.mb_2]}>
              {booking?.PropertyMaster?.name}
            </Text>

            <View style={commonStyles.rowBetween}>
              <Text style={[commonStyles.textMuted]}>Booking ID: {booking?.bookingCode}</Text>
              {
                booking?.bookingType == "Hourly" &&
                <View style={styles.pill}>
                  <Text style={styles.pillText}>{booking?.bookingType} • {booking?.bookingSlot}s</Text>
                </View>
              }
            </View>


            <View style={styles.imgBox}>
              {
                booking?.PropertyMaster?.PropertyImages.length ?
                  <Image
                    source={{
                      uri: `${baseImgUrl}${booking?.PropertyMaster?.PropertyImages[0].image}`,
                    }}
                    style={styles.hotelImage}
                  /> : null
              }
            </View>


            {/* TIME */}
            <View style={[commonStyles.rowAligned, commonStyles.mt_3]}>
              <View style={styles.timeBlock}>
                <Text style={commonStyles.text_7}>CHECK-IN</Text>
                <Text style={[commonStyles.text_6, commonStyles.fwBold, { marginVertical: 4 }]}>
                  {moment(booking?.fromDate).format('DD-MM-YYYY')}
                </Text>
                <Text style={commonStyles.text_7}>
                  {
                    booking?.bookingType == "Hourly" ? `(${booking?.bookingHours?.split(" to ")[0]})` : ('12:00 PM')
                  }
                </Text>
              </View>

              <View style={styles.line} />

              <View style={styles.timeBlock}>
                <Text style={commonStyles.text_7}>CHECK-OUT</Text>
                <Text style={[commonStyles.text_6, commonStyles.fwBold, { marginVertical: 4 }]}>
                  {moment(booking?.toDate).format('DD-MM-YYYY')}
                </Text>
                <Text style={commonStyles.text_7}>
                  {
                    booking?.bookingType == "Hourly" ? `(${booking?.bookingHours?.split(" to ")[1]})` : ('11:00 AM')
                  }
                </Text>
              </View>
            </View>
          </View>

          {/* DETAILS */}
          <View style={styles.card}>
            <Text style={styles.subTitle}>Stay Details</Text>

            <DetailRow label="Guests" value={`${booking?.adults} Adult, ${booking?.children} Children`} />
            <DetailRow label="Rooms" value={`${booking?.noOfRooms} Room`} />
            <DetailRow label="Landmark" value={booking?.PropertyMaster?.locality} />
          </View>

          {/* ADDRESS */}
          <View style={styles.card}>
            <Text style={styles.subTitle}>Hotel Address</Text>
            <Text style={commonStyles.textMuted}>
              {booking?.PropertyMaster?.address}
            </Text>

            <TouchableOpacity style={[commonStyles.rowAligned, commonStyles.mt_2]} onPress={openInMaps}>
              <Ionicons name="location-outline" size={18} color="#2563eb" />
              <Text style={[commonStyles.btnLink, { marginLeft: 5 }]}>Open in Maps</Text>
            </TouchableOpacity>
          </View>

          <View style={[commonStyles.row, commonStyles.mt_1, { gap: 12 }]}>
            <TouchableOpacity 
            style={[commonStyles.btn, commonStyles.btnPrimary, { flex: 1 }]}
            onPress={()=> navigation.navigate('Tabs', { screen: 'Bookings' })}>
              <Text style={commonStyles.btnText}>View Booking</Text>
            </TouchableOpacity>
            {
              booking?.dueAmount > 0 &&
              <TouchableOpacity style={[commonStyles.btn, commonStyles.btnSecondary, { flex: 1 }]}>
                <Text style={commonStyles.btnText}> {' '} Pay Now {' '}</Text>
              </TouchableOpacity>
            }
          </View>
        </View>
      </ScrollView>


    </View>
  );
}

/* Reusable Row */
const DetailRow = ({ label, value }) => (
  <View style={[commonStyles.rowBetween, commonStyles.mt_2]}>
    <Text style={commonStyles.textMuted}>{label}</Text>
    <Text style={commonStyles.fwBold}>{value}</Text>
  </View>
);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eeeeeeff"
  },
  successStrip: {
    flexDirection: "row",
    backgroundColor: "#ecfdf5",
    alignItems: "center",
    padding: 14,
  },
  successTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#14532d",
  },
  successSub: {
    fontSize: 13,
    color: "#166534",
    marginTop: 2,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    // elevation: 1,
    padding: 14,
    marginBottom: 16
  },
  pill: {
    backgroundColor: "#eef2ff",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  pillText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#4338ca",
  },
  imgBox: {
    width: "100%",
    height: 160,
    borderRadius: 12,
    backgroundColor: '#eee',
    marginTop: 12,
  },
  hotelImage: {
    width: "100%",
    height: 160,
    borderRadius: 12,
  },
  timeBlock: {
    flex: 1,
    alignItems: "center"
  },
  line: {
    width: 1,
    height: 40,
    backgroundColor: "#e5e7eb",
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
  },
});
