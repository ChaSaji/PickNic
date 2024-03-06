//SQL Funcs
export const Blank = ' ';
export const InsertQuery = "Insert Into ";
export const values = " values ";
export const DropTableQuery = "drop table ";

class Mealement{
  static id = "id";
  static recipeId = "RecipeId";
  static badthId = "BadthId";
  static mealStatusId = "MealStatusId";
  static pass2Photo = "Pass2Photo";
};
export class Meal {
  static tablename = 'Meal';
  static elements = Mealement;
};
class BageElement{
  static id = "id";
  static name = "name";
  static pass2photo = "name";
  static isHave = "IsHave";
};
export class Badge {
    static tablename = 'Badge';
    static elements;
};

class MelaStatusElement{
  static id = "id";
  static locked = "locked";
  static cooked = "cooked";
};

export class MealStatus{
  static tablename = "MealStatus";
  static elements = MelaStatusElement;
}

class RecipeDetailElement{
  static id = "id";
  static materialId = "materialId";
  static needNum = "needNum";
}

export class RecipeDetail{
  static tablename = "RecipeDatail";
  static elements = RecipeDetailElement;
}

class MaterialElement{
  static id = "id";
  static name = "name";
  static pass2Photo = "pass2photo";
  static stock = "stock";
}

export class Material{
  static tablename = "Material";
  static elements = MaterialElement;
}

class MaterialPhotoRelationElemant{
  static materialId = "MaterialId";
  static PhotoId = "PhotoId";
}

export class MaterialPhotoRelation{
  static tablename = "MaterialPhotoRelation";
  static elements = MaterialPhotoRelationElemant;
}

class PhotoElement{
  static id = "id";
  static name = "name";
  static ratitude = "ratitude";
  static longitude = "longitude";
  static pass2Photo = "pass2Photo";
  static visited = "visited";
}

export class Photo{
  static tablename = "Photo";
  static elements = PhotoElement;
}

// テーブルを作成するクエリ
export const createTableBadge = 
'CREATE TABLE IF NOT EXISTS '+Badge.tablename+` (`
  +Badge.elements.id+  ' INTEGER PRIMARY KEY AUTOINCREMENT,'
  +Badge.elements.name+  ' TEXT,'
  +Badge.elements.isHave+  ' INTEGER,'
  +Badge.elements.pass2Photo+  ' TEXT,'
  +');';

export const createTableMeal = 
`CREATE TABLE IF NOT EXISTS `+Meal.tablename+` (`
    +Meal.elements.id           + ' INTEGER PRIMARY KEY AUTOINCREMENT,'    
    +Meal.elements.recipeId     + ' INTEGER,'
    +Meal.elements.badthId      + ' INTEGER,'
    +Meal.elements.mealStatusId + ' INTEGER,'
    +Meal.elements.pass2Photo   + ' TEXT'
    +');';

export const createTableMeal_Status = `
CREATE TABLE IF NOT EXISTS `+MealStatus.tablename+` (`
  +MealStatus.elements.id     + ' INTEGER PRIMARY KEY AUTOINCREMENT,'
  +MealStatus.elements.locked + ' INTEGER,'
  +MealStatus.elements.cooked + ' INTEGER,'
  ');';

export const createTableRecipe_Detail = `
CREATE TABLE IF NOT EXISTS `+RecipeDetail.tablename+` (`
  +RecipeDetail.elements.id         +' INTEGER PRIMARY KEY AUTOINCREMENT,'
  +RecipeDetail.elements.materialId +' INTEGER,'
  +RecipeDetail.elements.needNum    +' INTEGER,'
  `);`;

export const createTableMaterial = `
CREATE TABLE IF NOT EXISTS `+Table_Material+` (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  Name TEXT,
  Pass2Photo TEXT,
  Stock INTEGER
);
`;

export const createTablePhoto = `
CREATE TABLE IF NOT EXISTS `+Table_Photo+` (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  RecipeId INTEGER,
  BadthId INTEGER,
  MealStatusId INTEGER,
  Pass2Photo TEXT
);
`;