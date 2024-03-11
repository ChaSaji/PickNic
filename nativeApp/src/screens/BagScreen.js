import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import ItemCard from "../components/ItemCard";

const BagScreen = () => {
  const handleItemClick = (name) => {
    alert(`${name}番のボタンが押されました`);
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
            backgroundColor="#FFE8AD"
            text="×1"
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

export default BagScreen;
