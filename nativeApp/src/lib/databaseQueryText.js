//SQL Funcs
export const debugDataBaseLevel = 0; //0:No Debug,1:Easy Debug,2:Full Debug;

export const PassToExcelTemplate = "../../DBtemplate/";
export const FileExtension = ".xlsx";

export const PrimaryKey = "id";
export const Blank = " ";
export const InsertQuery = "INSERT INTO ";
export const UpdateQuery = "UPDATE ";
export const Set = " Set ";
export const WhereId = " WHERE id = ?";
export const Where = " WHERE ";
export const values = " VALUES ";
export const getRecodeQuery = "SELECT * FROM ";
export const DeleteQuery = "DELETE FROM ";
export const DropTableQuery = "drop table IF EXISTS ";
export const Limit = " LIMIT ";
export const Limit100 = " LIMIT 100 ";
export const Offset = " OFFSET ";
export const OffsetDefault = " 0 ";
export const LimitDefault = " 100 ";
export const OrderByQuery = " order by "; //order by
export const Descending_order = " DESC";
export const Ascending_order = " ASC";
export const parf = "'%";
export const parb = "%'";

export class RO {
  static AND = " AND ";
  static OR = " OR ";
  static Eqqual = " == ";
  static nEqual = " != ";
  static Biggerthan = " > ";
  static Lessthan = " < ";
  static OrMore = " >= ";
  static OrLess = " <= ";
  static In = " IN ";
  static LIKE = " LIKE ";
  static IsNull = " IS NULL";
  static Bet = " BETWEEN "; //上級者向け
}

class UserElementKey {
  static id = PrimaryKey;
  static name = "name";
  static webId = "webId"
  static isAccessed = "isAccessed";
}
export class UserElement {
  id;
  name;
  webId;
  isAccessed;
}
export class User {
  static tablename = "User";
  static elementsKey = UserElementKey;
}

class MealementKey {
  static id = PrimaryKey;
  static badgeId = "badgeId";
  static mealStatusId = "mealStatusId";
  static pass2Photo = "pass2Photo";
  static name = "name";
}
export class MealElement {
  id;
  badgeId;
  mealStatusId;
  pass2Photo;
  name;
}
export class Meal {
  static tablename = "Meal";
  static elementsKey = MealementKey;
}
class BadgeElementKey {
  static id = PrimaryKey;
  static name = "name";
  static pass2Photo = "pass2Photo";
  static isHave = "IsHave";
}

export class BadgeElement {
  id;
  name;
  pass2Photo;
  isHave;
}

export class Badge {
  static tablename = "Badge";
  static elementsKey = BadgeElementKey;
}

class MelaStatusElementKey {
  static id = PrimaryKey;
  static locked = "locked";
  static cooked = "cooked";
}

export class MelaStatusElement {
  id;
  locked;
  cooked;
}

export class MealStatus {
  static tablename = "MealStatus";
  static elementsKey = MelaStatusElementKey;
}

class RecipeDetailElementKey {
  static mealId = "mealId";
  static materialId = "materialId";
  static needNum = "needNum";
}

export class RecipeDetailElement {
  mealId;
  materialId;
  needNum;
}

export class RecipeDetail {
  static tablename = "RecipeDetail";
  static elementsKey = RecipeDetailElementKey;
}

class MaterialElementKey {
  static id = PrimaryKey;
  static name = "name";
  static pass2Photo = "pass2Photo";
  static stock = "stock";
  static colorId = `colorId`;
}

export class MaterialElement {
  id;
  name;
  pass2Photo;
  stock;
  colorId;
}

export class Material {
  static tablename = "Material";
  static elementsKey = MaterialElementKey;
}

class MaterialPhotoRelationElemantText {
  static materialId = "MaterialId";
  static photoId = "photoId";
}
export class MaterialPhotoRelationElemant {
  materialId;
  photoId;
}
export class MaterialPhotoRelation {
  static tablename = "MaterialPhotoRelation";
  static elementsKey = MaterialPhotoRelationElemantText;
}

class PlaceElementKey {
  static id = PrimaryKey;
  static name = "name";
  static visited = "visited";
}
export class PlaceElement {
  id;
  name;
  visited;
}

export class Place {
  static tablename = "Place";
  static elementsKey = PlaceElementKey;
}

