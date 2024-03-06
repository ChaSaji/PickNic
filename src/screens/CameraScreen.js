import React, { useEffect } from "react";
import { Camera, CameraType } from "expo-camera";
import { useState } from "react";
import { Text, View, TouchableOpacity, SafeAreaView } from "react-native";

const CameraScreen = () => {
  const [type, setType] = useState(CameraType.back);
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);

  const takePicture = async () => {
    if (camera) {
      const image = await camera.takePictureAsync();
      console.log(image);
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

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType
    );
  }
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <Camera
        style={{ flex: 1 }}
        type={type}
        ref={(ref) => {
          setCamera(ref);
        }}
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
