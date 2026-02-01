import { useEffect, useState, useMemo, use } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, PermissionsAndroid, Platform, Alert, Linking, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import Geolocation from '@react-native-community/geolocation';
import services from "@api/services";
import Icon from "react-native-vector-icons/Ionicons";
import { POPULAR_CITIES, CITY_PRIORITY } from "@constants";
import { setCity, setSearch, setFilter } from '@store/slices/propertySlice';
import { mainUrl } from '@api/client';
import CitySkeleton from '@components/skeletons/CitySkeleton';


const CityCard = ({ size, setCoords }) => {

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const [cities, setCities] = useState([]);
    const [locationData, setLocationData] = useState({ lat: '', long: '' })

    const fetchAllCities = async () => {
        try {
            const res = await services.allCitiesService();
            if (res?.data?.status) {
                setCities(res?.data?.data || []);
            }
        } catch (error) {
            console.log("Fetch cities error:", error);
        }
    };

    useEffect(() => {
        fetchAllCities();
    }, []);

    const filterCities = useMemo(() => {
        const filtered = cities?.filter((item) =>
            POPULAR_CITIES?.includes(item.name)
        );

        return filtered.sort((a, b) => {
            const indexA = CITY_PRIORITY.indexOf(a.name);
            const indexB = CITY_PRIORITY.indexOf(b.name);

            if (indexA !== -1 && indexB !== -1) {
                return indexA - indexB;
            }
            if (indexA !== -1) return -1;
            if (indexB !== -1) return 1;

            return a.name.localeCompare(b.name);
        });
    }, [cities]);

    const handleCityPress = (item) => {
        dispatch(setCity(item.name))
        dispatch(setSearch(item.name));
        dispatch(setFilter({ travellerChoice: '' }));
        dispatch(
            setFilter({
                cityId: item.id,
                latlongFilter: { lat: null, long: null },
            })
        );
        navigation.navigate('Hotels')
    }

    const requestLocationPermission = async () => {
        if (Platform.OS !== 'android') return true;

        const status = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );

        if (status === PermissionsAndroid.RESULTS.GRANTED) {
            return true;
        }

        if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
            Alert.alert(
                'Location Permission Required',
                'Please enable location permission from app settings',
                [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'Open Settings', onPress: () => Linking.openSettings() },
                ]
            );
        }

        return false;
    };

    useEffect(() => {
        requestLocationPermission()
    }, [])

    const getCurrentLocation = () => {
        Geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                setLocationData({
                    lat: latitude,
                    long: longitude,
                });
                setCoords({
                    lat: latitude,
                    long: longitude,
                });
            },
            error => {
                console.log(error.message);
            },
            {
                enableHighAccuracy: false,
                timeout: 15000,
                maximumAge: 10000,
            }
        );
    };

    useEffect(() => {
        getCurrentLocation()
    }, [])

    const loadNearbyHotels = async () => {
        const granted = await requestLocationPermission();
        if (granted) {
            getCurrentLocation();
        }
        const { lat, long } = locationData;
        if (lat || long) {
            dispatch(setFilter({ latlongFilter: { lat: lat, long: long } }));
            navigation.navigate('Hotels')
        }
    };

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 5 }}
        >
            <FlatList
                data={filterCities}
                horizontal
                renderItem={({ item }) => {
                    const img = `${mainUrl}${item.city_img}`;
                    return (
                        <TouchableOpacity style={styles.cityCard} onPress={() => handleCityPress(item)} key={item.id}>
                            <Image
                                source={{ uri: img }}
                                style={[
                                    styles.cityImage,
                                    { width: size === 'sm' ? 40 : 72, height: size === 'sm' ? 40 : 72 }
                                ]}
                            />

                            <Text
                                style={[
                                    styles.cityName,
                                    { fontSize: size == 'sm' ? 12 : 14 }
                                ]}>
                                {item?.name}
                            </Text>
                        </TouchableOpacity>
                    )
                }}
                emptyComponent={<CitySkeleton size={size} />}
                keyExtractor={(item, index) => index.toString()}
                ListHeaderComponent={() => {
                    return (
                        <TouchableOpacity style={styles.cityCard} onPress={loadNearbyHotels}>
                            <View
                                style={[
                                    styles.iconLocation,
                                    { width: size === 'sm' ? 40 : 72, height: size === 'sm' ? 40 : 72 }
                                ]}
                            >
                                <Icon name="navigate" size={size === 'sm' ? 20 : 24} color="#fff" />
                            </View>

                            <Text style={[
                                styles.cityName,
                                { fontSize: size == 'sm' ? 12 : 14 }
                            ]}>Near By</Text>
                        </TouchableOpacity>
                    )
                }}
                ListFooterComponent={() => {
                    return (
                        <TouchableOpacity style={styles.cityCard} onPress={() => handleCityPress({ name: "", id: 0 })} >
                            <Image
                                source={{ uri: "https://rrooms.in/static/media/allCities.a56eb3673db4af99fbf5.png" }}
                                style={[
                                    styles.cityImage,
                                    { width: size === 'sm' ? 40 : 72, height: size === 'sm' ? 40 : 72 }
                                ]}
                            />
                            <Text
                                style={[
                                    styles.cityName,
                                    { fontSize: size == 'sm' ? 12 : 14 }
                                ]}>
                                All
                            </Text>
                        </TouchableOpacity>
                    )
                }}
            />

        </ScrollView>
    );
};

export default CityCard;

const styles = StyleSheet.create({
    cityCard: {
        alignItems: 'center',
        marginRight: 14,
    },
    iconLocation: {
        width: 72,
        height: 72,
        backgroundColor: '#456efe',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cityImage: {
        width: 72,
        height: 72,
        borderRadius: 100,
        backgroundColor: '#fff',
    },
    cityName: {
        fontWeight: "500",
        textAlign: 'center',
        marginTop: 6,
    },
})