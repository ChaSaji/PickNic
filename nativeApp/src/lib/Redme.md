`dataBaseHelper`の使い方<br>
# 目次
-[概要](#about)<br>
-[Debug](#Debug)<br>
-[各ファイルについて](#各ファイルについて)<br>
-[データベースのデータ型について](#データベースのデータ型について)<br>
-[各関数について](#各関数について)

# about
`dataBaseHelper.js`が処理の記述部分である.<br>
`dataBaseHelper.js`は,`databaseQueryText.js`と`dataBaseInit.js`を読み込んで起動する.<br>
`databaseQueryText.js`は,基本的には変更しない<br>
`dataBaseInit.js`は`Excel`ファイルを用いた初期化を行う<br>
詳しい利用法については`dbInittool/Redme.md`を参照のこと

# Debug
[databaseQueryText.js](#databaseQueryText.js)の`const debugDataBaseLevel`を変更することで、コンソールに表示する情報を指定することが出来る。
<br>0:エラー、警告のみ
<br>1:実際に入力されたQueryや選択されているテーブルの情報
<br>2:関数内で戻り値の情報

# 各ファイルについて<br>
-[dataBaseHelper.js](#dataBaseHelper.js)<br>
-[databaseQueryText.js](#databaseQueryText.js)<br>
-[dataBaseInit.js](#dataBaseInit.js)<br>
## dataBaseHelper.js
データベースの処理に関わる各関数が記載されている.
[各関数について](#各関数について)を参照

## databaseQueryText.js
データベースの処理に必要なコマンドを`const`型で保持している.
加えて,各テーブルのデータ型やカラム名を保存している.
`{テーブル名}.name`にテーブル名を`{テーブル名}.{テーブル名}ElementKey`に各カラム名を,`{テーブル名}Element`にデータ型を宣言している.

例として,`Badge`については次のように記載している.
```c
class BadgeElementKey{
  static id = PrimaryKey;
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
    static elementsKey = BadgeElementKey;
};
```
`createTableテーブル名`は,テーブルを作成するためのコマンドを`string`で保存している.
## dataBaseInit.js
`dbInittool/DbInit.py`により更新される.
データベースの初期値が格納される.
# データベースのデータ型について<br>

## sqliteの型
`Sqlite`のデータ型は以下の5つである
(https://www.sqlite.org/datatype3.html)
|データ型|説明|
|:------|:---------------------------------|
|NULL|値は NULL 値|
|INTEGER|値は符号付き整数で,値の大きさに応じて 0,1,2,3,4,6,または 8 バイトで格納される.<br>指数表記を用いない小数点以下の値を保持できる.例として1.0*10^(-3)は無理でも0.0010は保持できる|
|REAL|値は浮動小数点値であり,8 バイトの IEEE 浮動小数点数として格納される.|
|TEXT|値はテキスト文字列で,データベース エンコーディング (UTF-8,UTF-16BE,または UTF-16LE) を使用して保存される.|
|BLOB|値はデータの塊であり,入力されたとおりに保存される.|

今回は,INTEGERとTEXTのみを用いる.
## 各テーブルの要素と型
**Badge**
|要素名|データ型|説明|
|:------|:--------------|:--------------|
|id |INTEGER| PRIMARY KEY AUTOINCREMENT|
|name |TEXT|バッジ名|
|IsHave |INTEGER|保持しているか0か1の入力を想定|
|pass2Photo|TEXT|画像へのパス(url)も入力可能|
  
**Material**
|要素名|データ型|説明|
|:------|:--------------|:--------------|
 |id |INTEGER| PRIMARY KEY AUTOINCREMENT
 |name| TEXT|材料名|
 |pass2photo| TEXT|画像へのパス(url)も入力可能|
 |stock| INTEGER|所有数|

**MaterialPhotoRelation**
|要素名|データ型|説明|
|:------|:--------------|:--------------|
|MaterialId |INTEGER|対応するMaterialのID|
|photoId    |INTEGER|対応するPhotoのID|

 **Meal**
|要素名|データ型|説明|
|:------|:--------------|:--------------|
|id |INTEGER| PRIMARY KEY AUTOINCREMENT|
|recipeId     |INTEGER  |対応するRecipeDetailのID|
|badgeId      |INTEGER  |対応するBadgeのID|
|mealStatusId |INTEGER  |対応するMealStatusのID|
|pass2Photo   |TEXT     |画像へのパス(url)も入力可能|


**MealStatus**
|要素名|データ型|説明|
|:------|:--------------|:--------------|
|id |INTEGER| PRIMARY KEY AUTOINCREMENT|
|locked| INTEGER|解放しているか,0か１を保持|
|cooked| INTEGER|調理しているか,0か１を保持|

**Photo**
|要素名|データ型|説明|
|:------|:--------------|:--------------|
|id         |INTEGER  |PRIMARY KEY AUTOINCREMENT|
|name       |TEXT     |写真の名前(削除の可能性あり)|
|ratitude   |INTEGER  |緯度(指数表記を使わないこと)|
|longitude  |INTEGER  |経度(指数表記を使わないこと)|
|pass2Photo |TEXT     |画像へのパス(url)も入力可能|
|visited    |INTEGER  |訪れているか,0か１を保持|

**RecipeDetail**
|要素名|データ型|説明|
|:------|:--------------|:--------------|
|id         |INTEGER |PRIMARY KEY AUTOINCREMENT|
|materialId |INTEGER |対応するMaterialのID|
|needNum    |INTEGER |必要数|

## 本プロジェクトで用いるテーブルと型

# 各関数について<br>
-[関数の呼び出し方式](#関数の呼び出し方式)
-[CreateAndInitTableIfNotExist()](#CreateAndInitTableIfNotExist())<br>
-[CreateAllTable()](#CreateAllTable())<br>
-[InitDatabaseTable()](#InitDatabaseTable())<br>
-[insert_item(Table, InsertItemItem)](#insert_item)<br>
-[update_item(Table, InsertItemItem)](#update_item)
-[DropAllTable()](#DropAllTable())<br>
-[getTables()](#gettables)<br>

## 関数の呼び出し方式
データベースへのアクセスはすべて非同期で行われる。
そのため例として`functionDB1()`実行後`functionDB2()`を実行したい場合
```c
functionDB1();
functionDB2();
```
と記述すると`functionDB1()`の処理が完了する前に`functionDB2()`の処理を開始する可能性がある。
<br>そのため以下のように`await`を用いるか`.then=()=>`を用いるかして、順序を明示的に指定する必要がある。
```c
await functionDB1();
await functionDB2();
```
```c
functionDB1().then=()=>{
  functionDB2();
}
```
## CreateAndInitTableIfNotExist()
アプリ起動時に起動を想定している。
`'SELECT name FROM sqlite_master WHERE type="table";'`コマンドにより現在のテーブル数を取得し、その数が`1`の場合管理料の初期テーブルのみしか存在しないので、[InitDatabaseTable()](#InitDatabaseTable())を起動する.
現在は`APP.js`の`function App()`内で呼び出されている。
## CreateAllTable()
すべてのテーブルを作成する.<br>
作成するテーブルの要素の定義は`databaseQueryText.js`で行う.

## InitDatabaseTable()
[DropAllTable()](#DropAllTable())
ですべてのデータを削除した後[CreateAllTable()](#CreateAllTable())でテーブルを新規作成する.<br>
その後,`dataBaseInit.js`の情報に基づき,DBの初期値を更新する.<br>
excelファイルを変更した場合は,`dbInittool/DbInit.py`を実行して,`dataBaseInit.js`を更新する.

## insert_item(Table, InsertItemItem)
`Table:string tablaname`で指定されたテーブルに`InsertItemItem`を新規追加する.<br>
この時`id`を指定してもテーブルにとって最新の値に上書きされる.`Table`が登録されていない場合`console`に警告を出す.
<br>**使用方法**<br>
`badge`を例に使用方法を説明する.
以下に使用法を示す.
[databaseQueryText.js](#databasequerytextjs)から任意の`テーブル名Elemnt()`を`new`で取得する.<br>
次に,各値に適当な値を入れる.型については[各テーブルの要素と型](#各テーブルの要素と型)を参照
<br>
次に`insert_item`を呼び出す.この時テーブル名として`Badge.tablename`を用いる.
追加されたアイテムの`id`の処理は`/*ここにIDを用いた処理を記述*/`内で行う.
```c

    badge = new BadgeElement();
    badge.name = "BadgeName";
    badge.pass2Photo = "pass2Photo/x.png";
    badge.isHave = 1;
    insert_item(Badge.tablename, badge)
      .then((id) => {
        /*ここにIDを用いた処理を記述*/
        console.log("budge id = " + id);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
```
## update_item(Table, updateItemItem)
`Table:string tablaname`で指定されたテーブルに`InsertItemItem`を更新する.
<br>更新する情報はIDで指定する.`Table`が登録されていない場合`console`に警告を出す.<br>`MaterialPhotoRelation`については,[insert_item](#insert_item)で新規作成すること.

<br>**使用方法**<br>
`badge`を例に使用方法を説明する.
以下に使用法を示す.
[fetchData](#fetchData),[selectData](#selectData)などを用いて既存の値を取得する.<br>
次に,各値に適当な値を入れる.`id`については変更したい項目の`id`を利用する.型については[各テーブルの要素と型](#各テーブルの要素と型)を参照
<br>
次に`update_item`を呼び出す.この時テーブル名として`Badge.tablename`を用いる.
```c
badge.name = "BadgeUpdated";
badge.pass2Photo = "pass2Photo/BadgeUpdated.png";
badge.isHave = 0;
update_item(Badge.tablename, badge);
```

## fetchData(Tablename, ...args)
`Tablename`で指定したテーブルから任意個の`...args`に従いデータを取得する.<br>
`...args`はOptionであり,以下に従う.
|n個目|意味|データ型|入力の無い場合のデフォルト設定|
|:------|:--------------|:--------------|:--------------|
|offset|どのぐらい値を飛ばすか<br>100に設定すると101個目のデータから取得|uint|0|
|limit|いくつ以下のデータを取得するか|int|100|
|isDec|降順で取得するか|boolean|true|
|sortkey|何でソートするか(ElementKeyを使用)|string|PrimaryKey(id)|

**使用法**<br>
下の例では`Badge`を`name`で昇順にソートした後`101`番目から50個のデータを取得する.<br>
取得したデータは,`.then`内で扱う

```c
    fetchData(Badge.tablename, 100, 50, false, Badge.elementsKey.name)
      .then((data) => {
        /*ここで取得したデータを扱う*/
        console.log("Received data:5", data); // getData関数の戻り値を受け取り,出力
      })
      .catch((error) => {
        console.error("Error occurred:", error); // エラーが発生した場合はエラーメッセージを出力
      });
```
## selectData
`selectDataById(Tablename, ID)`,
`selectDataFromDb(QueryText)`,
`selectData(Tablename, ...args)`からなる関数群
<br>`selectDataById(Tablename, ID)`は,`Tablename`で指定したテーブルに対して,idで検索条件を指定.
(`MaterialPhotoRelation`については`materialId`を使用)
<br>`selectDataFromDb(QueryText)`は,Queryに用いるコマンドをテキストで直接入力する.レコードを戻り値として取得できる点で[ExecuteQuery](#ExecuteQuery(QueryText))と異なる.
<br>`selectData(Tablename, ...args)`は`Tablename`で指定したテーブルに対して`...args`で指定した条件で検索する.
<br>下のように指定すると`Badge`に対して,`name`が`山`を含み,`Id`が`7`以上の要素を名前順で降順にソートして取得できる.
```c
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
```
使用例は,次の通りであり,戻り値を扱う場合は`.then((data) => {/*ここ*/})`内で処理を行う.
```c
selectDataById(Badge.tablename, 2)
      .then((data) => {
        console.log("Received by ID:", data); // getData関数の戻り値を受け取り,出力
      })
      .catch((error) => {
        console.error("Error occurred:", error); // エラーが発生した場合はエラーメッセージを出力
      });
    selectDataByQueryText("select * from Badge where id >= 3;")
      .then((data) => {
        console.log("Received ByText:", data); // getData関数の戻り値を受け取り,出力
      })
      .catch((error) => {
        console.error("Error occurred:", error); // エラーが発生した場合はエラーメッセージを出力
      });
    selectData(
      Badge.tablename,
      Badge.elementsKey.name,
      Badge.elementsKey.id,
      RO.Biggerthan,
      5,
      OrderByQuery
    )
      .then((data) => {
        console.log("Received ByPlane:", data); // getData関数の戻り値を受け取り,出力
      })
      .catch((error) => {
        console.error("Error occurred:", error); // エラーが発生した場合はエラーメッセージを出力
      });
```
また,昇順降順を指定できる.
`selectDataAsc(Tablename, ...args)`と`selectDataDesc(Tablename, ...args)`がある.

## deleteData
deleteDataは`deleteDataById(Tablename, ID)`,`deleteData(Tablename, ...args)`からなる関数群である.<br>
`selectDataFromDb(QueryText)`にあたる機能は[ExecuteQuery](#ExecuteQuery)が内包する
<br>`deleteDataById(Tablename, ID)`は`Tablename`で指定されたテーブルから`ID`で指定されたアイテムを削除する.(`MaterialPhotoRelation`については`materialId`を使用)
<br> `deleteData(Tablename, ...args)`は`selectData(Tablename, ...args)`と同様の方式で条件を指定してアイテムを削除する.
<br>**使用例**<br>
Badgeから`id=2`と`name`に山が含まれる`id>=7`を削除
```c
    deleteDataById(Badge.tablename, 2);
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
```
## ExecuteQuery(QueryText)
任意の`QueryText`を`string`で実行する.ただし,レコードを戻り値として受け取れない.
<br>使用例
<br>Badgeから`id`2以上の値を削除
```c
ExecuteQuery("delete from Badge where id >= 2;");
```


## DropAllTable()
すべてのデータベーステーブルを削除する.テーブルそのもの削除するので,テーブルについてのすべての処理が実行不可能になる([getTables()](#gettables)をの除く).
新規の処理の前には[CreateAllTable()](#CreateAllTable())を動かす必要がある

## getTables()
デバック用の関数で,今現在存在するテーブルを取得する.
データベースがデータベースを管理するために使っているテーブルにアクセスする.