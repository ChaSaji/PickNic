import React from "react";
import { Text, TouchableOpacity } from "react-native";

const InformationButton = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "white",
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      }}
      onPress={() => onPress()}
    >
      <Text
        style={{
          color: "#808080",
          fontSize: 20,
          fontWeight: "bold",
        }}
      >
        i
      </Text>
    </TouchableOpacity>
  );
};

export default InformationButton;
