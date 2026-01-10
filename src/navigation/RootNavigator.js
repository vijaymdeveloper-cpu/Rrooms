import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";

import SplashScreen from "../screens/splash";
import AuthStack from "./stacks/AuthStack";
import AppStack from "./stacks/AppStack";

export default function RootNavigator() {

  const { isLoggedIn } = useSelector(state => state.auth);

  return (
    <NavigationContainer>
      <SplashScreen>
        {isLoggedIn ? <AppStack /> : <AuthStack />}
      </SplashScreen>
    </NavigationContainer>
  );
}
