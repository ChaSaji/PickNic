import React from "react";
import { Text, View, StyleSheet } from "react-native";

const CookingAnimationScreen = ({ navigation }) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 20,
      backgroundColor: "#F8DAD1",
    },
  });

  return (
    <View style={styles.container}>
      <Text>CookingAnimation</Text>
    </View>
  );
};

export default CookingAnimationScreen;
