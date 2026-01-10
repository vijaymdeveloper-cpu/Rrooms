import React, { useState, useEffect, useRef } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Text
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import { setCity, setSearch, setFilter } from '@store/slices/propertySlice';
import services from '@api/services';
import { baseImgUrl } from "@api/client";
import ListingSkeleton from '@components/skeletons/ListingSkeleton';
import CityCard from '../../screens/home/CityCard'

export default function SearchScreen() {

  const dispatch = useDispatch();
  const inputRef = useRef();
  const navigation = useNavigation();

  const [suggetion, setSuggetion] = useState([]);
  const [query, setQuery] = useState("");

  const fetchSearchSuggestion = async (searchitem = "") => {
    setQuery(searchitem)
    try {
      const res = await services.searchSuggestionService(searchitem == '' ? '' : searchitem)
      if (res?.data?.status) {
        setSuggetion(res?.data?.data)
      }
    }
    catch (err) { console.log(err) }
  }

  useEffect(() => {
    fetchSearchSuggestion()
  }, [])


  const goToScreen = (item) => {
    if (item?.type === "CITY") {
      dispatch(setCity(item.name))
      dispatch(setSearch(item.name));
      dispatch(setFilter({ travellerChoice: '' }));
      dispatch(
        setFilter({
          cityId: item.cityId,
          latlongFilter: { lat: null, long: null },
        })
      );
      navigation.navigate('Hotels')
    }
    else if (item?.type === "LOCALITY") {
      navigation.navigate('Hotels')
    }
    else if (item?.type === "PROPERTY") {
      navigation.navigate('HotelDetails', {
        hotel: {
          hotelId: item.id,
          hotelName: item?.name,
          img: ''
          // img: baseImgUrl + item?.PropertyImages[0]?.image
        },
        bookingType: 'Full_Day_Plan'
      })
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={{ marginRight: 10 }}
          onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>
        <View style={styles.searchArea}>
          <TextInput
            placeholder="Search by City, Locality, Hotel Name"
            placeholderTextColor={'#747474'}
            ref={inputRef}
            value={query}
            onChangeText={(text) => fetchSearchSuggestion(text)}
            style={styles.input}
            autoFocus
            onSubmitEditing={(text) =>
              navigation.navigate("Hotels", { params: { text: text.nativeEvent.text }, })
            }
          />
        </View>
        {
          query !== '' && (
            <TouchableOpacity
              onPress={() => {
                inputRef.current.clear();
                setQuery("");
              }}>
              <Ionicons name="close" size={22} color="#000" />
            </TouchableOpacity>
          )
        }
      </View>

      <View style={{ padding: 14 }}>
        <CityCard size={'sm'} />
      </View>

      <View style={{ paddingHorizontal: 14 }}>
        {
          suggetion?.length > 0 ? (
            <FlatList
              data={suggetion}
              keyExtractor={(item, index) => index.toString()}
              keyboardShouldPersistTaps="handled"
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity style={styles.suggestionItem} onPress={() => goToScreen(item)}>
                    <View>
                      <Text style={styles.suggestionText}>{item.name}</Text>
                    </View>

                  </TouchableOpacity>
                )
              }}
              showsVerticalScrollIndicator={false}
            />
          ) : <ListingSkeleton />
        }

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: '#f3f3f3ff',
    borderRadius: 28,
    paddingHorizontal: 14,
    marginTop: 10,
  },
  searchArea: {
    flex: 1,
  },
  input: {
    height: 52,
  },
  suggestionItem: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#eee",
    paddingVertical: 14,
  },
  suggestionText: {
    fontSize: 14,
    color: "#333",
  },
  emptyText: {
    textAlign: "center",
    color: "#999",
    marginTop: 40,
  },
});
