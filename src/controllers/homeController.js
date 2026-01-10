import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import services from "@api/services";
import { setCity, setSearch, setFilter } from '@store/slices/propertySlice';

const useHomeController = () => {

    const [hotels, setHotels] = useState([])

    const dispatch = useDispatch();
    const navigation = useNavigation();

    useEffect(() => {
        fetchHotels()
    }, []);


    const fetchHotels = async () => {
        try {
            const res = await services.getPropertiesForHomeService()
            if (res?.status === 200) {
                setHotels(res?.data?.data)
            }
        }
        catch (err) { console.log(err) }
    }

    const handleFilterByTravelChoise = (item) => {
        dispatch(setCity(''))
        dispatch(setSearch(""));
        dispatch(setFilter({ travellerChoice: [item.id] }));
        navigation.navigate('Hotels')
    }

    // const handleNearByPress = async () => {
    //     const { latitude, longitude } = locationData;
    //     dispatch(setFilter({ latlongFilter: { lat: latitude, long: longitude } }));
    //     navigation.navigate('Hotels')
    // };

    return {
        hotels,
        handleFilterByTravelChoise,
    };
};

export default useHomeController;
