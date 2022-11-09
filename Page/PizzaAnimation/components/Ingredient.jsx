import React, { memo, useEffect } from "react";
import { Image } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { mix, polar2Canvas } from "react-native-redash";

import {
  INGREDIENT_SCALE,
  MIN_RADIUS,
  MAX_RADIUS,
  PIZZA_SIZE,
} from "../Config";

const randomSign = () => {
  "worklet";
  return Math.round(Math.random()) === 0 ? -1 : 1;
};

const Ingredient = ({ asset, index, total, zIndex }) => {
  const progress = useSharedValue(0);
  const s1 = randomSign();
  const s2 = randomSign();
  useEffect(() => {
    progress.value = withTiming(1, { duration: 250 + 250 * Math.random() }); // to get random progress
  }, [progress]);
  const dimension = Image.resolveAssetSource(asset);
  const height = dimension.height * INGREDIENT_SCALE; // multiple by Ingredient_Scale to scale down the Ingredient image
  const width = dimension.width * INGREDIENT_SCALE;
  const radius = mix(Math.round(Math.random()), MIN_RADIUS, MAX_RADIUS); // get a random value between Min and Max radius
  const theta = (index * 2 * Math.PI) / total; // theta with respect to index

  //PIZZA_SIZE/2 give center of the circle - center of the Ingredient image to get the Ingredient image at the center
  const { x, y } = polar2Canvas(
    { radius, theta },
    { x: PIZZA_SIZE / 2 - width / 2, y: PIZZA_SIZE / 2 - height / 2 }
  );

  const style = useAnimatedStyle(() => ({
    opacity: mix(progress.value * 2, 0, 1),
    transform: [
      { translateX: x }, // final x position of the ingredient
      { translateY: y }, // final y position of the ingredient
      { translateX: mix(progress.value, (s1 * PIZZA_SIZE) / 2, 0) }, // to give the throw effect
      { translateY: mix(progress.value, (s2 * PIZZA_SIZE) / 2, 0) }, // to give the throw effect
      { scale: mix(progress.value, 3, 1) },
    ],
  }));
  return (
    <Animated.Image
      source={asset}
      style={[
        {
          zIndex,
          position: "absolute",
          top: 0,
          left: 0,
          width,
          height,
        },
        style,
      ]}
    />
  );
};

export default memo(Ingredient);
