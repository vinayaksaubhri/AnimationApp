import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import {
  GestureHandlerRootView,
  PinchGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const { height, width } = Dimensions.get("window");
const imageHeight = height * 0.6;
const imageWidth = width * 0.8;

const InstagramComponent = () => {
  const scale = useSharedValue(1);
  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);
  const pinchHandler = useAnimatedGestureHandler({
    onActive: (event) => {
      scale.value = event.scale;
      focalX.value = event.focalX;
      focalY.value = event.focalY;
    },
    onEnd: () => {
      scale.value = withTiming(1);
    },
  });
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: focalX.value },
        { translateY: focalY.value },
        { translateX: -imageHeight / 2 },
        { translateY: -imageWidth / 2 },
        { scale: scale.value },
        { translateX: -focalX.value },
        { translateY: -focalY.value },
        { translateX: imageHeight / 2 },
        { translateY: imageWidth / 2 },
      ],
    };
  });
  return (
    <View style={[styles.container]}>
      <GestureHandlerRootView>
        <PinchGestureHandler onGestureEvent={pinchHandler}>
          <Animated.View style={{ height: imageHeight, width: imageWidth }}>
            <Animated.Image
              source={require("./Assets/image.jpg")}
              style={[styles.image, animatedStyle]}
            />
          </Animated.View>
        </PinchGestureHandler>
      </GestureHandlerRootView>
    </View>
  );
};
export default InstagramComponent;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: height * 0.6,
    width: width * 0.8,
    // height,
    // width,
    borderRadius: 10,
  },
});
