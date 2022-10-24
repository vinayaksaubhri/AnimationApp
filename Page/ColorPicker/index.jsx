import { useCallback } from "react";
import { Dimensions, StatusBar, StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import ColorPickerComponent from "./Components/ColorPickerComponent";
const BACKGROUND_COLOR = "rgba(0,0,0,0.9)";
const COLORS = [
  "red",
  "purple",
  "blue",
  "cyan",
  "green",
  "yellow",
  "orange",
  "black",
  "white",
];

const { width } = Dimensions.get("window");
const PICKER_WIDTH = width * 0.9;
const CIRCLE_SIZE = width * 0.8;
const ColorPicker = () => {
  const pickedColor = useSharedValue(COLORS[0]);
  const onColorChange = useCallback((color) => {
    "worklet";
    pickedColor.value = color;
  });

  const animatedStyle = useAnimatedStyle(() => {
    return { backgroundColor: pickedColor.value };
  });
  const theme = "dark";
  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle={"light-content"} />
      <View style={[styles.topContainer]}>
        <Text style={[styles.text]}>Color Picker</Text>
        <Animated.View style={[styles.circle, animatedStyle]}></Animated.View>
      </View>
      <View style={[styles.bottomContainer]}>
        <ColorPickerComponent
          colors={COLORS}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.linearGradient]}
          PICKER_WIDTH={PICKER_WIDTH}
          onColorChange={onColorChange}
        />
      </View>
    </View>
  );
};
export default ColorPicker;

const styles = StyleSheet.create({
  topContainer: {
    flex: 3,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: BACKGROUND_COLOR,
  },
  text: {
    fontSize: 30,
    textTransform: "uppercase",
    fontWeight: "700",
    letterSpacing: 10,
    marginBottom: 35,
    color: "#F8F8F8",
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    alignItems: "center",
    justifyContent: "center",
  },
  linearGradient: {
    height: 40,
    width: PICKER_WIDTH,
    borderRadius: 20,
  },
  circle: {
    height: CIRCLE_SIZE,
    width: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: "red",
  },
});
