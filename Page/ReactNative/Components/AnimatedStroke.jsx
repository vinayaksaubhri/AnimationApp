import { useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, { Easing, useAnimatedProps } from "react-native-reanimated";
import { Path } from "react-native-svg";
import { COLOR } from "../Constants";

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedStroke = ({ d, progress }) => {
  const [length, setLength] = useState(0);
  const stroke = COLOR[Math.round(Math.random() * (COLOR.length - 1))];
  const ref = useRef(null);
  const bgStrokeAnimation = useAnimatedProps(() => ({
    strokeDashoffset:
      length -
      length * Easing.bezier(0.61, 1, 0.88, 1).factory()(progress.value),
  }));
  const strokeAnimation = useAnimatedProps(() => ({
    strokeDashoffset:
      length -
      length * Easing.bezier(0.65, 0, 0.35, 1).factory()(progress.value),
  }));
  return (
    <>
      <AnimatedPath
        d={d}
        stroke={stroke}
        strokeWidth={10}
        ref={ref}
        fill="white"
        onLayout={() => {
          setLength(ref.current.getTotalLength());
        }}
        strokeDasharray={length}
        animatedProps={bgStrokeAnimation}
      />
      <AnimatedPath
        d={d}
        stroke="black"
        strokeWidth={10}
        ref={ref}
        onLayout={() => {
          setLength(ref.current.getTotalLength());
        }}
        strokeDasharray={length}
        animatedProps={strokeAnimation}
      />
    </>
  );
};
export default AnimatedStroke;
const styles = StyleSheet.create({});
