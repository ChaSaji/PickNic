from sqlalchemy import create_engine, Column, Integer, String, Sequence
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import sqlalchemy
 
# データベースの設定
DATABASE_URL = "sqlite:///userData.db"
engine = create_engine(DATABASE_URL, echo=True) # SQLAlchemyが実行するSQL文全てを標準出力する
Base = sqlalchemy.orm.declarative_base()

# テーブルの定義
class User(Base):
    __tablename__ = 'user'
    id = Column(Integer, Sequence('user_id_seq'), primary_key=True)
    name = Column(String(50))

# データベースの作成
Base.metadata.create_all(engine)

# セッションの作成
Session = sessionmaker(bind=engine)
session = Session()

processNum = 4 # 実行したい処理の番号，1 -> insert records, 2 -> update records, 3 -> delete records, 4 -> drop table
userName = "saji" # 適当な名前にして
updateUserID = 2 # 更新したいユーザのID

if processNum == 1:
    # データの作成
    new_user = User(name=userName)
    session.add(new_user)
    session.commit()

    # データ読み取り
    users = session.query(User).all()
    print("len :" , len(users))
    for user in users:
        print(user.id, user.name)

elif processNum == 2:
    # データ更新
    newName = "name update"
    user_to_update = session.query(User).filter(User.id == updateUserID).first()
    if user_to_update:
        user_to_update.name = newName
        session.commit()
    else:
        print(f"No user found with ID {updateUserID}")

    # 更新後のデータ読み取り
    users = session.query(User).all()
    print("afterUpdate: ")
    for user in users:
        print(user.id, user.name)

elif processNum == 3:
    # データの削除
    user_to_delete = session.query(User).filter(User.id == updateUserID).first()
    if user_to_delete:
        session.delete(user_to_delete)
        session.commit()
    else:
        print(f"No user found with ID {updateUserID}")

    # 削除後のデータ読み取り
    users = session.query(User).all()
    if users:
        print("records after deleting: ")
        for user in users:
            print(user.id, user.name)
    else:
        print("No records found.")

elif processNum == 4:
    # テーブル削除
    if session.query(User).first():
        User.__table__.drop(engine)
        session.commit()
    else:
        print("Table is empty or does not exist.")

# セッションを閉じる
session.close()
