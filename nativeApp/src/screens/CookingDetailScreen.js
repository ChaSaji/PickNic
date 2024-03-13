import React, { useLayoutEffect } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import getImageSource from "../lib/images";
import { selectDataById, update_item } from "../lib/dataBaseHelper";
import {
  MealStatus,
  MelaStatusElement,
  Material,
  MaterialElement,
} from "../lib/databaseQueryText";

const CookingDetailScreen = ({ route, navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.meal.name,
    });
  }, []);

  const meal = route.params.meal;
  const materials = route.params.materials;

  const isCookableCheck = () => {
    if (meal.locked)
      return { isCookable: false, msg: "このレシピはロックがかかっています。" };
    for (let i = 0; i < materials.length; i++) {
      if (materials[i].stock < materials[i].needNum) {
        return { isCookable: false, msg: "食材が足りません。" };
      }
    }
    return { isCookable: true, msg: "" };
  };

  const updateMealStatusCooked = () => {
    selectDataById(MealStatus.tablename, meal.mealStatusId).then((data) => {
      mealStatus = new MelaStatusElement();
      mealStatus.id = data[0].id;
      mealStatus.cooked = 1;
      mealStatus.locked = data[0].locked;
      update_item(MealStatus.tablename, mealStatus);
    });
  };

  const updateMaterialStock = () => {
    for (let i = 0; i < materials.length; i++) {
      selectDataById(Material.tablename, materials[i].id).then((data) => {
        material = new MaterialElement();
        material.id = data[0].id;
        material.name = data[0].name;
        material.pass2Photo = data[0].pass2Photo;
        material.colorId = data[0].colorId;
        material.stock = materials[i].stock - materials[i].needNum;
        update_item(Material.tablename, material);
      });
    }
  };

  const cookCheck = () => {
    const isCookableResult = isCookableCheck();
    if (isCookableResult.isCookable) {
      updateMealStatusCooked();
      updateMaterialStock();
      navigation.navigate("CookingAnimation", {
        meal: meal,
      });
    } else {
      return alert(isCookableResult.msg);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Image
          style={styles.meal}
          source={getImageSource({
            pass2Photo: meal.pass2Photo,
            locked: meal.locked,
            cooked: meal.cooked,
          })}
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>必要な食材</Text>
        <View style={styles.materialsView}>
          {materials.map((material, index) => (
            // 10個くらい限度にしよう
            <View key={index} style={styles.materialView}>
              <Image
                key={index}
                style={styles.material}
                source={getImageSource({
                  pass2Photo: material.pass2Photo,
                })}
              />
              <Text>{`×${material.needNum}`}</Text>
            </View>
          ))}
        </View>
      </View>
      <TouchableOpacity
        onPress={() => cookCheck()}
        style={[styles.button.outerRadius]}
      >
        <View style={[styles.button.innerRadius]}>
          <Text style={styles.button.text}>調理スタート</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#F8DAD1",
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
  meal: {
    width: 150,
    height: 150,
    margin: 5,
  },
  materialsView: {
    maxWidth: 330,
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  materialView: {
    alignItems: "center",
  },
  material: {
    width: 50,
    height: 50,
    margin: 5,
  },
  // ChangeMaterialButtonと同じ、プルリク通り次第そっちから呼び出すように
  button: {
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
      fontSize: 25,
      fontWeight: "bold",
      lineHeight: 35,
    },
  },
});

export default CookingDetailScreen;
