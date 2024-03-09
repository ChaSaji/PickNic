import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Dimensions, Button } from "react-native";
import CameraButton from "../components/CameraButton";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const ASPECT_RATIO = windowWidth / windowHeight;
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const HomeScreen = ({ navigation }) => {
  const [myLocation, setMyLocation] = useState(null);
  const [granted, setGranted] = useState(false);

  const [key, setKey] = useState(0);
  const [isCameraEnabled, setIsCameraEnabled] = useState(true);

  const handleNavigateCameraClick = () => {
    console.log("click");
    setIsCameraEnabled(!isCameraEnabled);
    navigation.navigate("Camera");
  };

  const handleComplete = () => {
      console.log("set camera enable");
      setKey(prevKey => prevKey + 1);
      setIsCameraEnabled(true);
  }

  useEffect(() => {
    (async () => {
      let locationSubscription;

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        setGranted(true);
        locationSubscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.Highest,
            timeInterval: 1000, //android専用らしいけどわからん
            distanceInterval: 1, 
          },
          (location) => {
            setMyLocation(location);
            console.log(
              `latitude: ${location.coords.latitude}, longitude: ${location.coords.longitude}`
            );
          }
        );
        return () => {
          if (locationSubscription) {
            locationSubscription.remove();
          }
        };
      }
    })();
  }, []);

  

  return (
    <View style={styles.container}>
      {granted === false ? (
        <Text>Permission to access location was denied</Text>
      ) : myLocation === null ? (
        <Text>Obtaining location information...</Text>
      ) : (
        <>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: myLocation.coords.latitude,
              longitude: myLocation.coords.longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}
          >
            <Marker
              coordinate={{
                latitude: myLocation.coords.latitude,
                longitude: myLocation.coords.longitude,
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
              right:20,
              bottom:20
            }}
          >
            <CameraButton key={key} isCameraEnabled={isCameraEnabled} onComplete={handleComplete} onClick={handleNavigateCameraClick}/>
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
