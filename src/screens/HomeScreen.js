import React from "react";
import { Text, View, Button } from "react-native";
import {
  CreateAllTable, DropAllTable, getRecode,getTables, insert_item,update_item,fetchData, fetchDataAsJson
} from "../lib/dataBaseHander";
import { Badge, BadgeElement, Material, MaterialElement, MaterialPhotoRelation, MaterialPhotoRelationElemant, Meal,MealElement, MealStatus, MelaStatusElement, Photo, PhotoElement, RecipeDetail, RecipeDetailElement} from "../lib/databaseQueryText";

const HomeScreen = () => {
  // 関数Bを定義
  const functionA = () => {
    console.log("テーブルの作成");
    //DataBaseHander.MakeTable();
    CreateAllTable();
  };
  const functionB = () => {
    //console.log("アイテム追加テスト1");
    badge = new BadgeElement;
    badge.name = "1BadgeName";
    badge.pass2Photo = "pass2Photo/日本語テキスト1/x.png";badge.isHave = 1; 
    insert_item(Badge.tablename,badge);
    badge = new BadgeElement;
    badge.name = "4BadgeName";
    badge.pass2Photo = "pass2Photo/日本語テキスト2/x.png";badge.isHave = 0; 
    insert_item(Badge.tablename,badge);
    badge = new BadgeElement;
    badge.name = "2BadgeName";
    badge.pass2Photo = "pass2Photo/日本語テキスト3/x.png";badge.isHave = 1; 
    insert_item(Badge.tablename,badge);
    badge = new BadgeElement;
    badge.name = "3BadgeName";
    badge.pass2Photo = "pass2Photo/日本語テキスト4/x.png";badge.isHave = 0; 
    insert_item(Badge.tablename,badge);
    badge = new BadgeElement;
    badge.name = "5BadgeName";
    badge.pass2Photo = "pass2Photo/日本語テキスト4/x.png";badge.isHave = 1; 
    insert_item(Badge.tablename,badge);

    //console.log("アイテム追加テスト2");
    meal = new MealElement;    meal.recipeId = 123;meal.badthId=456;    mealStatusId=789;
    meal.pass2Photo="mealpass2Photo";
    insert_item(Meal.tablename,meal);
    //console.log("アイテム追加テスト3");
    mealstatus = new MelaStatusElement;
    mealstatus.locked = 0;mealstatus.cooked = 0;
    insert_item(MealStatus.tablename,mealstatus);
    //console.log("アイテム追加テスト4");
    recipe = new RecipeDetailElement;
    recipe.materialId = 321;recipe.needNum = 10;
    insert_item(RecipeDetail.tablename,recipe);
    material = new MaterialElement
    material.name = "material name";material.pass2Photo = "pass/To/photo/matarial.jpg";material.stock = 468;
    insert_item(Material.tablename,material);
    relation = new MaterialPhotoRelationElemant;
    relation.materialId = 194;relation.PhotoId=514;
    insert_item(MaterialPhotoRelation.tablename,relation);
    photo = new PhotoElement
    photo.name = "photoName";photo.ratitude = 135.12345678901234567890;
    photo.longitude = 35.12345678901234567890;photo.visited = 1;
    photo.pass2Photo = "photoPass";
    insert_item(Photo.tablename,photo);
  };
  const functionSeeAllItem = () =>{
    fetchData(Badge.tablename).then(data => {
      console.log('badge data:', data); // getData関数の戻り値を受け取り、出力
    })
    .catch(error => {
      console.error('Error occurred:', error); // エラーが発生した場合はエラーメッセージを出力
    });
    fetchData(MealStatus.tablename).then(data => {
      console.log('meal_status data1:', data); // getData関数の戻り値を受け取り、出力
    })
    .catch(error => {
      console.error('Error occurred:', error); // エラーが発生した場合はエラーメッセージを出力
    });
    fetchData(Meal.tablename).then(data => {
      console.log('Meal:', data); // getData関数の戻り値を受け取り、出力
    })
    .catch(error => {
      console.error('Error occurred:', error); // エラーが発生した場合はエラーメッセージを出力
    });
    fetchData(RecipeDetail.tablename).then(data => {
      console.log('RecipeDetail:', data); // getData関数の戻り値を受け取り、出力
    })
    .catch(error => {
      console.error('Error occurred:', error); // エラーが発生した場合はエラーメッセージを出力
    });
    fetchData(Material.tablename).then(data => {
      console.log('Material:', data); // getData関数の戻り値を受け取り、出力
    })
    .catch(error => {
      console.error('Error occurred:', error); // エラーが発生した場合はエラーメッセージを出力
    });
    fetchData(MaterialPhotoRelation.tablename).then(data => {
      console.log('MaterialPhotoRelation', data); // getData関数の戻り値を受け取り、出力
    })
    .catch(error => {
      console.error('Error occurred:', error); // エラーが発生した場合はエラーメッセージを出力
    });
    fetchData(Photo.tablename).then(data => {
      console.log('Photo', data); // getData関数の戻り値を受け取り、出力
    })
    .catch(error => {
      console.error('Error occurred:', error); // エラーが発生した場合はエラーメッセージを出力
    });
  }
  const functionCheckSelect = () => {
    console.log("アイテム検索テスト");
    // 使用例
    fetchData(Badge.tablename).then(data => {
      console.log('Received data1:', data); // getData関数の戻り値を受け取り、出力
    })
    .catch(error => {
      console.error('Error occurred:', error); // エラーが発生した場合はエラーメッセージを出力
    });
    fetchData(Badge.tablename,2).then(data => {
      console.log('Received data2:', data); // getData関数の戻り値を受け取り、出力
    })
    .catch(error => {
      console.error('Error occurred:', error); // エラーが発生した場合はエラーメッセージを出力
    });
    fetchData(Badge.tablename,2,3).then(data => {
      console.log('Received data3:', data); // getData関数の戻り値を受け取り、出力
    })
    .catch(error => {
      console.error('Error occurred:', error); // エラーが発生した場合はエラーメッセージを出力
    });
    fetchData(Badge.tablename,0,100,false).then(data => {
      console.log('Received data4:', data); // getData関数の戻り値を受け取り、出力
    })
    .catch(error => {
      console.error('Error occurred:', error); // エラーが発生した場合はエラーメッセージを出力
    });
    fetchData(Badge.tablename,0,100,false,Badge.elementsKey.name).then(data => {
      console.log('Received data:5', data); // getData関数の戻り値を受け取り、出力
    })
    .catch(error => {
      console.error('Error occurred:', error); // エラーが発生した場合はエラーメッセージを出力
    });
    console.log("*************************Json*****************************");
    fetchDataAsJson(Badge.tablename).then(data => {
      console.log('Received data:', data); // getData関数の戻り値を受け取り、出力
    })
    .catch(error => {
      console.error('Error occurred:', error); // エラーが発生した場合はエラーメッセージを出力
    });
    fetchDataAsJson(Badge.tablename,2).then(data => {
      console.log('Received data:', data); // getData関数の戻り値を受け取り、出力
    })
    .catch(error => {
      console.error('Error occurred:', error); // エラーが発生した場合はエラーメッセージを出力
    });
    fetchDataAsJson(Badge.tablename,2,3).then(data => {
      console.log('Received data:', data); // getData関数の戻り値を受け取り、出力
    })
    .catch(error => {
      console.error('Error occurred:', error); // エラーが発生した場合はエラーメッセージを出力
    });
    fetchDataAsJson(Badge.tablename,0,100,false).then(data => {
      console.log('Received data:', data); // getData関数の戻り値を受け取り、出力
    })
    .catch(error => {
      console.error('Error occurred:', error); // エラーが発生した場合はエラーメッセージを出力
    });
    fetchDataAsJson(Badge.tablename,0,100,false,Badge.elementsKey.name).then(data => {
      console.log('Received data:', data); // getData関数の戻り値を受け取り、出力
    })
    .catch(error => {
      console.error('Error occurred:', error); // エラーが発生した場合はエラーメッセージを出力
    });
    
  };
  const functionUpdate = () =>{
    console.log("アイテム更新テスト");
    badge = new BadgeElement;
    badge.id = 1;
    badge.name = "BadgeUpdated";badge.pass2Photo = "pass2Photo/日本語テキスト/BadgeUpdated.png";badge.isHave = 0; 
    update_item(Badge.tablename,badge);
    meal = new MealElement;    
    meal.id = 1;
    meal.recipeId = 111;
    meal.badthId=222;    
    meal.mealStatusId = 333;
    meal.pass2Photo="meal/pass2Photo/updated.btm";
    update_item(Meal.tablename,meal);
    mealstatus = new MelaStatusElement;
    mealstatus.id = 1;
    mealstatus.locked = 1;mealstatus.cooked = 1;
    update_item(MealStatus.tablename,mealstatus);
    recipe = new RecipeDetailElement;
    recipe.id =1
    recipe.materialId = 444;recipe.needNum = 55;
    update_item(RecipeDetail.tablename,recipe);
    material = new MaterialElement
    material.id = 1;
    material.name = "updated material";material.pass2Photo = "pass/To/photo/Is/Updated.jpg";material.stock = 555;
    update_item(Material.tablename,material);
    /*要望があれば、実装しますが、おそらく削除と作成があれば必要十分だと思います
    relation = MaterialPhotoRelationElemant;
    relation.materialId = "194";relation.PhotoId="514";
    update_item(MaterialPhotoRelation.tablename,relation);
    */
    photo = new PhotoElement
    photo.id = 1;
    photo.name = "Updated";photo.ratitude = -135.12345678901234567890;
    photo.longitude = -35.12345678901234567890;photo.visited = 0;
    photo.pass2Photo = "photoPass/Updated.svg";
    update_item(Photo.tablename,photo);
    
  }
  const functionD = () => {
    console.log("テーブルを削除します");
    DropAllTable();
  };
  const functionE = () => {
    console.log("テーブルの確認をおこないます");
    getTables()
  .then(tables => {
    console.log('テーブル一覧:', tables);
  })
  .catch(error => {
    console.error('テーブル一覧を取得できませんでした:', error);
  });
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>ホーム</Text>
      <Button title="MakeTableItem" onPress={functionA} />
      <Button title="AddItem" onPress={functionB} />
      <Button title="SeeAllItem" onPress={functionSeeAllItem} />
      <Button title="CheckSelect" onPress={functionCheckSelect} />
      <Button title="UpDateItem" onPress={functionUpdate} />
      <Button title="DropTable" onPress={functionD} />
      <Button title="CheckTable" onPress={functionE} />
    </View>
  );
};

export default HomeScreen;
