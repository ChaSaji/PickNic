import * as SQLite from 'expo-sqlite';
import * as QueryConst from "./databaseQueryText";
// データベースを作成またはオープン
const db = SQLite.openDatabase('database.db');

export function CreateAllTable(){
    db.transaction(tx => {tx.executeSql(QueryConst.createTableBadge);    });
    db.transaction(tx => {tx.executeSql(QueryConst.createTableMaterial);});
    db.transaction(tx => {tx.executeSql(QueryConst.createTableMaterialPhotoRelation);});
    db.transaction(tx => {tx.executeSql(QueryConst.createTableMeal);});
    db.transaction(tx => {tx.executeSql(QueryConst.createTableMeal_Status);});
    db.transaction(tx => {tx.executeSql(QueryConst.createTablePhoto,            
      [],
      (_, result) => {
        // クエリが成功した場合の処理
        console.log('テーブルが作成されました');
      },
      (_, error) => {
        // エラーが発生した場合の処理
        console.error(QueryConst.createTablePhoto);
        console.error('テーブルの作成中にエラーが発生しました:', error);
      }
  );});
    db.transaction(tx => {tx.executeSql(QueryConst.createTableRecipe_Detail)});
    console.log(QueryConst.createTableBadge);
    console.log(QueryConst.createTableMaterial);
    console.log(QueryConst.createTableMaterialPhotoRelation);
    console.log(QueryConst.createTableMeal);
    console.log(QueryConst.createTableMeal_Status);
    console.log(QueryConst.createTablePhoto);
    console.log(QueryConst.createTableRecipe_Detail);
}
//###insert
export function insert_item(Table,InsertItemItem){
  console.log("insert_item:name:"+Table);
  switch (Table){
    case QueryConst.Badge.tablename://1
      insert_badge(InsertItemItem);
      break;
    case QueryConst.Meal.tablename://2
      console.log(QueryConst.Meal.tablename);
      insert_meal(InsertItemItem);
      break;
    case QueryConst.MealStatus.tablename://3
      insert_meal_status(InsertItemItem);
      break;
    case QueryConst.RecipeDetail.tablename://4
      insert_recipe_detail(InsertItemItem);
      break;
    case QueryConst.Material.tablename://5
      insert_material(InsertItemItem);
      break;
    case QueryConst.MaterialPhotoRelation.tablename://6
      insert_material_photo_relation(InsertItemItem);
      break;
    case QueryConst.Photo.tablename://7
      insert_photo(InsertItemItem);
      break;
    default:
  }
}

