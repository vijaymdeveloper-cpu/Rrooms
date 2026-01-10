import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";
import { commonStyles } from '@assets/styles/commonStyles';
import CouponCard from "../coupons/CouponCard";

const DealScreen = ({ navigation }) => {

  const { coupons = [], walletMoney, walletInfo } = useSelector((state) => state.auth);
  
  return (
    <ScrollView
      style={[commonStyles.screenWrapper, commonStyles.mt_2]}
      showsVerticalScrollIndicator={false}>

      <View style={commonStyles.mb_1}>
        <View style={[commonStyles.rowBetweenAligned, commonStyles.mb_2]}>
          <Text style={styles.title}>Coupons</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Coupons')}>
            <Text style={commonStyles.btnLink}>View All</Text>
          </TouchableOpacity>
        </View>
        <CouponCard item={coupons[0]} extraDetails={false} />
      </View>


      <View style={commonStyles.mb_1}>
        <Text style={[styles.title, commonStyles.mb_2]}>Refer and Earn</Text>
        <View style={styles.referCard}>
          <View style={{ flex: 1 }}>
            <Text style={styles.referTitle}>Refer More & Earn More</Text>
            <Text style={styles.referAmount}>₹250 Credits</Text>
            <TouchableOpacity style={styles.referBtn}
              onPress={() => navigation.navigate('Referral')}>
              <Text style={styles.referBtnText}>Refer Now</Text>
            </TouchableOpacity>
          </View>
          <Icon name="megaphone-outline" size={70} color="#fff" />
        </View>
      </View>

      <View>
        <Text style={[styles.title, commonStyles.mb_2]}>RRooms Wallet</Text>
        <View style={styles.walletCard}>
          <View style={styles.walletHeader}>
            <View>
              <Text style={styles.walletLabel}>RRooms Wallet</Text>
              <Text style={styles.walletBalance}>₹{walletMoney?.balance}</Text>
              <Text style={styles.walletSub}>Available Balance</Text>
            </View>
            <Icon name="card-outline" size={42} color="#fff" />
          </View>
          <View style={styles.walletDivider} />
          <View style={styles.walletRow}>
            <View style={styles.walletItem}>
              <Text style={styles.walletValue}>{walletInfo?.totalRefers}</Text>
              <Text style={styles.walletText}>Referrals</Text>
            </View>
            <View style={styles.walletItem}>
              <Text style={styles.walletValue}>10%</Text>
              <Text style={styles.walletText}>Extra Off using wallet</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.walletBtn}
            onPress={() => navigation.navigate('Wallet')}>
            <Text style={styles.walletBtnText}>View Wallet</Text>
          </TouchableOpacity>
        </View>
      </View>

    </ScrollView>
  );
};

export default DealScreen;

const styles = StyleSheet.create({

  mainTitle: {
    backgroundColor: '#000',
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    borderBottomWidth: 1,
    // paddingBottom: 10,
    marginBottom: 12
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#222",
  },

  /* Refer */
  referCard: {
    flexDirection: "row",
    backgroundColor: "#ff9f43",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    marginBottom: 10
  },

  referTitle: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },

  referAmount: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
    marginVertical: 12,
  },

  referBtn: {
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 6,
    alignSelf: "flex-start",
  },

  referBtnText: {
    color: "#ff9f43",
    fontWeight: "600",
  },

  /* Wallet */
  walletCard: {
    backgroundColor: "#cfa32f",
    borderRadius: 18,
    padding: 18,
    marginBottom: 24,
  },

  walletHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  walletLabel: {
    color: "#fff",
    fontSize: 14,
    opacity: 0.9,
  },

  walletBalance: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "700",
    marginTop: 4,
  },

  walletSub: {
    color: "#fff",
    fontSize: 12,
    opacity: 0.85,
  },

  walletDivider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.3)",
    marginVertical: 14,
  },

  walletRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  walletItem: {
    width: "48%",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },

  walletValue: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  walletText: {
    color: "#fff",
    fontSize: 12,
    opacity: 0.9,
    marginTop: 2,
  },

  walletBtn: {
    marginTop: 16,
    backgroundColor: "#fff",
    borderRadius: 24,
    paddingVertical: 10,
    alignItems: "center",
  },

  walletBtnText: {
    color: "#cfa32f",
    fontWeight: "700",
    fontSize: 14,
  },
});
