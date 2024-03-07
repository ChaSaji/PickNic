import React, { useEffect, useState } from "react";
import { Text, View, Button, StyleSheet, Dimensions } from "react-native";
// import { useFocusEffect } from "@react-navigation/native";
import {
  AddItem,
  DropTable,
  MakeTableItem,
  getRecode,
} from "../DataBaseHander";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { LocationSubscriber } from "expo-location/build/LocationSubscribers";

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const HomeScreen = () => {
  const [myLocation, setMyLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      } 
        
      let myLocation = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.Highest,
        timeInterval: 1000, //android専用
        distanceInterval: 1, //
      },
      (myLocation) => {
        setMyLocation(myLocation)
        setLatitude(myLocation.coords.latitude)
        setMyLocation(myLocation.coords.longitude)
        console.log("latitude, longitude: " + myLocation.coords.latitude +","+myLocation.coords.longitude)
      })

      return () => LocationSubscription.remove()
    })();
  }, []);


  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
    console.log(text);
  }

  return (
    <View>
       <MapView
        style={styles.map}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
      >
        {/* <Marker>
          coordinate={{
            latitude: latitude,
            longitude: longitude,
          }}
        </Marker>  */}
      </MapView> 
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
