import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ROUTES from "../routes";
import AppLayout from "@components/AppLayout";
import ProtectedRoute from "@components/ProtectedRoute";
import Tabs from "./Tabs";

import HotelsScreen from "../../screens/hotels";
import HotelDetailsScreen from "../../screens/hotelDetails";
import SearchScreen from "../../screens/search";
import BookHotelScreen from "../../screens/bookHotel";
import PaymentScreen from "../../screens/payment";
import BookingConfirmedScreen from "../../screens/bookingConfirmed";
import WalletScreen from "../../screens/wallet";
import CouponScreen from "../../screens/coupons";
import ReferralScreen from "../../screens/referral";
import EditAccountScreen from "../../screens/account/EditAccountScreen";
import HelpCenter from "../../screens/otherScreen/HelpCenter";
import FaqScreen from "../../screens/otherScreen/Faqs";
import AboutScreen from "../../screens/otherScreen/About";
import TermsScreen from "../../screens/otherScreen/Terms";

const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>

      <Stack.Screen name={ROUTES.TABS} component={Tabs} />

      <Stack.Screen name={ROUTES.HOTELS}>
        {props => (
          <AppLayout>
            <HotelsScreen {...props} />
          </AppLayout>
        )}
      </Stack.Screen>

      <Stack.Screen name={ROUTES.HOTEL_DETAILS} component={HotelDetailsScreen}></Stack.Screen>
      <Stack.Screen name={ROUTES.SEARCH} component={SearchScreen}></Stack.Screen>

      <Stack.Screen name={ROUTES.BOOK_HOTEL}>
        {props => (
          <AppLayout>
            <ProtectedRoute>
              <BookHotelScreen {...props} />
            </ProtectedRoute>
          </AppLayout>
        )}
      </Stack.Screen>

      <Stack.Screen name={ROUTES.PAYMENT}>
        {props => (
          <AppLayout>
            <ProtectedRoute>
              <PaymentScreen {...props} />
            </ProtectedRoute>
          </AppLayout>
        )}
      </Stack.Screen>

      <Stack.Screen name={ROUTES.BOOKING_CONFIRMED}>
        {props => (
          <AppLayout>
            <ProtectedRoute>
              <BookingConfirmedScreen {...props} />
            </ProtectedRoute>
          </AppLayout>
        )}
      </Stack.Screen>

      <Stack.Screen name={ROUTES.WALLET}>
        {props => (
          <AppLayout>
            <ProtectedRoute>
              <WalletScreen {...props} />
            </ProtectedRoute>
          </AppLayout>
        )}
      </Stack.Screen>

      <Stack.Screen name={ROUTES.COUPONS}>
        {props => (
          <AppLayout>
            <ProtectedRoute>
              <CouponScreen {...props} />
            </ProtectedRoute>
          </AppLayout>
        )}
      </Stack.Screen>

      <Stack.Screen name={ROUTES.REFERRAL}>
        {props => (
          <AppLayout>
            <ProtectedRoute>
              <ReferralScreen {...props} />
            </ProtectedRoute>
          </AppLayout>
        )}
      </Stack.Screen>

      <Stack.Screen name={ROUTES.EDIT_ACCOUNT}>
        {props => (
          <AppLayout>
            <ProtectedRoute>
              <EditAccountScreen {...props} />
            </ProtectedRoute>
          </AppLayout>
        )}
      </Stack.Screen>

      <Stack.Screen name={ROUTES.HELP_SUPPORT}>
        {props => (
          <AppLayout>
            <HelpCenter {...props} />
          </AppLayout>
        )}
      </Stack.Screen>

      <Stack.Screen name={ROUTES.FAQ}>
        {props => (
          <AppLayout>
            <FaqScreen {...props} />
          </AppLayout>
        )}
      </Stack.Screen>

      <Stack.Screen name={ROUTES.ABOUT_US}>
        {props => (
          <AppLayout>
            <AboutScreen {...props} />
          </AppLayout>
        )}
      </Stack.Screen>

      <Stack.Screen name={ROUTES.CONDITIONS}>
        {props => (
          <AppLayout>
            <TermsScreen {...props} />
          </AppLayout>
        )}
      </Stack.Screen>





      {/* <Stack.Screen name={ROUTES.HOTELS} component={HotelsScreen} />
      <Stack.Screen name={ROUTES.HOTEL_DETAILS} component={HotelDetailsScreen} />
      <Stack.Screen name={ROUTES.SEARCH} component={SearchScreen} />
      <Stack.Screen name={ROUTES.BOOK_HOTEL} component={BookHotelScreen} />
      <Stack.Screen name={ROUTES.PAYMENT} component={PaymentScreen} />
      <Stack.Screen name={ROUTES.BOOKING_CONFIRMED} component={BookingConfirmedScreen} />
      <Stack.Screen name={ROUTES.WALLET} component={WalletScreen} />
      <Stack.Screen name={ROUTES.COUPONS} component={CouponScreen} />
      <Stack.Screen name={ROUTES.REFERRAL} component={ReferralScreen} />
      <Stack.Screen name={ROUTES.EDIT_ACCOUNT} component={EditAccountScreen} />
      <Stack.Screen name={ROUTES.HELP_SUPPORT} component={HelpCenter} />
      <Stack.Screen name={ROUTES.FAQ} component={FaqScreen} />
      <Stack.Screen name={ROUTES.ABOUT_US} component={AboutScreen} />
      <Stack.Screen name={ROUTES.CONDITIONS} component={TermsScreen} /> */}

    </Stack.Navigator>
  );
}
