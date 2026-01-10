import React, { useEffect, useState, useRef, useMemo } from "react";
import { useNavigation } from '@react-navigation/native';
import moment from "moment";
import { propertyPolicy } from "@constants";
import { amenityIconMap } from "@constants/amenityIcons";
import services from "@api/services";
import { isJsonString, applyTax } from "@utils";


const PLAN_TABS = [
    { label: "Hourly Plan", value: "Hourly_Plan" },
    { label: "FullDay Plan", value: "Full_Day_Plan" },
];

const priorityPropertyAmenities = [
    "AC",
    "TV",
    "Free Wifi",
    "Kitchen",
    "Toaster",
    "Elevator",
    "Reception",
    "Geyser",
    "Safe",
    "Iron",
];

export default function useHotelDetailsController() {

    const navigation = useNavigation();

    const [hotelDetails, setHotelDetails] = useState({})
    const [loading, setLoading] = useState(true);
    const [showPolicy, setShowPolicy] = useState(null);
    const [plan, setPlan] = useState('Hourly_Plan');
    const [amenities, setAmenities] = useState([]);
    const [showAllAmenities, setShowAllAmenities] = useState(false);
    const [roomCategories, setRoomCategories] = useState([]);
    const [checkToday, setCheckToday] = useState(moment().format('YYYY-MM-DD'));

    const fetchPropertyDetail = async (id) => {
        setLoading(true)
        try {
            const res = await services.singlePropertyService(id);
            if (res.status === 200) {
                let data = res?.data?.data;
                setHotelDetails(data);
                let policy = [data.bookingPolicy];
                if (isJsonString(data.bookingPolicy)) {
                    policy = JSON.parse(data.bookingPolicy);
                }
                const cleanedArray = policy.filter(item => item.trim() !== "");
                setShowPolicy(cleanedArray);
            }
        } catch (error) { }
        finally { setLoading(false) }
    };

    const fetchAmenities = async () => {
        try {
            const res = await services.getAmentiesService();
            if (res.status === 200) {
                setAmenities(res?.data?.data);
            }
        } catch (error) { }
    };

    const filterAmenities = (type, dataAmen) => {
        let selectedAmenities = [];

        if (type === "property") {
            amenities?.forEach((item) => {
                hotelDetails?.PropertyAmenities?.forEach((data) => {
                    if (data.propertyAmenitiesId == item.id) {
                        selectedAmenities.push(item);
                    }
                });
            });

            selectedAmenities.sort((a, b) => {
                const indexA = priorityPropertyAmenities.indexOf(a.name);
                const indexB = priorityPropertyAmenities.indexOf(b.name);
                if (indexA === -1 && indexB === -1) return 0;
                if (indexA !== -1 && indexB === -1) return -1;
                if (indexA === -1 && indexB !== -1) return 1;
                return indexA - indexB;
            });
        }
        else {
            amenities?.forEach((item) => {
                dataAmen?.forEach((data) => {
                    if (data.amenitiesId == item.id) {
                        selectedAmenities.push(item);
                    }
                });
            });
        }

        if (type == 'property') {
            return showAllAmenities ? selectedAmenities : selectedAmenities?.slice(0, 4);
        }
        else {
            return selectedAmenities.slice(0, 3)
        }

    };

    const getAmenityIcon = (name) => {
        return amenityIconMap[name] || "checkmark-circle-outline";
    };

    const fetchRoomCategory = async () => {
        try {
            const res = await services.roomsCategoryService();
            if (res.status === 200) {
                setRoomCategories(res?.data?.data);
            }
        } catch (error) { }
    };

    useEffect(() => {
        fetchAmenities()
        fetchRoomCategory()
    }, [])

    return {
        fetchPropertyDetail,
        hotelDetails,
        loading,
        showPolicy,
        plan,
        setPlan,
        PLAN_TABS,
        filterAmenities,
        getAmenityIcon,
        showAllAmenities,
        setShowAllAmenities,
        roomCategories,
        checkToday,
        setCheckToday,
        applyTax,
        propertyPolicy,
    }

}