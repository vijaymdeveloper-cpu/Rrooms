import api from '../../api/client'
import dictionary from '../directory'

const Services = {

    sendOtpService: (data) => {
        return api.post(dictionary.sendOtp(), data)
    },
    verifyOtpService: (data) => {
        return api.post(dictionary.verifyOtp(), data)
    },
    getCustomerProfileService: (id) => {
        return api.get(dictionary.getCustomerProfile(id))
    },
    editCustomerService: (id, data) => {
        return api.put(dictionary.editCustomer(id), data)
    },
    getBookingsService: (id, page, limit) => {
        return api.get(dictionary.getBookings(id, page, limit))
    },
    walletMoneyService: (id) => {
        return api.get(dictionary.walletMoney(id))
    },
    walletHistoryService: (id) => {
        return api.get(dictionary.walletHistory(id))
    },
    getCouponByUserIdService: (id) => {
        return api.get(dictionary.getCouponByUserId(id))
    },
    applyCouponService: (proId, userId, code) => {
        return api.get(dictionary.applyCoupon(proId, userId, code))
    },
    // applyCouponService: (id, code) => {
    //     return api.get(dictionary.applyCoupon(id, code))
    // },

    allCitiesService: () => {
        return api.get(dictionary.allCities())
    },
    allStatesService: () => {
        return api.get(dictionary.allStates())
    },
    roomsCategoryService: () => {
        return api.get(dictionary.roomsCategory())
    },
    propertyCategoryService: () => {
        return api.get(dictionary.propertyCategory())
    },

    searchPropertiesService: (params) => {
        return api.get(params ? dictionary.searchProperties() + params : dictionary.searchProperties())
    },
    getPropertiesForHomeService: (param) => {
        return api.get(dictionary.getPropertiesForHome(param))
    },
    singlePropertyService: (id) => {
        return api.get(dictionary.singleProperty(id))
    },
    getAmentiesService: () => {
        return api.get(dictionary.getAmenties())
    },
    nearByPropertiesService: (id) => {
        return api.get(dictionary.nearByProperties(id))
    },
    searchSuggestionService: (params) => {
        return api.get(dictionary.searchSuggestion(params))
    },

    getTaxService: () => {
        return api.get(dictionary.getTax())
    },
    checkRoomAvailabilityService: (data) => {
        return api.post(dictionary.checkRoomAvailability(), data)
    },
    checkRoomAvailabilityByRangeService: (data) => {
        return api.post(dictionary.checkRoomAvailabilityByRange(), data)
    },

    bookHotelService: (data) => {
        return api.post(dictionary.bookHotel(), data)
    },
    updateBookingModeStatusService: (id, data) => {
        return api.put(dictionary.updateBookingModeStatus(id), data)
    },
    changeBookingStatusService: (id, data) => {
        return api.patch(dictionary.changeBookingStatus(id), data)
    },
    getBookingService: (id) => {
        return api.get(dictionary.getBooking(id))
    },
    createBookingLogService: (data) => {
        return api.post(dictionary.createBookingLog(), data)
    },

    paymentGatewayService: (id, body) => {
        return api.get(dictionary.paymentGatewayUrl(id, body))
    },

    foodListService: (id) => {
        return api.get(dictionary.foodList(id))
    },
    foodOrderService: (data) => {
        return api.post(dictionary.foodOrder(), data)
    },
    getMenuByPropertyIdService: (id) => {
        return api.get(dictionary.getMenuByPropertyId(id))
    },

    checkRatingService: (id, body) => {
        return api.get(dictionary.checkRating(id, body))
    },
    sendRatingService: (data) => {
        return api.post(dictionary.sendRating(), data)
    },

}

export default Services