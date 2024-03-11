import * as SQLite from "expo-sqlite";
import * as QueryConst from "./databaseQueryText";
import * as InitDB from "./dataBaseInit";
// データベースを作成またはオープン
const db = SQLite.openDatabase("database.db");
//### start First Start Init DB
export function CreateAndInitTableIfNotExist() {
  // アプリの起動時にデータベースの存在を確認
  if(QueryConst.debugDataBaseLevel>=1){console.log("CreateAndInitTableIfNotExist")};
  db.transaction((tx) => {
    tx.executeSql(
      'SELECT name FROM sqlite_master WHERE type="table";',
      [],
      (_, { rows }) => {
        console.log();
        // テーブルが存在しない場合はInitDatabaseTable()を呼び出す
        if (rows.length <= 3) {
          if(QueryConst.debugDataBaseLevel>=2){
            console.log("Exist sqlite_master");  
          }
          InitDatabaseTable();
        }
      },
      (_, error) => {
        // エラー時の処理
        if(QueryConst.debugDataBaseLevel>=2){
          console.log("No sqlite_master");
        }
        InitDatabaseTable();
      }
    );
  });
}

//### end First Start Init DB
export function CreateAllTable() {
  db.transaction((tx) => {
    tx.executeSql(QueryConst.createTableBadge);
  });
  db.transaction((tx) => {
    tx.executeSql(QueryConst.createTableMaterial);
  });
  db.transaction((tx) => {
    tx.executeSql(QueryConst.createTableMaterialPhotoRelation);
  });
  db.transaction((tx) => {
    tx.executeSql(QueryConst.createTableMeal);
  });
  db.transaction((tx) => {
    tx.executeSql(QueryConst.createTableMeal_Status);
  });
  db.transaction((tx) => {
    tx.executeSql(QueryConst.createTablePhoto);
  });
  db.transaction((tx) => {
    tx.executeSql(QueryConst.createTableRecipe_Detail);
  });
  if (QueryConst.debugDataBaseLevel > 0) {
    console.log(QueryConst.createTableBadge);
    console.log(QueryConst.createTableMaterial);
    console.log(QueryConst.createTableMaterialPhotoRelation);
    console.log(QueryConst.createTableMeal);
    console.log(QueryConst.createTableMeal_Status);
    console.log(QueryConst.createTablePhoto);
    console.log(QueryConst.createTableRecipe_Detail);
  }
}

//###start Read Excel data
export function InitDatabaseTable() {
  DropAllTable();
  CreateAllTable();
  //1Badge
  for (i = 0; i < InitDB.Badge.length; i++) {
    InsertItem = InitDB.Badge[i];
    insert_item(QueryConst.Badge.tablename, InsertItem);
  }
  //2
  for (i = 0; i < InitDB.MealStatus.length; i++) {
    InsertItem = InitDB.MealStatus[i];
    insert_item(QueryConst.MealStatus.tablename, InsertItem);
  }
  //3
  for (i = 0; i < InitDB.Meal.length; i++) {
    InsertItem = InitDB.Meal[i];
    insert_item(QueryConst.Meal.tablename, InsertItem);
  }
  //4
  for (i = 0; i < InitDB.Material.length; i++) {
    InsertItem = InitDB.Material[i];
    insert_item(QueryConst.Material.tablename, InsertItem);
  }
  //5

  for (i = 0; i < InitDB.RecipeDetail.length; i++) {
    InsertItem = InitDB.RecipeDetail[i];
    insert_item(QueryConst.RecipeDetail.tablename, InsertItem);
  }
  //6
  for (i = 0; i < InitDB.MaterialPhotoRelation.length; i++) {
    InsertItem = InitDB.MaterialPhotoRelation[i];
    insert_item(QueryConst.MaterialPhotoRelation.tablename, InsertItem);
  }
  //7
  for (i = 0; i < InitDB.Photo.length; i++) {
    InsertItem = InitDB.Photo[i];
    insert_item(QueryConst.Photo.tablename, InsertItem);
  }
}
//###end Read Excel data

