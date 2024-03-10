import React from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import CameraButton from "../components/CameraButton";
import MapView, { Marker } from "react-native-maps";
import { useCamera } from "../context/CameraContext";
import { useLocation } from "../context/LocationContext";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const ASPECT_RATIO = windowWidth / windowHeight;
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const HomeScreen = ({ navigation }) => {
  const { location, granted } = useLocation();
  const { cameraKey, setCameraKey, isCameraEnabled, setIsCameraEnabled } =
    useCamera();

  const handleNavigateCameraClick = () => {
    console.log("click");
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
            />
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
});

export default HomeScreen;
