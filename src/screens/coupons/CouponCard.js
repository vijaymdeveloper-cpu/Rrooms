import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Clipboard from "@react-native-clipboard/clipboard";
import { useDispatch, useSelector } from "react-redux";
import services from "@api/services";
import { commonStyles } from "@assets/styles/commonStyles";
import { saveCouponDiscount } from '@store/slices/authSlice';
import { showToast } from '@utils/Toaster';

const CouponCard = ({ item, extraDetails = true, propertyId, navigation }) => {

  const dispatch = useDispatch();

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const copyCode = (code) => {
    Clipboard.setString(code);
  };

  const onApply = async (item) => {
    try {
      const res = await services.applyCouponService(propertyId, item?.code)
      console.log('res', res)
      if (res?.data?.status) {
        dispatch(saveCouponDiscount(res?.data?.data?.amount))
        showToast('message', 'Coupon applied successfully!');
        navigation.goBack()
      }
    }
    catch (err) { console.log(err) }
  }

  return (
    <View style={styles.card}>
      {/* Top Section */}
      <View style={[commonStyles.rowBetween, commonStyles.itemsCenter]}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{item?.title}</Text>

          <Text style={styles.discount}>
            Get {item?.amount}% OFF
          </Text>

          <Text style={styles.valid}>
            Valid till {formatDate(item?.expireAt)}
          </Text>
        </View>
        {
          propertyId !== undefined &&
          <TouchableOpacity
            style={styles.applyBtn}
            onPress={() => onApply(item)}
          >
            <Text style={styles.applyText}>Apply</Text>
          </TouchableOpacity>
        }


      </View>

      {/* Coupon Code */}
      <View style={styles.codeBox}>
        <View style={styles.dashed}>
          <Text style={styles.codeText}>
            {item?.code?.toUpperCase()}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.copyBtn}
          onPress={() => copyCode(item?.code)}
        >
          <Text style={styles.copyText}>Copy</Text>
        </TouchableOpacity>
      </View>

      {
        extraDetails &&
        <View style={styles.metaBox}>
          <View style={[commonStyles.row]}>
            <Ionicons name="gift-outline" size={14} color="#E91E63" />
            <Text style={styles.metaText}>
              Offer Starts: {formatDate(item?.startAt)}
            </Text>
          </View>

          <View style={[commonStyles.row]}>
            <Ionicons name="calendar-outline" size={14} color="#000" />
            <Text style={styles.metaText}>
              Booking Period: {formatDate(item?.bookingFrom)} -{" "}
              {formatDate(item?.bookingTo)}
            </Text>
          </View>
        </View>
      }

    </View>
  );
};

export default CouponCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    elevation: 3,
    padding: 14,
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1e90ff",
  },
  discount: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2E7D32",
    marginTop: 4,
  },
  valid: {
    fontSize: 12,
    color: "#777",
    marginTop: 4,
  },
  applyBtn: {
    borderWidth: 1,
    borderColor: "#1e90ff",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  applyText: {
    color: "#1e90ff",
    fontWeight: "600",
  },
  codeBox: {
    flexDirection: "row",
    marginTop: 14,
  },
  dashed: {
    flex: 1,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#1e90ff",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    backgroundColor: "#F4F9FF",
  },
  codeText: {
    color: "#28a745",
    fontWeight: "700",
    letterSpacing: 1,
    fontSize: 15,
  },
  copyBtn: {
    backgroundColor: "#1e90ff",
    justifyContent: "center",
    paddingHorizontal: 20,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    marginLeft: -10,
  },
  copyText: {
    color: "#fff",
    fontWeight: "700",
  },
  metaBox: {
    borderTopWidth: 1,
    borderColor: "#eee",
    paddingTop: 10,
    marginTop: 12,
  },
  metaText: {
    fontSize: 12,
    color: "#555",
    marginLeft: 5,
    marginBottom: 4,
  },
});
