import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import ShimmerView from './ShimmerView';

/**
 * Reusable Shimmer Box
 */
const Box = ({ width, height, radius = 8, style }) => (
  <ShimmerView
    style={[
      styles.box,
      { width, height, borderRadius: radius },
      style,
    ]}
  />
);

const BookingsSkeleton = () => {
  return (
    <View style={styles.container}>

      {/* Booking Cards */}
      <FlatList
        data={[1, 2]}
        keyExtractor={(item) => item.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={() => (
          <View style={styles.card}>
            {/* Status */}
            <Box width={90} height={24} radius={12} />

            {/* Title */}
            <Box width="80%" height={20} style={styles.mt12} />
            <Box width="60%" height={16} style={styles.mt6} />

            {/* Image */}
            <Box
              width="100%"
              height={160}
              radius={12}
              style={styles.mt12}
            />

            {/* Dates */}
            <View style={styles.row}>
              <Box width="30%" height={50} />
              <Box width="30%" height={50} />
              <Box width="30%" height={50} />
            </View>

            {/* Details */}
            <Box width="70%" height={16} style={styles.mt10} />
            <Box width="50%" height={16} style={styles.mt6} />

            {/* Buttons */}
            <View style={styles.row}>
              <Box width="30%" height={44} radius={22} />
              <Box width="30%" height={44} radius={22} />
              <Box width="30%" height={44} radius={22} />
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default BookingsSkeleton;

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
  },
  box: {
    backgroundColor: '#E1E9EE',
    overflow: 'hidden',
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },

  mt12: { marginTop: 12 },
  mt10: { marginTop: 10 },
  mt6: { marginTop: 6 },
});
