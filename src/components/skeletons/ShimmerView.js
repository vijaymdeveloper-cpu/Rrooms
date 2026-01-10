import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet } from "react-native";

const ShimmerView = ({ style }) => {
    
  const shimmer = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmer, {
          toValue: 1,
          duration: 900,
          useNativeDriver: false,
        }),
        Animated.timing(shimmer, {
          toValue: 0,
          duration: 900,
          useNativeDriver: false,
        }),
      ])
    );

    animation.start();

    return () => animation.stop();
  }, []);

  const bgColor = shimmer.interpolate({
    inputRange: [0, 1],
    outputRange: ["#E1E9EE", "#F2F8FC"],
  });

  return (
    <Animated.View
      style={[styles.skeleton, style, { backgroundColor: bgColor }]}
    />
  );
};

export default ShimmerView;

const styles = StyleSheet.create({
  skeleton: {
    borderRadius: 8,
  },
});
