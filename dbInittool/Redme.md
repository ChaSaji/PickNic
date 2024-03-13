How to Use<br>
step1.dbInittoolに移動し， `pip install openpyxl`で `Python3`に`openpyxl`を`install`<br>
step2.`このプロジェクト/excels/`下にある*excelfiles*の内容を変更,**1行目の名前を変更しないように**<br>
step3.`python DbInit.py`で`DbInit.py`を実行<br>
step4.出来上がった`dataBaseInit.js`で`nativeApp/src/lib/dataBaseInit.js`が更新される<br>
step5.スマホ画面の`dataBaseHelper.InitDatabaseTable()`を実行で`データベース`初期化,`Bag`の`InitDataBase`から実行できる
***今後変更する可能性がある**