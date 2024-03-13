import React, { useEffect } from "react";
import { StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import images from "../lib/images";
import getRandomNum from "../lib/getRandomNum";
import { update_item } from "../lib/dataBaseHelper";
import { Material, MaterialElement } from "../lib/databaseQueryText";
import { useDbUpdate } from "../context/DbUpdateContext";
import { useCamera } from "../context/CameraContext";

const GetMaterialScreen = ({ route, navigation }) => {
  const getMaterial = route.params.getMaterial;
  const getMaterialNum = getRandomNum(4) + 1;

  const { setIsCameraEnabled } = useCamera();
  const { setMaterialUpdate } = useDbUpdate();

  useEffect(() => {
    const material = new MaterialElement();
    material.id = getMaterial.id;
    material.colorId = getMaterial.colorId;
    material.name = getMaterial.name;
    material.pass2Photo = getMaterial.pass2Photo;
    material.stock = getMaterial.stock + getMaterialNum;
    update_item(Material.tablename, material);
    setIsCameraEnabled(false);
    setMaterialUpdate(Date.now);
  }, []);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("Home")}
    >
        <Text style={styles.title}>GET</Text>
        <Image
          style={styles.material}
          source={images[getMaterial.pass2Photo]}
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
