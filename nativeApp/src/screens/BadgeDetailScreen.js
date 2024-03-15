import React, { useLayoutEffect } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import getImageSource from "../lib/images";

const BadgeDetailScreen = ({ route, navigation }) => {
  const badge = route.params.badge;
  const meals = route.params.meals;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: badge.name,
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Image
          style={styles.meal}
          source={getImageSource({
            pass2Photo: badge.pass2Photo,
            locked: !badge.IsHave,
          })}
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>解放条件</Text>
        <View style={styles.materialsView}>
          {meals.map((meal, index) => (
            // 10個くらい限度にしよう
            <Image
              key={index}
              style={styles.material}
              source={getImageSource({
                pass2Photo: meal.pass2Photo,
                locked: meal.locked,
                cooked: meal.cooked,
              })}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#b8d4f4",
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
    maxWidth: 330,
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
      lineHeight: 35,
    },
  },
});

export default BadgeDetailScreen;
