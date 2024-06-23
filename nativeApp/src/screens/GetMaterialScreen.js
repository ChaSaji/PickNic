import React from "react";
import { StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import getImageSource from "../lib/images";

const GetMaterialScreen = ({ route, navigation }) => {
  const getMaterial = route.params.getMaterial;
  const getMaterialNum = route.params.getMaterialNum;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("Home")}
    >
      <Text style={styles.title}>GET</Text>
      <Image
        style={styles.material}
        source={getImageSource({ pass2Photo: getMaterial.pass2Photo })}
      />
      <Text style={styles.materialNumText}>{`× ${getMaterialNum}`}</Text>
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
