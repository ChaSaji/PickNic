import React, { useEffect } from "react";
import { Camera } from "expo-camera";
import { useState } from "react";
import { Text, View, TouchableOpacity, SafeAreaView } from "react-native";
import { useCamera } from "../context/CameraContext";
import { insert_item } from "../lib/dataBaseHelper";
import { Photo, PhotoElement } from "../lib/databaseQueryText";
import { useLocation } from "../context/LocationContext";

const CameraScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const { setIsCameraEnabled, setPicture, setInsertedPhotId } = useCamera();
  const { location } = useLocation();

  const takePicture = async () => {
    if (camera) {
      const image = await camera.takePictureAsync();
      setPicture(image);
      const photo = new PhotoElement();
      photo.name = "photoName";
      photo.ratitude = location.coords.latitude;
      photo.longitude = location.coords.longitude;
      photo.visited = 1;
      photo.pass2Photo = image.uri;
      insert_item(Photo.tablename, photo).then((id) => setInsertedPhotId(id));
      setIsCameraEnabled(false);
      navigation.navigate("Picture");
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    //許可を出す表示が出来ない．
    return <View />;
  }
  if (hasPermission === false) {
    //許可を拒否された．
    return <Text>No access to camera</Text>;
  }

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <Camera
        style={{ flex: 1 }}
        ref={(ref) => {
          setCamera(ref);
        }}
        autoFocus={Camera.Constants.AutoFocus.on}
      />
      <View
        style={{
          height: 60,
          justifyContent: "space-evenly",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          onPress={() => takePicture()}
          style={{
            width: 40,
            height: 40,
            borderRadius: 50,
            borderWidth: 5,
            borderColor: "black",
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default CameraScreen;
