import React from "react";
import { StyleSheet, View, Image, Dimensions } from "react-native";
import { useCamera } from "../context/CameraContext";
import ChangeMaterialButton from "../components/ChangeMaterialButton";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const PictureScreen = ({ navigation }) => {
  const { picture } = useCamera();

  const handleSubmitToAPI = async () => {
    // ここでsendImgae()を実行、レスポンスが帰ってきたら"GetMaterial"に遷移
    // const response = await sendImage({uri: picure.uri});
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
    resizeMode: "cover",
    width: windowWidth * 0.6,
    height: windowHeight * 0.6,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
});

export default PictureScreen;
