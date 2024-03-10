import React from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";

const BagScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {[...Array(31)].map((_, index) => (
          <TouchableOpacity
            key={index}
            style={styles.item}
            onPress={() => alert(`${index}番のボタンが押されました`)}
          >
            <Image
              source={require("../../assets/icons8-camera-64.png")}
              style={{ width: 75, height: 75 }}
            />
            <Text style={{ fontSize: 30 }}>×1</Text>
          </TouchableOpacity>
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
  item: {
    height: 120,
    width: "30%",
    backgroundColor: "#FFE8AD",
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default BagScreen;
