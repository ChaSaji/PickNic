import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  ScrollView,
} from "react-native";

const CookingScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        {[...Array(10)].map((_, index) => (
          <View key={index} style={styles.recipView}>
            <View
              style={{
                width: "30%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../../assets/icons8-camera-64.png")}
                style={{ width: 75, height: 75 }}
              />
            </View>
            <View
              style={{ width: "40%", height: "100%", justifyContent: "center" }}
            >
              {[...Array(4)].map((_, index) => (
                <Text key={index}>・じゃがいも</Text>
              ))}
            </View>
            <View style={{ width: "20%", justifyContent: "center" }}>
              <Button
                title="Cooking!"
                onPress={() => alert(`${index}番のボタンが押されました`)}
              />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    justifyContent: "flex-start",
  },
  recipView: {
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#F8DAD1",
    marginVertical: 5,
  },
});

export default CookingScreen;
