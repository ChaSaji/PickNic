import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.title}>Home</Text>
      </ScrollView>
      <TouchableOpacity
        onPress={() => navigation.navigate("Camera")}
        style={styles.fixedButton}
      >
        <Text style={styles.buttonText}>カメラ</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
  },

  fixedButton: {
    position: "absolute",
    width: 130,
    height: 130,
    borderRadius: 200,
    borderWidth: 10,
    backgroundColor: "green",
    borderColor: "yellow",
    right: 20,
    bottom: 20,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    margin: "auto",
    fontSize: 16,
  },
});

export default HomeScreen;
