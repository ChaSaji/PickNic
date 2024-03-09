import { StyleSheet, TouchableOpacity, Image, View } from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

const TAKE_PICTURE_INTERVAL = 20; // カメラを使用不能にする間隔(秒)

const CameraButton = (props) => {
  console.log("isCameraEnabled = " + props.isCameraEnabled);
  return (
    <CountdownCircleTimer
      isPlaying={!props.isCameraEnabled}
      duration={TAKE_PICTURE_INTERVAL}
      colors={"#004777"}
      size={150}
      rotation="CounterClockwise"
      key={props.key}
      onComplete={() => props.onComplete()}
    >
      {({ renderTime }) =>
        props.isCameraEnabled ? ( // カメラが使用可能ならば押したときの処理が発生する
          <TouchableOpacity
            onPress={() => props.onClick()}
            style={styles.outerRadius}
          >
            <View style={styles.innerRadius}>
              <Image
                source={require("../../assets/icons8-camera-64.png")}
                style={{ width: 75, height: 75 }}
              />
            </View>
          </TouchableOpacity>
        ) : (
          // カメラが使用可能でない
          <TouchableOpacity style={styles.cameraNoUseOuterRadius}>
            <View style={styles.cameraNoUseInnerRadius}>
              <Image
                source={require("../../assets/icons8-camera-64.png")}
                style={{ width: 75, height: 75 }}
              />
            </View>
          </TouchableOpacity>
        )
      }
    </CountdownCircleTimer>
  );
};

const styles = StyleSheet.create({
  outerRadius: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: 130,
    height: 130,
    borderRadius: 200,
    backgroundColor: "#4BBC96",
  },
  innerRadius: {
    justifyContent: "center",
    alignItems: "center",
    width: 120,
    height: 120,
    borderRadius: 200,
    borderWidth: 5,
    borderColor: "white",
    backgroundColor: "#4BBC96",
  },
  cameraNoUseOuterRadius: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: 130,
    height: 130,
    borderRadius: 200,
    backgroundColor: "#7D7D7D",
  },
  cameraNoUseInnerRadius: {
    justifyContent: "center",
    alignItems: "center",
    width: 120,
    height: 120,
    borderRadius: 200,
    borderWidth: 5,
    borderColor: "white",
    backgroundColor: "#7D7D7D",
  },
});

export default CameraButton;
