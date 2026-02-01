import React, { useEffect, useRef, useState } from "react";
import {
  Keyboard,
  Animated,
  StyleSheet,
  Platform,
  View,
} from "react-native";

const KeyboardAwareBottomBar = ({ children, style }) => {

  const bottomOffset = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", (e) => {
      Animated.timing(bottomOffset, {
        toValue: e.endCoordinates.height, // keyboard height ke upar shift
        duration: 250,
        useNativeDriver: false,
      }).start();
    });

    const hideSub = Keyboard.addListener("keyboardDidHide", () => {
      Animated.timing(bottomOffset, {
        toValue: 0, // wapas normal
        duration: 250,
        useNativeDriver: false,
      }).start();
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  return (
    <Animated.View
      style={[
        styles.container,
        style,
        { paddingBottom: bottomOffset }, // keyboard ke upar shift
      ]}
    >
      {children}
    </Animated.View>
  );
};

export default KeyboardAwareBottomBar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#d16262ff",
    borderTopWidth: 1,
    borderColor: "#eee",
    padding: 16,
    // absolute hata diya
  },
});
