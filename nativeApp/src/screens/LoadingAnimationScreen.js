import React, { useRef } from "react";
import { StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";
import getRandomNum from "../lib/getRandomNum";

const LoadingAnimationScreen = () => {
  const animation = useRef(null);
  const randomAnimationNum = getRandomNum(3);
  const loadingAnimationMap = {
    0 : require("../../assets/material_animation_1.json"), // トラクター
    1 : require("../../assets/material_animation_2.json"), // ぐるぐる
    2 : require("../../assets/material_animation_3.json"), // ネコ
  };

  const loadingAnimation = loadingAnimationMap[randomAnimationNum];

  return (
    <View style={styles.animationContainer}>
      <LottieView
        autoPlay
        loop={true}
        ref={animation}
        style={{
          width: 500,
          height: 500,
        }}
        source={loadingAnimation}
        // 開発用（４倍速）
        // source={require("../../assets/dev-cooking.json")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  animationContainer: {
    // lottieでカラーセット色々あるから試してみた方がいいかも
    backgroundColor: "F8DAD1",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});

export default LoadingAnimationScreen;
