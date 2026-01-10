import { ImageBackground, StyleSheet, StatusBar, View, Platform } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

// require("@assets/images/bg51.jpg")
// { backgroundColor: "#ebebebff" }
// { backgroundColor: "#e7e3ddff" }

// colors={["#ffe1c5ff", "#fff", "#dfdfdfff"]}

const AppLayout = ({ children, background = { backgroundColor: "#ebebebff" }, statusBarColor = "dark-content" }) => {

  const isImage = typeof background === "number" || background?.uri;

  const Wrapper = isImage ? ImageBackground : View;

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle(statusBarColor);
      if (Platform.OS === "android") {
        StatusBar.setBackgroundColor("transparent");
        StatusBar.setTranslucent(true);
      }
    }, [statusBarColor])
  );

  return (
    // <Wrapper
    //   {...(isImage && {
    //     source: background,
    //     resizeMode: "cover",
    //   })}
    //   style={[
    //     styles.viewArea,
    //     !isImage && background,
    //   ]}
    // >

    <LinearGradient
      colors={["#ffdcc5ff", "#fff", "#dfdfdfff"]}
      style={styles.viewArea}
    >


      <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
        {children}
      </SafeAreaView>


    </LinearGradient>

    // </Wrapper>
  );
};

export default AppLayout;

const styles = StyleSheet.create({
  viewArea: {
    flex: 1,
  },
  safe: {
    flex: 1,
    paddingTop: 5,
  },
});