//###start insert
export async function insert_item(Table, InsertItemItem) {
  if (QueryConst.debugDataBaseLevel > 0) {
    console.log("insert_item:name:" + Table);
  }
  switch (Table) {
    case QueryConst.Badge.tablename: //1
      try {
        const lastInsertedId = await insert_badge(InsertItemItem);
        if (QueryConst.debugDataBaseLevel > 0) {
          console.log("Last inserted ID:", lastInsertedId);
        }
        return lastInsertedId;
        // ここでlastInsertedIdを使用する
      } catch (error) {
        console.error("Error inserting and getting ID:", error);
        return -1;
      }
      break;
    case QueryConst.Meal.tablename: //2
      if (QueryConst.debugDataBaseLevel > 0) {
        console.log("insert " + QueryConst.Meal.tablename);
      }
      try {
        const lastInsertedId = await insert_meal(InsertItemItem);
        if (QueryConst.debugDataBaseLevel > 0) {
          console.log("Last inserted ID:", lastInsertedId);
        }
        return lastInsertedId;
        // ここでlastInsertedIdを使用する
      } catch (error) {
        console.error("Error inserting and getting ID:", error);
        return -1;
      }
      break;
    case QueryConst.MealStatus.tablename: //3
      if (QueryConst.debugDataBaseLevel > 0) {
        console.log("insert " + QueryConst.MealStatus.tablename);
      }
      try {
        const lastInsertedId = await insert_meal_status(InsertItemItem);
        if (QueryConst.debugDataBaseLevel > 0) {
          console.log("Last inserted ID:", lastInsertedId);
        }
        return lastInsertedId;
        // ここでlastInsertedIdを使用する
      } catch (error) {
        console.error("Error inserting and getting ID:", error);
        return -1;
      }
      break;
    case QueryConst.RecipeDetail.tablename: //4
      if (QueryConst.debugDataBaseLevel > 0) {
        console.log("insert " + QueryConst.RecipeDetail.tablename);
      }
      try {
        const lastInsertedId = await insert_recipe_detail(InsertItemItem);
        if (QueryConst.debugDataBaseLevel > 0) {
          console.log("Last inserted ID:", lastInsertedId);
        }
        return lastInsertedId;
        // ここでlastInsertedIdを使用する
      } catch (error) {
        console.error("Error inserting and getting ID:", error);
        return -1;
      }
      break;
    case QueryConst.Material.tablename: //5
      if (QueryConst.debugDataBaseLevel > 0) {
        console.log("insert " + QueryConst.Material.tablename);
      }
      try {
        const lastInsertedId = await insert_material(InsertItemItem);
        if (QueryConst.debugDataBaseLevel > 0) {
          console.log("Last inserted ID:", lastInsertedId);
        }
        return lastInsertedId;
        // ここでlastInsertedIdを使用する
      } catch (error) {
        console.error("Error inserting and getting ID:", error);
        return -1;
      }
      break;
    case QueryConst.MaterialPhotoRelation.tablename: //6
      if (QueryConst.debugDataBaseLevel > 0) {
        console.log("insert " + QueryConst.MaterialPhotoRelation.tablename);
      }
      try {
        const lastInsertedId = await insert_material_photo_relation(
          InsertItemItem
        );
        if (QueryConst.debugDataBaseLevel > 0) {
          console.log("Last inserted ID:", lastInsertedId);
        }
        return lastInsertedId;
        // ここでlastInsertedIdを使用する
      } catch (error) {
        console.error("Error inserting and getting ID:", error);
        return -1;
      }
      break;
    case QueryConst.Photo.tablename: //7
      if (QueryConst.debugDataBaseLevel > 0) {
        console.log("insert " + QueryConst.Photo.tablename);
      }
      try {
        const lastInsertedId = await insert_photo(InsertItemItem);
        if (QueryConst.debugDataBaseLevel > 0) {
          console.log("Last inserted ID:", lastInsertedId);
        }
        return lastInsertedId;
        // ここでlastInsertedIdを使用する
      } catch (error) {
        console.error("Error inserting and getting ID:", error);
        return -1;
      }
      break;
    default:
      console.warn("table name error:" + tablename);
  }
}

function insert_badge(InsertItem) {
  let items =
    " (" +
    QueryConst.Badge.elementsKey.name +
    "," +
    QueryConst.Badge.elementsKey.isHave +
    "," +
    QueryConst.Badge.elementsKey.pass2Photo +
    ")";
  let QueryText =
    QueryConst.InsertQuery +
    QueryConst.Badge.tablename +
    items +
    QueryConst.values +
    "(?, ?, ?)";

  if (QueryText.debugDataBaseLevel > 0) {
    console.log(
      QueryText + InsertItem.name + InsertItem.isHave + InsertItem.pass2Photo
    );
  }
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        QueryText,
        [InsertItem.name, InsertItem.isHave, InsertItem.pass2Photo],
        (_, result) => {
          // 成功時の処理
          const lastInsertedId = result.insertId;
          resolve(lastInsertedId);
          if (QueryConst.debugDataBaseLevel > 1) {
            console.log("Data Inserted badge id:" + lastInsertedId);
          }
        },
        (_, error) => {
          // エラー時の処理
          console.error("Insert error", error);
        }
      );
    });
  });
}

function insert_meal(InsertItem) {
  let items =
    "(" +
    QueryConst.Meal.elementsKey.badgeId +
    "," +
    QueryConst.Meal.elementsKey.mealStatusId +
    "," +
    QueryConst.Meal.elementsKey.pass2Photo +
    "," +
    QueryConst.Meal.elementsKey.name +
    ")";
  let QueryText =
    QueryConst.InsertQuery +
    QueryConst.Meal.tablename +
    items +
    QueryConst.values +
    "(?,?,?,?)";
  if (QueryConst.debugDataBaseLevel > 0) {
    console.log(QueryText);
  }
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        QueryText,
        [
          InsertItem.badgeId,
          InsertItem.mealStatusId,
          InsertItem.pass2Photo,
          InsertItem.name,
        ],
        (_, result) => {
          // 成功時の処理
          const lastInsertedId = result.insertId;
          resolve(lastInsertedId);
          if (QueryConst.debugDataBaseLevel > 1) {
            console.log("Data Inserted meal id:" + lastInsertedId);
          }
        },
        (_, error) => {
          console.error("Insert meal error", error);
        }
      );
    });
  });
}

