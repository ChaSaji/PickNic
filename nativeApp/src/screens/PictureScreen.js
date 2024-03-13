import React from "react";
import { StyleSheet, View, Image, Dimensions } from "react-native";
import { useCamera } from "../context/CameraContext";
import ChangeMaterialButton from "../components/ChangeMaterialButton";
import sendImage from "../lib/sendPicture";
import { selectData } from "../lib/dataBaseHelper";
import { RO, Material } from "../lib/databaseQueryText";
import getRandomNum from "../lib/getRandomNum";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const PictureScreen = ({ navigation }) => {
  const { picture } = useCamera();

  const handleSubmitToAPI = async () => {
    const response = await sendImage({ uri: picture.uri });
    selectData(
      Material.tablename,
      Material.elementsKey.colorId,
      RO.Eqqual,
      response.return
    ).then((materials) => {
      if (materials.length > 0) {
        const randomIndx = getRandomNum(materials.length);
        navigation.navigate("GetMaterial", {
          getMaterial: materials[randomIndx],
        });
      } else {
        console.log(
          `colorId == ${response.return}のマテリアルが登録されていません`
        );
      }
    });
  };
  return (
    <View style={styles.container}>
      <Image source={{ uri: picture.uri }} style={styles.image} />

      <View style={styles.buttonContainer}>
        <ChangeMaterialButton onPress={handleSubmitToAPI} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  image: {
    resizeMode: "contain",
    width: windowWidth * 0.7,
    height: windowHeight * 0.7,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 50,
  },
});

export default PictureScreen;
