import { StyleSheet, TouchableOpacity, Image, View } from "react-native";

const CameraButton = (props) => {
  const styles = StyleSheet.create({
    outerRadius: {
      position: "absolute",
      justifyContent: "center",
      alignItems: "center",
      width: 130,
      height: 130,
      borderRadius: 200,
      backgroundColor: "#4BBC96",
      right: 20,
      bottom: 20,
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
  });
  return (
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
  );
};

export default CameraButton;
