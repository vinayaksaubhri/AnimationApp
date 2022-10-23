import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  TapGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
  interpolateColor,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
const ColorPickerComponent = ({
  colors,
  start,
  end,
  style,
  PICKER_WIDTH,
  onColorChange,
}) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const adjustedTranslateX = useDerivedValue(() => {
    return Math.min(
      Math.max(translateX.value, 0),
      PICKER_WIDTH - CIRCLE_PICKER_SIZE
    );
  }, [translateX]);
  const panGestureEvent = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.translateX = adjustedTranslateX.value;
      translateY.value = withTiming(-CIRCLE_PICKER_SIZE);
      scale.value = withSpring(1.2);
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX;
    },
    onEnd: () => {
      translateY.value = withTiming(0);
      scale.value = withSpring(1);
    },
  });
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: adjustedTranslateX.value },
        { translateY: translateY.value },
        { scale: scale.value },
      ],
    };
  });
  const inputRange = colors.map(
    (_, index) => (index / colors.length) * PICKER_WIDTH
  );
  const animatedInnnerCircle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      adjustedTranslateX.value,
      inputRange,
      colors
    );
    onColorChange?.(backgroundColor);
    return { backgroundColor };
  });
  const tapGestureEvent = useAnimatedGestureHandler({
    onStart: (event) => {
      translateY.value = withTiming(-CIRCLE_PICKER_SIZE);
      scale.value = withSpring(1.2);
      translateX.value = withTiming(event.absoluteX - CIRCLE_PICKER_SIZE);
    },
    onEnd: (event) => {
      translateY.value = withTiming(0);
      scale.value = withSpring(1);
    },
  });
  return (
    <GestureHandlerRootView>
      <TapGestureHandler onGestureEvent={tapGestureEvent}>
        <Animated.View>
          <PanGestureHandler onGestureEvent={panGestureEvent}>
            <Animated.View style={[styles.container]}>
              <LinearGradient
                colors={colors}
                start={start}
                end={end}
                style={style}
              />
              <Animated.View style={[styles.picker, animatedStyle]}>
                <Animated.View
                  style={[styles.innerCircle, animatedInnnerCircle]}
                ></Animated.View>
              </Animated.View>
            </Animated.View>
          </PanGestureHandler>
        </Animated.View>
      </TapGestureHandler>
    </GestureHandlerRootView>
  );
};
export default ColorPickerComponent;

const CIRCLE_PICKER_SIZE = 45;
const INNER_CIRCLE_PICKER_SIZE = CIRCLE_PICKER_SIZE / 2;
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  picker: {
    position: "absolute",
    backgroundColor: "#fff",
    width: CIRCLE_PICKER_SIZE,
    height: CIRCLE_PICKER_SIZE,
    borderRadius: CIRCLE_PICKER_SIZE / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  innerCircle: {
    position: "absolute",
    backgroundColor: "#fff",
    width: INNER_CIRCLE_PICKER_SIZE,
    height: INNER_CIRCLE_PICKER_SIZE,
    borderRadius: INNER_CIRCLE_PICKER_SIZE / 2,
    borderWidth: 1.0,
    borderColor: "rgba(0,0,0,0.2)",
  },
});
