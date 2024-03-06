import * as React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
      }}
    >
      <Text style={styles.title}>Home</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("Camera")}
        style={styles.container}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 130,
    height: 130,
    borderRadius: 200,
    borderWidth: 10,
    backgroundColor: "green",
    borderColor: "yellow",
    alignSelf: "flex-end",
    right: 0,
    bottom: -250,
  },
  title: {
    // paddingVertical: 8,
    // borderWidth: 4,
    borderColor: '#20232a',
    borderRadius: 6,
    backgroundColor: '#61dafb',
    color: '#20232a',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    right: 0,
    bottom: -350,
  },
});

export default HomeScreen;
