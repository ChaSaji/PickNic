import React from "react";
import { StyleSheet, TouchableOpacity, Image, View, Text } from "react-native";

const ChangeMaterialButton = (props) => {
  const styles = StyleSheet.create({
    outerRadius: {
      alignItems: "center",
      justifyContent: "center",
      width: 200,
      height: 80,
      borderRadius: 100,
      backgroundColor: "#4BBC96",
    },
    innerRadius: {
      justifyContent: "center",
      alignItems: "center",
      width: 190,
      height: 70,
      borderRadius: 100,
      borderWidth: 5,
      borderColor: "white",
    },
    text: {
      color: "white",
      fontSize: 45,
      fontWeight: "bold",
      lineHeight: 60,
      textAlign: "center",
    },
  });

  return (
    <TouchableOpacity
      onPress={() => props.onPress()}
      style={styles.outerRadius}
    >
      <View style={styles.innerRadius}>
        <Text style={styles.text}>変換</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChangeMaterialButton;
