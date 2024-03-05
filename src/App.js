import React from 'react';
import { StatusBar } from "expo-status-bar";
import { Button,Text, View } from "react-native";
import {AddItem, DropTable, MakeTableItem,getRecode} from "./DataBaseHander"

// テーブルを作成するクエリ
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT
  );
`;

export default function App() {
    // 関数Bを定義
    const functionA = () => {
      console.log('ボタンAが押されました');
      //DataBaseHander.MakeTable();
      MakeTableItem();
    };
    const functionB = () => {
      console.log('ボタンBが押されました');
      //DataBaseHander.MakeTable();
      AddItem("AddItemTester");
      AddItem("日本語テスト");
    };
    const functionC = () => {
      console.log('アイテム一覧を表示します');
      //getRecode();
      getRecode();
    }
    const functionD = () => {
      console.log('テーブルを削除します');
      DropTable();
    }
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Open up App.js to start working on your app!</Text>
      <Button title="MakeTableItem" onPress={functionA} />
      <Button title="AddItem" onPress={functionB} />
      <Button title="SeeItem" onPress={functionC} />
      <Button title="DropTable" onPress={functionD} />
      
      <StatusBar style="auto" />
    </View>
  );
}