export function insert_badge(InsertItem){
    let items = ' ('
    +QueryConst.Badge.elementsKey.name+','
    +QueryConst.Badge.elementsKey.isHave+','
    +QueryConst.Badge.elementsKey.pass2Photo+')';
    let QueryText = QueryConst.InsertQuery
    +QueryConst.Badge.tablename
    +items
    +QueryConst.values+'(?, ?, ?)';
    console.log(QueryText + InsertItem.name, InsertItem.isHave, InsertItem.pass2Photo);
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
        +QueryConst.Meal.elementsKey.recipeId+','
        +QueryConst.Meal.elementsKey.badthId+','
        +QueryConst.Meal.elementsKey.mealStatusId+','
        +QueryConst.Meal.elementsKey.pass2Photo+
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
        +QueryConst.MealStatus.elementsKey.locked+','
        +QueryConst.MealStatus.elementsKey.cooked+')';
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
        +QueryConst.RecipeDetail.elementsKey.materialId+','
        +QueryConst.RecipeDetail.elementsKey.needNum   +')';
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
        +QueryConst.Material.elementsKey.name+','
        +QueryConst.Material.elementsKey.pass2Photo+','
        +QueryConst.Material.elementsKey.stock   +')';
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
        +QueryConst.MaterialPhotoRelation.elementsKey.materialId+','
        +QueryConst.MaterialPhotoRelation.elementsKey.PhotoId+')';
    let QueryText = QueryConst.InsertQuery
    +QueryConst.MaterialPhotoRelation.tablename
    +items+QueryConst.values+'(?,?)';
        db.transaction(tx => {
            tx.executeSql(
              QueryText,
              [InsertItem.name,InsertItem.pass2Photo,InsertItem.stock],
              (_, { rowsAffected }) => {
                if (rowsAffected > 0) {
                  console.log('Data Inserted MaterialPhotoRelation');
                }else{
                    console.log('erro'+QueryText);
                }
              }
            );
        }
    );
}
export function insert_photo(InsertItem){
  console.log("insert_photo");
    let items = '('
        +QueryConst.Photo.elementsKey.name+','
        +QueryConst.Photo.elementsKey.ratitude+','
        +QueryConst.Photo.elementsKey.longitude+','
        +QueryConst.Photo.elementsKey.pass2Photo+','
        +QueryConst.Photo.elementsKey.visited+')';
    let QueryText = QueryConst.InsertQuery
    +QueryConst.Photo.tablename
    +items+QueryConst.values+'(?,?,?,?,?)';
        db.transaction(tx => {
            tx.executeSql(
              QueryText,
              [InsertItem.name,InsertItem.ratitude,InsertItem.longitude,InsertItem.pass2Photo,InsertItem.visited],
              (_, { rowsAffected }) => {
                if (rowsAffected > 0) {
                  console.log('データが正常に挿入されました');
                } else {
                  console.log('データの挿入に失敗しました');
                }
              },
              (_, error) => {
                console.error('INSERTエラー:', error);
              }
            );
        }
    );
}
//###end insert
//###start Update
export function update_item(Table,updateItemItem){
  console.log("update_item:name:"+Table);
  switch (Table){
    case QueryConst.Badge.tablename://1
      update_badge(updateItemItem);
      break;
    case QueryConst.Meal.tablename://2
      console.log(QueryConst.Meal.tablename);
      update_meal(updateItemItem);
      break;
    case QueryConst.MealStatus.tablename://3
      update_meal_status(updateItemItem);
      break;
    case QueryConst.RecipeDetail.tablename://4
      update_recipe_detail(updateItemItem);
      break;
    case QueryConst.Material.tablename://5
      update_material(updateItemItem);
      break;
    case QueryConst.MaterialPhotoRelation.tablename://6
      update_material_photo_relation(updateItemItem);
      break;
    case QueryConst.Photo.tablename://7
      update_photo(updateItemItem);
      break;
    default:
  }
}

