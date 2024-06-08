import React from "react";
import { StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import getImageSource from "../lib/images";

const CookingCompleteScreen = ({ route, navigation }) => {
  const meal = route.params.meal;
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("Cooking")}
    >
      <Text style={styles.title}>Cooking</Text>
      <Text style={styles.title}>Complete!!</Text>
      <Image
        style={styles.material}
        source={getImageSource({ pass2Photo: meal.pass2Photo })}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8DAD1",
  },
  title: {
    fontSize: 60,
    fontWeight: "bold",
    color: "#FF914D",
  },
  material: {
    height: 150,
    width: 150,
  },
  materialNumText: {
    fontSize: 50,
    fontWeight: "bold",
  },
});

export default CookingCompleteScreen;
