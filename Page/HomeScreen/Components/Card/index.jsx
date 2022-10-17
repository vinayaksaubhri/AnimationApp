import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
const SIZE = 120.0;
const Card = ({ navigation, title, navLink }) => {
  return (
    <View>
      <TouchableOpacity
        style={styles.Card}
        onPress={() => navigation.navigate(navLink)}
      >
        <Text style={styles.CardTitle}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Card;
const styles = StyleSheet.create({
  Card: {
    height: SIZE,
    width: SIZE,
    borderRadius: 20,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    margin: 5,
  },
  CardTitle: {
    fontSize: 16,
    fontWeight: "700",
    textTransform: "capitalize",
  },
});
