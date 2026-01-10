// layouts/RootLayout.js
import { View } from "react-native";
import Header from "@components/Header";
import { SafeAreaView } from "react-native-safe-area-context";

const RootLayout = ({ children }) => {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top']}>
      <Header />
      <View style={{ flex: 1 }}>
        {children}
      </View>
    </SafeAreaView>
  );
};

export default RootLayout;
