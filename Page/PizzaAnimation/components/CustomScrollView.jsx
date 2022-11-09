import { StyleSheet, Text, View } from "react-native";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
  cancelAnimation,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDecay,
} from "react-native-reanimated";
const CustomScrollView = ({ children, style, horizontal }) => {
  const styles = StyleSheet.create({
    container: { flexDirection: horizontal ? "row" : "column" },
  });
  const translateX = useSharedValue(0);
  const clampedTranslateX = useDerivedValue(() => {
    const Maxlength = -(80 * 2);
    return Math.max(Math.min(translateX.value, 0), Maxlength);
  });

  const panGestureEvent = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.x = translateX.value;
      cancelAnimation(translateX);
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.x;
    },
    onEnd: (event) => {
      translateX.value = withDecay({ velocity: event.velocityX });
    },
  });
  const animatedStyle = useAnimatedStyle(() => {
    return { transform: [{ translateX: clampedTranslateX.value }] };
  });
  return (
    <GestureHandlerRootView>
      <PanGestureHandler onGestureEvent={panGestureEvent}>
        <Animated.View style={[style, styles.container, animatedStyle]}>
          {children}
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};
export default CustomScrollView;
