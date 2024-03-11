import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import ItemCard from "../components/ItemCard";
import { fetchData, selectData } from "../lib/dataBaseHelper";
import { Badge, Meal, RO } from "../lib/databaseQueryText";

const BadgeScreen = ({ navigation }) => {
  const [badges, setBadges] = useState([]);
  useEffect(() => {
    fetchData(Badge.tablename).then((data) => {
      console.log(data);
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
      navigation.navigate("BadgeDetail", {
        badge: badge,
        meals: meals,
      })
    );
  };
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {badges.map((badge, index) => (
          <ItemCard
            key={index}
            source={badge.pass2Photo}
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
