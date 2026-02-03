import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProperties, setSearch, setFilter } from "@store/slices/propertySlice";
import services from "@api/services";

export default function useHotelsController() {

    const [sortValue, setSortValue] = useState(0);
    const [page, setPage] = useState(1);
    const [propertCategories, setPropertyCategries] = useState([]);
    const [roomCategories, setRoomCategories] = useState([]);
    const itemsPerPage = 10;

    const dispatch = useDispatch();
    const { loading, loadingMore, properties, count, filterValues, searchVal, cityName } = useSelector((state) => state.property);

    useEffect(() => {
        if (!dispatch) return;

        const filters = { ...filterValues };

        /* ------------------ SORT ------------------ */
        const byPrice =
            sortValue === 1
                ? "order_by=price&order_direction=desc"
                : sortValue === 2
                    ? "order_by=price&order_direction=asc"
                    : sortValue === 3
                        ? "order_by=rating&order_direction=desc"
                        : "order_direction=asc";

        /* ------------------ LOCATION (LAT/LONG) ------------------ */
        if (filters?.latlongFilter?.lat && filters?.latlongFilter?.long) {
            const { lat, long } = filters.latlongFilter;

            dispatch(
                fetchProperties({
                    params: `?order_direction=asc&lat=${lat}&long=${long}&page=${page}&limit=${itemsPerPage}`,
                    page
                })
            );
            return;
        }

        /* ------------------ QUERY ------------------ */
        let query = "";
        if (searchVal) {
            query = `&query=${searchVal}`;
        } else if (cityName) {
            query = `&query=${cityName}`;
        }

        /* ------------------ OTHER FILTERS ------------------ */
        const locality =
            filters?.localityFilter?.length > 0
                ? `&pin_code=${filters.localityFilter}`
                : "";

        const propertyType = filters?.propertyCategoryFilter?.length
            ? `&property_type=${filters.propertyCategoryFilter.toString()}`
            : "";

        const roomType = filters?.roomCategoryFilter?.length
            ? `&room_type=${filters.roomCategoryFilter.toString()}`
            : "";

        const travellerChoice = filters?.travellerChoice?.length
            ? `&traveller_choice=${filters.travellerChoice.toString()}`
            : "";

            console.log('locality', locality)

        /* ------------------ FINAL URL ------------------ */
        const finalParams =
            `?${byPrice}` +
            locality +
            query +
            propertyType +
            roomType +
            travellerChoice +
            `&page=${page}&limit=${itemsPerPage}`;

        dispatch(fetchProperties({ params: finalParams, page }));

    }, [dispatch, sortValue, filterValues, cityName, searchVal, page, itemsPerPage]);


    const loadMoreHotels = () => {
        if (!loading && properties.length < count) {
            setPage(prev => prev + 1);
        }
    };

    useEffect(() => {
        setPage(1);
    }, [sortValue, filterValues, cityName, searchVal]);


    const getAverageRating = (ratings = []) => {
        if (!ratings.length) return 0;
        const total = ratings.reduce(
            (acc, curr) => acc + curr.rating,
            0
        );
        return (total / ratings.length).toFixed(1);
    };

    const fetchPropertyCategory = async () => {
        try {
            const res = await services.propertyCategoryService();
            if (res.status === 200) {
                setPropertyCategries(res?.data?.data);
            }
        } catch (error) { }
    };

    const fetchRoomCategory = async () => {
        try {
            const res = await services.roomsCategoryService();
            if (res.status === 200) {
                setRoomCategories(res?.data?.data);
            }
        } catch (error) { }
    };

    useEffect(()=>{
        fetchPropertyCategory()
        fetchRoomCategory()
    }, [])

    return {
        properties,
        count,
        searchVal,
        filterValues,
        fetchProperties,
        setSearch,
        setFilter,
        loading,
        loadingMore,
        getAverageRating,
        loadMoreHotels,
        propertCategories,
        roomCategories,
        dispatch
    };
}
