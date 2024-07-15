import React, { useEffect, useLayoutEffect, useRef } from "react";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Text, View, TouchableOpacity, SafeAreaView } from "react-native";
import { useLocation } from "../../context/LocationContext";
import { useCamera } from "../../context/CameraContext";
import { Photo, PhotoElement } from "../../lib/databaseQueryText";
import { insert_item } from "../../lib/dataBaseHelper";
import { useDbUpdate } from "../../context/DbUpdateContext";

const CameraScreen = ({ navigation, route }) => {
  const [status, requestPermission] = useCameraPermissions(null);
  const cameraRef = useRef();
  const { setPicture, setInsertedPhotId } = useCamera();
  const { location } = useLocation();
  const { setPhotoUpdate } = useDbUpdate();

  const takePicture = async () => {
    if (cameraRef.current) {
      cameraRef.current.takePictureAsync({
        onPictureSaved: async (picture) => {
          setPicture(picture);
          const photo = new PhotoElement();
          photo.name = "photoName";
          photo.ratitude = location.coords.latitude;
          photo.longitude = location.coords.longitude;
          photo.visited = 1;
          photo.pass2Photo = picture.uri;
          insert_item(Photo.tablename, photo).then((id) =>
            setInsertedPhotId(id)
          );
          setPhotoUpdate(Date.now);
          navigation.navigate("Submit", {
            eventId: route.params.eventId,
          });
        },
      });
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "戻る",
    });
  }, []);

  useEffect(() => {
    (async () => {
      await requestPermission();
    })();
  }, []);

  if (status && status.granted === null) {
    //許可を出す表示が出来ない．
    return <View />;
  }
  if (status && status.granted === false) {
    //許可を拒否された．
    return <Text>No access to camera</Text>;
  }

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <CameraView style={{ flex: 1 }} ref={cameraRef} autoFocus={"on"} />
      <View
        style={{
          height: 60,
          justifyContent: "space-evenly",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          onPress={takePicture}
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
