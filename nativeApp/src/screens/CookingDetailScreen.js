import React, { useLayoutEffect } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";

const CookingDetailScreen = ({ route, navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.recipeName,
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Image
          style={styles.meal}
          source={require("../../assets/icons8-camera-64.png")}
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>必要な食材</Text>
        <View style={styles.materialsView}>
          {[...Array(9)].map((_, index) => (
            // 10個くらい限度にしよう
            <Image
              key={index}
              style={styles.material}
              source={require("../../assets/icons8-camera-64.png")}
            />
          ))}
        </View>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("CookingAnimation")}
        style={[styles.button.outerRadius]}
      >
        <View style={[styles.button.innerRadius]}>
          <Text style={styles.button.text}>調理スタート</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#F8DAD1",
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
  meal: {
    width: 150,
    height: 150,
    margin: 5,
  },
  materialsView: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  material: {
    width: 50,
    height: 50,
    margin: 5,
  },
  // ChangeMaterialButtonと同じ、プルリク通り次第そっちから呼び出すように
  button: {
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
      fontSize: 25,
      fontWeight: "bold",
    },
  },
});

export default CookingDetailScreen;
