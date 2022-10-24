import { StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
const Dot = ({ activeDotIndex, index }) => {
  const animatedStyle = useAnimatedStyle(() => {
    const isActive = activeDotIndex.value === index;
    return {
      backgroundColor: withTiming(isActive ? "black" : "white", {
        duration: 150,
      }),
    };
  });
  return <Animated.View style={[styles.dot, animatedStyle]} />;
};
export default Dot;
const styles = StyleSheet.create({
  dot: {
    width: 20,
    height: 20,
    marginHorizontal: 5,
    borderRadius: 10,
    borderWidth: 1,
  },
});
