import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import Pages, { PAGE_WIDTH } from "./Components/Page";
import { AntDesign } from "@expo/vector-icons";

import { BACKGROUND_COLOR, PAGES } from "./Constants/index";
import Dot from "./Components/Dot";
const OnBoardingSkateboard = () => {
  const translateX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      translateX.value = event.contentOffset.x;
    },
  });

  const activeIndex = useDerivedValue(() => {
    return Math.round(translateX.value / PAGE_WIDTH);
  });
  const scrollViewRef = useAnimatedRef();

  const onIconPress = () => {
    if (activeIndex.value === PAGES.length - 1) return;
    scrollViewRef.current.scrollTo({ x: PAGE_WIDTH * (activeIndex.value + 1) });
  };

  return (
    <View style={[styles.container]}>
      <Animated.ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        {PAGES.map((page, index) => (
          <Pages
            page={page}
            key={index}
            index={index}
            translateX={translateX}
          />
        ))}
      </Animated.ScrollView>
      <View style={[styles.footerContainer]}>
        <View style={[styles.paginator]}>
          {PAGES.map((_, index) => (
            <Dot key={index} activeDotIndex={activeIndex} index={index} />
          ))}
        </View>

        <View style={[styles.textContainer]}>
          <Text style={[styles.text]}>View Board</Text>
        </View>
        <View style={[styles.iconContainer]}>
          <AntDesign
            name="arrowright"
            size={24}
            color="black"
            onPress={onIconPress}
          />
        </View>
      </View>
    </View>
  );
};
export default OnBoardingSkateboard;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  footerContainer: {
    height: 50,

    marginBottom: 50,
    flexDirection: "row",
  },
  text: {
    fontSize: 14,
    textTransform: "uppercase",
    letterSpacing: 1.7,
    fontWeight: "500",
  },
  paginator: {
    flexDirection: "row",
    justifySelf: "flex-start",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
