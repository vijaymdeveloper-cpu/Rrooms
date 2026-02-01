import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import { resetAuth } from '@store/slices/authSlice' 

export default function NotLoggedInScreen() {

  const dispatch = useDispatch();

  const logoutFunction = () => {
    dispatch(resetAuth(true))
  };

  return (
    <View style={styles.container}>

      {/* Icon / Illustration */}
      <View style={styles.iconWrapper}>
        <Ionicons name="bed-outline" size={60} color="#2E7D32" />
      </View>

      {/* Title */}
      <Text style={styles.title}>
        Login to Manage Your Bookings
      </Text>

      {/* Subtitle */}
      <Text style={styles.subtitle}>
        Access your wallet, exclusive hotel deals, saved stays and manage all
        your bookings in one place.
      </Text>

      {/* Benefits */}
      <View style={styles.benefits}>
        <View style={styles.benefitItem}>
          <Ionicons name="checkmark-circle" size={18} color="#2E7D32" />
          <Text style={styles.benefitText}>Exclusive hotel discounts</Text>
        </View>

        <View style={styles.benefitItem}>
          <Ionicons name="checkmark-circle" size={18} color="#2E7D32" />
          <Text style={styles.benefitText}>Wallet & coupons access</Text>
        </View>

        <View style={styles.benefitItem}>
          <Ionicons name="checkmark-circle" size={18} color="#2E7D32" />
          <Text style={styles.benefitText}>Faster bookings & support</Text>
        </View>
      </View>

      {/* Login Button */}
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={logoutFunction}
      >
        <Text style={styles.loginText}>Login to Continue</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center"
  },
  iconWrapper: {
    alignSelf: "center",
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#E8F5E9",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1B1B1B",
    textAlign: "center",
    marginBottom: 10
  },
  subtitle: {
    fontSize: 15,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 25
  },
  benefits: {
    marginBottom: 30
  },
  benefitItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10
  },
  benefitText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#374151"
  },
  loginBtn: {
    backgroundColor: "#fb961b",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 14
  },
  loginText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600"
  },
});