export function update_badge(updateItem){
  //console.log("elements:"+QueryConst.Badge.elementsKey.name+":"+QueryConst.Badge.elementsKey.isHave+":"+QueryConst.Badge.elementsKey.pass2Photo);
  let items  = QueryConst.Badge.elementsKey.name+" = ?,"+QueryConst.Badge.elementsKey.isHave+" = ?,"+QueryConst.Badge.elementsKey.pass2Photo+" = ?";
  let QueryText = QueryConst.UpdateQuery
    + QueryConst.Badge.tablename
    + QueryConst.Set
    + items
    + QueryConst.WhereId;
    console.log(QueryText,updateItem.name, updateItem.isHave, updateItem.pass2Photo,updateItem.id);
    db.transaction(tx => {
        tx.executeSql(
          QueryText,
          [updateItem.name, updateItem.isHave, updateItem.pass2Photo,updateItem.id],
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

export function update_meal(updateItem){
    let items = 
    QueryConst.Meal.elementsKey.recipeId+" = ?,"
        +QueryConst.Meal.elementsKey.badthId+" = ?,"
        +QueryConst.Meal.elementsKey.mealStatusId+" = ?,"
        +QueryConst.Meal.elementsKey.pass2Photo + " = ?";
        let QueryText = QueryConst.UpdateQuery
        + QueryConst.Meal.tablename
        + QueryConst.Set
        + items
        + QueryConst.WhereId;
      console.log(QueryText,updateItem.recipeId,updateItem.badthId,updateItem.mealStatusId,updateItem.pass2Photo, updateItem.id);
    db.transaction(tx => {
      tx.executeSql(
              QueryText,
              [updateItem.recipeId,updateItem.badthId,updateItem.mealStatusId,updateItem.pass2Photo, updateItem.id],
              (_, { rowsAffected }) => {
                if (rowsAffected > 0) {
                  console.log('Data updateed Meal');
                }else{
                    console.log('erro up meal'+QueryText);
                }
              },
              (_, error) => {
                // エラー時の処理
                console.error('データの挿入中にエラーが発生しました:', error);
              }
            );
        }
    );
}

export function update_meal_status(updateItem){
    let items = 
    QueryConst.MealStatus.elementsKey.locked+' = ?,'
    +QueryConst.MealStatus.elementsKey.cooked+' = ?';
    let QueryText = QueryConst.UpdateQuery
        + QueryConst.MealStatus.tablename
        + QueryConst.Set
        + items
        + QueryConst.WhereId;
        console.log(QueryText,updateItem.locked,updateItem.cooked,updateItem.id);
        db.transaction(tx => {
            tx.executeSql(
              QueryText,
              [updateItem.locked,updateItem.cooked,updateItem.id],
              (_, { rowsAffected }) => {
                if (rowsAffected > 0) {
                  console.log('Data updateed MealStatus');
                }else{
                    console.log('erro'+QueryText);
                }
              },
              (_, error) => {
                // エラー時の処理
                console.error('データの挿入中にエラーが発生しました:', error);
              }
            );
        }
    );
}

export function update_recipe_detail(updateItem){
    let items = 
    QueryConst.RecipeDetail.elementsKey.materialId  +' = ?,'
    +QueryConst.RecipeDetail.elementsKey.needNum    +' = ?';
    let QueryText = QueryConst.UpdateQuery
        + QueryConst.RecipeDetail.tablename
        + QueryConst.Set
        + items
        + QueryConst.WhereId;
    console.log(QueryText,updateItem.materialId,updateItem.needNum,updateItem.needNum,updateItem.id);
        db.transaction(tx => {
            tx.executeSql(
              QueryText,
              [updateItem.materialId,updateItem.needNum,updateItem.needNum,updateItem.id],
              (_, { rowsAffected }) => {
                if (rowsAffected > 0) {
                  console.log('Data updateed RecipeDetail');
                }else{
                    console.log('erro'+QueryText);
                }
              }
            );
        }
    );
}

export function update_material(updateItem){
    let items = 
        QueryConst.Material.elementsKey.name+' = ?,'
        +QueryConst.Material.elementsKey.pass2Photo+' = ?,'
        +QueryConst.Material.elementsKey.stock   +' = ?';
        let QueryText = QueryConst.UpdateQuery
        + QueryConst.RecipeDetail.tablename
        + QueryConst.Set
        + items
        + QueryConst.WhereId;
    console.log(QueryText,updateItem.name,updateItem.pass2Photo,updateItem.stock,updateItem.id);
        db.transaction(tx => {
            tx.executeSql(
              QueryText,
              [updateItem.name,updateItem.pass2Photo,updateItem.stock,updateItem.id],
              (_, { rowsAffected }) => {
                if (rowsAffected > 0) {
                  console.log('Data updateed Material');
                }else{
                    console.log('erro'+QueryText);
                }
              }
            );
    });
}

export function update_material_photo_relation(updateItem){
    let items = '('
        +QueryConst.MaterialPhotoRelation.elementsKey.materialId+','
        +QueryConst.MaterialPhotoRelation.elementsKey.PhotoId+')';
    let QueryText = QueryConst.updateQuery
    +QueryConst.MaterialPhotoRelation.tablename
    +items+QueryConst.values+'(?,?)';
        db.transaction(tx => {
            tx.executeSql(
              QueryText,
              [updateItem.name,updateItem.pass2Photo,updateItem.stock],
              (_, { rowsAffected }) => {
                if (rowsAffected > 0) {
                  console.log('Data updateed MaterialPhotoRelation');
                }else{
                    console.log('erro'+QueryText);
                }
              }
            );
        }
    );
}

export function update_photo(updateItem){
  console.log("update_photo");
    let items =
        QueryConst.Photo.elementsKey.name+' = ?,'
        +QueryConst.Photo.elementsKey.ratitude+' = ?,'
        +QueryConst.Photo.elementsKey.longitude+' = ?,'
        +QueryConst.Photo.elementsKey.pass2Photo+' = ?,'
        +QueryConst.Photo.elementsKey.visited+' = ?';
        let QueryText = QueryConst.UpdateQuery
        + QueryConst.Photo.tablename
        + QueryConst.Set
        + items
        + QueryConst.WhereId;
    console.log(QueryText,updateItem.name,updateItem.ratitude,updateItem.longitude,updateItem.pass2Photo,updateItem.visited,updateItem.id);
        db.transaction(tx => {
            tx.executeSql(
              QueryText,
              [updateItem.name,updateItem.ratitude,updateItem.longitude,updateItem.pass2Photo,updateItem.visited,updateItem.id],
              (_, { rowsAffected }) => {
                if (rowsAffected > 0) {
                  console.log('データが正常に挿入されました');
                } else {
                  console.log('データの挿入に失敗しました');
                }
              },
              (_, error) => {
                console.error('updateエラー:', error);
              }
            );
        }
    );
}
//###end Update
//###start get recode;
function fetchDataFromDb(Tablename,offset,limit,DecOrAsc,sortkey){
  let QueryText = QueryConst.getRecodeQuery + Tablename 
  + QueryConst.OrderByQuery+sortkey+DecOrAsc
  + QueryConst.Limit+limit+QueryConst.Offset+offset
  + ";";
  console.log(QueryText);
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        QueryText,
        [],
        (_, { rows }) => {
          resolve(rows._array);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

// データを取得して戻り値として返す関数
export async function fetchData(Tablename,...args){
  // 関数を呼び出してデータを取得し、結果を処理する
  if(args.length>0){offset = args[0];}  else{offset = QueryConst.OffsetDefault;};
  if(args.length>1){limit = args[1];}   else{limit = QueryConst.LimitDefault;};
  if(args.length>2){isdesc = args[2];}  else{isdesc = true;};
  if(args.length>3){sortkey = args[3];} else{
    sortkey = QueryConst.PrimaryKey;
    if(Tablename == QueryConst.MaterialPhotoRelation.tablename)
    {sortkey = QueryConst.MaterialPhotoRelation.elementsKey.materialId;}
  };
  DecOrAsc = isdesc ? QueryConst.Descending_order : QueryConst.Ascending_order;
  
  try {
    const result = await fetchDataFromDb(Tablename,offset,limit,DecOrAsc,sortkey); // fetchData関数の実行結果を待ち受ける
    //console.log('Data:', result); // 取得したデータを出力
    return result; // 非同期処理の結果を戻り値として返す
  } catch (error) {
    console.error('Error:', error); // エラーが発生した場合はエラーメッセージを出力
    throw error; // エラーを再度スローする（上位のコードでキャッチされる）
  }
}

// データをJSON形式で取得する関数
function fetchDataAsJsonFromDb(Tablename,offset,limit,DecOrAsc,sortkey){
  let QueryText = QueryConst.getRecodeQuery + Tablename 
  + QueryConst.OrderByQuery+sortkey+DecOrAsc
  + QueryConst.Limit+limit+QueryConst.Offset+offset
  + ";";  
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        QueryText,
        [],
        (_, { rows }) => {
          const data = rows._array.map(row => {
            const jsonData = {};
            for (let key in row) {
              // キー名が'length'や'__proto__'のような不要なものを除外
              if (!['_array', '_raw'].includes(key)) {
                jsonData[key] = row[key];
              }
            }
            return jsonData;
          });
          resolve(data);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};
//Need(Tablename:string),Option(offset:int default 0,limit:int default 100,isDec:boolean default true,sortkey:Decault PrimaryKey(id))
export async function fetchDataAsJson(Tablename,...args){
  // 関数を呼び出してデータを取得し、結果を処理する
  if(args.length>0){offset = args[0];}else{offset = QueryConst.OffsetDefault;};
  if(args.length>1){limit = args[1];}else{limit = QueryConst.LimitDefault;};
  if(args.length>2){isdesc = args[2];}else{isdesc = true;};
  if(args.length>3){sortkey = args[3];}else{sortkey = QueryConst.PrimaryKey;
    if(Tablename == QueryConst.MaterialPhotoRelation.tablename)
    {sortkey = QueryConst.MaterialPhotoRelation.elementsKey.materialId;}
  };
  DecOrAsc = isdesc ? QueryConst.Descending_order : QueryConst.Ascending_order;
  try {
    const result = await fetchDataAsJsonFromDb(Tablename,offset,limit,DecOrAsc,sortkey); // fetchData関数の実行結果を待ち受ける
    //console.log('Data:', result); // 取得したデータを出力
    return result; // 非同期処理の結果を戻り値として返す
  } catch (error) {
    console.error('Error:', error); // エラーが発生した場合はエラーメッセージを出力
    throw error; // エラーを再度スローする（上位のコードでキャッチされる）
  } 
}
//###end get recode;

//###Start Select
function SelectDataFromDb(QueryText){
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        QueryText,
        [],
        (_, { rows }) => {
          const data = rows._array.map(row => {
            const jsonData = {};
            for (let key in row) {
              // キー名が'length'や'__proto__'のような不要なものを除外
              if (!['_array', '_raw'].includes(key)) {
                jsonData[key] = row[key];
              }
            }
            return jsonData;
          });
          resolve(data);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};
//Need(Tablename:string),Option(if aegs.lengsh == 1,use Primary Key,aegs.lengsh > 1,use (key:relational operators:val) logical operators (key:relational operators:val))
export async function SelectData(Tablename,...args){
  // 関数を呼び出してデータを取得し、結果を処理する
  
  let WHERETEXT="";
  for(i=0;i<args.length;i++){
    WHERETEXT = args[i];
  }
  let QueryText = QueryConst.getRecodeQuery + Tablename 
  + QueryConst.OrderByQuery+sortkey+DecOrAsc
  + QueryConst.Limit+limit+QueryConst.Offset+offset
  + ";";  
  try {
    const result = await Selectdata(QueryText); // fetchData関数の実行結果を待ち受ける
    //console.log('Data:', result); // 取得したデータを出力
    return result; // 非同期処理の結果を戻り値として返す
  } catch (error) {
    console.error('Error:', error); // エラーが発生した場合はエラーメッセージを出力
    throw error; // エラーを再度スローする（上位のコードでキャッチされる）
  } 
}
//###end get recode;

export function DropAllTable(){
   console.log(QueryConst.DropTableQuery + QueryConst.Badge.tablename+';');
   console.log(QueryConst.DropTableQuery + QueryConst.Meal.tablename+';');
   console.log(QueryConst.DropTableQuery + QueryConst.MealStatus.tablename+';');
   console.log(QueryConst.DropTableQuery + QueryConst.RecipeDetail.tablename+';');
   console.log(QueryConst.DropTableQuery + QueryConst.Material.tablename+';');
   console.log(QueryConst.DropTableQuery + QueryConst.MaterialPhotoRelation.tablename+';');
   console.log(QueryConst.DropTableQuery + QueryConst.Photo.tablename+';');
   db.transaction(tx => {
    tx.executeSql(QueryConst.DropTableQuery + QueryConst.Badge.tablename+';',
            [],
            (_, result) => {
              // 成功時の処理
              console.log('テーブルが削除されました');
            },
            (_, error) => {
              // エラー時の処理
              console.error('テーブルの削除中にエラーが発生しました:', error);
            }
        );});
        db.transaction(tx => {tx.executeSql(QueryConst.DropTableQuery + QueryConst.Meal.tablename+';'); });
        db.transaction(tx => {tx.executeSql(QueryConst.DropTableQuery + QueryConst.MealStatus.tablename+';'); });
        db.transaction(tx => {tx.executeSql(QueryConst.DropTableQuery + QueryConst.RecipeDetail.tablename+';'); });
        db.transaction(tx => {tx.executeSql(QueryConst.DropTableQuery + QueryConst.Material.tablename+';'); });
        db.transaction(tx => {tx.executeSql(QueryConst.DropTableQuery + QueryConst.MaterialPhotoRelation.tablename+';'); });
        db.transaction(tx => {tx.executeSql(QueryConst.DropTableQuery + QueryConst.Photo.tablename+';'); });
    return;
}

export const getTables = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT name FROM sqlite_master WHERE type="table"',
        [],
        (_, { rows }) => {
          const tables = rows._array.map(row => row.name);
          resolve(tables);
        },
        error => {
          reject(error);
        }
      );
    });
  });
};