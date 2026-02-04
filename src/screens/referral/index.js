import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Share
} from "react-native";
import { useSelector } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import LinearGradient from "react-native-linear-gradient";
import Clipboard from "@react-native-clipboard/clipboard";
import { commonStyles } from '@assets/styles/commonStyles';
import Header from '@components/Header';

export default function ReferAndEarnScreen({ navigation }) {

  const { userDetail } = useSelector((state) => state.auth)

  const referralCode = userDetail?.referralCode;

  const onShareReferral = async () => {
    try {
      await Share.share({
        message:
          `Hey! 🎉\n\nUse my referral code ${referralCode} and earn ₹250 credits on RROOMS.\n\nDownload the app now!`,
      });
    } catch (error) {
      console.log("Share error:", error);
    }
  };

  return (
    <ScrollView
      style={styles.screenWrapper}
      showsVerticalScrollIndicator={false}>

      <Header showBack={'Refer and Earn'} />

      <LinearGradient
        colors={["#402f1fff", "#f7af51ff"]}
        style={styles.banner}
      >
        <View style={{ flex: 1 }}>
          <Text style={styles.bannerTitle}>
            Refer More & Earn More
          </Text>

          <Text style={styles.bannerAmount}>
            ₹250 <Text style={styles.bannerCredits}>Credits</Text>
          </Text>

          <TouchableOpacity style={styles.bannerBtn} onPress={onShareReferral}>
            <Text style={styles.bannerBtnText}>Refer Now</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.iconWrap}>
          <Ionicons name="megaphone-outline" size={42} color="#fff" />
        </View>

      </LinearGradient>

      {/* Referral Code Card */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Your Referral Code</Text>

        <TouchableOpacity style={styles.codeBox} onPress={() => Clipboard.setString(referralCode)}>
          <Text style={styles.codeText}>{referralCode}</Text>
          <Ionicons name="copy-outline" size={18} color="#555" />
        </TouchableOpacity>

        <TouchableOpacity style={[commonStyles.btn, commonStyles.btnDark, commonStyles.rowCenter]} onPress={onShareReferral}>
          <Text style={commonStyles.btnText}>Refer & Earn {" "} </Text>
          <Ionicons name="arrow-forward" size={16} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Wallet Shortcut */}
      <View style={styles.card}>
        <View style={commonStyles.rowBetweenAligned}>
          <Text style={styles.walletText}>See Wallet Balance</Text>

          <TouchableOpacity style={styles.walletBtn} onPress={() => navigation.navigate('Wallet')}>
            <Ionicons name="wallet-outline" size={18} color="#fff" />
            <Text style={styles.walletBtnText}>Wallet</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* How it Works */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>How it Works?</Text>

        <Text style={styles.infoText}>
          1. Refer a friend and get 250 RROOMS credits to your account.
        </Text>
        <Text style={styles.infoText}>
          2. Referral offer is applicable only on Mobile App.
        </Text>
        <Text style={styles.infoText}>
          3. Credits can be redeemed up to 10% of the booking amount.
        </Text>
        <Text style={styles.infoText}>
          4. Credits valid only on Online Bookings.
        </Text>
        <Text style={styles.infoText}>
          5. RROOMS Credits are only applicable on Online Bookings, not on Pay
          at Hotel Bookings.
        </Text>
        <Text style={styles.infoText}>
          6. There is no limit to the number of friends you can refer to RROOMS.
        </Text>
        <Text style={styles.infoText}>
          7. RROOMS Hospitality India Private Limited reserves the right to
          cancel/change/modify the offer at any time without notice.
        </Text>
        <Text style={styles.infoText}>
          8. In case of any query regarding the offer feel free to email us at
          support@rrooms.in .
        </Text>
        <Text style={styles.infoText}>
          9. Coupon is not applicable in the hotel.
        </Text>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screenWrapper: {
    flex: 1,
    paddingHorizontal: 20,
  },
  banner: {
    borderRadius: 22,
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    marginBottom: 18
  },
  bannerTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  bannerAmount: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "700",
    marginVertical: 6,
  },
  bannerCredits: {
    fontSize: 18,
    fontWeight: "500",
  },
  bannerBtn: {
    backgroundColor: "#fff",
    alignSelf: "flex-start",
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 6,
  },
  bannerBtnText: {
    color: "#ffa54a",
    fontWeight: "600",
  },
  iconWrap: {
    marginLeft: 12,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
    marginBottom: 18
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 12,
    color: "#111",
  },

  codeBox: {
    backgroundColor: "#f1f1f1",
    borderRadius: 12,
    padding: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12
  },

  codeText: {
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 1,
  },


  walletText: {
    fontSize: 14,
    color: "#333",
  },

  walletBtn: {
    backgroundColor: "#ffa54a",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  walletBtnText: {
    fontWeight: "600",
    color: '#fff'
  },

  infoText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 8,
    lineHeight: 20,
  },
});
