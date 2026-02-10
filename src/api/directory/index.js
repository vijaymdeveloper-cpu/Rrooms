const Dictionary = {

    sendOtp: ()=> `auth/otpGen`,
    verifyOtp: ()=> `auth/otpVerify`,
    getCustomerProfile: (id)=> `auth/customers/${id}`,
    editCustomer: (id)=> `auth/update-user/${id}`,
    getBookings: (id, page, limit)=> `booking/room-booking/by-user/${id}?page=${page}&limit=${limit}`,
    walletMoney: (id)=> `auth/user-wallet?user_id=${id}`,
    walletHistory: (id)=> `auth/user-wallet/${id}`,
    getCouponByUserId: (id) => `rrooms-property/coupon-userid/${id}?offerMode=2`,
    applyCoupon: (proId, userId, code) => `rrooms-property/coupon/validates/${code}/${userId}/${proId}`,
    // applyCoupon: (id, code) => `rrooms-property/coupon/validate/${id}/${code}`,

    allCities: ()=> `country/city`,
    allStates: ()=> `country/state`,
    roomsCategory: ()=> `rrooms-property/rroom-category`,
    propertyCategory: ()=> `rrooms-property/property-category`,

    searchProperties: () => `rrooms-property/search`,
    getPropertiesForHome: () => `rrooms-property/search?order_direction=asc&query=Lucknow&page=1&limit=8`,
    singleProperty: (id) => `rrooms-property/property/${id}`,
    getAmenties: ()=> `rrooms-property/amenities`,
    nearByProperties: (id)=> `booking/nearest-property/${id}`,
    searchSuggestion: (params)=> `rrooms-property/suggestion${params == "" ? "" : "?query=" + params}`,

    getTax: ()=> `rrooms-property/service-tax/1`,
    checkRoomAvailability: ()=> `booking/availability/check`,
    checkRoomAvailabilityByRange: ()=> `booking/room-availability/check`,

    bookHotel: ()=> `booking/room-booking`,
    updateBookingModeStatus: (id)=> `booking/room-booking-confirm/${id}`,
    changeBookingStatus: (id)=> `booking/room-booking/${id}`,
    getBooking: (id)=> `booking/room-booking/${id}`,
    createBookingLog: ()=> `booking/booking-logs`,
    paymentGatewayUrl: (id, body) => `rrooms-property/initiate-payment-razorpay?booking_id=${id}&paymentType=${body}`,

    foodList: (id)=> `rrooms-property/food-menu-item?property_id=${id}`,
    foodOrder: ()=> `rrooms-property/food-order`,
    getMenuByPropertyId: (id)=> `rrooms-property/menu-card/${id}`,

    checkRating: (code)=> `rrooms-property/ratings?bookingCode=${code}`,
    sendRating: ()=> `rrooms-property/ratings`
    
}

export default Dictionary;