import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

export const { width: PAGE_WIDTH, height: PAGE_HEIGHT } =
  Dimensions.get("window");
const CIRCLE_WIDTH = PAGE_WIDTH * 0.8;
const Pages = ({ page, index, translateX }) => {
  const inputArray = [
    (index - 1) * PAGE_WIDTH,
    index * PAGE_WIDTH,
    (index + 1) * PAGE_WIDTH,
  ];
  const animatedCircleStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      inputArray,
      [0, 1, 0],
      Extrapolate.CLAMP
    );
    return { transform: [{ scale }] };
  });
  const animatedBoardStyle = useAnimatedStyle(() => {
    const progress = interpolate(
      translateX.value,
      inputArray,
      [0, 0, 1],
      Extrapolate.CLAMP
    );
    const opacity = interpolate(
      translateX.value,
      inputArray,
      [0.5, 1, 0.5],
      Extrapolate.CLAMP
    );

    return {
      transform: [{ rotate: `${progress * Math.PI}rad` }],
      opacity,
    };
  });
  return (
    <View style={[styles.container]}>
      <View style={[styles.imageContainer]}>
        <Animated.View style={[styles.circle, animatedCircleStyle]} />
        <Animated.Image
          source={page.source}
          style={[styles.image, animatedBoardStyle]}
          resizeMode="contain"
        />
      </View>
      <Text style={[styles.title]}>{page.title}</Text>
      <Text style={[styles.description]}>{page.description}</Text>
    </View>
  );
};
export default Pages;
const styles = StyleSheet.create({
  container: {
    width: PAGE_WIDTH,
    height: PAGE_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 50,
  },
  circle: {
    width: CIRCLE_WIDTH,
    height: CIRCLE_WIDTH,
    borderRadius: CIRCLE_WIDTH / 2,
    backgroundColor: "white",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 120,
  },
  image: {
    height: PAGE_HEIGHT * 0.6,
    aspectRatio: 1,
    position: "absolute",
  },
  title: {
    textAlign: "center",
    marginBottom: 15,
    fontSize: 35,
    fontWeight: "700",
  },
  description: {
    textAlign: "center",

    fontSize: 14,
    color: "grey",
  },
});
