import React from "react";
import { View, StyleSheet, Image, Dimensions } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

import { products } from "./Model";

const { width } = Dimensions.get("window");
const SIZE = 200;
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
});
const Product = ({ product, index, x }) => {
  const input = [width * (index - 1), width * index, width * (index + 1)];
  const output = [width / 2, 0, -width / 2];
  const style = useAnimatedStyle(() => {
    const translateX = interpolate(x.value, input, output);
    const scale = interpolate(x.value, input, [0.75, 1, 0.75]);
    return {
      transform: [{ translateX }, { scale }],
    };
  });
  return (
    <Animated.View key={index} style={[styles.container, style]}>
      <Image
        source={product.picture}
        style={{ width: SIZE, height: SIZE * product.aspectRatio }}
      />
    </Animated.View>
  );
};
const Products = ({ x }) => {
  return (
    <View style={styles.container} pointerEvents="none">
      {products.map((product, index) => (
        <Product product={product} index={index} key={index} x={x} />
      ))}
    </View>
  );
};

export default Products;
