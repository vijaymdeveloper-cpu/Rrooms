import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";
// import AppNavigator from "./navigation/AppNavigator";
import RootNavigator from "./navigation/RootNavigator";
import Interceptor from "./api/Interceptor";

import Toast from 'react-native-toast-message';
import Toaster from './utils/Toaster'
import VersionCheck from "react-native-version-check";
import { AppState, Linking, Platform, ToastAndroid } from "react-native";
import { useEffect } from "react";
import appsFlyer from 'react-native-appsflyer';



export default function App() {

  const updateApp = () => {
    VersionCheck.getStoreUrl({
      appID: "com.rrooms",
      appName: "RROOMS",
    })
      .then((url) => {
        Linking.canOpenURL(url)
          .then((supported) => {
            if (!supported) {
            } else {
              if (Platform.OS === "ios")
                return Linking.openURL("https://apps.apple.com/in/app/id6477883837");
              else
                return Linking.openURL(url);
            }
          })
          .catch((err) => console.error("An error occurred", err));
      })
      .catch((err) => { });
  };

  const checkAppUpdate = () => {
    VersionCheck.needUpdate().then((res) => {
      if (res.isNeeded) {
        ToastAndroid.show(
          "New update available, Please update !",
          ToastAndroid.LONG
        );
        updateApp();
      }
    });
  };


  const _handleAppStateChange = (nextState) => {
    if (nextState === "active") {
      checkAppUpdate();
    }
  };

  useEffect(() => {
    AppState.addEventListener("change", _handleAppStateChange);

    appsFlyer.onDeepLink((res) => {
      // alert(JSON.stringify(res))
      const deeplinkData = JSON.parse(res.data)
      // if (deeplinkData.data.deep_link_value) {
      //   setReferralCode(deeplinkData.data.deep_link_value);
      //   deepLinkPubSub.publish(deeplinkData);
      // }
    });

    appsFlyer.onInstallConversionData((res) => {
      if (res?.data?.af_status === 'Non-organic') {
        console.log("Deferred deep link data:", res.data);
      }
    });

    appsFlyer.initSdk(
      {
        devKey: '53fYb5GXV2NoXkWNqHEpgf',
        isDebug: true,
        appId: '6477883837', // only for iOS
        onAppOpenAttribution: true,
        onInstallConversionDataListener: true, //Optional
        onInstallConversionDataLoaded: true,
        onDeepLinkListener: true, //Optional
        timeToWaitForATTUserAuthorization: 10 //for iOS 14.5
      },
      (result) => {
        console.log("appsflyer result", result);
      },
      (error) => {
        console.error(error);
      }
    );

  }, []);


  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Interceptor />
        <RootNavigator />
        <Toast config={Toaster} keyboardOffset={80} swipeable />
      </PersistGate>
    </Provider>
  );
}