function insert_meal_status(InsertItem) {
  let items =
    "(" +
    QueryConst.MealStatus.elementsKey.locked +
    "," +
    QueryConst.MealStatus.elementsKey.cooked +
    ")";
  let QueryText =
    QueryConst.InsertQuery +
    QueryConst.MealStatus.tablename +
    items +
    QueryConst.values +
    "(?,?)";
    if(QueryConst.debugDataBaseLevel>0){console.log(QueryText);}
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        QueryText,
        [InsertItem.locked, InsertItem.cooked],
        (_, result) => {
          // 成功時の処理
          const lastInsertedId = result.insertId;
          resolve(lastInsertedId);
          if (QueryConst.debugDataBaseLevel > 1) {
            console.log("Data Inserted MealStatus id:" + lastInsertedId);
          }
        },
        (_, error) => {
          console.error("error", error);
        }
      );
    });
  });
}

function insert_recipe_detail(InsertItem) {
  let items =
    "(" +
    QueryConst.RecipeDetail.elementsKey.mealId +
    "," +
    QueryConst.RecipeDetail.elementsKey.materialId +
    "," +
    QueryConst.RecipeDetail.elementsKey.needNum +
    ")";
  let QueryText =
    QueryConst.InsertQuery +
    QueryConst.RecipeDetail.tablename +
    items +
    QueryConst.values +
    "(?,?,?)";
    if(QueryConst.debugDataBaseLevel>0){console.log(QueryText);}
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        QueryText,
        [InsertItem.mealId,InsertItem.materialId, InsertItem.needNum],
        (_, result) => {
          // 成功時の処理
          const lastInsertedId = result.insertId;
          resolve(lastInsertedId);
          if (QueryConst.debugDataBaseLevel > 1) {
            console.log("Data Inserted RecipeDetail id:" + lastInsertedId);
          }
        },
        (_, error) => {
          console.error("error recipe insert", error);
        }
      );
    });
  });
}

function insert_material(InsertItem) {
  let items =
    "(" +
    QueryConst.Material.elementsKey.name +
    "," +
    QueryConst.Material.elementsKey.pass2Photo +
    "," +
    QueryConst.Material.elementsKey.stock +
    "," +
    QueryConst.Material.elementsKey.colorId +
    ")";
  let QueryText =
    QueryConst.InsertQuery +
    QueryConst.Material.tablename +
    items +
    QueryConst.values +
    "(?,?,?,?)";
    if(QueryConst.debugDataBaseLevel>0){console.log(QueryText);}
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        QueryText,
        [InsertItem.name, InsertItem.pass2Photo, InsertItem.stock,InsertItem.colorId],
        (_, result) => {
          // 成功時の処理
          const lastInsertedId = result.insertId;
          resolve(lastInsertedId);
          if (QueryConst.debugDataBaseLevel > 1) {
            console.log("Data Inserted Material id:" + lastInsertedId);
          }
        },
        (_, error) => {
          console.error("error", error);
        }
      );
    });
  });
}

function insert_material_photo_relation(InsertItem) {
  let items =
    "(" +
    QueryConst.MaterialPhotoRelation.elementsKey.materialId +
    "," +
    QueryConst.MaterialPhotoRelation.elementsKey.photoId +
    ")";
  let QueryText =
    QueryConst.InsertQuery +
    QueryConst.MaterialPhotoRelation.tablename +
    items +
    QueryConst.values +
    "(?,?)";
    if(QueryConst.debugDataBaseLevel>0){console.log(QueryText);}
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        QueryText,
        [InsertItem.materialId, InsertItem.photoId],
        (_, result) => {
          // 成功時の処理
          const lastInsertedId = result.insertId;
          resolve(lastInsertedId);
          if (QueryConst.debugDataBaseLevel > 1) {
            console.log(
              "Data Inserted MaterialPhotoRelation id:" + lastInsertedId
            );
          }
        },
        (_, error) => {
          console.error("error", error);
        }
      );
    });
  });
}
function insert_photo(InsertItem) {
  console.log("insert_photo");
  let items =
    "(" +
    QueryConst.Photo.elementsKey.name +
    "," +
    QueryConst.Photo.elementsKey.ratitude +
    "," +
    QueryConst.Photo.elementsKey.longitude +
    "," +
    QueryConst.Photo.elementsKey.pass2Photo +
    "," +
    QueryConst.Photo.elementsKey.visited +
    ")";
  let QueryText =
    QueryConst.InsertQuery +
    QueryConst.Photo.tablename +
    items +
    QueryConst.values +
    "(?,?,?,?,?)";
    if(QueryConst.debugDataBaseLevel>0){console.log(QueryText);}
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        QueryText,
        [
          InsertItem.name,
          InsertItem.ratitude,
          InsertItem.longitude,
          InsertItem.pass2Photo,
          InsertItem.visited,
        ],
        (_, result) => {
          // 成功時の処理
          const lastInsertedId = result.insertId;
          resolve(lastInsertedId);
          if (QueryConst.debugDataBaseLevel > 1) {
            console.log("Data Inserted Photo id:" + lastInsertedId);
          }
        },
        (_, error) => {
          console.error("error", error);
        }
      );
    });
  });
}
//###end insert

