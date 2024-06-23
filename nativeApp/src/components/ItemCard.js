import React from "react";
import { Image, Text, TouchableOpacity, StyleSheet } from "react-native";

// propsで受け取る値はサンプル
const ItemCard = ({
  item,
  name,
  onPress,
  source,
  backgroundColor,
  text,
  isTextVisiable = true,
}) => {
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
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <Image source={source} style={{ width: 75, height: 75 }} />
      {isTextVisiable && <Text style={{ fontSize: 30 }}>{text}</Text>}
    </TouchableOpacity>
  );
};

export default ItemCard;
