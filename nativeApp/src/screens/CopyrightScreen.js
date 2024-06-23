import React from "react";
import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const CopyrightScreen = () => {
  const openIcons8 = () => {
    Linking.openURL("https://icons8.com/").catch((err) =>
      console.error("Couldn't load page", err)
    );
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "column", alignItems: "center" }}>
        <Text style={{ color: "#808080" }}>
          © 2024, 茶匙. PickNic is a trademark of 茶匙.
        </Text>
        <Text style={{ color: "#808080" }}>All rights reserved.</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text style={{ color: "#808080" }}>Icons by </Text>
        <TouchableOpacity onPress={openIcons8} style={{ borderBottomWidth: 1 }}>
          <Text style={{ color: "#808080" }}>Icons8</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    marginHorizontal: 10,
    gap: 3,
  },
});

export default CopyrightScreen;
