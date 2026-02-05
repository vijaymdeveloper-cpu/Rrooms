import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import services from "@api/services";

const initialState = {
    access_token: null,
    userDetail: {},
    isLoggedIn: false,
    agreementDetail: [],
    walletMoney: {},
    walletInfo: {
        transactions: [],
        totalRefers: 0,
        totalRefersAmt: 0
    },
    coupons: [],
    couponDiscount: 0
};

export const fetchUserData = createAsyncThunk(
    "auth/fetchUserData",
    async (userId, { rejectWithValue }) => {
        try {
            const response = await services.getCustomerProfileService(userId);
            return response?.data?.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Something went wrong");
        }
    }
);
export const fetchWalletData = createAsyncThunk(
    "auth/fetchWalletData",
    async (userId, { rejectWithValue }) => {
        try {
            const response = await services.walletMoneyService(userId);
            return response?.data?.data[0];
        } catch (error) {
            return rejectWithValue(error.response?.data || "Something went wrong");
        }
    }
);
export const fetchWalletTransactions = createAsyncThunk(
    "auth/fetchWalletTransactions",
    async (userId, { rejectWithValue }) => {
        try {
            const response = await services.walletHistoryService(userId);
            return response?.data?.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Something went wrong");
        }
    }
);
export const fetchCoupons = createAsyncThunk(
    "auth/fetchCoupons",
    async (userId, { rejectWithValue }) => {
        try {
            const response = await services.getCouponByUserIdService(userId);
            return response?.data?.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Something went wrong");
        }
    }
);


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        saveToken: (state, { payload }) => {
            state.access_token = payload;
            state.isLoggedIn = !!payload;
        },
        saveUserData: (state, { payload }) => {
            state.userDetail = payload;
        },
        saveAgreementDetail: (state, { payload }) => {
            state.agreementDetail = payload
        },
        saveCouponDiscount: (state, { payload }) => {
            state.couponDiscount = payload
        },
        setGuest: (state) => {
            state.isLoggedIn = true;
            state.access_token = null;
            state.userDetail = {};
        },
        clearAuthState: (state) => {
            Object.assign(state, initialState);
        },
        resetAuth: (state) => {
            state.isLoggedIn = false;
            state.token = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserData.fulfilled, (state, { payload }) => {
            state.userDetail = payload;
        });
        builder.addCase(fetchWalletData.fulfilled, (state, { payload }) => {
            state.walletMoney = payload;
        });
        builder.addCase(fetchWalletTransactions.fulfilled, (state, { payload }) => {
            const transactions = Array.isArray(payload) ? payload : [];

            let refers = 0;
            let refersAmt = 0;

            transactions.forEach(item => {
                if (item?.amount === 250) {
                    refers += 1;
                    refersAmt += 250;
                }
            });

            state.walletInfo = {
                transactions,
                totalRefers: refers,
                totalRefersAmt: refersAmt
            };
        });

        builder.addCase(fetchCoupons.fulfilled, (state, { payload }) => {
            state.coupons = payload;
        });
    },
});

export const { saveToken, saveUserData, saveAgreementDetail, saveCouponDiscount, setGuest, clearAuthState, resetAuth } = authSlice.actions;

export default authSlice.reducer;