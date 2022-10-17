import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import Page from "./Components/Page";

const WORDS = ["How", "are", "you", "doing?"];
const { height, width } = Dimensions.get("window");

const Onboarding = () => {
  const translateX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    translateX.value = event.contentOffset.x;
  });
  return (
    <Animated.ScrollView
      style={[styles.container]}
      horizontal
      showsHorizontalScrollIndicator={false}
      // decelerationRate={0}
      // snapToInterval={width}
      pagingEnabled
      onScroll={scrollHandler}
      scrollEventThrottle={16}
    >
      {/* <StatusBar animated={true} /> */}
      {WORDS.map((title, index) => {
        return (
          <Page
            key={index}
            index={index}
            translateX={translateX}
            title={title}
          />
        );
      })}
    </Animated.ScrollView>
  );
};
export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // paddingTop: 20,
    // backgroundColor: `rgba(0,0,256,0.${index + 2})`,
    // backgroundColor: `rgba(0,0,256,0.4)`,
  },
});
