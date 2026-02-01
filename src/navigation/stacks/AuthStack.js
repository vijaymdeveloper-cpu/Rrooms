import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ROUTES from "../routes";
import LoginScreen from "../../screens/auth";
import SignupScreen from "../../screens/auth/SignupScreen";
import OtpScreen from "../../screens/auth/OtpScreen";

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>

      <Stack.Screen name={ROUTES.LOGIN} component={LoginScreen} />
      <Stack.Screen name={ROUTES.SIGNUP} component={SignupScreen} />
      <Stack.Screen name={ROUTES.OTP} component={OtpScreen} />

    </Stack.Navigator>
  );
}
