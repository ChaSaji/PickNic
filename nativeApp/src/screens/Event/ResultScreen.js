import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { getScoreMessage } from "../../lib/getScoreMessage";

const ResultScreen = ({ navigation, route }) => {
  const score = route.params.score;
  const message = getScoreMessage(score);
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("Event")}
    >
      <Text style={styles.title}>{score}点!!</Text>
      <Text style={styles.message}>{message}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E6F6C7",
    gap: 20,
  },
  title: {
    fontSize: 70,
    fontWeight: "bold",
    color: "#FF914D",
  },
  message: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#FF914D",
  },
});

export default ResultScreen;