//###start Update
export function update_item(Table, updateItemItem) {
  if (QueryConst.debugDataBaseLevel > 0) {
    console.log("update_item:name:" + Table);
  }
  switch (Table) {
    case QueryConst.Badge.tablename: //1
      update_badge(updateItemItem);
      break;
    case QueryConst.Meal.tablename: //2
      console.log(QueryConst.Meal.tablename);
      update_meal(updateItemItem);
      break;
    case QueryConst.MealStatus.tablename: //3
      update_meal_status(updateItemItem);
      break;
    case QueryConst.RecipeDetail.tablename: //4
      update_recipe_detail(updateItemItem);
      break;
    case QueryConst.Material.tablename: //5
      update_material(updateItemItem);
      break;
    case QueryConst.MaterialPhotoRelation.tablename: //6
      update_material_photo_relation(updateItemItem);
      break;
    case QueryConst.Photo.tablename: //7
      update_photo(updateItemItem);
      break;
    default:
      console.warn("table name error:" + tablename);
  }
}

export function update_badge(updateItem) {
  //console.log("elements:"+QueryConst.Badge.elementsKey.name+":"+QueryConst.Badge.elementsKey.isHave+":"+QueryConst.Badge.elementsKey.pass2Photo);
  let items =
    QueryConst.Badge.elementsKey.name +
    " = ?," +
    QueryConst.Badge.elementsKey.isHave +
    " = ?," +
    QueryConst.Badge.elementsKey.pass2Photo +
    " = ?";
  let QueryText =
    QueryConst.UpdateQuery +
    QueryConst.Badge.tablename +
    QueryConst.Set +
    items +
    QueryConst.WhereId;
  if (QueryConst.debugDataBaseLevel > 0) {
    console.log(
      QueryText,
      updateItem.name,
      updateItem.isHave,
      updateItem.pass2Photo,
      updateItem.id
    );
  }
  db.transaction((tx) => {
    tx.executeSql(
      QueryText,
      [
        updateItem.name,
        updateItem.isHave,
        updateItem.pass2Photo,
        updateItem.id,
      ],
      (_, { rowsAffected }) => {
        if (rowsAffected > 0) {
          if (QueryConst.debugDataBaseLevel > 1) {
            console.log("Data updated Badge");
          }
        } else {
          console.log("erro update Badge" + QueryText);
        }
      },
      (_, error) => {
        // エラー時の処理
        console.error("update erro", error);
      }
    );
  });
}

export function update_meal(updateItem) {
  let items =
    QueryConst.Meal.elementsKey.badgeId +
    " = ?," +
    QueryConst.Meal.elementsKey.mealStatusId +
    " = ?," +
    QueryConst.Meal.elementsKey.pass2Photo +
    " = ?," +
    QueryConst.Meal.elementsKey.name +
    " = ?";
  let QueryText =
    QueryConst.UpdateQuery +
    QueryConst.Meal.tablename +
    QueryConst.Set +
    items +
    QueryConst.WhereId;
  if (QueryConst.debugDataBaseLevel > 0) {
    console.log(
      QueryText,
      updateItem.badgeId,
      updateItem.mealStatusId,
      updateItem.pass2Photo,
      updateItem.name,
      updateItem.id
    );
  }
  db.transaction((tx) => {
    tx.executeSql(
      QueryText,
      [
        updateItem.badgeId,
        updateItem.mealStatusId,
        updateItem.pass2Photo,
        updateItem.name,
        updateItem.id,
      ],
      (_, { rowsAffected }) => {
        if (rowsAffected > 0) {
          if (QueryConst.debugDataBaseLevel > 1) {
            console.log("Data updated Meal");
          }
        } else {
          console.log("erro up meal" + QueryText);
        }
      },
      (_, error) => {
        // エラー時の処理
        console.error("update erro", error);
      }
    );
  });
}

export function update_meal_status(updateItem) {
  let items =
    QueryConst.MealStatus.elementsKey.locked +
    " = ?," +
    QueryConst.MealStatus.elementsKey.cooked +
    " = ?";
  let QueryText =
    QueryConst.UpdateQuery +
    QueryConst.MealStatus.tablename +
    QueryConst.Set +
    items +
    QueryConst.WhereId;
  if (QueryConst.debugDataBaseLevel > 0) {
    console.log(QueryText, updateItem.locked, updateItem.cooked, updateItem.id);
  }
  db.transaction((tx) => {
    tx.executeSql(
      QueryText,
      [updateItem.locked, updateItem.cooked, updateItem.id],
      (_, { rowsAffected }) => {
        if (rowsAffected > 0) {
          if (QueryConst.debugDataBaseLevel > 1) {
            console.log("Data updated MealStatus");
          }
        } else {
          console.log("erro updated MealStatus" + QueryText);
        }
      },
      (_, error) => {
        // エラー時の処理
        console.error("update erro", error);
      }
    );
  });
}

