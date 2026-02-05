import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import LinearGradient from "react-native-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import Header from '@components/Header';
import { fetchWalletData, fetchWalletTransactions } from '@store/slices/authSlice'


const WalletScreen = ({ navigation }) => {

  const dispatch = useDispatch();
  const { userDetail, walletMoney, walletInfo } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(fetchWalletData(userDetail?.id))
    dispatch(fetchWalletTransactions(userDetail?.id))
  }, [])

  const renderItem = ({ item }) => (
    <View style={styles.txCard}>
      <View style={styles.txLeft}>
        <View
          style={[
            styles.iconCircle,
            { backgroundColor: item?.transactionType ? "#E8F7EF" : "#FDECEC" },
          ]}
        >
          <Ionicons
            name={item?.transactionType ? "arrow-down" : "arrow-up"}
            size={18}
            color={item?.transactionType ? "#1DB954" : "#E63946"}
          />
        </View>

        <View>
          <Text style={styles.txTitle}>
            {item?.transactionType ? "Wallet Credit" : "Wallet Debit"}
          </Text>
          <Text style={styles.txDate}>{moment(item?.createdAt).format("DD MMM, YYYY, hh:mm A")}</Text>
        </View>
      </View>

      <View style={styles.txRight}>
        <Text
          style={[
            styles.txAmount,
            { color: item?.transactionType ? "#1DB954" : "#E63946" },
          ]}
        >
          ₹{item.amount}
        </Text>

        <View
          style={[
            styles.statusChip,
            { backgroundColor: item?.transactionType ? "#E8F7EF" : "#FDECEC" },
          ]}
        >
          <Text
            style={{
              color: item?.transactionType ? "#1DB954" : "#E63946",
              fontSize: 11,
              fontWeight: "600",
            }}
          >
            {item?.transactionType ? "CREDIT" : "DEBIT"}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.screenWrapper} showsVerticalScrollIndicator={false}>
      <Header showBack={'Wallet'} />
      <View style={{ paddingTop: 6 }}>
        {/* Glass Wallet Card */}
        {/* <LinearGradient
        colors={["#1F4037", "#99F2C8"]}
        style={styles.walletCard}
      > */}
        <LinearGradient
          colors={["#402f1fff", "#f7af51ff"]}
          style={styles.walletCard}
        >
          <Ionicons name="wallet-outline" size={34} color="#fff" />

          <Text style={styles.walletTitle}>Total Wallet Balance</Text>

          <Text style={styles.walletAmount}>₹ {walletMoney?.balance}</Text>

          <TouchableOpacity style={styles.actionBtn}>
            <Text style={styles.actionText}>View Details</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{walletInfo?.totalRefers}</Text>
            <Text style={styles.statLabel}>Referrals</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statValue}>10%</Text>
            <Text style={styles.statLabel}>Extra OFF</Text>
          </View>
        </View>

        {/* Refer Card */}
        <View style={styles.referCard}>
          <View>
            <Text style={styles.referTitle}>Invite & Earn</Text>
            <Text style={styles.referSub}>Get ₹250 on every referral</Text>
          </View>

          <TouchableOpacity style={styles.referBtn} onPress={() => navigation.navigate('Referral')}>
            <Ionicons name="arrow-forward-outline" size={18} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* History */}
        <Text style={styles.heading}>Transaction History</Text>

        <FlatList
          data={walletInfo?.transactions}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
        />
      </View>
    </ScrollView>
  );
};

export default WalletScreen;

const styles = StyleSheet.create({
  screenWrapper: {
    flex: 1,
    paddingHorizontal: 20,
  },
  walletCard: {
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    marginBottom: 20,
    elevation: 6,
  },

  walletTitle: {
    color: "#fff3e0ff",
    marginTop: 10,
    fontSize: 14,
  },

  walletAmount: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "800",
    marginVertical: 10,
  },

  actionBtn: {
    backgroundColor: "rgba(255,255,255,0.25)",
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
  },

  actionText: {
    color: "#fff",
    fontWeight: "600",
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  statBox: {
    backgroundColor: "#fff",
    width: "48%",
    borderRadius: 18,
    paddingVertical: 18,
    alignItems: "center",
  },

  statValue: {
    fontSize: 22,
    fontWeight: "700",
  },

  statLabel: {
    fontSize: 12,
    color: "#777",
    marginTop: 4,
  },

  referCard: {
    backgroundColor: "#111827",
    borderRadius: 18,
    padding: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },

  referTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  referSub: {
    color: "#9CA3AF",
    marginTop: 4,
    fontSize: 13,
  },

  referBtn: {
    backgroundColor: "#fb961b",
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },

  heading: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },

  txCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  txLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: "center",
    alignItems: "center",
  },

  txTitle: {
    fontSize: 14,
    fontWeight: "600",
  },

  txDate: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 2,
  },

  txRight: {
    alignItems: "flex-end",
  },

  txAmount: {
    fontSize: 16,
    fontWeight: "700",
  },

  statusChip: {
    marginTop: 4,
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 10,
  },
});
