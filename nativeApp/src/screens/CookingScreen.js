import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import ItemCard from "../components/ItemCard";
import { fetchData, selectData } from "../lib/dataBaseHelper";
import { RO, Material, Meal, RecipeDetail } from "../lib/databaseQueryText";

const CookingScreen = ({ navigation }) => {
  const [meals, setMeals] = useState([]);
  useEffect(() => {
    fetchData(Meal.tablename).then((data) => {
      setMeals(data);
    });
  }, []);

  const handleItemClick = (meal) => {
    selectData(
      RecipeDetail.tablename,
      RecipeDetail.elementsKey.mealId,
      RO.Eqqual,
      meal.id
    ).then((recipeDetails) => {
      Promise.all(
        recipeDetails.map((recipeDetail) =>
          selectData(
            Material.tablename,
            Material.elementsKey.id,
            RO.Eqqual,
            recipeDetail.materialId
          ).then((materials) => ({
            ...materials[0],
            needNum: recipeDetail.needNum,
          }))
        )
      ).then((materials) =>
        navigation.navigate("CookingDetail", {
          meal: meal,
          materials: materials,
        })
      );
    });
  };
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {meals.map((meal, index) => (
          <ItemCard
            key={index}
            source={meal.pass2Photo}
            name={meal.name}
            onPress={() => handleItemClick(meal)}
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