export function update_recipe_detail(updateItem) {
  let items =
    "(" +
    QueryConst.RecipeDetail.elementsKey.mealId +
    "," +
    QueryConst.RecipeDetail.elementsKey.materialId +
    "," +
    QueryConst.RecipeDetail.elementsKey.needNum +
    ")";
  let QueryText =
    QueryConst.InsertQuery +
    QueryConst.RecipeDetail.tablename +
    items +
    QueryConst.values +
    "(?,?,?)";
    if(QueryConst.debugDataBaseLevel>0){console.log(QueryText);}
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        QueryText,
        [InsertItem.mealId,InsertItem.materialId, InsertItem.needNum],
        (_, result) => {
          // 成功時の処理
          const lastInsertedId = result.insertId;
          resolve(lastInsertedId);
          if (QueryConst.debugDataBaseLevel > 1) {
            console.log("Data Inserted RecipeDetail id:" + lastInsertedId);
          }
        },
        (_, error) => {
          console.error("error recipe insert", error);
        }
      );
    });
  });
}

export function update_material(updateItem) {
  let items =
    QueryConst.Material.elementsKey.name +
    " = ?," +
    QueryConst.Material.elementsKey.pass2Photo +
    " = ?," +
    QueryConst.Material.elementsKey.stock +
    " = ?," +
    QueryConst.Material.elementsKey.colorId +
    " = ?";
  let QueryText =
    QueryConst.UpdateQuery +
    QueryConst.Material.tablename +
    QueryConst.Set +
    items +
    QueryConst.WhereId;
  if (QueryConst.debugDataBaseLevel > 0) {
    console.log(
      QueryText,
      updateItem.name,
      updateItem.pass2Photo,
      updateItem.stock,
      updateItem.colorId,
      updateItem.id
    );
  }
  db.transaction((tx) => {
    tx.executeSql(
      QueryText,
      [updateItem.name, updateItem.pass2Photo, updateItem.stock, updateItem.colorId, updateItem.id],
      (_, { rowsAffected }) => {
        if (rowsAffected > 0) {
          if (QueryConst.debugDataBaseLevel > 1) {
            console.log("Data updateed Material");
          }
        } else {
          console.log("erro updateed Material" + QueryText);
        }
      },
      (_, error) => {
        // エラー時の処理
        //console.log(QueryText,updateItem.name,updateItem.pass2Photo,updateItem.stock,updateItem.id);
        console.error("update erro material", error);
      }
    );
  });
}

export function update_material_photo_relation(updateItem) {
  let items =
    "(" +
    QueryConst.MaterialPhotoRelation.elementsKey.materialId +
    "," +
    QueryConst.MaterialPhotoRelation.elementsKey.photoId +
    ")";
  let QueryText =
    QueryConst.updateQuery +
    QueryConst.MaterialPhotoRelation.tablename +
    items +
    QueryConst.values +
    "(?,?)";
  if (QueryConst.debugDataBaseLevel > 0) {
    console.log(QueryText, updateItem.materialId, updateItem.photoId);
  }
  db.transaction((tx) => {
    tx.executeSql(
      QueryText,
      [updateItem.materialId, updateItem.photoId],
      (_, { rowsAffected }) => {
        if (rowsAffected > 0) {
          console.log("Data updateed MaterialPhotoRelation");
        } else {
          console.log("erro updateed MaterialPhotoRelation" + QueryText);
        }
      },
      (_, error) => {
        // エラー時の処理
        console.error("update erro", error);
      }
    );
  });
}

export function update_photo(updateItem) {
  console.log("update_photo");
  let items =
    QueryConst.Photo.elementsKey.name +
    " = ?," +
    QueryConst.Photo.elementsKey.ratitude +
    " = ?," +
    QueryConst.Photo.elementsKey.longitude +
    " = ?," +
    QueryConst.Photo.elementsKey.pass2Photo +
    " = ?," +
    QueryConst.Photo.elementsKey.visited +
    " = ?";
  let QueryText =
    QueryConst.UpdateQuery +
    QueryConst.Photo.tablename +
    QueryConst.Set +
    items +
    QueryConst.WhereId;
  if (QueryConst.debugDataBaseLevel > 0) {
    console.log(
      QueryText,
      updateItem.name,
      updateItem.ratitude,
      updateItem.longitude,
      updateItem.pass2Photo,
      updateItem.visited,
      updateItem.id
    );
  }
  db.transaction((tx) => {
    tx.executeSql(
      QueryText,
      [
        updateItem.name,
        updateItem.ratitude,
        updateItem.longitude,
        updateItem.pass2Photo,
        updateItem.visited,
        updateItem.id,
      ],
      (_, { rowsAffected }) => {
        if (rowsAffected > 0) {
          console.log("Data Updated Photo");
        } else {
          console.log("error Updated Photo" + QueryText);
        }
      },
      (_, error) => {
        console.error("update erro:", error);
      }
    );
  });
}
//###end Update
//###start get recode;
//実際にDBにアクセスする関数
function fetchDataFromDb(Tablename, offset, limit, DecOrAsc, sortkey) {
  let QueryText =
    QueryConst.getRecodeQuery +
    Tablename +
    QueryConst.OrderByQuery +
    sortkey +
    DecOrAsc +
    QueryConst.Limit +
    limit +
    QueryConst.Offset +
    offset +
    ";";
  if (QueryConst.debugDataBaseLevel > 0) {
    console.log(QueryText);
  }
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
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
}

