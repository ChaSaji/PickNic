import LottieView from "lottie-react-native";
import { useRef } from "react";
import { StyleSheet, View } from "react-native";
import getRandomNum from "../../lib/getRandomNum";

const LoadingScreen = () => {
  const animation = useRef(null);
  const randomAnimationNum = getRandomNum(3);
  const loadingAnimationMap = {
    0: require("../../../assets/material_animation_1.json"), // トラクター
    1: require("../../../assets/material_animation_2.json"), // ぐるぐる
    2: require("../../../assets/material_animation_3.json"), // ネコ
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
      />
    </View>
  );
};

const styles = StyleSheet.create({
  animationContainer: {
    // lottieでカラーセット色々あるから試してみた方がいいかも
    backgroundColor: "#E6F6C7",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});

export default LoadingScreen;
