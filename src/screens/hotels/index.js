import { useState } from "react";
import { View, FlatList, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import useHotelsController from "@controllers/hotelsController";
import { commonStyles } from '@assets/styles/commonStyles'
import Header from '@components/Header'
import SearchBox from '@components/SearchBox'
import HotelCard from "./HotelCard";
import HotelListingSkeleton from '@components/skeletons/HotelListingSkeleton'
import Ionicons from "react-native-vector-icons/Ionicons";
import Filters from './Filters'

export default function HotelsScreen({ navigation }) {

  const [showFilter, setShowFilter] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const {
    loading,
    loadingMore,
    properties,
    count,
    getAverageRating,
    loadMoreHotels,
    propertCategories,
    roomCategories,
    fetchProperties,
    setFilter,
    setSearch,
    filterValues,
    dispatch
  } = useHotelsController();

  const onRefresh = async () => {
    setRefreshing(true);
    const clearHandler = async () => {
      dispatch(
        setFilter({
          propertyCategoryFilter: [],
          roomCategoryFilter: [],
          travellerChoice: [],
          localityFilter: [],
          latlongFilter: { lat: null, long: null },
        })
      );
      dispatch(setSearch(""));
      dispatch(fetchProperties('?order_direction=asc'))
    };
    await clearHandler()
    setRefreshing(false);
  };

  return (
    <View style={[commonStyles.screenWrapper, commonStyles.mb_4]}>
      <Header showBack={true} />
      <View style={[commonStyles.mb_2, styles.searchWrapper]}>
        <SearchBox placeholder={'Search for hotels...'} height={52} />
        <TouchableOpacity
          style={styles.filterBtn}
          onPress={() => setShowFilter(true)}
        >
          <Ionicons name="options-outline" size={24} color="#0b5aecff" />
        </TouchableOpacity>
      </View>
      <Text style={commonStyles.mb_2}>
        {
          loading ? "We are finding amazing hotels for you..."
            : <>
              We found <Text style={commonStyles.fwBold}>{count}</Text> amazing ROOMS hotels for you
            </>
        }
      </Text>

      {
        loading ? (
          <HotelListingSkeleton />
        ) : (
          <FlatList
            data={properties}
            keyExtractor={(item, idx) => idx.toString()}
            renderItem={({ item }) => (
              <HotelCard
                item={item}
                getAverageRating={getAverageRating}
                commonStyles={commonStyles}
                navigation={navigation}
              />
            )}
            onEndReached={loadMoreHotels}
            onEndReachedThreshold={0.3}
            ListFooterComponent={
              loadingMore ? (
                <View style={{ alignItems: 'center', height: 70 }}>
                  <Text>We’re finding more great stays for you</Text>
                  <ActivityIndicator size="small" color="#666" style={{ marginTop: 8 }} />
                </View>
              ) : <View style={{ alignItems: 'center', height: 70 }}></View>
            }
            // contentContainerStyle={{ paddingBottom: 40 }}
            showsVerticalScrollIndicator={false}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        )
      }


      <Filters
        show={showFilter}
        setShowFilter={setShowFilter}
        propertCategories={propertCategories}
        roomCategories={roomCategories}
        fetchProperties={fetchProperties}
        filterValues={filterValues}
        setSearch={setSearch}
        setFilter={setFilter}
        dispatch={dispatch}
        commonStyles={commonStyles}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  filterBtn: {
    width: 48,
    height: 52,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    // backgroundColor: "#ecf3ffff",
    alignItems: "center",
    justifyContent: "center",
    position: 'absolute',
    right: 0,
    zIndex: 10
  },
})

