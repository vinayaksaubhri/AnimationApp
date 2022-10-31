import { Button, StyleSheet, Text, View } from "react-native";
import Background from "./Components/Background";
import Svg, { Path } from "react-native-svg";
import { height, MARGIN, PATH, vHeight, vWidth, width } from "./Constants";
import AnimatedStroke from "./Components/AnimatedStroke";
import {
  Easing,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";

const ReactNative = () => {
  const progress = useSharedValue(0);

  progress.value = withRepeat(
    withTiming(1, { duration: 4000, easing: Easing.linear }),
    -1,
    true
  );

  return (
    <View style={styles.layer}>
      <Background />
      <Svg
        width={width}
        height={height}
        viewBox={[
          -MARGIN / 2,
          -MARGIN / 2,
          vWidth + MARGIN / 2,
          vHeight + MARGIN / 2,
        ].join(" ")}
      >
        {PATH.map((d, key) => (
          <AnimatedStroke d={d} key={key} progress={progress} />
        ))}
      </Svg>
    </View>
  );
};
export default ReactNative;
const styles = StyleSheet.create({
  layer: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    position: "absolute",
    bottom: 0,
    top: 0,
  },
});