// データを取得して戻り値として返す関数
//Need(Tablename:string),Option(offset:int default 0,limit:int default 100,isDec:boolean default true,sortkey:Decault PrimaryKey(id))
export async function fetchData(Tablename, ...args) {
  if (args.length > 0) {
    offset = args[0];
  } else {
    offset = QueryConst.OffsetDefault;
  }
  if (args.length > 1) {
    limit = args[1];
  } else {
    limit = QueryConst.LimitDefault;
  }
  if (args.length > 2) {
    isdesc = args[2];
  } else {
    isdesc = true;
  }
  if (args.length > 3) {
    sortkey = args[3];
  } else {
    sortkey = QueryConst.PrimaryKey;
    if (Tablename == QueryConst.RecipeDetail.tablename) {
      sortkey = QueryConst.RecipeDetail.elementsKey.mealId;
    }
    if (Tablename == QueryConst.MaterialPhotoRelation.tablename) {
      sortkey = QueryConst.MaterialPhotoRelation.elementsKey.materialId;
    }
  }
  DecOrAsc = isdesc ? QueryConst.Descending_order : QueryConst.Ascending_order;

  try {
    const result = await fetchDataFromDb(
      Tablename,
      offset,
      limit,
      DecOrAsc,
      sortkey
    ); // fetchData関数の実行結果を待ち受ける
    if (QueryConst.debugDataBaseLevel > 1) {
      console.log("Data:", result);
    } // 取得したデータを出力
    return result; // 非同期処理の結果を戻り値として返す
  } catch (error) {
    console.error("Error:", error); // エラーが発生した場合はエラーメッセージを出力
    throw error; // エラーを再度スローする（上位のコードでキャッチされる）
  }
}

