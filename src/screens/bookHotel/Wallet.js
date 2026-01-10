import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Wallet = ({ walletBalance = 0, payableAmount, walletDiscount, setWalletDiscount }) => {

  const [useWallet, setUseWallet] = useState(false);

  useEffect(() => {
    if (useWallet && payableAmount && walletBalance > 0) {
      const maxWalletDiscount = payableAmount * 0.1;
      const walletUsed = Math.min(walletBalance, maxWalletDiscount);

      setWalletDiscount(walletUsed)
    } else {
      setWalletDiscount(0)
    }
  }, [useWallet, walletBalance, payableAmount]);

  return (
    <View style={{ marginBottom: 12 }}>
      {!useWallet ? (
        <TouchableOpacity
          style={styles.useWalletBtn}
          onPress={() => setUseWallet(true)}
        >
          <Text style={styles.useWalletText}>Use Wallet Amount</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.label}>Wallet Balance</Text>
            <Text style={styles.value}>₹ {walletBalance}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Wallet Used</Text>
            <Text style={styles.usedValue}>- ₹ {Math.round(walletDiscount)}</Text>
          </View>

          <TouchableOpacity
            style={styles.removeBtn}
            onPress={() => setUseWallet(false)}
          >
            <Text style={styles.removeText}>Remove Wallet</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Wallet;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
  },
  useWalletBtn: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
  },
  useWalletText: {
    color: "#1e90ff",
    fontSize: 16,
    fontWeight: "600",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: "#555",
  },
  value: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
  usedValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2E7D32",
  },
  removeBtn: {
    marginTop: 10,
    alignSelf: "flex-end",
  },
  removeText: {
    color: "#E53935",
    fontSize: 13,
    fontWeight: "500",
  },
});
