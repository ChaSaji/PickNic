import * as React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import CameraButton from "../components/CameraButton";

const HomeScreen = ({ navigation }) => {
  const handleNavigateCameraClick = () => navigation.navigate("Camera");
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.title}>Home</Text>
      </ScrollView>
      <CameraButton onClick={handleNavigateCameraClick} />
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
});

export default HomeScreen;
