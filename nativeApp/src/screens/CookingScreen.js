import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import ItemCard from "../components/ItemCard";

const CookingScreen = ({ navigation }) => {
  const handleItemClick = (name) => {
    navigation.navigate("CookingDetail", {
      recipeName: `${name}番の料理`,
    });
  };
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {[...Array(31)].map((_, index) => (
          <ItemCard
            key={index}
            source={require("../../assets/icons8-camera-64.png")}
            name={String(index)}
            onPress={handleItemClick}
            backgroundColor="#F8DAD1"
            isTextVisiable={false}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    alignItems: "center",
    marginHorizontal: 8,
  },
  scrollViewContent: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});

export default CookingScreen;
