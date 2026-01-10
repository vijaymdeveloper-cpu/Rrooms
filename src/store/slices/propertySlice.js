import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import services from "@api/services";

export const fetchProperties = createAsyncThunk(
    "property/fetchProperties",
    async ({ params, page }, { rejectWithValue, getState }) => {
        try {
            const { filterValues } = getState().property;

            const updated = params?.replace(
                /traveller_choice=([^&]+)/,
                () => "allowHourly=1"
            );

            const modifyParams = filterValues?.travellerChoice?.includes(8)
                ? updated + "&allowHourly=1"
                : params;

            const res = await services.searchPropertiesService(modifyParams);

            return {
                data: res?.data?.data || [],
                count: res?.data?.count || 0,
                page
            };
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const propertySlice = createSlice({
    name: "property",
    initialState: {
        properties: [],
        count: 0,
        loading: true,
        loadingMore: false,
        searchVal: "",
        cityName: '',
        filterValues: {
            propertyCategoryFilter: [],
            roomCategoryFilter: [],
            travellerChoice: [],
            localityFilter: [],
            latlongFilter: { lat: null, long: null },
            cityId: 0,
            allowHourly: 0,
        },
    },
    reducers: {
        clearPropertyState: () => initialState,
        setFilter: (state, { payload }) => {
            state.filterValues = { ...state.filterValues, ...payload };
        },
        setSearch: (state, { payload }) => {
            state.searchVal = payload;
        },
        setCity: (state, { payload }) => {
            state.cityName = payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProperties.pending, (state, action) => {
                const page = action.meta.arg?.page;
                if (page === 1) {
                    state.loading = true;
                } else {
                    state.loadingMore = true;
                }
            })
            .addCase(fetchProperties.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.loadingMore = false;

                if (payload.page === 1) {
                    state.properties = payload.data;
                } else {
                    state.properties = [...state.properties, ...payload.data];
                }
                state.count = payload.count;
            })
    }
});

export const { clearPropertyState, setFilter, setSearch, setCity } = propertySlice.actions;

export default propertySlice.reducer;