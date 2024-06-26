import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import ItemCard from "../components/ItemCard";
import { fetchData } from "../lib/dataBaseHelper";
import { Material } from "../lib/databaseQueryText";
import { useDbUpdate } from "../context/DbUpdateContext";
import getImageSource from "../lib/images";

const BagScreen = () => {
  const [materials, setMaterials] = useState([]);

  const { materialUpdate } = useDbUpdate();

  useEffect(() => {
    fetchData(Material.tablename, 0, 1000, false).then((data) => {
      setMaterials(data);
    });
  }, [materialUpdate]);

  const handleItemClick = (material) => {
    alert(`${material.name}のボタンが押されました`);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {materials.map((material, index) => (
          <ItemCard
            key={index}
            source={getImageSource({
              pass2Photo: material.pass2Photo,
            })}
            name={material.name}
            onPress={() => handleItemClick(material)}
            backgroundColor="#FFE8AD"
            text={`×${material.stock}`}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    alignItems: "center",
    marginHorizontal: 8,
  },
  scrollViewContent: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});

export default BagScreen;
