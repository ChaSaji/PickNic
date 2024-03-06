import * as SQLite from 'expo-sqlite';
import * as QueryConst from "./databaseQueryText";
// データベースを作成またはオープン
const db = SQLite.openDatabase('database.db');


export function CreateAllTable(){
   console.log(QueryConst.createTableBadge);
   console.log(QueryConst.createTableMaterial);
   console.log(QueryConst.createTableMaterialPhotoRelation);
   console.log(QueryConst.createTableMeal);
   console.log(QueryConst.createTableMeal_Status);
   console.log(QueryConst.createTablePhoto);
   console.log(QueryConst.createTableRecipe_Detail);
    db.transaction(tx => {
        tx.executeSql(QueryConst.createTableBadge);
        tx.executeSql(QueryConst.createTableMaterial);
        tx.executeSql(QueryConst.createTableMaterialPhotoRelation);
        tx.executeSql(QueryConst.createTableMeal);
        tx.executeSql(QueryConst.createTableMeal_Status);
        tx.executeSql(QueryConst.createTablePhoto);
        tx.executeSql(QueryConst.createTableRecipe_Detail);
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

export function DropAllTable(){
   console.log(QueryConst.DropTableQuery + QueryConst.Badge.tablename);
   console.log(QueryConst.DropTableQuery + QueryConst.Meal.tablename);
   console.log(QueryConst.DropTableQuery + QueryConst.MealStatus.tablename);
   console.log(QueryConst.DropTableQuery + QueryConst.RecipeDetail.tablename);
   console.log(QueryConst.DropTableQuery + QueryConst.Material.tablename);
   console.log(QueryConst.DropTableQuery + QueryConst.MaterialPhotoRelation.tablename);
   console.log(QueryConst.DropTableQuery + QueryConst.Photo.tablename);
    db.transaction(tx => {
        tx.executeSql(QueryConst.DropTableQuery + QueryConst.Badge.tablename);
        tx.executeSql(QueryConst.DropTableQuery + QueryConst.Meal.tablename);
        tx.executeSql(QueryConst.DropTableQuery + QueryConst.MealStatus.tablename);
        tx.executeSql(QueryConst.DropTableQuery + QueryConst.RecipeDetail.tablename);
        tx.executeSql(QueryConst.DropTableQuery + QueryConst.Material.tablename);
        tx.executeSql(QueryConst.DropTableQuery + QueryConst.MaterialPhotoRelation.tablename);
        tx.executeSql(QueryConst.DropTableQuery + QueryConst.Photo.tablename);
    });
    return;
}