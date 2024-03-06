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
        tx.executeSql(QueryConst.createTableBadge,
            [],
            (_, result) => {
              // クエリが成功した場合の処理
              console.log('テーブルが作成されました');
            },
            (_, error) => {
              // エラーが発生した場合の処理
              console.error('テーブルの作成中にエラーが発生しました:', error);
            }
        );
        tx.executeSql(QueryConst.createTableMaterial);
        tx.executeSql(QueryConst.createTableMaterialPhotoRelation);
        tx.executeSql(QueryConst.createTableMeal);
        tx.executeSql(QueryConst.createTableMeal_Status);
        tx.executeSql(QueryConst.createTablePhoto);
        tx.executeSql(QueryConst.createTableRecipe_Detail);
    });
    return;
}

export function insert_badge(InsertItem){
    let items = ' ('
    +QueryConst.Badge.elements.name+','
    +QueryConst.Badge.elements.isHave+','
    +QueryConst.Badge.elements.pass2Photo+')';
    let QueryText = QueryConst.InsertQuery
    +QueryConst.Badge.tablename
    +items
    +QueryConst.values+'(?, ?, ?)';
    console.log(QueryText);
    db.transaction(tx => {
        tx.executeSql(
          QueryText,
          [InsertItem.name, InsertItem.isHave, InsertItem.pass2Photo],
          (_, result) => {
            // 成功時の処理
            console.log('データが挿入されました');
          },
          (_, error) => {
            // エラー時の処理
            console.error('データの挿入中にエラーが発生しました:', error);
          }
        );
      }
    );
}

export function insert_meal(InsertItem){
    let items = '('
        +QueryConst.Meal.elements.recipeId+','
        +QueryConst.Meal.elements.badthId+','
        +QueryConst.Meal.elements.mealStatusId+','
        +QueryConst.Meal.elements.pass2Photo+
        ')';
    let QueryText = QueryConst.InsertQuery+QueryConst.Meal.tablename+items+QueryConst.values+'(?,?,?,?)';
        db.transaction(tx => {
            tx.executeSql(
              QueryText,
              [InsertItem.recipeId,InsertItem.badthId,InsertItem.mealStatusId,InsertItem.pass2Photo],
              (_, { rowsAffected }) => {
                if (rowsAffected > 0) {
                  console.log('Data Inserted Meal');
                }else{
                    console.log('erro'+QueryText);
                }
              }
            );
        }
    );
}

export function insert_meal_status(InsertItem){
    let items = '('
        +QueryConst.MealStatus.elements.locked+','
        +QueryConst.MealStatus.elements.cooked+')';
    let QueryText = QueryConst.InsertQuery+QueryConst.MealStatus.tablename+items+QueryConst.values+'(?,?)';
        db.transaction(tx => {
            tx.executeSql(
              QueryText,
              [InsertItem.locked,InsertItem.cooked],
              (_, { rowsAffected }) => {
                if (rowsAffected > 0) {
                  console.log('Data Inserted MealStatus');
                }else{
                    console.log('erro'+QueryText);
                }
              }
            );
        }
    );
}

export function insert_recipe_detail(InsertItem){
    let items = '('
        +QueryConst.RecipeDetail.elements.materialId+','
        +QueryConst.RecipeDetail.elements.needNum   +')';
    let QueryText = QueryConst.InsertQuery+QueryConst.RecipeDetail.tablename+items+QueryConst.values+'(?,?)';
        db.transaction(tx => {
            tx.executeSql(
              QueryText,
              [InsertItem.materialId,InsertItem.needNum],
              (_, { rowsAffected }) => {
                if (rowsAffected > 0) {
                  console.log('Data Inserted RecipeDetail');
                }else{
                    console.log('erro'+QueryText);
                }
              }
            );
        }
    );
}

export function insert_material(InsertItem){
    let items = '('
        +QueryConst.Material.elements.name+','
        +QueryConst.Material.elements.pass2Photo+','
        +QueryConst.Material.elements.stock   +')';
    let QueryText = QueryConst.InsertQuery
                +QueryConst.Material.tablename+items+QueryConst.values+'(?,?,?)';
    db.transaction(tx => {
            tx.executeSql(
              QueryText,
              [InsertItem.name,InsertItem.pass2Photo,InsertItem.stock],
              (_, { rowsAffected }) => {
                if (rowsAffected > 0) {
                  console.log('Data Inserted Material');
                }else{
                    console.log('erro'+QueryText);
                }
              }
            );
    });
}

export function insert_material_photo_relation(InsertItem){
    let items = '('
        +QueryConst.MaterialPhotoRelation.elements.materialId+','
        +QueryConst.MaterialPhotoRelation.elements.PhotoId+')';
    let QueryText = QueryConst.InsertQuery
    +QueryConst.MaterialPhotoRelation.tablename
    +items+QueryConst.values+'(?,?)';
        db.transaction(tx => {
            tx.executeSql(
              QueryText,
              [InsertItem.name,InsertItem.pass2Photo,InsertItem.stock],
              (_, { rowsAffected }) => {
                if (rowsAffected > 0) {
                  console.log('Data Inserted Material');
                }else{
                    console.log('erro'+QueryText);
                }
              }
            );
        }
    );
}
export function insert_photo(InsertItem){
    let items = '('
        +QueryConst.Photo.elements.name+','
        +QueryConst.Photo.elements.ratitude+','
        +QueryConst.Photo.elements.longitude+','
        +QueryConst.Photo.elements.pass2Photo+','
        +QueryConst.Photo.elements.visited+')';
    let QueryText = QueryConst.InsertQuery
    +QueryConst.Photo.tablename
    +items+QueryConst.values+'(?,?)';
        db.transaction(tx => {
            tx.executeSql(
              QueryText,
              [InsertItem.name,InsertItem.pass2Photo,InsertItem.stock],
              (_, { rowsAffected }) => {
                if (rowsAffected > 0) {
                  console.log('Data Inserted Material');
                }else{
                    console.log('erro'+QueryText);
                }
              }
            );
        }
    );
}

const getRecodeQuery = "SELECT * FROM "
export function getRecode(){
    let QueryText = getRecodeQuery + QueryConst.Badge.tablename +";";
    //QueryText = "SELECT * FROM testtable;";
    db.transaction(tx => {
        tx.executeSql(
            QueryText,
            [],
            // 成功時のコールバック
            (_, {rows}) => {
                //setItems(rows._array);
                console.log("select success num = "+ rows._array.length);
                console.log("select result:" + JSON.stringify(rows._array));

            },
            (_, error) => {
                // エラーが発生した場合の処理
                console.error('エラー:', error);
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
        tx.executeSql(QueryConst.DropTableQuery + QueryConst.Badge.tablename,
            [],
            (_, result) => {
              // 成功時の処理
              console.log('テーブルが削除されました');
            },
            (_, error) => {
              // エラー時の処理
              console.error('テーブルの削除中にエラーが発生しました:', error);
            }
        );
        tx.executeSql(QueryConst.DropTableQuery + QueryConst.Meal.tablename);
        tx.executeSql(QueryConst.DropTableQuery + QueryConst.MealStatus.tablename);
        tx.executeSql(QueryConst.DropTableQuery + QueryConst.RecipeDetail.tablename);
        tx.executeSql(QueryConst.DropTableQuery + QueryConst.Material.tablename);
        tx.executeSql(QueryConst.DropTableQuery + QueryConst.MaterialPhotoRelation.tablename);
        tx.executeSql(QueryConst.DropTableQuery + QueryConst.Photo.tablename);
    });
    return;
}