import React from "react";
import { StyleSheet, View } from "react-native";
import { useCamera } from "../context/CameraContext";

const GetMaterialScreen = ({ navigation }) => {
  const { picture } = useCamera();
  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
});

export default GetMaterialScreen;
