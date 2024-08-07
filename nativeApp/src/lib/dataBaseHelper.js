import * as SQLite from "expo-sqlite";
import * as QueryConst from "./databaseQueryText";
import * as InitDB from "./dataBaseInit";
// データベースを作成またはオープン
const db = SQLite.openDatabaseSync("database.db");
//openDatabase
//### start First Start Init DB
export async function CreateAndInitTableIfNotExist() {
  try {
    const tablenum = await GetTableNum();
    if (QueryConst.debugDataBaseLevel >= 1) {
      console.log("CreateAndInitTableIfNotExist");
      console.log(tablenum);
    }
    let init = 0;
    if (QueryConst.debugDataBaseLevel >= 1) {
      console.log("Chatch table num = " + tablenum);
    }
    if (tablenum <= 3) {
      init = await InitDatabaseTable();
      if (QueryConst.debugDataBaseLevel >= 1) {
        console.log("Tables Not Exist");
      }
    } else {
      if (QueryConst.debugDataBaseLevel >= 1) {
        console.log("Tables Exist");
      }
    }
    return tablenum;
  } catch (error) {
    // エラーハンドリング
    throw new Error("CreateAndInitTableIfNotExistでエラーが発生しました");
  }
}
export async function getTables() {
  // アプリの起動時にデータベースの存在を確認
  if (QueryConst.debugDataBaseLevel >= 1) {
    console.log("CreateAndInitTableIfNotExist");
  }
  //let object = await db.runAsync('SELECT name FROM sqlite_master WHERE type="table";');
  //return object.length;
  try {
    let object = await db.getAllAsync(
      'SELECT name FROM sqlite_master WHERE type="table";'
    );
    if (QueryConst.debugDataBaseLevel >= 1) {
      console.log("cullent table");
      console.log(object);
    }
    return object;
  } catch (error) {
    console.error("Error at GetTableNum" + error);
  }
}

async function GetTableNum() {
  // アプリの起動時にデータベースの存在を確認
  if (QueryConst.debugDataBaseLevel >= 1) {
    console.log("CreateAndInitTableIfNotExist");
  }
  //let object = await db.runAsync('SELECT name FROM sqlite_master WHERE type="table";');
  //return object.length;
  try {
    let object = await db.getAllAsync(
      'SELECT name FROM sqlite_master WHERE type="table";'
    );
    if (QueryConst.debugDataBaseLevel >= 1) {
      console.log("cullent table");
      console.log(object);
    }
    return object.length;
  } catch (error) {
    console.error("Error at GetTableNum" + error);
  }
}

export async function CreateAllTable() {
  try {
    await CreateEachTable(QueryConst.createTableUser);
    await CreateEachTable(QueryConst.createTableBadge);
    await CreateEachTable(QueryConst.createTableMaterial);
    await CreateEachTable(QueryConst.createTableMaterialPhotoRelation);
    await CreateEachTable(QueryConst.createTableMeal);
    await CreateEachTable(QueryConst.createTableMeal_Status);
    await CreateEachTable(QueryConst.createPlace);
    await CreateEachTable(QueryConst.createTablePhoto);
    await CreateEachTable(QueryConst.createTableRecipe_Detail);
  } catch (error) {
    console.error("テーブル作成時にエラーが発生しました:", error);
  }
  if (QueryConst.debugDataBaseLevel > 0) {
    console.log(QueryConst.createTableUser);
    console.log(QueryConst.createTableBadge);
    console.log(QueryConst.createTableMaterial);
    console.log(QueryConst.createTableMaterialPhotoRelation);
    console.log(QueryConst.createTableMeal);
    console.log(QueryConst.createTableMeal_Status);
    console.log(QueryConst.createPlace);
    console.log(QueryConst.createTablePhoto);
    console.log(QueryConst.createTableRecipe_Detail);
  }
}

async function CreateEachTable(QueryText) {
  if (QueryConst.debugDataBaseLevel > 0) {
    console.log("Cleate Text");
  }
  if (QueryConst.debugDataBaseLevel > 0) {
    console.log(QueryText);
  }
  await db.execAsync(QueryText);
}

