import sqlite3

processNum = 1 # 実行したい処理の番号，1 -> insert records, 2 -> update records, 3 -> delete redords, 4 -> drop table
userName = "saji" # 適当な名前にして
updateUserID = 3 # 更新したいユーザのID


# DBの作成orオープン
con = sqlite3.connect("userData.db")

# データベースを操作するためのカーソルを作成
cur = con.cursor()
 
# クエリ
CREATE_TABLE = "CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT);"
INSERT_RECORDS = "INSERT INTO user (name) VALUES (?);"
SELECT_RECORDS = "SELECT * FROM user;"
UPDATE_RECORDS = "UPDATE user SET name = ? WHERE id = ?;"
DELETE_RECORDS = "DELETE FROM user WHERE id = ?;"
DELETE_ALL_RECORDS = 'DELETE FROM user;'
DROP_TABLE = "DROP TABLE IF EXISTS user;"
# クエリ実行

# テーブル作成
cur.execute(CREATE_TABLE)
con.commit()

# データの作成
# ユーザネームを受け取る処理を記述
# ユーザIDを配布する処理を記述
if processNum == 1:
    cur.execute(INSERT_RECORDS, (userName,)) # ユーザーの名前をテーブルに入れる
    con.commit()
    # データ読み取り
    resValue = cur.execute(SELECT_RECORDS).fetchall()
    print(len(resValue))
    for value in resValue:
        print(value)

# データ更新
if processNum == 2:
    newName = "name update"
    userID = 1 # 更新したいユーザのIDを取得する処理をあとで記述する．
    cur.execute(UPDATE_RECORDS, (newName, updateUserID))
    con.commit()
    # 更新後のデータを読み取る
    resValue = cur.execute(SELECT_RECORDS)
    print("afterUpdate: ")
    for value in resValue:
        print(value)

if processNum == 3:
    # データの削除
    cur.execute(DELETE_RECORDS, (updateUserID, ))
    con.commit()
    # 削除後のデータ読み取り
    resValue = cur.execute(SELECT_RECORDS).fetchall()
    print("records after deleting: ")
    for value in resValue:
        print(value)

if processNum == 4:
    # テーブル削除
    cur.execute(DROP_TABLE)

cur.close()
con.close()

