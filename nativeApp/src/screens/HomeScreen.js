import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import CameraButton from "../components/CameraButton";
import MapView, { Marker } from "react-native-maps";
import { useCamera } from "../context/CameraContext";
import { useLocation } from "../context/LocationContext";
import { fetchData } from "../lib/dataBaseHelper";
import { Photo } from "../lib/databaseQueryText";
import PictureMarker from "../components/PictureMarker";
import { useDbUpdate } from "../context/DbUpdateContext";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const ASPECT_RATIO = windowWidth / windowHeight;
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const HomeScreen = ({ navigation }) => {
  const [pictures, setPictures] = useState([]);

  const { location, granted } = useLocation();
  const { cameraKey, setCameraKey, isCameraEnabled, setIsCameraEnabled } =
    useCamera();
  const { photoUpdate } = useDbUpdate();

  useEffect(() => {
    fetchData(Photo.tablename)
      .then((picture) => {
        // console.log("return data SetAppAndHomeScreen =");
        // console.log(picture);
        setPictures(picture);
      })
      .catch((error) => {
        console.error("Error occurred:", error); // エラーが発生した場合はエラーメッセージを出力
      });
  }, [photoUpdate]);

  const handleNavigatePictureClick = ({ picture }) => {
    navigation.navigate("PictureView", {
      id: picture.id,
      uri: picture.pass2Photo,
    });
  };

  const handleNavigateCameraClick = () => {
    navigation.navigate("Camera");
  };

  const handleComplete = () => {
    console.log("set camera enable");
    setCameraKey((prevKey) => prevKey + 1);
    setIsCameraEnabled(true);
  };

  return (
    <View style={styles.container}>
      {granted === false ? (
        <Text>Permission to access location was denied</Text>
      ) : location === null ? (
        <Text>Obtaining location information...</Text>
      ) : (
        <>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}
          >
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
            >
              <View style={styles.outerRadius}>
                <View style={styles.innerRadius} />
              </View>
            </Marker>
            {pictures.map((picture, index) => (
              <PictureMarker
                key={index}
                uri={picture.pass2Photo}
                latitude={picture.ratitude}
                longitude={picture.longitude}
                onPress={() => handleNavigatePictureClick({ picture: picture })}
              />
            ))}
          </MapView>
          <View
            style={{
              position: "absolute",
              justifyContent: "center",
              alignItems: "center",
              width: 130,
              height: 130,
              borderRadius: 200,
              backgroundColor: "#4BBC96",
              right: 20,
              bottom: 20,
            }}
          >
            <CameraButton
              cameraKey={cameraKey}
              isCameraEnabled={isCameraEnabled}
              onComplete={handleComplete}
              onClick={handleNavigateCameraClick}
            />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: windowWidth,
    height: windowHeight,
  },
  outerRadius: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: 25,
    height: 25,
    borderRadius: 200,
    backgroundColor: "#1BB8E8",
  },
  innerRadius: {
    justifyContent: "center",
    alignItems: "center",
    width: 20,
    height: 20,
    borderRadius: 200,
    borderWidth: 2,
    borderColor: "white",
    backgroundColor: "#1BB8E8",
  },
});

export default HomeScreen;
