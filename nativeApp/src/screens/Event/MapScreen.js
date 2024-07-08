import { useLayoutEffect } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { useLocation } from "../../context/LocationContext";
import MapView, { Circle, Marker } from "react-native-maps";
import CameraButton from "../../components/CameraButton";
import { useCamera } from "../../context/CameraContext";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const ASPECT_RATIO = windowWidth / windowHeight;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const MapScreen = ({ route, navigation }) => {
  const eventName = route.params.eventName;
  const eventLatitude = route.params.latitude;
  const eventLongitude = route.params.longitude;

  const { location, granted } = useLocation();
  const { cameraKey, setCameraKey, isCameraEnabled, setIsCameraEnabled } =
    useCamera();

  const handleComplete = () => {
    console.log("set camera enable");
    setCameraKey((prevKey) => prevKey + 1);
    setIsCameraEnabled(true);
  };

  const handleNavigateCameraClick = () => {
    navigation.navigate("Camera", {
      eventId: route.params.eventId,
    });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: eventName,
      headerBackTitle: "戻る",
    });
  }, [route]);

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
              latitude: eventLatitude,
              longitude: eventLongitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}
          >
            <Circle
              center={{
                latitude: eventLatitude,
                longitude: eventLongitude,
              }}
              radius={500}
              strokeColor="#1BB8E8"
              fillColor="rgba(27, 184, 232, 0.3)"
            />
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
          </MapView>
          <View
            style={{
              position: "absolute",
              justifyContent: "center",
              alignItems: "center",
              width: 130,
              height: 130,
              borderRadius: 200,
              right: 20,
              top: 20,
            }}
          >
            <Image
              style={styles.image}
              source={require("../../../assets/sample.jpg")}
            />
          </View>
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
  image: {
    width: 100,
    height: 100,
    margin: 5,
  },
});

export default MapScreen;
