import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import { commonStyles } from '@assets/styles/commonStyles'
import { setCity, setSearch, setFilter } from '@store/slices/propertySlice';
import services from "@api/services";
import Header from '@components/Header'
import SearchBox from '@components/SearchBox';
import TravelerChoice from './TravelerChoice';
import CityCard from './CityCard';
import RecommendedHotels from './RecommendedHotels';
import Icon from "react-native-vector-icons/Ionicons";

const HomeScreen = ({ navigation }) => {

  const dispatch = useDispatch();

  const [hotels, setHotels] = useState([])
  const [coords, setCoords] = useState({
    lat: null,
    long: null,
  });

  const fetchHotels = async () => {
    try {
      const { lat, long } = coords
      const param = (lat || long) ? `&lat=${lat}&long=${long}` : `&query=Lucknow`
      const res = await services.getPropertiesForHomeService(param)
      if (res?.status === 200) {
        let hotelList = res?.data?.data
        setHotels(hotelList)
        if (hotelList?.length == 0) {
          const newRes = await services.getPropertiesForHomeService('&query=Lucknow')
          setHotels(newRes)
        }
      }
    }
    catch (err) { console.log(err) }
  }

  useEffect(() => {
    fetchHotels()
  }, [coords]);

  const handleFilterByTravelChoise = (item) => {
    dispatch(setCity(''))
    dispatch(setSearch(""));
    dispatch(setFilter({ travellerChoice: [item.id] }));
    navigation.navigate('Hotels')
  }

  return (
    <View style={commonStyles.screenWrapper}>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[commonStyles.mb_5, commonStyles.mt_3]}>
          {/* <View style={[styles.heroText]}>
            <Text style={commonStyles.text_1}>Book By Time Slots</Text>
            <Text style={[commonStyles.text_5, commonStyles.text_light, commonStyles.mt_1]}>
              Book hotels by hour or full day
            </Text>
          </View> */}
          <SearchBox />
          <View style={[commonStyles.mt_5, commonStyles.mb_3]}>
            <Text style={[commonStyles.text_4, commonStyles.mb_3]}>
              Explore By Cities
            </Text>
            <CityCard setCoords={setCoords} />
          </View>
          <LinearGradient
            colors={["rgb(54, 34, 15)", "rgb(202, 136, 49)"]}
            style={styles.slotCard}
          >
            <View style={{ padding: 18 }}>
              <View style={[commonStyles.row, commonStyles.alignItems, commonStyles.mb_2]}>
                <Icon name="time-outline" size={20} color="#fff" />
                <Text style={styles.slotTitle}>Stay Smart Pay by the Hour</Text>
              </View>
              <Text style={styles.slotSubtitle}>
                3 | 6 | 9 Hour Stays . Anytime . Anywhere
              </Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleFilterByTravelChoise({ id: 8 })}
              >
                <Text style={styles.buttonText}>Explore Now</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
          <RecommendedHotels
            commonStyles={commonStyles}
            styles={styles}
            data={hotels}
            navigation={navigation}
          />
          <TravelerChoice
            commonStyles={commonStyles}
            handleFilterByTravelChoise={handleFilterByTravelChoise}
          />
          <View style={styles.offerBox}>
            <View>
              <Image style={styles.offerImg} source={require('@assets/images/img-offer.png')} />
              <View style={styles.offerContent}>
                <Text style={[commonStyles.text_3, commonStyles.textWhite]}>Don’t think</Text>
                <Text style={styles.offerSubTitle}>Book in blink!</Text>
                <TouchableOpacity
                  style={[commonStyles.btn, commonStyles.btnSecondary, commonStyles.btnFullWidth]}
                  onPress={() => handleFilterByTravelChoise({ id: 8 })}>
                  <Text style={commonStyles.btnText}>Book Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  heroText: {
    alignItems: 'center',
    paddingTop: 35,
    paddingBottom: 25
  },
  offerBox: {
    borderRadius: 16,
    overflow: 'hidden',
    // marginBottom: 30,
  },
  offerImg: {
    width: '100%',
  },
  offerContent: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 20
  },
  offerSubTitle: {
    backgroundColor: '#FF9D25',
    color: '#3C4043',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 6,
    marginTop: 10,
    marginBottom: 20
  },
  slotCard: {
    borderRadius: 20,
    marginVertical: 10
  },
  slotTitle: {
    fontSize: 16,
    fontWeight: "600",
    textTransform: 'uppercase',
    marginLeft: 8,
    color: "#fff",
  },
  slotSubtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: "#fff",
    lineHeight: 20,
    marginBottom: 18,
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 30,
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20
  },
  buttonText: {
    color: '#000',
    fontWeight: '500',
    // fontSize: 18
  }
});
