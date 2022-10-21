import { useCallback, useRef } from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  GestureHandlerRootView,
  PinchGestureHandler,
  TapGestureHandler,
} from "react-native-gesture-handler";

import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
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
  const scaleHeartImage = useSharedValue(0);
  const scaleLikeImage = useSharedValue(0);
  const animatedHeartStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: Math.max(scaleHeartImage.value, 0) }],
    };
  });
  const animatedLikeStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: Math.max(scaleLikeImage.value, 0) }],
    };
  });
  const doubleTapRef = useRef();
  const onDoubleTap = useCallback(() => {
    scaleHeartImage.value = withSpring(1, undefined, () => {
      scaleHeartImage.value = withDelay(500, withSpring(0));
    });
  }, []);
  const onSingleTap = useCallback(() => {
    scaleLikeImage.value = withSpring(1, undefined, () => {
      scaleLikeImage.value = withDelay(500, withSpring(0));
    });
  }, []);
  return (
    <View style={[styles.container]}>
      <Text style={[styles.text]}>
        Pinch to zoom, single or double tap to Like
      </Text>
      <GestureHandlerRootView>
        <PinchGestureHandler onGestureEvent={pinchHandler}>
          <Animated.View
            style={{
              height: imageHeight,
              width: imageWidth,
              marginTop: 50,
            }}
          >
            <TapGestureHandler waitFor={doubleTapRef} onActivated={onSingleTap}>
              <TapGestureHandler
                maxDelayMs={250}
                ref={doubleTapRef}
                numberOfTaps={2}
                onActivated={onDoubleTap}
              >
                <Animated.View>
                  <Animated.Image
                    source={require("./Assets/image.jpg")}
                    style={[styles.image, animatedStyle]}
                  />

                  <Animated.Image
                    source={require("./Assets/heart.png")}
                    style={[styles.heart, animatedHeartStyle]}
                  />
                  <Animated.Image
                    source={require("./Assets/like.png")}
                    style={[styles.heart, animatedLikeStyle]}
                  />
                </Animated.View>
              </TapGestureHandler>
            </TapGestureHandler>
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
    height: imageHeight,
    width: imageWidth,
    borderRadius: 10,
  },
  heart: {
    position: "absolute",
    height: 100,
    width: 100,
    top: (imageHeight - 100) / 2,
    left: (imageWidth - 100) / 2,
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.3,
    shadowRadius: 35,
  },
  imageContainer: {},
  text: {
    fontSize: 20,
    // paddingBottom: 40,
  },
});
