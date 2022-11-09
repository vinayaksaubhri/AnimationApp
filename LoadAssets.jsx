import { View, Text } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect } from "react";

const LoadAssets = ({ children, font }) => {
  const [fontsLoaded] = useFonts({
    "GothamRounded-Bold": require("./Fonts/GothamRounded-Bold.otf"),
    "GothamRounded-Light": require("./Fonts/GothamRounded-Light.otf"),
    "GothamRounded-Medium": require("./Fonts/GothamRounded-Medium.otf"),
    "SFProDisplay-Medium": require("./Fonts/SF-Pro-Display-Medium.otf"),
    "SFProDisplay-Bold": require("./Fonts/SF-Pro-Display-Bold.otf"),
    Antpolt: require("./Fonts/antpoltsemicond-bolditalic.ttf"),
  });
  console.log("assets load", fontsLoaded);
  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      {children}
    </View>
  );
};
export default LoadAssets;
