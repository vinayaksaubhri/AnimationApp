import React, { Dispatch, SetStateAction, useCallback } from "react";
import { Image, StyleSheet, View } from "react-native";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  TapGestureHandler,
  TapGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { snapPoint } from "react-native-redash";

import { State } from "../Config";

import { HEADER_HEIGHT } from "./Header";

const styles = StyleSheet.create({
  container: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#F3E9C6",
    justifyContent: "center",
    alignItems: "center",
    margin: 16,
  },
});

const IngredientSelection = ({
  asset,
  state: [state, setState],
  ingredient,
  selected,
}) => {
  const { width, height } = Image.resolveAssetSource(asset);
  const aspectRatio = height / width;

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(1);

  const setIngredient = () => {
    setState({
      ...state,
      [ingredient]:
        state[ingredient] === 0 ? Math.max(...Object.values(state)) + 1 : 0,
    });
  };
  const gestureEvent = useAnimatedGestureHandler({
    onActive: (event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
      selected.value = translateY.value < -HEADER_HEIGHT;
    },
    onEnd: (event) => {
      const dest = snapPoint(translateY.value, event.velocityY, [
        0,
        -HEADER_HEIGHT,
      ]);
      translateX.value = withTiming(0);
      translateY.value = withTiming(0, {}, () => {
        opacity.value = withTiming(1);
        selected.value = false;
      });

      if (dest !== 0) {
        opacity.value = withTiming(0, { duration: 200 });
        runOnJS(setIngredient)();
      }
    },
  });
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });
  const onTapEvent = useAnimatedGestureHandler({
    onEnd: () => {
      runOnJS(setIngredient)();
    },
  });
  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <TapGestureHandler onGestureEvent={onTapEvent}>
          <Animated.View>
            <PanGestureHandler onGestureEvent={gestureEvent}>
              <Animated.View style={[animatedStyle]}>
                <Image
                  source={asset}
                  style={{
                    width: 50,
                    height: 50 * aspectRatio,
                    elevation: 300,
                  }}
                />
              </Animated.View>
            </PanGestureHandler>
          </Animated.View>
        </TapGestureHandler>
      </View>
    </GestureHandlerRootView>
  );
};

export default IngredientSelection;
