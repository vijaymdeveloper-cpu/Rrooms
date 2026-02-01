import { View, StyleSheet } from "react-native";
import ShimmerView from "./ShimmerView"; 

const HotelCardSkeleton = () => {
  return (
    <View style={styles.card}>
      {/* Image */}
      <ShimmerView style={styles.image} />

      {/* Tags */}
      <View style={styles.tagRow}>
        <ShimmerView style={styles.tag} />
        <ShimmerView style={styles.discount} />
      </View>

      {/* Rating */}
      <ShimmerView style={styles.rating} />

      {/* Title */}
      <ShimmerView style={styles.title} />

      {/* Location */}
      <ShimmerView style={styles.location} />

      {/* Price */}
      <ShimmerView style={styles.price} />

      {/* Button */}
      <ShimmerView style={styles.button} />
    </View>
  );
};

const HotelListingSkeleton = () => {
  return (
    <View>
      {[1, 2, 3].map((_, index) => (
        <HotelCardSkeleton key={index} />
      ))}
    </View>
  );
};

export default HotelListingSkeleton;


const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 12,
    marginBottom: 20,
  },
  image: {
    height: 180,
    borderRadius: 12,
  },
  tagRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  tag: {
    height: 22,
    width: 70,
    borderRadius: 6,
  },
  discount: {
    height: 22,
    width: 120,
    borderRadius: 6,
  },
  rating: {
    height: 16,
    width: 60,
    borderRadius: 4,
    marginTop: 10,
  },
  title: {
    height: 18,
    width: "80%",
    borderRadius: 4,
    marginTop: 8,
  },
  location: {
    height: 14,
    width: "60%",
    borderRadius: 4,
    marginTop: 6,
  },
  price: {
    height: 18,
    width: "40%",
    borderRadius: 4,
    marginTop: 10,
  },
  button: {
    height: 45,
    borderRadius: 10,
    marginTop: 14,
  },
});
