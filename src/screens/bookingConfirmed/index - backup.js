import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const BookingConfirmedScreen = () => {
  return (
    <View style={styles.container}>

      {/* Check Icon */}
      <View style={styles.iconWrapper}>
        <Ionicons name="checkmark" size={48} color="#2E7D32" />
      </View>

      {/* Message */}
      <Text style={styles.successText}>Booking Confirmed</Text>
      <Text style={styles.subText}>
        Your booking has been successfully completed
      </Text>

      {/* Booking Card */}
      <View style={styles.card}>
        <Text style={styles.hotelName}>Hotel Grand Palace</Text>

        {/* Booking Details */}
        <Text style={styles.sectionTitle}>Booking Details</Text>

        <DetailRow label="Booking ID" value="#BK102345" />
        <DetailRow label="Booked By" value="Vijay Sharma" />
        <DetailRow label="Check-in" value="22 Dec 2025" />
        <DetailRow label="Check-out" value="23 Dec 2025" />
        <DetailRow label="Adults" value="2" />
        <DetailRow label="Children" value="1" />
        <DetailRow label="Rooms" value="1" />

        {/* Payment */}
        <Text style={[styles.sectionTitle, { marginTop: 16 }]}>
          Payment Details
        </Text>
        <DetailRow label="Total Payable" value="₹ 1,900" bold />
      </View>

      {/* Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.helpBtn}>
          <Text style={styles.helpText}>Need Help</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.homeBtn}>
          <Text style={styles.homeText}>My Bookings</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

export default BookingConfirmedScreen;

/* Reusable row */
const DetailRow = ({ label, value, bold }) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={[styles.detailValue, bold && { fontWeight: "700" }]}>
      {value}
    </Text>
  </View>
);



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2E7D32",
    alignItems: "center",
    padding: 16,
  },

  iconWrapper: {
    backgroundColor: "#fff",
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },

  successText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
    marginTop: 16,
  },

  subText: {
    color: "#E8F5E9",
    fontSize: 14,
    marginTop: 6,
    textAlign: "center",
  },

  card: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 16,
    padding: 16,
    width: "100%",
    marginTop: 24,
  },

  hotelName: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    marginTop: 8,
  },

  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },

  detailLabel: {
    fontSize: 13,
    color: "#555",
  },

  detailValue: {
    fontSize: 13,
  },

  buttonRow: {
    flexDirection: "row",
    marginTop: 24,
    width: "100%",
    justifyContent: "space-between",
  },

  helpBtn: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#fff",
    paddingVertical: 14,
    borderRadius: 14,
    width: "48%",
    alignItems: "center",
  },

  helpText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },

  homeBtn: {
    backgroundColor: "#fff",
    paddingVertical: 14,
    borderRadius: 14,
    width: "48%",
    alignItems: "center",
  },

  homeText: {
    color: "#2E7D32",
    fontSize: 15,
    fontWeight: "600",
  },
});
