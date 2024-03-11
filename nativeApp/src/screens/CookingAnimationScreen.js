import React, { useRef } from "react";
import { StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";

const CookingAnimationScreen = ({ route, navigation }) => {
  const animation = useRef(null);

  return (
    <View style={styles.animationContainer}>
      <LottieView
        autoPlay
        loop={false}
        onAnimationFinish={() =>
          navigation.navigate("CookingComplete", {
            meal: route.params.meal,
          })
        }
        ref={animation}
        style={{
          width: 500,
          height: 500,
        }}
        // source={require("../../assets/cooking.json")}
        // 開発用（４倍速）
        source={require("../../assets/dev-cooking.json")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  animationContainer: {
    // lottieでカラーセット色々あるから試してみた方がいいかも
    backgroundColor: "#F8DAD1",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});

export default CookingAnimationScreen;
