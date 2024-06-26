import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { Marker } from "react-native-maps";

const PictureMarker = ({ uri, latitude, longitude, onPress }) => {
  return (
    <Marker
      coordinate={{
        latitude: latitude,
        longitude: longitude,
      }}
      onPress={() => onPress()}
    >
      <View
        style={{
          width: 60,
          height: 60,
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image source={{ uri: uri }} style={{ width: 50, height: 50 }} />
      </View>
    </Marker>
  );
};

export default PictureMarker;
