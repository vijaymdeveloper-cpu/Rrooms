import { View, StyleSheet, FlatList } from 'react-native';
import ShimmerView from './ShimmerView';

const ListingSkeleton = ({ count = 8 }) => {
  return (
    <FlatList
      data={Array.from({ length: count })}
      keyExtractor={(_, index) => index.toString()}
      showsVerticalScrollIndicator={false}
      renderItem={() => (
        <View style={styles.item}>

          {/* Single Line */}
          <ShimmerView style={[styles.box, { height: 16 }]} />

          {/* Bottom Border */}
          <View style={styles.divider} />

        </View>
      )}
    />
  );
};

export default ListingSkeleton;

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#E1E9EE',
    overflow: 'hidden',
  },
  item: {
    paddingVertical: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginTop: 14,
  },
});
