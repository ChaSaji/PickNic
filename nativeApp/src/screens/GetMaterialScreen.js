import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";

const GetMaterialScreen = ({ navigation }) => {
  const materialNum = 3;
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("Home")}
    >
      <Text style={styles.title}>GET</Text>
      <Image
        style={styles.material}
        source={require("../../assets/icons8-camera-64.png")}
      />
      <Text style={styles.materialNumText}>{`× ${materialNum}`}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFDC83",
  },
  title: {
    fontSize: 100,
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

export default GetMaterialScreen;
