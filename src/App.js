import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";
// import AppNavigator from "./navigation/AppNavigator";
import RootNavigator from "./navigation/RootNavigator";
import Interceptor from "./api/Interceptor";

import Toast from 'react-native-toast-message';
import Toaster from './utils/Toaster'

export default function App() {
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
