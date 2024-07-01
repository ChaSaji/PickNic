import { StyleSheet, TouchableOpacity, View, Text } from "react-native";

const MyButton = ({ fontSize = 45, ...props }) => {
  const styles = StyleSheet.create({
    outerRadius: {
      alignItems: "center",
      justifyContent: "center",
      width: 200,
      height: 80,
      borderRadius: 100,
      backgroundColor: "#4BBC96",
    },
    innerRadius: {
      justifyContent: "center",
      alignItems: "center",
      width: 190,
      height: 70,
      borderRadius: 100,
      borderWidth: 5,
      borderColor: "white",
    },
    text: {
      color: "white",
      fontSize: fontSize,
      fontWeight: "bold",
      lineHeight: 60,
      textAlign: "center",
    },
  });

  return (
    <TouchableOpacity
      onPress={() => props.onPress()}
      style={styles.outerRadius}
    >
      <View style={styles.innerRadius}>
        <Text style={styles.text}>{props.label}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default MyButton;
