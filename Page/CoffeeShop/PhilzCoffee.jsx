import React from "react";
import {
  Dimensions,
  View,
  ScrollView,
  StyleSheet,
  StatusBar,
} from "react-native";

import { products } from "./Model";
import Card, { CARD_HEIGHT } from "./Card";
import Products from "./Products";
import Cards from "./components/Cards";
import Animated, {
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");

const snapToOffsets = [0, CARD_HEIGHT];
const PhilzCoffee = () => {
  const translateX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    translateX.value = event.contentOffset.x;
  });
  const inputColor = products.map((_, i) => width * i);
  const outputColor = products.map((products) => products.color2);
  const style = useAnimatedStyle(() => {
    return {
      flex: 1,
      backgroundColor: interpolateColor(
        translateX.value,
        inputColor,
        outputColor
      ),
    };
  });
  return (
    <Animated.View style={style}>
      <StatusBar />
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        snapToOffsets={snapToOffsets}
        decelerationRate="fast"
        snapToEnd={false}
      >
        <View style={styles.slider}>
          <Animated.ScrollView
            onScroll={scrollHandler}
            scrollEventThrottle={16}
            horizontal
            snapToInterval={width}
            showsHorizontalScrollIndicator={false}
            decelerationRate="fast"
          >
            {products.map((product, index) => (
              <Card product={product} key={index} />
            ))}
          </Animated.ScrollView>
          <Products x={translateX} />
        </View>
        <Cards />
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  slider: { height: CARD_HEIGHT },
});
export default PhilzCoffee;
