import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppLayout from "@components/AppLayout";
import ProtectedRoute from "@components/ProtectedRoute";
import ROUTES from "../routes";

import HomeScreen from '../../screens/home';
import BookingScreen from '../../screens/bookings';
import DealScreen from '../../screens/deals';
import AccountScreen from '../../screens/account';

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = iconName = focused ? 'home' : 'home-outline';
          }
          else if (route.name === 'Bookings') {
            iconName = focused ? 'bag' : 'bag-outline';
          }
          else if (route.name === 'Deals') {
            iconName = focused ? 'gift' : 'gift-outline';
          }
          else if (route.name === 'Account') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={22} color={color} />;
        },

        tabBarActiveTintColor: '#ff9d25',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          height: 80,
          paddingTop: 5,
          paddingBottom: 12,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          paddingTop: 2
        }
      })}
    >
      <Tab.Screen name={ROUTES.HOME}>
        {(props) => (
          <AppLayout
          >
            <HomeScreen {...props} />
          </AppLayout>
        )}
      </Tab.Screen>

      <Tab.Screen name={ROUTES.BOOKINGS}>
        {(props) => (
          <AppLayout>
            <ProtectedRoute>
              <BookingScreen {...props} />
            </ProtectedRoute>
          </AppLayout>
        )}
      </Tab.Screen>

      {/* <Tab.Screen name={ROUTES.BOOKINGS} component={BookingScreen}></Tab.Screen> */}

      <Tab.Screen name={ROUTES.DEALS}>
        {(props) => (
          <AppLayout>
            <ProtectedRoute>
              <DealScreen {...props} />
            </ProtectedRoute>
          </AppLayout>
        )}
      </Tab.Screen>

      <Tab.Screen name={ROUTES.ACCOUNT}>
        {(props) => (
          <AppLayout>
            <ProtectedRoute>
              <AccountScreen {...props} />
            </ProtectedRoute>
          </AppLayout>
        )}
      </Tab.Screen>

      {/* <Tab.Screen name={ROUTES.ACCOUNT} component={AccountScreen}></Tab.Screen> */}

    </Tab.Navigator>
  );
}
