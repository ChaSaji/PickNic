import { useLayoutEffect, useState } from "react";
import { StyleSheet, View, Image, Dimensions } from "react-native";
import { useCamera } from "../context/CameraContext";
import { useDbUpdate } from "../context/DbUpdateContext";
import ChangeMaterialButton from "../components/ChangeMaterialButton";
import LoadingAnimationScreen from "./LoadingAnimationScreen";
import { selectData, update_item } from "../lib/dataBaseHelper";
import { Material, MaterialElement, RO } from "../lib/databaseQueryText";
import sendImage from "../lib/sendPicture";
import getRandomNum from "../lib/getRandomNum";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const PictureScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const { picture, setIsCameraEnabled } = useCamera();
  const { setMaterialUpdate } = useDbUpdate();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: !loading,
    });
  }, [loading, navigation]);

  const handleSubmitToAPI = () => {
    setLoading(true);
    // ローディングの最低時間を指定可能
    const minLoadingTime = 2000;
    const startTime = Date.now();
    try {
      sendImage({ uri: picture.uri })
        .then((response) => {
          const gottenColorId = response.return;
          const materials = selectData(
            Material.tablename,
            Material.elementsKey.colorId,
            RO.Eqqual,
            gottenColorId
          );
          return materials;
        })
        .then((materials) => {
          if (materials.length > 0) {
            const randomIndx = getRandomNum(materials.length);
            const gottenMaterial = materials[randomIndx];
            const gottenMaterialNum = getRandomNum(4) + 1;
            const updatedMaterial = new MaterialElement();
            updatedMaterial.id = gottenMaterial.id;
            updatedMaterial.colorId = gottenMaterial.colorId;
            updatedMaterial.name = gottenMaterial.name;
            updatedMaterial.pass2Photo = gottenMaterial.pass2Photo;
            updatedMaterial.stock = gottenMaterial.stock + gottenMaterialNum;
            update_item(Material.tablename, updatedMaterial);
            return {
              gottenMaterial: gottenMaterial,
              gottenMaterialNum: gottenMaterialNum,
            };
          } else {
            // colorIdのmaterialが揃うまでの一時的エラー
            new Error(
              `colorId == ${response.return}のマテリアルが登録されていません`
            );
          }
        })
        .then(({ gottenMaterial, gottenMaterialNum }) => {
          setIsCameraEnabled(false);
          setMaterialUpdate(Date.now);
          const endTime = Date.now();
          const elapsedTime = endTime - startTime;
          if (elapsedTime < minLoadingTime) {
            setTimeout(() => {
              navigation.navigate("GetMaterial", {
                getMaterial: gottenMaterial,
                getMaterialNum: gottenMaterialNum,
              });
            }, minLoadingTime - elapsedTime);
          } else {
            navigation.navigate("GetMaterial", {
              getMaterial: gottenMaterial,
              getMaterialNum: gottenMaterialNum,
            });
          }
        });
    } catch (error) {
      navigation.navigate("Home");
    }
  };

  return loading ? (
    <LoadingAnimationScreen />
  ) : (
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
