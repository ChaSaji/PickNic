import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import ItemCard from "../components/ItemCard";
import { fetchData, selectData } from "../lib/dataBaseHelper";
import {
  RO,
  Material,
  Meal,
  RecipeDetail,
  MealStatus,
} from "../lib/databaseQueryText";
import getImageSource from "../lib/images";

const CookingScreen = ({ navigation }) => {
  const [meals, setMeals] = useState([]);
  useEffect(() => {
    fetchData(Meal.tablename).then((meals) => {
      Promise.all(
        meals.map((meal) =>
          selectData(
            MealStatus.tablename,
            MealStatus.elementsKey.id,
            RO.Eqqual,
            meal.mealStatusId
          ).then((mealStatus) => {
            const status =
              mealStatus.length > 0 ? mealStatus[0] : { cooked: 0, locked: 1 };
            return {
              ...meal,
              cooked: status.cooked,
              locked: status.locked,
            };
          })
        )
      ).then((meals) => {
        setMeals(meals);
      });
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
            source={getImageSource({
              pass2Photo: meal.pass2Photo,
              locked: meal.locked,
              cooked: meal.cooked,
              // （テスト用）上をコメントアウトしてここをいじって変化を見てください
              // locked: 0,
              // cooked: 0,
            })}
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
