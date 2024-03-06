import React from "react";
import { Text, View, Button } from "react-native";
import {
  CreateAllTable, DropAllTable, getRecode, insert_badge
} from "../lib/dataBaseHander";
import { Badge, BadgeElement } from "../lib/databaseQueryText";

const HomeScreen = () => {
  // 関数Bを定義
  const functionA = () => {
    console.log("テーブルの作成");
    //DataBaseHander.MakeTable();
    CreateAllTable();
  };
  const functionB = () => {
    console.log("アイテム追加テスト");
    badge = BadgeElement;
    badge.name = "BadgeName";badge.pass2Photo = "BadgeName";badge.isHave = 0; 
    insert_badge(badge);
  };

  const functionC = () => {
    console.log("アイテム検索テスト");
    getRecode();
  };

  const functionD = () => {
    console.log("テーブルを削除します");
    DropAllTable();
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>ホーム</Text>
      <Button title="MakeTableItem" onPress={functionA} />
      <Button title="AddItem" onPress={functionB} />
      <Button title="SeeItem" onPress={functionC} />
      <Button title="DropTable" onPress={functionD} />
    </View>
  );
};

export default HomeScreen;
