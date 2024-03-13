import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import ItemCard from "../components/ItemCard";
import { fetchData, selectData } from "../lib/dataBaseHelper";
import { Badge, Meal, RO, MealStatus } from "../lib/databaseQueryText";
import getImageSource from "../lib/images";

const BadgeScreen = ({ navigation }) => {
  const [badges, setBadges] = useState([]);
  useEffect(() => {
    fetchData(Badge.tablename).then((data) => {
      setBadges(data);
    });
  }, []);

  const handleItemClick = (badge) => {
    selectData(
      Meal.tablename,
      Meal.elementsKey.badgeId,
      RO.Eqqual,
      badge.id
    ).then((meals) =>
      Promise.all(
        meals.map((meal) =>
          selectData(
            MealStatus.tablename,
            MealStatus.elementsKey.id,
            RO.Eqqual,
            meal.id
          ).then((mealStatus) => {
            const status =
              mealStatus > 0 ? mealStatus[0] : { cooked: 0, locked: 1 };
            return {
              ...meal,
              cooked: status.cooked,
              locked: status.locked,
            };
          })
        )
      ).then((meals) =>
        navigation.navigate("BadgeDetail", {
          badge: badge,
          meals: meals,
        })
      )
    );
  };
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {badges.map((badge, index) => (
          <ItemCard
            key={index}
            source={getImageSource({
              pass2Photo: badge.pass2Photo,
              locked: badge.IsHave,
            })}
            name={String(index)}
            onPress={() => handleItemClick(badge)}
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
