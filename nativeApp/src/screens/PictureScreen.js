import React from "react";
import { StyleSheet, View, Image, Dimensions } from "react-native";
import { useCamera } from "../context/CameraContext";
import ChangeMaterialButton from "../components/ChangeMaterialButton";
import { useGetMaterial } from "../context/GetMaterialContext";
import  sendImage from '../lib/sendPicture';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const PictureScreen = ({ navigation }) => {
  const { picture } = useCamera();
  const { setMaterial } = useGetMaterial();

  const handleSubmitToAPI = async () => {
    // ここでsendImgae()を実行、レスポンスが帰ってきたら"GetMaterial"に遷移
    const response = await sendImage({uri: picture.uri});
    // 以下のようにapiから帰ってきたmaterialをsetする。（適宜変更）
    // setMaterial({id: response.materialId, num: response.num});
    navigation.navigate("GetMaterial");
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