async function dropEachTable(QueryText) {
  if (QueryConst.debugDataBaseLevel > 0) {
    console.log("drop Table");
  }
  if (QueryConst.debugDataBaseLevel > 0) {
    console.log(QueryText);
  }
  await db.execAsync(QueryText);
}
export async function dropAllTable() {
  if (QueryConst.debugDataBaseLevel > 0) {
    console.log(QueryConst.DropTableQuery + QueryConst.User.tablename + ";");
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
  await dropEachTable(
    QueryConst.DropTableQuery + QueryConst.User.tablename + ";"
  );
  await dropEachTable(
    QueryConst.DropTableQuery + QueryConst.Badge.tablename + ";"
  );
  await dropEachTable(
    QueryConst.DropTableQuery + QueryConst.Meal.tablename + ";"
  );
  await dropEachTable(
    QueryConst.DropTableQuery + QueryConst.MealStatus.tablename + ";"
  );
  await dropEachTable(
    QueryConst.DropTableQuery + QueryConst.RecipeDetail.tablename + ";"
  );
  await dropEachTable(
    QueryConst.DropTableQuery + QueryConst.Material.tablename + ";"
  );
  await dropEachTable(
    QueryConst.DropTableQuery + QueryConst.MaterialPhotoRelation.tablename + ";"
  );
  await dropEachTable(
    QueryConst.DropTableQuery + QueryConst.Photo.tablename + ";"
  );
  return;
}
//###start Read Excel data
export async function InitDatabaseTable() {
  await dropAllTable();
  await CreateAllTable();
  //1Badge
  for (i = 0; i < InitDB.Badge.length; i++) {
    InsertItem = InitDB.Badge[i];
    await insert_item(QueryConst.Badge.tablename, InsertItem);
  }
  //2
  for (i = 0; i < InitDB.MealStatus.length; i++) {
    InsertItem = InitDB.MealStatus[i];
    await insert_item(QueryConst.MealStatus.tablename, InsertItem);
  }
  //3
  for (i = 0; i < InitDB.Meal.length; i++) {
    InsertItem = InitDB.Meal[i];
    await insert_item(QueryConst.Meal.tablename, InsertItem);
  }
  //4
  for (i = 0; i < InitDB.Material.length; i++) {
    InsertItem = InitDB.Material[i];
    await insert_item(QueryConst.Material.tablename, InsertItem);
  }
  //5
  for (i = 0; i < InitDB.RecipeDetail.length; i++) {
    InsertItem = InitDB.RecipeDetail[i];
    await insert_item(QueryConst.RecipeDetail.tablename, InsertItem);
  }
  //6
  for (i = 0; i < InitDB.MaterialPhotoRelation.length; i++) {
    InsertItem = InitDB.MaterialPhotoRelation[i];
    await insert_item(QueryConst.MaterialPhotoRelation.tablename, InsertItem);
  }
  //7
  for (i = 0; i < InitDB.Photo.length; i++) {
    InsertItem = InitDB.Photo[i];
    await insert_item(QueryConst.Photo.tablename, InsertItem);
  }
  //8
  for (i = 0; i < InitDB.User.length; i++) {
    InsertItem = InitDB.User[i];
    await insert_item(QueryConst.User.tablename, InsertItem);
  }
  return 1;
}
//###end Read Excel data

//###start insert
export async function insert_item(Table, InsertItemItem) {
  if (QueryConst.debugDataBaseLevel > 0) {
    console.log("insert_item:name:" + Table);
  }
  switch (Table) {
    case QueryConst.User.tablename: //0
      try {
        const lastInsertedId = await insert_user(InsertItemItem);
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
    case QueryConst.Place.tablename: //7
      if (QueryConst.debugDataBaseLevel > 0) {
        console.log("insert " + QueryConst.Place.tablename);
      }
      try {
        const lastInsertedId = await insert_place(InsertItemItem);
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

async function insert_user(InsertItem) {
  let items =
    " ( " +
    QueryConst.User.elementsKey.name +
    ", " +
    QueryConst.User.elementsKey.webId +
    ", " +
    QueryConst.User.elementsKey.isAccessed +
    " )";
  let QueryText =
    QueryConst.InsertQuery +
    QueryConst.User.tablename +
    items +
    QueryConst.values +
    "(?,?,?)";
  console.log(
    QueryText +
      "," +
      InsertItem.name +
      "," +
      InsertItem.webId +
      "," +
      InsertItem.isAccessed
  );
  //const statement = await db.prepareAsync(values);
  if (QueryText.debugDataBaseLevel > 0) {
    console.log(
      QueryText + InsertItem.name + InsertItem.webIdid + InsertItem.isAccessed
    );
  }
  try {
    const result = await db.runAsync(
      QueryText,
      InsertItem.name,
      InsertItem.webId,
      InsertItem.isAccessed
    );
    console.log(result.lastInsertRowId, result.changes);
    return result.lastInsertRowId;
  } catch (error) {
    console.error("Insert error" + error);
  }
}

async function insert_badge(InsertItem) {
  let items =
    " ( " +
    QueryConst.Badge.elementsKey.name +
    ", " +
    QueryConst.Badge.elementsKey.isHave +
    ", " +
    QueryConst.Badge.elementsKey.pass2Photo +
    " )";
  let QueryText =
    QueryConst.InsertQuery +
    QueryConst.Badge.tablename +
    items +
    QueryConst.values +
    "(?,?,?)";
  console.log(
    QueryText +
      "," +
      InsertItem.name +
      "," +
      InsertItem.isHave +
      "," +
      InsertItem.pass2Photo
  );
  //const statement = await db.prepareAsync(values);
  if (QueryText.debugDataBaseLevel > 0) {
    console.log(
      QueryText + InsertItem.name + InsertItem.isHave + InsertItem.pass2Photo
    );
  }
  try {
    const result = await db.runAsync(
      QueryText,
      InsertItem.name,
      InsertItem.isHave,
      InsertItem.pass2Photo
    );
    console.log(result.lastInsertRowId, result.changes);
    return result.lastInsertRowId;
  } catch (error) {
    console.error("Insert error" + error);
  }
}

async function insert_meal(InsertItem) {
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
  try {
    const result = await db.runAsync(
      QueryText,
      InsertItem.badgeId,
      InsertItem.mealStatusId,
      InsertItem.pass2Photo,
      InsertItem.name
    );
    console.log(result.lastInsertRowId, result.changes);
    return result.lastInsertRowId;
  } catch (error) {
    console.error("Insert error" + error);
  }
}

async function insert_meal_status(InsertItem) {
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
  if (QueryConst.debugDataBaseLevel > 0) {
    console.log(QueryText);
  }
  try {
    const result = await db.runAsync(
      QueryText,
      InsertItem.locked,
      InsertItem.cooked
    );
    console.log(result.lastInsertRowId, result.changes);
    return result.lastInsertRowId;
  } catch (error) {
    console.error("Insert error" + error);
  }
}

async function insert_recipe_detail(InsertItem) {
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
  if (QueryConst.debugDataBaseLevel > 0) {
    console.log(QueryText);
  }
  try {
    const result = await db.runAsync(
      QueryText,
      InsertItem.mealId,
      InsertItem.materialId,
      InsertItem.needNum
    );
    console.log(result.lastInsertRowId, result.changes);
    return result.lastInsertRowId;
  } catch (error) {
    console.error("Insert error" + error);
  }
}

async function insert_material(InsertItem) {
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
  if (QueryConst.debugDataBaseLevel > 0) {
    console.log(QueryText);
  }
  try {
    const result = await db.runAsync(
      QueryText,
      InsertItem.name,
      InsertItem.pass2Photo,
      InsertItem.stock,
      InsertItem.colorId
    );
    console.log(result.lastInsertRowId, result.changes);
    return result.lastInsertRowId;
  } catch (error) {
    console.error("Insert error" + error);
  }
}

async function insert_material_photo_relation(InsertItem) {
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
  if (QueryConst.debugDataBaseLevel > 0) {
    console.log(QueryText);
  }
  try {
    const result = await db.runAsync(
      QueryText,
      InsertItem.materialId,
      InsertItem.photoId
    );
    console.log(result.lastInsertRowId, result.changes);
    return result.lastInsertRowId;
  } catch (error) {
    console.error("Insert error" + error);
  }
}
async function insert_photo(InsertItem) {
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
  if (QueryConst.debugDataBaseLevel > 0) {
    console.log(QueryText);
  }
  try {
    const result = await db.runAsync(
      QueryText,
      InsertItem.name,
      InsertItem.ratitude,
      InsertItem.longitude,
      InsertItem.pass2Photo,
      InsertItem.visited,
      InsertItem.id
    );
    console.log(result.lastInsertRowId, result.changes);
    return result.lastInsertRowId;
  } catch (error) {
    console.error("Insert error" + error);
  }
}
//###end insert

//###start Update
export async function update_item(Table, updateItemItem) {
  if (QueryConst.debugDataBaseLevel > 0) {
    console.log("update_item:name:" + Table);
  }
  switch (Table) {
    case QueryConst.User.tablename: //0
      await update_user(updateItemItem);
      break;
    case QueryConst.Badge.tablename: //1
      await update_badge(updateItemItem);
      break;
    case QueryConst.Meal.tablename: //2
      console.log(QueryConst.Meal.tablename);
      await update_meal(updateItemItem);
      break;
    case QueryConst.MealStatus.tablename: //3
      await update_meal_status(updateItemItem);
      break;
    case QueryConst.RecipeDetail.tablename: //4
      await update_recipe_detail(updateItemItem);
      break;
    case QueryConst.Material.tablename: //5
      await update_material(updateItemItem);
      break;
    case QueryConst.MaterialPhotoRelation.tablename: //6
      await update_material_photo_relation(updateItemItem);
      break;
    case QueryConst.Place.tablename:
      await update_place(updateItemItem);
      break;
    case QueryConst.Photo.tablename: //7
      await update_photo(updateItemItem);
      break;
    default:
      console.warn("table name error:" + tablename);
  }
}

export async function update_user(updateItem) {
  //console.log("elements:"+QueryConst.Badge.elementsKey.name+":"+QueryConst.Badge.elementsKey.isHave+":"+QueryConst.Badge.elementsKey.pass2Photo);
  let items =
    QueryConst.User.elementsKey.name +
    " = ?," +
    QueryConst.User.elementsKey.webId +
    " = ?," +
    QueryConst.User.elementsKey.isAccessed +
    " = ?";
  let QueryText =
    QueryConst.UpdateQuery +
    QueryConst.User.tablename +
    QueryConst.Set +
    items +
    QueryConst.WhereId;
  if (QueryConst.debugDataBaseLevel > 0) {
    console.log(
      QueryText,
      updateItem.name,
      updateItem.webId,
      updateItem.isAccessed,
      updateItem.id
    );
  }
  try {
    const result = await db.runAsync(
      QueryText,
      updateItem.name,
      updateItem.webId,
      updateItem.isAccessed,
      updateItem.id
    );
    console.log(result.lastInsertRowId, result.changes);
    return result.lastInsertRowId;
  } catch (error) {
    console.error("Insert error" + error);
  }
}

export async function update_badge(updateItem) {
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
    console.log(QueryText);
  }
  try {
    const result = await db.runAsync(
      QueryText,
      updateItem.name,
      updateItem.isHave,
      updateItem.pass2Photo,
      updateItem.id
    );
    console.log(result.lastInsertRowId, result.changes);
    return result.lastInsertRowId;
  } catch (error) {
    console.error("Insert error" + error);
  }
}

export async function update_meal(updateItem) {
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
  try {
    const result = await db.runAsync(
      QueryText,
      updateItem.badgeId,
      updateItem.mealStatusId,
      updateItem.pass2Photo,
      updateItem.name,
      updateItem.id
    );
    console.log(result.lastInsertRowId, result.changes);
    return result.lastInsertRowId;
  } catch (error) {
    console.error("Insert error" + error);
  }
}

export async function update_meal_status(updateItem) {
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
  try {
    const result = await db.runAsync(
      QueryText,
      updateItem.locked,
      updateItem.cooked,
      updateItem.id
    );
    console.log(result.lastInsertRowId, result.changes);
    return result.lastInsertRowId;
  } catch (error) {
    console.error("Insert error" + error);
  }
}

export async function update_recipe_detail(updateItem) {
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
    QueryConst.WhereId;
  if (QueryConst.debugDataBaseLevel > 0) {
    console.log(
      QueryText,
      updateItem.materialId,
      updateItem.needNum,
      updateItem.needNum,
      updateItem.id
    );
  }
  try {
    const result = await db.runAsync(
      QueryText,
      updateItem.materialId,
      updateItem.needNum,
      updateItem.needNum,
      updateItem.id
    );
    console.log(result.lastInsertRowId, result.changes);
    return result.lastInsertRowId;
  } catch (error) {
    console.error("Insert error" + error);
  }
}

export async function update_material(updateItem) {
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
  try {
    const result = await db.runAsync(
      QueryText,
      updateItem.name,
      updateItem.pass2Photo,
      updateItem.stock,
      updateItem.colorId,
      updateItem.id
    );
    console.log(result.lastInsertRowId, result.changes);
    return result.lastInsertRowId;
  } catch (error) {
    console.error("Insert error" + error);
  }
}

export async function update_material_photo_relation(updateItem) {
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
  try {
    const result = await db.runAsync(
      QueryText,
      updateItem.materialId,
      updateItem.photoId
    );
    console.log(result.lastInsertRowId, result.changes);
    return result.lastInsertRowId;
  } catch (error) {
    console.error("Insert error" + error);
  }
}

export async function update_photo(updateItem) {
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
  try {
    const result = await db.runAsync(
      QueryText,
      updateItem.name,
      updateItem.ratitude,
      updateItem.longitude,
      updateItem.pass2Photo,
      updateItem.visited,
      updateItem.id
    );
    console.log(result.lastInsertRowId, result.changes);
    return result.lastInsertRowId;
  } catch (error) {
    console.error("Insert error" + error);
  }
}
//###end Update

//###start get recode;

//実際にDBにアクセスする関数
async function fetchDataFromDb(Tablename, offset, limit, DecOrAsc, sortkey) {
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
    console.log("fetchDataFromDb");
    console.log(QueryText);
  }
  try {
    const result = await db.getAllAsync(QueryText);
    //console.log(result.lastInsertRowId, result.changes);
    return result;
  } catch (error) {
    console.error("fetchData error" + error);
  }
}
//ユーザを取得する関数
export async function get_user() {
  try {
    const result = await fetchDataFromDb(
      QueryConst.User.tablename,
      QueryConst.OffsetDefault,
      100,
      QueryConst.Ascending_order,
      QueryConst.PrimaryKey
    ); // fetchData関数の実行結果を待ち受ける
    if (QueryConst.debugDataBaseLevel > 1) {
      console.log("Data: get_user", result);
    } // 取得したデータを出力
    if (result.length <= 0) {
      return null;
    }
    return result[0]; // 非同期処理の結果を戻り値として返す
  } catch (error) {
    console.error("Error:", error); // エラーが発生した場合はエラーメッセージを出力
    throw error; // エラーを再度スローする（上位のコードでキャッチされる）
  }
}
//ユーザを取得する関数
export async function get_user_id() {
  try {
    const result = await fetchDataFromDb(
      QueryConst.User.tablename,
      QueryConst.OffsetDefault,
      1,
      QueryConst.Descending_order,
      QueryConst.PrimaryKey
    ); // fetchData関数の実行結果を待ち受ける
    if (QueryConst.debugDataBaseLevel > 1) {
      console.log("Data: get_user", result);
    } // 取得したデータを出力
    if (result.length <= 0) {
      return null;
    }
    return result[0].id; // 非同期処理の結果を戻り値として返す
  } catch (error) {
    console.error("Error:", error); // エラーが発生した場合はエラーメッセージを出力
    throw error; // エラーを再度スローする（上位のコードでキャッチされる）
  }
}
//ユーザIDを取得する関数
export async function get_user_Wedid() {
  try {
    const result = await fetchDataFromDb(
      QueryConst.User.tablename,
      QueryConst.OffsetDefault,
      1,
      QueryConst.Descending_order,
      QueryConst.PrimaryKey
    ); // fetchData関数の実行結果を待ち受ける
    if (QueryConst.debugDataBaseLevel > 1) {
      console.log("Data: get_user_id", result);
    } // 取得したデータを出力
    if (result.length <= 0) {
      return null;
    }
    return result[0].webId; // 非同期処理の結果を戻り値として返す
  } catch (error) {
    console.error("Error:", error); // エラーが発生した場合はエラーメッセージを出力
    throw error; // エラーを再度スローする（上位のコードでキャッチされる）
  }
}
export async function get_isAccessed() {
  try {
    const result = await fetchDataFromDb(
      QueryConst.User.tablename,
      QueryConst.OffsetDefault,
      1,
      QueryConst.Descending_order,
      QueryConst.PrimaryKey
    ); // fetchData関数の実行結果を待ち受ける
    if (QueryConst.debugDataBaseLevel > 1) {
      console.log("Data: get_user_id", result);
    } // 取得したデータを出力
    if (result.length <= 0) {
      return null;
    }
    return result[0].isAccessed; // 非同期処理の結果を戻り値として返す
  } catch (error) {
    console.error("Error:", error); // エラーが発生した場合はエラーメッセージを出力
    throw error; // エラーを再度スローする（上位のコードでキャッチされる）
  }
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
async function selectDataFromDb(QueryText) {
  if (QueryConst.debugDataBaseLevel > 0) {
    console.log(QueryText);
  }
  try {
    const result = await db.getAllAsync(QueryText + " ");
    //console.log(result.lastInsertRowId, result.changes);
    return result;
  } catch (error) {
    console.error("Select:" + error);
    console.error("Query : " + QueryText + ":");
  }
}
//Idから検索
export async function selectDataById(Tablename, ID) {
  // 関数を呼び出してデータを取得し、結果を処理する
  Key = QueryConst.PrimaryKey;
  if (Tablename == QueryConst.MaterialPhotoRelation.tablename) {
    Key = QueryConst.MaterialPhotoRelation.elementsKey.materialId;
  } else if (Tablename == QueryConst.RecipeDetail.tablename) {
    Key = QueryConst.RecipeDetail.elementsKey.mealId;
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
  if (Tablename == QueryConst.MaterialPhotoRelation.tablename) {
    Key = QueryConst.MaterialPhotoRelation.elementsKey.materialId;
  } else if (Tablename == QueryConst.RecipeDetail.tablename) {
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
  if (Tablename == QueryConst.MaterialPhotoRelation.tablename) {
    Key = QueryConst.MaterialPhotoRelation.elementsKey.materialId;
  } else if (Tablename == QueryConst.RecipeDetail.tablename) {
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
//ユーザの削除
export async function clear_user() {
  QueryText = QueryConst.DeleteQuery + QueryConst.User.tablename + ";";
  if (QueryConst.debugDataBaseLevel > 0) {
    console.log(QueryText);
  }
  // SQLクエリを実行してデータベースから要素を削除
  try {
    const result = await db.runAsync(QueryText); // fetchData関数の実行結果を待ち受ける
    if (QueryConst.debugDataBaseLevel > 1) {
      console.log("Data:", result);
    } // 取得したデータを出力
    return result; // 非同期処理の結果を戻り値として返す
  } catch (error) {
    console.error("delete data" + error); // エラーが発生した場合はエラーメッセージを出力
    console.error(QueryText);
    throw error; // エラーを再度スローする（上位のコードでキャッチされる）
  }
}

//削除の実行部分
async function deleteDataFromDb(QueryText) {
  if (QueryConst.debugDataBaseLevel > 0) {
    console.log(QueryText);
  }
  // SQLクエリを実行してデータベースから要素を削除
  try {
    const result = await db.runAsync(QueryText + " "); // fetchData関数の実行結果を待ち受ける
    if (QueryConst.debugDataBaseLevel > 1) {
      console.log("Data:", result);
    } // 取得したデータを出力
    return result; // 非同期処理の結果を戻り値として返す
  } catch (error) {
    console.error("delete data" + error); // エラーが発生した場合はエラーメッセージを出力
    console.error(QueryText);
    throw error; // エラーを再度スローする（上位のコードでキャッチされる）
  }
}
//Idから削除
export async function delete_item_ById(Tablename, ID) {
  // 関数を呼び出してデータを取得し、結果を処理する
  Key = QueryConst.PrimaryKey;
  if (Tablename == QueryConst.MaterialPhotoRelation.tablename) {
    Key = QueryConst.MaterialPhotoRelation.elementsKey.materialId;
  } else if (Tablename == QueryConst.RecipeDetail.tablename) {
    Key = QueryConst.RecipeDetail.elementsKey.mealId;
  }
  let QueryText =
    QueryConst.DeleteQuery +
    Tablename +
    QueryConst.Where +
    Key +
    QueryConst.RO.Eqqual +
    +ID +
    ";";
  await deleteDataFromDb(QueryText);
}
//ユーザが任意で条件を指定して削除
//Need(Tablename:string),Option(use (key:relational operators:val) logical operators (key:relational operators:val))
export async function delete_item(Tablename, ...args) {
  // 関数を呼び出してデータを取得し、結果を処理する
  let CONDITIONTEXT = QueryConst.Where;
  for (i = 0; i < args.length; i++) {
    CONDITIONTEXT = CONDITIONTEXT + args[i];
  }
  let QueryText = QueryConst.DeleteQuery + Tablename + CONDITIONTEXT + ";";
  await deleteDataFromDb(QueryText);
}

//###end Delete Item;

//### start exec arbitrary text
//入力テキストを実行(戻り値無し)
async function ExecQueryText(QueryText) {
  if (QueryConst.debugDataBaseLevel > 0) {
    console.log(QueryText);
  }
  // SQLクエリを実行
  try {
    const result = await db.runAsync(QueryText);
    //console.log(result.lastInsertRowId, result.changes);
    return result;
  } catch (error) {
    console.error("Insert error" + error);
  }
}
//外部とのやり取り用の関数
export async function ExecuteQuery(QueryText) {
  await ExecQueryText(QueryText);
}

//### end exec arbitrary text
