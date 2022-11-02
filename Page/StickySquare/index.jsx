import { Dimensions, StyleSheet, Text, View, StatusBar } from "react-native";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
  Easing,
  Extrapolate,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import Square, { MAX_HEIGHT, SIZE } from "./Components/Square";

const { width, height } = Dimensions.get("window");
const StickySquare = () => {
  const sticked = useSharedValue(true);
  const isOnTop = useSharedValue(true);
  const sticking = useDerivedValue(() => withSpring(sticked.value ? 1 : 0));
  const translateY = useSharedValue(0);
  const progress = useDerivedValue(
    () =>
      sticking.value *
      interpolate(translateY.value, [0, MAX_HEIGHT], [0, 1], Extrapolate.CLAMP)
  );
  const onGestureEvent = useAnimatedGestureHandler({
    onActive: ({ translationY }) => {
      translateY.value = translationY;
      if (translateY.value > MAX_HEIGHT) {
        sticked.value = false;
      }
    },
    onEnd: ({ velocityY: velocity }) => {
      translateY.value = withTiming(
        0,
        {
          duration: 500,
          easing: Easing.bezier(0.34, 1.56, 0.64, 1),
        },
        () => {
          sticked.value = true;

          translateY.value = 0;
        }
      );
    },
  });

  const square = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: (1 - sticking.value) * translateY.value }],
    };
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={[styles.container]}>
        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <Animated.View style={[StyleSheet.absoluteFill, square]}>
            <Square progress={progress} />
          </Animated.View>
        </PanGestureHandler>
      </View>
    </GestureHandlerRootView>
  );
};
export default StickySquare;
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: (width - SIZE) / 2,
    top: 0,
    bottom: 0,
    width: SIZE,
  },
});
