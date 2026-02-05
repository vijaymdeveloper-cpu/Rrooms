import React, { useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { commonStyles } from '@assets/styles/commonStyles';
import Header from '@components/Header';
import CouponCard from './CouponCard';
import { fetchCoupons } from '@store/slices/authSlice'

const CouponScreen = ({ route, navigation }) => {

    const dispatch = useDispatch();
    const propertyId = route?.params?.propertyId
    const { userDetail, coupons = [] } = useSelector((state) => state.auth);

    useEffect(()=>{
        dispatch(fetchCoupons(userDetail?.id))
    }, [])

    return (
        <View style={commonStyles.screenWrapper}>

            <Header showBack={'Available Coupons'} profileIcon={false} />

            <ScrollView>
                {
                    coupons.map((item) => (
                        <CouponCard
                            key={item?.code}
                            item={item}
                            propertyId={propertyId}
                            userDetail={userDetail}
                            navigation={navigation}
                        />
                    ))}
            </ScrollView>
        </View>
    );
};

export default CouponScreen;

const styles = StyleSheet.create({
    heading: {
        fontSize: 18,
        fontWeight: "700",
        marginVertical: 8
    },
});
