import * as SQLite from 'expo-sqlite';
// データベースを作成またはオープン
const db = SQLite.openDatabase('database.db');

// テーブルを作成するクエリ
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT
  );
`;

export function MakeTableItem(){
    // ボタンが押されたときに実行される関数
    db.transaction(tx => {
        tx.executeSql(createTableQuery);
    });
    return;
}
const additemQuery = "insert into items (name) values (?);"
export function AddItem(Item_Name){
    // ボタンが押されたときに実行される関数
    db.transaction(tx => {
        tx.executeSql(
            additemQuery,
            [Item_Name],
            () => {},
            (error) => {
              console.log(error);
            }
        );
    });
    return;
}

const getRecodeQuery = "SELECT * FROM items;"

export function getRecode(){
    db.transaction(tx => {
        tx.executeSql(
            getRecodeQuery,
            [],
            // 成功時のコールバック
            (_, {rows}) => {
                //setItems(rows._array);
                console.log("select success num = "+ rows._array.length);
                console.log("select result:" + JSON.stringify(rows._array));

            },
            () => {
                // 失敗時のコールバック
                console.log("SELECT TABLE Failed.");
                return false;  // return true でロールバックする
            });
        });
}

const DropTabelQuery = "drop table items;";
export function DropTable(){
    // ボタンが押されたときに実行される関数
    db.transaction(tx => {
        tx.executeSql(DropTabelQuery);
    });
    return;
}