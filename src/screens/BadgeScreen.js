import React from "react";
import { StyleSheet, Text, ScrollView, View, Image } from "react-native";

const BadgeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.titleView}>
        <Text style={styles.title}>称号</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.badgeView}>
          {[...Array(100)].map((_, index) => (
            <Image
              key={index}
              source={{
                uri: "https://reactnative.dev/docs/assets/p_cat1.png",
              }}
              style={styles.icon}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  titleView: {
    backgroundColor: "pink",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  scrollView: {
    flex: 1,
  },
  badgeView: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    backgroundColor: "aliceblue",
    justifyContent: "space-around",
    marginTop: 8,
    marginHorizontal: 8,
  },
  icon: {
    width: 80,
    height: 80,
  },
});

export default BadgeScreen;
