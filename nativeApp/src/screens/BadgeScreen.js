import React from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import ItemCard from "../components/ItemCard";

const BadgeScreen = ({ navigation }) => {
  const handleItemClick = (name) => {
    navigation.navigate("BadgeDetail", {
      recipeName: `${name}番のバッジ`,
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
            backgroundColor="#b8d4f4"
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

export default BadgeScreen;
