import { View, StyleSheet } from "react-native";
import ShimmerView from "./ShimmerView"; 

const HotelCardSkeleton = () => {
    return (
        <>
            {[1, 2, 3].map((_, i) => (
                <View style={styles.card} key={i}>
                    <ShimmerView style={styles.image} />
                    <ShimmerView style={styles.title} />
                    <ShimmerView style={styles.location} />
                </View>
            ))}
        </>
    );
};

export default HotelCardSkeleton;

const styles = StyleSheet.create({
    card: {
        width: 180,
        backgroundColor: "#fff",
        borderRadius: 14,
        marginRight: 14,
        overflow: "hidden",
    },
    image: {
        width: 180,
        height: 120,
        borderRadius: 0,
    },
    title: {
        width: "70%",
        height: 16,
        margin: 12,
        borderRadius: 8,
    },
    location: {
        width: "90%",
        height: 12,
        marginLeft: 10,
        marginBottom: 14,
        borderRadius: 8,
    },
});
