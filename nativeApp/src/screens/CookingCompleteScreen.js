import React from "react";
import { StyleSheet, TouchableOpacity, Text, Image } from "react-native";

const CookingCompleteScreen = ({ navigation }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("Cooking")}
    >
      <Text style={styles.title}>Cooking</Text>
      <Text style={styles.title}>Complete!!</Text>
      <Image
        style={styles.material}
        source={require("../../assets/icons8-camera-64.png")}
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
