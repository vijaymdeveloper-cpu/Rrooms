import { View, StyleSheet } from 'react-native';
import ShimmerView from './ShimmerView';

const CitySkeleton = ({ size }) => {
    return (
        <View style={styles.container}>
            {[1, 2, 3, 4, 5, 6 ].map((_, index) => (
                <View style={styles.item} key={index}>
                    <ShimmerView style={[styles.circle, { width: size == 'sm' ? 40 : 72, height: size == 'sm' ? 40 : 72 }]} />
                    <ShimmerView style={styles.text} />
                </View>
            ))}
        </View>
    );
};

export default CitySkeleton;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    item: {
        alignItems: 'center',
        marginRight: 14,
    },
    circle: {
        borderRadius: 50,
        marginBottom: 10,
    },
    text: {
        width: 48,
        height: 12,
    },
});

