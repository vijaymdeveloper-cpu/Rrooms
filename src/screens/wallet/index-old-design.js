import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";

const transactions = [
  { id: "1", title: "Referral Reward", date: "30 Dec 2025", amount: 250 },
  { id: "2", title: "Referral Reward", date: "19 Dec 2025", amount: 250 },
  { id: "3", title: "Food Order", date: "24 Nov 2025", amount: -115 },
];

const WalletScreen = () => {
  return (
    <View style={styles.container}>
      {/* Curved Header */}
      <LinearGradient
        colors={["#0F2027", "#203A43", "#2C5364"]}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>My Wallet</Text>
      </LinearGradient>

      {/* Floating Wallet Card */}
      <View style={styles.walletCard}>
        <Text style={styles.balanceLabel}>Available Balance</Text>
        <Text style={styles.balance}>₹ 0.00</Text>

        <TouchableOpacity style={styles.walletBtn}>
          <Text style={styles.walletBtnText}>Use Wallet</Text>
        </TouchableOpacity>
      </View>

      {/* Referral Section */}
      <View style={styles.referralCard}>
        <View>
          <Text style={styles.refTitle}>Invite Friends</Text>
          <Text style={styles.refSub}>Earn ₹250 per referral</Text>
        </View>

        <TouchableOpacity style={styles.inviteBtn}>
          <Ionicons name="paper-plane-outline" size={18} color="#fff" />
          <Text style={styles.inviteText}>Invite</Text>
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={styles.stats}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>4</Text>
          <Text style={styles.statLabel}>Referrals</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>₹1000</Text>
          <Text style={styles.statLabel}>Earned</Text>
        </View>
      </View>

      {/* Transactions */}
      <Text style={styles.sectionTitle}>Transaction History</Text>

      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.txItem}>
            <View>
              <Text style={styles.txTitle}>{item.title}</Text>
              <Text style={styles.txDate}>{item.date}</Text>
            </View>

            <Text
              style={[
                styles.txAmount,
                { color: item.amount > 0 ? "#16A34A" : "#DC2626" },
              ]}
            >
              {item.amount > 0 ? "+" : "-"}₹{Math.abs(item.amount)}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default WalletScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F5F9",
  },

  header: {
    height: 180,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
  },

  walletCard: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginTop: -50,
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    elevation: 6,
  },

  balanceLabel: {
    color: "#64748B",
    fontSize: 13,
  },

  balance: {
    fontSize: 34,
    fontWeight: "800",
    marginVertical: 8,
  },

  walletBtn: {
    marginTop: 10,
    backgroundColor: "#0F172A",
    paddingHorizontal: 26,
    paddingVertical: 10,
    borderRadius: 22,
  },

  walletBtnText: {
    color: "#fff",
    fontWeight: "600",
  },

  referralCard: {
    marginTop: 20,
    marginHorizontal: 20,
    backgroundColor: "#E0F2FE",
    borderRadius: 18,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  refTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0369A1",
  },

  refSub: {
    fontSize: 12,
    color: "#0369A1",
    marginTop: 2,
  },

  inviteBtn: {
    flexDirection: "row",
    backgroundColor: "#0284C7",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: "center",
    gap: 6,
  },

  inviteText: {
    color: "#fff",
    fontWeight: "600",
  },

  stats: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 20,
  },

  statBox: {
    backgroundColor: "#fff",
    width: "48%",
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: "center",
  },

  statValue: {
    fontSize: 20,
    fontWeight: "700",
  },

  statLabel: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 4,
  },

  sectionTitle: {
    marginHorizontal: 20,
    marginTop: 24,
    marginBottom: 10,
    fontSize: 18,
    fontWeight: "700",
  },

  txItem: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 14,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
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

  txAmount: {
    fontSize: 16,
    fontWeight: "700",
  },
});
