//SQL Funcs
export const Blank = ' ';
export const InsertQuery = 'INSERT INTO ';
export const values = ' VALUES ';
export const DropTableQuery = 'drop table IF EXISTS ';

class MealementText{
  static id = 'id';
  static recipeId = 'recipeId';
  static badthId = 'badthId';
  static mealStatusId = 'mealStatusId';
  static pass2Photo = 'pass2Photo';
};
export class MealElement{
  id;
  recipeId;
  badthId;
  mealStatusId;
  pass2Photo;
};
export class Meal {
  static tablename = 'Meal';
  static elements = MealementText;
};
class BadgeElementText{
  static id = 'id';
  static name = 'name';
  static pass2Photo = 'pass2Photo';
  static isHave = 'IsHave';
};

export class BadgeElement{
  id;
  name;
  pass2Photo;
  isHave;
};

export class Badge {
    static tablename = 'Badge';
    static elements = BadgeElementText;
};

class MelaStatusElementText{
  static id = 'id';
  static locked = 'locked';
  static cooked = 'cooked';
};

export class MelaStatusElement{
  id;
  locked;
  cooked;
};

export class MealStatus{
  static tablename = 'MealStatus';
  static elements = MelaStatusElementText;
}

class RecipeDetailElementText{
  static id = 'id';
  static materialId = 'materialId';
  static needNum = 'needNum';
}

export class RecipeDetailElement{
  id;
  materialId;
  needNum;
}

export class RecipeDetail{
  static tablename = 'RecipeDatail';
  static elements = RecipeDetailElementText;
}

class MaterialElementText{
  static id = 'id';
  static name = 'name';
  static pass2Photo = 'pass2photo';
  static stock = 'stock';
}

export class MaterialElement{
  id;
  name;
  pass2Photo;
  stock;
}

export class Material{
  static tablename = 'Material';
  static elements = MaterialElementText;
}

class MaterialPhotoRelationElemantText{
  static materialId = 'MaterialId';
  static PhotoId = 'PhotoId';
}
export class MaterialPhotoRelationElemant{
  materialId;
  PhotoId;
}
export class MaterialPhotoRelation{
  static tablename = 'MaterialPhotoRelation';
  static elements = MaterialPhotoRelationElemantText;
}

class PhotoElementText{
  static id = 'id';
  static name = 'name';
  static ratitude = 'ratitude';
  static longitude = 'longitude';
  static pass2Photo = 'pass2Photo';
  static visited = 'visited';
}
export class PhotoElement{
  id;
  name;
  ratitude;
  longitude;
  pass2Photo;
  visited;
}

export class Photo{
  static tablename = 'Photo';
  static elements = PhotoElementText;
}
// IF NOT EXISTS
// テーブルを作成するクエリ
export const createTableBadge = 
'CREATE TABLE IF NOT EXISTS '+Badge.tablename+' ('
  +Badge.elements.id          +  ' INTEGER PRIMARY KEY AUTOINCREMENT,'
  +Badge.elements.name        +  ' TEXT,'
  +Badge.elements.isHave      +  ' INTEGER,'
  +Badge.elements.pass2Photo  +  ' TEXT'
  +');';

export const createTableMeal = 
`CREATE TABLE IF NOT EXISTS `+Meal.tablename+` (`
    +Meal.elements.id           + ' INTEGER PRIMARY KEY AUTOINCREMENT,'    
    +Meal.elements.recipeId     + ' INTEGER,'
    +Meal.elements.badthId      + ' INTEGER,'
    +Meal.elements.mealStatusId + ' INTEGER,'
    +Meal.elements.pass2Photo   + ' TEXT'
    +');';

export const createTableMeal_Status = 
`CREATE TABLE IF NOT EXISTS `+MealStatus.tablename+` (`
  +MealStatus.elements.id     + ' INTEGER PRIMARY KEY AUTOINCREMENT,'
  +MealStatus.elements.locked + ' INTEGER,'
  +MealStatus.elements.cooked + ' INTEGER'
  +');';

export const createTableRecipe_Detail = 
`CREATE TABLE IF NOT EXISTS `+RecipeDetail.tablename+` (`
  +RecipeDetail.elements.id         +' INTEGER PRIMARY KEY AUTOINCREMENT,'
  +RecipeDetail.elements.materialId +' INTEGER,'
  +RecipeDetail.elements.needNum    +' INTEGER'
  +`);`;

export const createTableMaterial = 
'CREATE TABLE IF NOT EXISTS '+Material.tablename+` (`
  +Material.elements.id         + ' INTEGER PRIMARY KEY AUTOINCREMENT,'
  +Material.elements.name       + ' TEXT,'
  +Material.elements.pass2Photo + ' TEXT,'
  +Material.elements.stock      + ' INTEGER'
  +');';

  export const createTableMaterialPhotoRelation = 
`CREATE TABLE IF NOT EXISTS `+MaterialPhotoRelation.tablename+` (`
  +MaterialPhotoRelation.elements.materialId  + ' INTEGER,'
  +MaterialPhotoRelation.elements.PhotoId     + ' INTEGER'
  +');';


export const createTablePhoto = 
`CREATE TABLE IF NOT EXISTS `+Photo.tablename+` (`
  +Photo.elements.id +' INTEGER PRIMARY KEY AUTOINCREMENT,'
  +Photo.elements.name        + ' TEXT,'
  +Photo.elements.ratitude    + ' INTEGER,'
  +Photo.elements.longitude   + ' INTEGER,'
  +Photo.elements.pass2Photo  + ' TEXT,'
  +Photo.elements.visited     + ' INTEGER'
  +');';