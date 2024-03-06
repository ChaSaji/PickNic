import React from "react";
import { Text, View, Button } from "react-native";
import {
  CreateAllTable, DropAllTable, getRecode, insert_badge,getTables, insert_item
} from "../lib/dataBaseHander";
import { Badge, BadgeElement, Material, MaterialElement, MaterialPhotoRelation, MaterialPhotoRelationElemant, Meal,MealElement, MealStatus, MelaStatusElement, Photo, PhotoElement, RecipeDetail, RecipeDetailElement} from "../lib/databaseQueryText";

const HomeScreen = () => {
  // 関数Bを定義
  const functionA = () => {
    console.log("テーブルの作成");
    //DataBaseHander.MakeTable();
    CreateAllTable();
  };
  const functionB = () => {
    console.log("アイテム追加テスト1");
    badge = BadgeElement;
    badge.name = "BadgeName";badge.pass2Photo = "pass2Photo/テキスト/x.png";badge.isHave = 0; 
    insert_item(Badge.tablename,badge);
    console.log("アイテム追加テスト2");
    meal = MealElement;    meal.recipeId = 123;meal.badthId=456;    mealStatusId=789;
    meal.pass2Photo="mealpass2Photo";
    insert_item(Meal.tablename,meal);
    console.log("アイテム追加テスト3");
    mealstatus = MelaStatusElement;
    mealstatus.locked = 0;mealstatus.cooked = 0;
    insert_item(MealStatus.tablename,mealstatus);
    console.log("アイテム追加テスト4");
    recipe = RecipeDetailElement;
    recipe.materialId = "321";recipe.needNum = "10";
    insert_item(RecipeDetail.tablename,recipe);
    material = MaterialElement
    material.name = "material name";material.pass2Photo = "pass/To/photo/matarial.jpg";material.stock = "468";
    insert_item(Material.tablename,material);
    relation = MaterialPhotoRelationElemant;
    relation.materialId = "194";relation.PhotoId="514";
    insert_item(MaterialPhotoRelation.tablename,relation);
    photo = PhotoElement
    photo.name = "photoName";photo.ratitude = 135.12345678901234567890;
    photo.longitude = 35.12345678901234567890;photo.visited = 1;
    photo.pass2Photo = "photoPass";
    insert_item(Photo.tablename,photo);
  };

  const functionC = () => {
    console.log("アイテム検索テスト");
    getRecode();
  };

  const functionD = () => {
    console.log("テーブルを削除します");
    DropAllTable();
  };
  const functionE = () => {
    console.log("テーブルの確認をおこないます");
    getTables()
  .then(tables => {
    console.log('テーブル一覧:', tables);
  })
  .catch(error => {
    console.error('テーブル一覧を取得できませんでした:', error);
  });
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>ホーム</Text>
      <Button title="MakeTableItem" onPress={functionA} />
      <Button title="AddItem" onPress={functionB} />
      <Button title="SeeItem" onPress={functionC} />
      <Button title="DropTable" onPress={functionD} />
      <Button title="CheckTable" onPress={functionE} />
    </View>
  );
};

export default HomeScreen;
