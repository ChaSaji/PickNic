import React from "react";
import { StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { useGetMaterial } from "../context/GetMaterialContext";
// 想定
// import { Material } from "../lib/databaseQueryText";

const GetMaterialScreen = ({ navigation }) => {
  const { material } = useGetMaterial();

  // サンプル（想定）
  // const materialInfo = selectDataById(Badge.tablename, materialId);
  // const materialName = materialInfo.name;
  // const materialNum = material.num;
  // const materialId = mateiral.id;
  // const materialSource = material.pass2Photo;

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