class PhotoElementKey {
  static id = PrimaryKey;
  static name = "name";
  static ratitude = "ratitude";
  static longitude = "longitude";
  static pass2Photo = "pass2Photo";
  static visited = "visited";
}

export class PhotoElement {
  id;
  name;
  ratitude;
  longitude;
  pass2Photo;
  visited;
}

export class Photo {
  static tablename = "Photo";
  static elementsKey = PhotoElementKey;
}

// IF NOT EXISTS
// テーブルを作成するクエリ
export const createTableUser =
  "CREATE TABLE IF NOT EXISTS " +
  User.tablename +
  " (" +
  User.elementsKey.id +
  " TEXT," +
  User.elementsKey.isAccessed +
  " INTEGER," +
  User.elementsKey.name +
  " TEXT" +
  ");";

export const createTableBadge =
  "CREATE TABLE IF NOT EXISTS " +
  Badge.tablename +
  " (" +
  Badge.elementsKey.id +
  " INTEGER PRIMARY KEY AUTOINCREMENT," +
  Badge.elementsKey.name +
  " TEXT," +
  Badge.elementsKey.isHave +
  " INTEGER," +
  Badge.elementsKey.pass2Photo +
  " TEXT" +
  ");";

export const createTableMeal =
  `CREATE TABLE IF NOT EXISTS ` +
  Meal.tablename +
  ` (` +
  Meal.elementsKey.id +
  " INTEGER PRIMARY KEY AUTOINCREMENT," +
  Meal.elementsKey.badgeId +
  " INTEGER," +
  Meal.elementsKey.mealStatusId +
  " INTEGER," +
  Meal.elementsKey.pass2Photo +
  " TEXT," +
  Meal.elementsKey.name +
  " TEXT" +
  ");";

export const createTableMeal_Status =
  `CREATE TABLE IF NOT EXISTS ` +
  MealStatus.tablename +
  ` (` +
  MealStatus.elementsKey.id +
  " INTEGER PRIMARY KEY AUTOINCREMENT," +
  MealStatus.elementsKey.locked +
  " INTEGER," +
  MealStatus.elementsKey.cooked +
  " INTEGER" +
  ");";

export const createTableRecipe_Detail =
  `CREATE TABLE IF NOT EXISTS ` +
  RecipeDetail.tablename +
  ` (` +
  RecipeDetail.elementsKey.mealId +
  " INTEGER ," +
  RecipeDetail.elementsKey.materialId +
  " INTEGER ," +
  RecipeDetail.elementsKey.needNum +
  " INTEGER" +
  `);`;

export const createTableMaterial =
  "CREATE TABLE IF NOT EXISTS " +
  Material.tablename +
  ` (` +
  Material.elementsKey.id +
  " INTEGER PRIMARY KEY AUTOINCREMENT," +
  Material.elementsKey.name +
  " TEXT," +
  Material.elementsKey.pass2Photo +
  " TEXT," +
  Material.elementsKey.stock +
  " INTEGER," +
  Material.elementsKey.colorId +
  " INTEGER" +
  ");";

export const createTableMaterialPhotoRelation =
  `CREATE TABLE IF NOT EXISTS ` +
  MaterialPhotoRelation.tablename +
  ` (` +
  MaterialPhotoRelation.elementsKey.materialId +
  " INTEGER," +
  MaterialPhotoRelation.elementsKey.photoId +
  " INTEGER" +
  ");";

export const createPlace =
  `CREATE TABLE IF NOT EXISTS ` +
  Place.tablename +
  ` (` +
  Place.elementsKey.id +
  " INTEGER PRIMARY KEY AUTOINCREMENT," +
  Place.elementsKey.name +
  " TEXT UNIQUE," +
  Place.elementsKey.visited +
  " INTEGER" +
  ");";

export const createTablePhoto =
  `CREATE TABLE IF NOT EXISTS ` +
  Photo.tablename +
  ` (` +
  Photo.elementsKey.id +
  " INTEGER PRIMARY KEY AUTOINCREMENT," +
  Photo.elementsKey.name +
  " TEXT," +
  Photo.elementsKey.ratitude +
  " INTEGER," +
  Photo.elementsKey.longitude +
  " INTEGER," +
  Photo.elementsKey.pass2Photo +
  " TEXT," +
  Photo.elementsKey.visited +
  " INTEGER" +
  ");";
