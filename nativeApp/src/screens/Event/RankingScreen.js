import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import getImageSource from "../../lib/images";
import { useLayoutEffect } from "react";

const RankingScreen = ({ navigation, route }) => {
  const users = [
    {
      name: "test-user",
      score: 10,
    },
    {
      name: "test-user",
      score: 10,
    },
    {
      name: "あかさたなはまやらわ",
      score: 100,
    },
    {
      name: "test-user",
      score: 10,
    },
    {
      name: "test-user",
      score: 10,
    },
    {
      name: "test-user",
      score: 10,
    },
    {
      name: "test-user",
      score: 10,
    },
    {
      name: "test-user",
      score: 10,
    },
    {
      name: "test-user",
      score: 10,
    },
    {
      name: "test-user",
      score: 10,
    },
  ];

  const pass2PhotoMap = ["gold", "silver", "bronze"];

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "戻る",
    });
  }, [route]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {users.map((user, index) => (
          <View key={index} style={styles.cardContainer}>
            {index < 3 ? (
              <Image
                source={getImageSource({ pass2Photo: pass2PhotoMap[index] })}
                style={styles.image}
                resizeMode="contain"
              />
            ) : (
              <View style={styles.rankContainer}>
                <Text style={styles.rankText}>{index + 1}</Text>
              </View>
            )}
            <View style={styles.textContainer}>
              <Text style={styles.name}>{user.name}</Text>
              <Text style={styles.score}>{user.score + "点"}</Text>
            </View>
          </View>
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
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  cardContainer: {
    height: 120,
    width: "97%",
    backgroundColor: "#E6F6C7",
    margin: 5,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  rankContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  rankText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#FF914D",
  },
  textContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    maxWidth: 150,
    flexShrink: 1,
  },
  score: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FF914D",
  },
});

export default RankingScreen;
