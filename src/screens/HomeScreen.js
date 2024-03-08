import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const HomeScreen = () => {
  const [myLocation, setMyLocation] = useState(null);
  const [granted, setGranted] = useState(false);

  useEffect(() => {
    (async () => {
      let locationSubscription;

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        setGranted(true);
        locationSubscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.Highest,
            timeInterval: 1000, //android専用
            distanceInterval: 1, //
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
    <View>
      {granted === false ? (
        <Text>Permission to access location was denied</Text>
      ) : myLocation === null ? (
        <Text>Obtaining location information...</Text>
      ) : (
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
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default HomeScreen;
