import React from "react";
import { Image, Text, TouchableOpacity, StyleSheet } from "react-native";

// propsで受け取る値はサンプル
const ItemCard = ({ item, name, onPress, source, backgroundColor }) => {
  const styles = StyleSheet.create({
    item: {
      height: 120,
      width: "30%",
      backgroundColor: backgroundColor,
      margin: 5,
      alignItems: "center",
      justifyContent: "center",
    },
  });

  return (
    <TouchableOpacity style={styles.item} onPress={() => onPress(name)}>
      <Image source={source} style={{ width: 75, height: 75 }} />
      <Text style={{ fontSize: 30 }}>×1</Text>
    </TouchableOpacity>
  );
};

export default ItemCard;
