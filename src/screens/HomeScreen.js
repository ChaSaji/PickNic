import React from "react";
import { Text, View, Button } from "react-native";
import {
  CreateAllTable, DropAllTable, getRecode, insert_badge,getTables, insert_item
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
    badge.name = "BadgeName";badge.pass2Photo = "pass2Photoテキスト";badge.isHave = 0; 
    insert_item(Badge.tablename,badge);
    
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
