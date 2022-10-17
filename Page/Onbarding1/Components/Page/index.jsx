import { useEffect } from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
} from "react-native-reanimated";

const { height, width } = Dimensions.get("window");
console.log(height);
const SIZE = width * 0.7;
const Page = ({ index, title, translateX }) => {
  const InputRate = [(index - 1) * width, index * width, (index + 1) * width];
  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      InputRate,
      [0, 1, 0],
      Extrapolate.CLAMP
    );
    const borderRadius = interpolate(
      translateX.value,
      InputRate,
      [0, SIZE / 2, 0],
      Extrapolate.CLAMP
    );
    return {
      borderRadius,
      transform: [{ scale }],
    };
  });
  const animatedTextStyle = useAnimatedStyle(() => {
    const translateY = interpolate(translateX.value, InputRate, [
      height / 2,
      0,
      -height / 2,
    ]);
    const opacity = interpolate(translateX.value, InputRate, [-2, 1, -2]);
    return {
      opacity,
      transform: [{ translateY }],
    };
  });
  const styles = StyleSheet.create({
    pageContainer: {
      width,
      height: height + 20,
      backgroundColor: `rgba(0,0,256,0.${index + 2})`,
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
    },
    square: {
      height: SIZE,
      width: SIZE,
      backgroundColor: `rgba(0,0,256,0.4)`,
      alignItems: "center",
      justifyContent: "center",
      scale: 1,
    },
    text: {
      fontSize: 70,
      position: "absolute",
      color: "white",
      textTransform: "uppercase",
      fontWeight: "700",
    },
  });

  return (
    <View style={[styles.pageContainer]}>
      <Animated.View style={[styles.square, animatedStyle]} />
      <Animated.Text style={[styles.text, animatedTextStyle]}>
        {title}
      </Animated.Text>
    </View>
  );
};
export default Page;
