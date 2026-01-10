import { View, StyleSheet, Dimensions } from "react-native";
import ShimmerView from "./ShimmerView";  

const { width } = Dimensions.get("window");

const HotelDetailSkeleton = () => {
  return (
    <View>

      {/* Address / subtitle */}
      <ShimmerView
        style={{ width: "90%", height: 14, marginBottom: 16, marginTop: 10 }}
      />

      {/* Badges */}
      <View style={styles.row}>
        <ShimmerView style={styles.badge} />
        <ShimmerView style={styles.badge} />
        <ShimmerView style={styles.badgeLarge} />
      </View>

      {/* Amenities title */}
      <ShimmerView style={{ width: 120, height: 18, marginVertical: 16 }} />

      {/* Amenities icons */}
      <View style={styles.amenitiesRow}>
        {[1, 2, 3, 4, 5].map((i) => (
          <View key={i} style={{ alignItems: "center" }}>
            <ShimmerView style={styles.icon} />
            <ShimmerView style={styles.iconText} />
          </View>
        ))}
      </View>

      {/* Tabs */}
      <View style={styles.tabWrapper}>
        <ShimmerView style={styles.tabActive} />
        <ShimmerView style={styles.tabInactive} />
      </View>

      {/* Price cards */}
      <View style={styles.cardRow}>
        {[1, 2, 3].map((i) => (
          <View key={i} style={styles.card}>
            <ShimmerView style={{ width: "60%", height: 16, marginBottom: 8 }} />
            <ShimmerView style={{ width: "70%", height: 18, marginBottom: 12 }} />
            <ShimmerView
              style={{ width: "80%", height: 38, borderRadius: 20 }}
            />
          </View>
        ))}
      </View>

    </View>
  );
};

export default HotelDetailSkeleton;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginBottom: 20,
  },
  badge: {
    width: 110,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  badgeLarge: {
    width: 140,
    height: 32,
    borderRadius: 16,
  },
  amenitiesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  icon: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  iconText: {
    width: 60,
    height: 10,
    marginTop: 6,
    borderRadius: 6,
  },
  tabWrapper: {
    flexDirection: "row",
    backgroundColor: "#f1f1f1",
    borderRadius: 30,
    padding: 6,
    marginBottom: 24,
  },
  tabActive: {
    flex: 1,
    height: 44,
    borderRadius: 22,
    marginRight: 6,
  },
  tabInactive: {
    flex: 1,
    height: 44,
    borderRadius: 22,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card: {
    width: width / 3 - 20,
    borderRadius: 12,
    backgroundColor: "#fff",
    padding: 12,
  },
});
