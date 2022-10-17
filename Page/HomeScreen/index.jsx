import { View, Text, Button, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { FlatGrid } from "react-native-super-grid";
import Card from "./Components/Card";
import { NavigationObject } from "./navigation";
const HomeScreen = ({ navigation }) => {
  return (
    <FlatGrid
      itemDimension={120}
      // fixed
      data={NavigationObject}
      spacing={10}
      renderItem={({ item }) => (
        <Card
          title={item.title}
          navLink={item.navLink}
          navigation={navigation}
        />
      )}
    />
  );
};
export default HomeScreen;
const styles = StyleSheet.create({
  Container: {
    padding: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
});