// データをJSON形式で取得する関数
function fetchDataAsJsonFromDb(Tablename, offset, limit, DecOrAsc, sortkey) {
  let QueryText =
    QueryConst.getRecodeQuery +
    Tablename +
    QueryConst.OrderByQuery +
    sortkey +
    DecOrAsc +
    QueryConst.Limit +
    limit +
    QueryConst.Offset +
    offset +
    ";";
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        QueryText,
        [],
        (_, { rows }) => {
          const data = rows._array.map((row) => {
            const jsonData = {};
            for (let key in row) {
              // キー名が'length'や'__proto__'のような不要なものを除外
              if (!["_array", "_raw"].includes(key)) {
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
}
// データを取得して戻り値として返す関数(Json)
//Need(Tablename:string),Option(offset:int default 0,limit:int default 100,isDec:boolean default true,sortkey:Decault PrimaryKey(id))
export async function fetchDataAsJson(Tablename, ...args) {
  if (args.length > 0) {
    offset = args[0];
  } else {
    offset = QueryConst.OffsetDefault;
  }
  if (args.length > 1) {
    limit = args[1];
  } else {
    limit = QueryConst.LimitDefault;
  }
  if (args.length > 2) {
    isdesc = args[2];
  } else {
    isdesc = true;
  }
  if (args.length > 3) {
    sortkey = args[3];
  } else {
    sortkey = QueryConst.PrimaryKey;
    if (Tablename == QueryConst.RecipeDetail.tablename) {
      sortkey = QueryConst.RecipeDetail.elementsKey.mealId;
    }
    if (Tablename == QueryConst.MaterialPhotoRelation.tablename) {
      sortkey = QueryConst.MaterialPhotoRelation.elementsKey.materialId;
    }
  }
  DecOrAsc = isdesc ? QueryConst.Descending_order : QueryConst.Ascending_order;
  try {
    const result = await fetchDataAsJsonFromDb(
      Tablename,
      offset,
      limit,
      DecOrAsc,
      sortkey
    ); // fetchData関数の実行結果を待ち受ける
    if (QueryConst.debugDataBaseLevel > 1) {
      console.log("Data:", result);
    } // 取得したデータを出力
    return result; // 非同期処理の結果を戻り値として返す
  } catch (error) {
    console.error("Error:", error); // エラーが発生した場合はエラーメッセージを出力
    throw error; // エラーを再度スローする（上位のコードでキャッチされる）
  }
}
//###end get recode;

//###Start Select
//select の実行関数
function selectDataFromDb(QueryText) {
  if(QueryConst.debugDataBaseLevel>0){console.log(QueryText);}
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        QueryText,
        [],
        (_, { rows }) => {
          const data = rows._array.map((row) => {
            const jsonData = {};
            for (let key in row) {
              // キー名が'length'や'__proto__'のような不要なものを除外
              if (!["_array", "_raw"].includes(key)) {
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
}
//Idから検索
export async function selectDataById(Tablename, ID) {
  // 関数を呼び出してデータを取得し、結果を処理する
  Key = QueryConst.PrimaryKey;
  if(Tablename == QueryConst.MaterialPhotoRelation.tablename){
    Key = QueryConst.MaterialPhotoRelation.elementsKey.materialId;
  }else if(Tablename == QueryConst.RecipeDetail.tablename){
    Key = QueryConst.RecipeDetail.elementsKey.mealId
  }
  
  let QueryText =
    QueryConst.getRecodeQuery +
    Tablename +
    QueryConst.Where +
    Key +
    QueryConst.RO.Eqqual +
    +ID +
    ";";
  try {
    const result = await selectDataFromDb(QueryText); // fetchData関数の実行結果を待ち受ける
    if (QueryConst.debugDataBaseLevel > 1) {
      console.log("Data:", result);
    } // 取得したデータを出力
    return result; // 非同期処理の結果を戻り値として返す
  } catch (error) {
    console.error(QueryText);
    console.error("Error:", error); // エラーが発生した場合はエラーメッセージを出力
    throw error; // エラーを再度スローする（上位のコードでキャッチされる）
  }
}
//Textをそのまま使用して検索
export async function selectDataByQueryText(QueryText) {
  // 関数を呼び出してデータを取得し、結果を処理する
  try {
    const result = await selectDataFromDb(QueryText); // fetchData関数の実行結果を待ち受ける
    if (QueryConst.debugDataBaseLevel > 1) {
      console.log("Data:", result);
    } // 取得したデータを出力
    return result; // 非同期処理の結果を戻り値として返す
  } catch (error) {
    console.error(QueryText);
    console.error("Error:", error); // エラーが発生した場合はエラーメッセージを出力
    throw error; // エラーを再度スローする（上位のコードでキャッチされる）
  }
}
//自分で条件とKEYを指定しての検索(順序は任意)
//Need(Tablename:string),Option(use (key:relational operators:val) logical operators (key:relational operators:val))
export async function selectData(Tablename, ...args) {
  // 関数を呼び出してデータを取得し、結果を処理する

  let CONDITIONTEXT = QueryConst.Where;
  for (i = 0; i < args.length; i++) {
    CONDITIONTEXT = CONDITIONTEXT + args[i];
  }
  let QueryText =
    QueryConst.getRecodeQuery +
    Tablename +
    CONDITIONTEXT +
    //+ QueryConst.OrderByQuery + QueryConst.PrimaryKey + QueryConst.Descending_order
    ";";
  try {
    const result = await selectDataFromDb(QueryText); // fetchData関数の実行結果を待ち受ける
    if (QueryConst.debugDataBaseLevel > 1) {
      console.log("Data:", result);
    } // 取得したデータを出力
    return result; // 非同期処理の結果を戻り値として返す
  } catch (error) {
    console.error(QueryText);
    console.error("Error:", error); // エラーが発生した場合はエラーメッセージを出力
    throw error; // エラーを再度スローする（上位のコードでキャッチされる）
  }
}

//自分で条件とKEYを指定しての検索：降順
export async function selectDataDesc(Tablename, ...args) {
  // 関数を呼び出してデータを取得し、結果を処理する
  Key = QueryConst.PrimaryKey;
  if(Tablename == QueryConst.MaterialPhotoRelation.tablename){
    Key = QueryConst.MaterialPhotoRelation.elementsKey.materialId;
  }else if(Tablename == QueryConst.RecipeDetail.tablename){
    Key = QueryConst.RecipeDetail.elementsKey.mealId;
  }
  let CONDITIONTEXT = "";
  if (args.length > 0) {
    CONDITIONTEXT = CONDITIONTEXT + QueryConst.Where;
  }
  for (i = 0; i < args.length; i++) {
    CONDITIONTEXT = CONDITIONTEXT + args[i];
  }
  let QueryText =
    QueryConst.getRecodeQuery +
    Tablename +
    CONDITIONTEXT +
    QueryConst.OrderByQuery +
    Key +
    QueryConst.Descending_order +
    ";";
  try {
    const result = await selectDataFromDb(QueryText); // fetchData関数の実行結果を待ち受ける
    if (QueryConst.debugDataBaseLevel > 1) {
      console.log("Data:", result);
    } // 取得したデータを出力
    return result; // 非同期処理の結果を戻り値として返す
  } catch (error) {
    console.error(QueryText);
    console.error("Error:", error); // エラーが発生した場合はエラーメッセージを出力
    throw error; // エラーを再度スローする（上位のコードでキャッチされる）
  }
}

//自分で条件とKEYを指定しての検索：昇順
export async function selectDataAsc(Tablename, ...args) {
  // 関数を呼び出してデータを取得し、結果を処理する
  Key = QueryConst.PrimaryKey;
  if(Tablename == QueryConst.MaterialPhotoRelation.tablename){
    Key = QueryConst.MaterialPhotoRelation.elementsKey.materialId;
  }else if(Tablename == QueryConst.RecipeDetail.tablename){
    Key = QueryConst.RecipeDetail.elementsKey.mealId;
  }
  let CONDITIONTEXT = QueryConst.Where;
  for (i = 0; i < args.length; i++) {
    CONDITIONTEXT = CONDITIONTEXT + args[i];
  }
  let QueryText =
    QueryConst.getRecodeQuery +
    Tablename +
    CONDITIONTEXT +
    QueryConst.OrderByQuery +
    Key +
    QueryConst.Ascending_order +
    ";";
  try {
    const result = await selectDataFromDb(QueryText); // fetchData関数の実行結果を待ち受ける
    if (QueryConst.debugDataBaseLevel > 1) {
      console.log("Data:", result);
    } // 取得したデータを出力
    return result; // 非同期処理の結果を戻り値として返す
  } catch (error) {
    console.error(QueryText);
    console.error("Error:", error); // エラーが発生した場合はエラーメッセージを出力
    throw error; // エラーを再度スローする（上位のコードでキャッチされる）
  }
}
//###end get recode;

//###Start Delete Item
//削除の実行部分
function DeleteDataFromDb(QueryText) {
  if (QueryConst.debugDataBaseLevel > 0) {
    console.log(QueryText);
  }
  // SQLクエリを実行してデータベースから要素を削除
  db.transaction((tx) => {
    tx.executeSql(
      QueryText,
      [],
      (tx, results) => {
        // 成功した場合の処理
        if (QueryConst.debugDataBaseLevel > 0) {
          console.log("要素が削除されました。");
        }
      },
      (tx, error) => {
        // エラーが発生した場合の処理
        console.log("削除中にエラーが発生しました:", error);
      }
    );
  });
}
//Idから削除
export function delete_item_ById(Tablename, ID) {
  // 関数を呼び出してデータを取得し、結果を処理する
  Key = QueryConst.PrimaryKey;
  if(Tablename == QueryConst.MaterialPhotoRelation.tablename){
    Key = QueryConst.MaterialPhotoRelation.elementsKey.materialId;
  }else if(Tablename == QueryConst.RecipeDetail.tablename){
    Key = QueryConst.RecipeDetail.elementsKey.mealId
  }
  let QueryText =
    QueryConst.DeleteQuery +
    Tablename +
    QueryConst.Where +
    Key +
    QueryConst.RO.Eqqual +
    +ID +
    ";";
  DeleteDataFromDb(QueryText);
}
//ユーザが任意で条件を指定して削除
//Need(Tablename:string),Option(use (key:relational operators:val) logical operators (key:relational operators:val))
export function delete_item(Tablename, ...args) {
  // 関数を呼び出してデータを取得し、結果を処理する
  let CONDITIONTEXT = QueryConst.Where;
  for (i = 0; i < args.length; i++) {
    CONDITIONTEXT = CONDITIONTEXT + args[i];
  }
  let QueryText = QueryConst.DeleteQuery + Tablename + CONDITIONTEXT + ";";
  DeleteDataFromDb(QueryText);
}
//###end Delete Item;

//### start exec arbitrary text
//入力テキストを実行(戻り値無し)
function ExecQueryText(QueryText) {
  if (QueryConst.debugDataBaseLevel > 0) {
    console.log(QueryText);
  }
  // SQLクエリを実行してデータベースから要素を削除
  db.transaction((tx) => {
    tx.executeSql(
      QueryText,
      [],
      (tx, results) => {
        // 成功した場合の処理
        if (QueryConst.debugDataBaseLevel > 1) {
          console.log("success");
        }
      },
      (tx, error) => {
        // エラーが発生した場合の処理
        console.log("error", error);
      }
    );
  });
}
//外部とのやり取り用の関数
export function ExecuteQuery(QueryText) {
  ExecQueryText(QueryText);
}

//### end exec arbitrary text
export function DropAllTable() {
  if (QueryConst.debugDataBaseLevel > 0) {
    console.log(QueryConst.DropTableQuery + QueryConst.Badge.tablename + ";");
    console.log(QueryConst.DropTableQuery + QueryConst.Meal.tablename + ";");
    console.log(
      QueryConst.DropTableQuery + QueryConst.MealStatus.tablename + ";"
    );
    console.log(
      QueryConst.DropTableQuery + QueryConst.RecipeDetail.tablename + ";"
    );
    console.log(
      QueryConst.DropTableQuery + QueryConst.Material.tablename + ";"
    );
    console.log(
      QueryConst.DropTableQuery +
        QueryConst.MaterialPhotoRelation.tablename +
        ";"
    );
    console.log(QueryConst.DropTableQuery + QueryConst.Photo.tablename + ";");
  }
  db.transaction((tx) => {
    tx.executeSql(QueryConst.DropTableQuery + QueryConst.Badge.tablename + ";");
  });
  db.transaction((tx) => {
    tx.executeSql(QueryConst.DropTableQuery + QueryConst.Meal.tablename + ";");
  });
  db.transaction((tx) => {
    tx.executeSql(
      QueryConst.DropTableQuery + QueryConst.MealStatus.tablename + ";"
    );
  });
  db.transaction((tx) => {
    tx.executeSql(
      QueryConst.DropTableQuery + QueryConst.RecipeDetail.tablename + ";"
    );
  });
  db.transaction((tx) => {
    tx.executeSql(
      QueryConst.DropTableQuery + QueryConst.Material.tablename + ";"
    );
  });
  db.transaction((tx) => {
    tx.executeSql(
      QueryConst.DropTableQuery +
        QueryConst.MaterialPhotoRelation.tablename +
        ";"
    );
  });
  db.transaction((tx) => {
    tx.executeSql(QueryConst.DropTableQuery + QueryConst.Photo.tablename + ";");
  });
  return;
}

export const getTables = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT name FROM sqlite_master WHERE type="table"',
        [],
        (_, { rows }) => {
          const tables = rows._array.map((row) => row.name);
          resolve(tables);
        },
        (error) => {
          reject(error);
        }
      );
    });
  });
};
