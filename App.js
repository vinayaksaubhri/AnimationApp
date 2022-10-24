import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import ColorPicker from "./Page/ColorPicker";
import HomeScreen from "./Page/HomeScreen";
import InstagramComponent from "./Page/InstagramComponent";
import MagicSquare from "./Page/MagicSquare";
import Onboarding1 from "./Page/Onboarding1";
import OnBoardingSkateboard from "./Page/OnBoardingSkateboard";
import ThemeSwitch from "./Page/ThemeSwitch";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="MagicSquare" component={MagicSquare} />
        <Stack.Screen
          name="Onboarding1"
          component={Onboarding1}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ThemeSwitch"
          component={ThemeSwitch}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="InstagramComponent"
          component={InstagramComponent}
        />
        <Stack.Screen
          name="ColorPicker"
          component={ColorPicker}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="OnBoardingSkateboard"
          component={OnBoardingSkateboard}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
