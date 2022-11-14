import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import Pizzas from "./Pizzas";
import PizzaDetail from "./PizzaDetail";
import { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useAssets } from "expo-asset";
import { assets as asset } from "./Config";

const Stack = createSharedElementStackNavigator();
const PizzaNavigator = () => {
  const [loading, setLoading] = useState(false);
  const [assets, error] = useAssets([
    asset.plate,
    ...asset.pizza,
    ...asset.bread,
    ...asset.basil,
    ...asset.broccoli,
    ...asset.mushroom,
    ...asset.onion,
  ]);

  return !assets ? (
    <View style={styles.container}>
      <ActivityIndicator
        size={"large"}
        style={{ transform: [{ scaleX: 2 }, { scaleY: 2 }] }}
        color="black"
      />
    </View>
  ) : (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: false,
        headerShown: false,
        cardOverlayEnabled: true,
        cardStyle: { backgroundColor: "transparent" },
      }}
      mode="modal"
    >
      <Stack.Screen name="Pizzas" component={Pizzas} />
      <Stack.Screen
        name="PizzaDetail"
        component={PizzaDetail}
        sharedElements={(route) => {
          const { id } = route.params;
          return [id];
        }}
      />
    </Stack.Navigator>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default PizzaNavigator;
