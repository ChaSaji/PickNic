import React from "react";
import { Text, View, Button } from "react-native";
import {
  CreateAllTable, DropAllTable
} from "../lib/dataBaseHander";

const HomeScreen = () => {
  // 関数Bを定義
  const functionA = () => {
    console.log("テーブルの作成");
    //DataBaseHander.MakeTable();
    CreateAllTable();
  };
  const functionB = () => {
    console.log("アイテム追加テスト");
  };

  const functionC = () => {
    console.log("アイテム検索テスト");
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
