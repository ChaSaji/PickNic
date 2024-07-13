import React from "react";
import { View, Button, StyleSheet } from "react-native";
import {
  CreateAllTable,
  dropAllTable,
  getTables,
  insert_item,
  update_item,
  fetchData,
  get_user,
  get_user_id,
  selectDataById,
  selectDataByQueryText,
  selectData,
  selectDataAsc,
  selectDataDesc,
  ExecuteQuery,
  InitDatabaseTable,
  deleteDataById,
  deleteData,
  clear_user,
} from "../lib/dataBaseHelper";
import {
  RO,
  User,
  UserElement,
  Badge,
  BadgeElement,
  Material,
  MaterialElement,
  MaterialPhotoRelation,
  MaterialPhotoRelationElemant,
  Meal,
  MealElement,
  MealStatus,
  MelaStatusElement,
  Photo,
  PhotoElement,
  RecipeDetail,
  RecipeDetailElement,
  parf,
  parb,
  OrderByQuery,
  Descending_order,
  Place,
  PlaceElement,
} from "../lib/databaseQueryText";

const DbScreen = () => {
  // 関数Bを定義
  const functionA = () => {
    console.log("テーブルの作成");
    //DataBaseHander.MakeTable();
    CreateAllTable();
  };
  const functionInitDataBase = () => {
    InitDatabaseTable();
  };
  const functionB = () => {
    //console.log("アイテム追加テスト1");
    badge = new BadgeElement();
    badge.name = "1BadgeName";
    badge.pass2Photo = "pass2Photo/日本語テキスト1/x.png";
    badge.isHave = 1;
    insert_item(Badge.tablename, badge)
      .then((id) => {
        /*ここにIDを用いた処理を記述*/
        console.log("budge id = " + id);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    /*
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
      
      badge = new BadgeElement;
      badge.name = "山";
      badge.pass2Photo = "pass2Photo/日本語テキスト4/x.png";badge.isHave = 1; 
      insert_item(Badge.tablename,badge);
      
      badge = new BadgeElement;
      badge.name = "山田";
      badge.pass2Photo = "pass2Photo/日本語テキスト4/x.png";badge.isHave = 1; 
      insert_item(Badge.tablename,badge);
      
      badge = new BadgeElement;
      badge.name = "野山";
      badge.pass2Photo = "pass2Photo/日本語テキスト4/x.png";badge.isHave = 1; 
      insert_item(Badge.tablename,badge);
      
      badge = new BadgeElement;
      badge.name = "山山";
      badge.pass2Photo = "pass2Photo/日本語テキスト4/x.png";badge.isHave = 1; 
      insert_item(Badge.tablename,badge);
      
      badge = new BadgeElement;
      badge.name = "川山海";
      badge.pass2Photo = "pass2Photo/日本語テキスト4/x.png";badge.isHave = 1; 
      insert_item(Badge.tablename,badge);
      */
    badge = new BadgeElement();
    badge.name = "ヤマ梨";
    badge.pass2Photo = "pass2Photo/日本語テキスト4/x.png";
    badge.isHave = 1;
    insert_item(Badge.tablename, badge)
      .then((id) => {
        /*ここにIDを用いた処理を記述*/
        console.log("budge id = " + id);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    //console.log("アイテム追加テスト2");
    meal = new MealElement();
    meal.mealId = 123;
    meal.badgeId = 456;
    meal.mealStatusId = 789;
    meal.pass2Photo = "mealpass2Photo";
    meal.name = "meal name";
    insert_item(Meal.tablename, meal)
      .then((id) => {
        /*ここにIDを用いた処理を記述*/
        console.log("id = " + id);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    //console.log("アイテム追加テスト3");
    mealstatus = new MelaStatusElement();
    mealstatus.locked = 0;
    mealstatus.cooked = 0;
    insert_item(MealStatus.tablename, mealstatus)
      .then((id) => {
        /*ここにIDを用いた処理を記述*/
        console.log("id = " + id);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    //console.log("アイテム追加テスト4");
    recipe = new RecipeDetailElement();
    recipe.mealId = 1;
    recipe.materialId = 321;
    recipe.needNum = 10;
    insert_item(RecipeDetail.tablename, recipe)
      .then((id) => {
        /*ここにIDを用いた処理を記述*/
        console.log("id = " + id);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    material = new MaterialElement();
    material.name = "material name";
    material.pass2Photo = "pass/To/photo/matarial.jpg";
    material.stock = 468;
    material.colorId = 2;
    insert_item(Material.tablename, material)
      .then((id) => {
        /*ここにIDを用いた処理を記述*/
        console.log("id = " + id);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    relation = new MaterialPhotoRelationElemant();
    relation.materialId = 194;
    relation.photoId = 514;
    insert_item(MaterialPhotoRelation.tablename, relation)
      .then((id) => {
        /*ここにIDを用いた処理を記述*/
        console.log("id = " + id);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    place = new PlaceElement();
    place.name = "佐治県"
    place.visited = 0;
    insert_item(Place.tablename, place)
      .then((id) => {
        /*ここにIDを用いた処理を記述*/
        console.log("place id = " + id);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    photo = new PhotoElement();
    photo.name = "photoName";
    photo.ratitude = 135.1234567890123456789;
    photo.longitude = 35.1234567890123456789;
    photo.visited = 1;
    photo.pass2Photo = "photoPass";
    insert_item(Photo.tablename, photo)
      .then((id) => {
        /*ここにIDを用いた処理を記述*/
        console.log("id = " + id);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const functionSeeAllItem = () => {
    fetchData(Badge.tablename)
      .then((data) => {
        console.log("badge data:", data); // getData関数の戻り値を受け取り、出力
      })
      .catch((error) => {
        console.error("Error occurred:", error); // エラーが発生した場合はエラーメッセージを出力
      });
    fetchData(MealStatus.tablename)
      .then((data) => {
        console.log("meal_status data1:", data); // getData関数の戻り値を受け取り、出力
      })
      .catch((error) => {
        console.error("Error occurred:", error); // エラーが発生した場合はエラーメッセージを出力
      });
    fetchData(Meal.tablename)
      .then((data) => {
        console.log("Meal:", data); // getData関数の戻り値を受け取り、出力
      })
      .catch((error) => {
        console.error("Error occurred:", error); // エラーが発生した場合はエラーメッセージを出力
      });
    fetchData(RecipeDetail.tablename)
      .then((data) => {
        console.log("RecipeDetail:", data); // getData関数の戻り値を受け取り、出力
      })
      .catch((error) => {
        console.error("Error occurred:", error); // エラーが発生した場合はエラーメッセージを出力
      });
    fetchData(Material.tablename)
      .then((data) => {
        console.log("Material:", data); // getData関数の戻り値を受け取り、出力
      })
      .catch((error) => {
        console.error("Error occurred:", error); // エラーが発生した場合はエラーメッセージを出力
      });
    fetchData(MaterialPhotoRelation.tablename)
      .then((data) => {
        console.log("MaterialPhotoRelation", data); // getData関数の戻り値を受け取り、出力
      })
      .catch((error) => {
        console.error("Error occurred:", error); // エラーが発生した場合はエラーメッセージを出力
      });
      fetchData(Place.tablename)
      .then((data) => {
        console.log("Place", data); // getData関数の戻り値を受け取り、出力
      })
      .catch((error) => {
        console.error("Error occurred:", error); // エラーが発生した場合はエラーメッセージを出力
      });  
    fetchData(Photo.tablename)
      .then((data) => {
        console.log("Photo", data); // getData関数の戻り値を受け取り、出力
      })
      .catch((error) => {
        console.error("Error occurred:", error); // エラーが発生した場合はエラーメッセージを出力
      });
  };
  const functionCheckRecode = () => {
    console.log("取得関数テスト");
    // 使用例
    fetchData(Badge.tablename)
      .then((data) => {
        console.log("Received data1:", data); // getData関数の戻り値を受け取り、出力
      })
      .catch((error) => {
        console.error("Error occurred:", error); // エラーが発生した場合はエラーメッセージを出力
      });
    fetchData(Badge.tablename, 2)
      .then((data) => {
        console.log("Received data2:", data); // getData関数の戻り値を受け取り、出力
      })
      .catch((error) => {
        console.error("Error occurred:", error); // エラーが発生した場合はエラーメッセージを出力
      });
    fetchData(Badge.tablename, 2, 3)
      .then((data) => {
        console.log("Received data3:", data); // getData関数の戻り値を受け取り、出力
      })
      .catch((error) => {
        console.error("Error occurred:", error); // エラーが発生した場合はエラーメッセージを出力
      });
    fetchData(Badge.tablename, 0, 100, false)
      .then((data) => {
        console.log("Received data4:", data); // getData関数の戻り値を受け取り、出力
      })
      .catch((error) => {
        console.error("Error occurred:", error); // エラーが発生した場合はエラーメッセージを出力
      });
    fetchData(Badge.tablename, 0, 100, false, Badge.elementsKey.name)
      .then((data) => {
        console.log("Received data:5", data); // getData関数の戻り値を受け取り、出力
      })
      .catch((error) => {
        console.error("Error occurred:", error); // エラーが発生した場合はエラーメッセージを出力
      });
    
  };
  const functionUpdate = () => {
    console.log("アイテム更新テスト");
    badge = new BadgeElement();
    badge.id = 1;
    badge.name = "BadgeUpdated";
    badge.pass2Photo = "pass2Photo/日本語テキスト/BadgeUpdated.png";
    badge.isHave = 0;
    update_item(Badge.tablename, badge);
    meal = new MealElement();
    meal.id = 1;
    meal.badgeId = 222;
    meal.mealStatusId = 333;
    meal.pass2Photo = "meal/pass2Photo/updated.btm";
    meal.name = "meal name updated";
    update_item(Meal.tablename, meal);
    mealstatus = new MelaStatusElement();
    mealstatus.id = 1;
    mealstatus.locked = 1;
    mealstatus.cooked = 1;
    update_item(MealStatus.tablename, mealstatus);
    /*要望があれば、実装しますが、おそらく削除と作成があれば必要十分だと思います
    recipe = new RecipeDetailElement();
    recipe.id = 1;
    recipe.materialId = 444;
    recipe.needNum = 55;
    update_item(RecipeDetail.tablename, recipe);
    */
    material = new MaterialElement();
    material.id = 1;
    material.mealId = 1;
    material.name = "updated material";
    material.pass2Photo = "pass/To/photo/Is/Updated.jpg";
    material.stock = 555;
    material.colorId = 3;
    update_item(Material.tablename, material);
    /*要望があれば、実装しますが、おそらく削除と作成があれば必要十分だと思います
      relation = MaterialPhotoRelationElemant;
      relation.materialId = "194";relation.photoId="514";
      update_item(MaterialPhotoRelation.tablename,relation);
      */
      place = new PlaceElement();
      place.id = 1;
      place.name = "茶匙県";
      place.visited = 1;
      update_item(Place.tablename,place);
    photo = new PhotoElement();
    photo.id = 1;
    photo.name = "Updated";
    photo.ratitude = -135.1234567890123456789;
    photo.longitude = -35.1234567890123456789;
    photo.visited = 0;
    photo.pass2Photo = "photoPass/Updated.svg";
    update_item(Photo.tablename, photo);
  };
  const functionCheckSelect = () => {
    console.log("検索関数テスト");
    selectDataById(RecipeDetail.tablename,1).then((data) => {
      console.log("RecipeDetail Received by ID:", data); // getData関数の戻り値を受け取り、出力
    })
    .catch((error) => {
      console.error("Error occurred:", error); // エラーが発生した場合はエラーメッセージを出力
    });

    selectDataById(Badge.tablename, 2)
      .then((data) => {
        console.log("Received by ID:", data); // getData関数の戻り値を受け取り、出力
      })
      .catch((error) => {
        console.error("Error occurred:", error); // エラーが発生した場合はエラーメッセージを出力
      });
    selectDataByQueryText("select * from Badge where id >= 3;")
      .then((data) => {
        console.log("Received ByText:", data); // getData関数の戻り値を受け取り、出力
      })
      .catch((error) => {
        console.error("Error occurred:", error); // エラーが発生した場合はエラーメッセージを出力
      });
    selectData(
      Badge.tablename,
      Badge.elementsKey.name,
      RO.LIKE,
      parf,
      "山",
      parb,
      RO.AND,
      Badge.elementsKey.id,
      RO.Biggerthan,
      7,
      OrderByQuery,
      Badge.elementsKey.name,
      Descending_order
    )
      .then((data) => {
        console.log("Received ByPlane:", data); // getData関数の戻り値を受け取り、出力
      })
      .catch((error) => {
        console.error("Error occurred:", error); // エラーが発生した場合はエラーメッセージを出力
      });
    selectDataAsc(
      Badge.tablename,
      Badge.elementsKey.name,
      RO.LIKE,
      parf,
      "山",
      parb,
      RO.AND,
      Badge.elementsKey.id,
      RO.Biggerthan,
      7
    )
      .then((data) => {
        console.log("Received ByPlaneAsc:", data); // getData関数の戻り値を受け取り、出力
      })
      .catch((error) => {
        console.error("Error occurred:", error); // エラーが発生した場合はエラーメッセージを出力
      });
    selectDataDesc(
      Badge.tablename,
      Badge.elementsKey.name,
      RO.LIKE,
      parf,
      "山",
      parb,
      RO.AND,
      Badge.elementsKey.id,
      RO.Biggerthan,
      7
    )
      .then((data) => {
        console.log("Received ByPlaneDesc:", data); // getData関数の戻り値を受け取り、出力
      })
      .catch((error) => {
        console.error("Error occurred:", error); // エラーが発生した場合はエラーメッセージを出力
      });
  };
  const functionDelete = () => {
    console.log("要素削除テスト");
    deleteDataById(RecipeDetail.tablename, 1);
    deleteDataById(Badge.tablename, 2);
    ExecuteQuery("delete from Badge where id <= 2;");
    deleteData(
      Badge.tablename,
      Badge.elementsKey.name,
      RO.LIKE,
      parf,
      "山",
      parb,
      RO.AND,
      Badge.elementsKey.id,
      RO.Biggerthan,
      7
    );
  };
  const functionD = () => {
    console.log("テーブルを削除します");
    dropAllTable();
  };
  const functionE = () => {
    console.log("テーブルの確認をおこないます");
    getTables()
      .then((tables) => {
        console.log("テーブル一覧:", tables);
      })
      .catch((error) => {
        console.error("テーブル一覧を取得できませんでした:", error);
      });
  };
  const functionUserAdd = () => {
    console.log("ユーザの追加を行う");
    user = new UserElement();
    user.id="XXXXfasdfhajhfalhf"
    user.name = "1UserName";
    user.isAccessed = 1;
    insert_item(User.tablename, user)
      .then((id) => {
        /*ここにIDを用いた処理を記述*/
        console.log("budge id = " + id);
      })
      .catch((error) => {
        console.error("Error:", error);
    });
  };

  const functionGetUser= () => {
    console.log("ユーザの取得を行う");
    get_user().then((data) => {
      console.log("Received user:", data); // getData関数の戻り値を受け取り、出力
    })
    .catch((error) => {
      console.error("Error occurred:", error); // エラーが発生した場合はエラーメッセージを出力
    });

    get_user_id().then((data) => {
      console.log("Received user_id:", data); // getData関数の戻り値を受け取り、出力
    })
    .catch((error) => {
      console.error("Error occurred:", error); // エラーが発生した場合はエラーメッセージを出力
    });
  };

  const functionClearUser= () => {
    console.log("ユーザの削除を行う");
    clear_user().then((data) => {
      console.log("Received data:", data); // getData関数の戻り値を受け取り、出力
      
    get_user().then((data) => {
      console.log("Received user:", data); // getData関数の戻り値を受け取り、出力
    })
    .catch((error) => {
      console.error("Error occurred:", error); // エラーが発生した場合はエラーメッセージを出力
    });
    })
    .catch((error) => {
      console.error("Error occurred:", error); // エラーが発生した場合はエラーメッセージを出力
    });
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="MakeTableItem" onPress={functionA} />
      <Button title="InitDataBase" onPress={functionInitDataBase} />
      <Button title="AddItem" onPress={functionB} />
      <Button title="SeeAllItem" onPress={functionSeeAllItem} />
      <Button title="CheckRecode" onPress={functionCheckRecode} />
      <Button title="CheckSelectData" onPress={functionCheckSelect} />
      <Button title="UpDateItem" onPress={functionUpdate} />
      <Button title="DeleteItem" onPress={functionDelete} />
      <Button title="DropTable" onPress={functionD} />
      <Button title="CheckTable" onPress={functionE} />
      <Button title="AddUser" onPress={functionUserAdd} />
      <Button title="GetUser" onPress={functionGetUser} />
      <Button title="ClearUser" onPress={functionClearUser} />
      
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  itemrow: {
    flexDirection: "row",
    height: 120,
    width: "100%",
    margin: 5,
  },
  item: {
    height: 120,
    width: "31%",
    backgroundColor: "#FFE8AD",
    margin: 5,
    alignItems: "center",
  },
});

export default DbScreen;
