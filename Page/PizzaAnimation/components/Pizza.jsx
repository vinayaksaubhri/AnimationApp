import { StyleSheet, Image, View, Dimensions, Platform } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { SharedElement } from "react-navigation-shared-element";
import { useNavigation } from "@react-navigation/native";

import { assets, BREAD_PADDING, PIZZA_SIZE } from "../Config";

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    width: width,
    alignItems: "center",
  },
  pizza: {
    width: PIZZA_SIZE,

    height: PIZZA_SIZE,
  },
  plate: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
  },
  bread: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
    top: BREAD_PADDING,
    left: BREAD_PADDING,
    right: BREAD_PADDING,
    bottom: BREAD_PADDING,
  },
});

const Pizza = ({ id, index, asset, x }) => {
  const { navigate } = useNavigation();
  const output = [-width / 2, 0, width / 2];
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
  const style = useAnimatedStyle(() => {
    const translateX = interpolate(
      x.value,
      inputRange,
      output,
      Extrapolate.CLAMP
    );
    const translateY = interpolate(
      x.value,
      inputRange,
      [PIZZA_SIZE / 2, 0, PIZZA_SIZE / 2],
      Extrapolate.CLAMP
    );
    const scale = interpolate(
      x.value,
      inputRange,
      [0.2, 1, 0.2],
      Extrapolate.CLAMP
    );
    return {
      transform: [{ scale }, { translateY }, { translateX }],
    };
  });
  console.log(Platform.OS, inputRange);
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => navigate("PizzaDetail", { id })}>
        <SharedElement id={id}>
          <Animated.View style={[styles.pizza, style]}>
            <Animated.Image source={assets.plate} style={[styles.plate]} />
            <Image source={asset} style={styles.bread} />
          </Animated.View>
        </SharedElement>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default Pizza;
