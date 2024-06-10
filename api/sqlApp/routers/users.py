# ユーザーに関するAPI処理をいじるようになったタイミングでここをいじります．


# from fastapi import APIRouter, Depends, HTTPException
# from sqlalchemy.orm import Session
# from .. import crud, models, database

# router = APIRouter()

# # データベースセッションの依存関係を定義
# def get_db():
#     db = database.SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()

# @router.post("/users/", response_model=models.User)
# def create_user(name: str, db: Session = Depends(get_db)):
#     return crud.create_user(db=db, name=name)

# @router.get("/users/", response_model=list[models.User])
# def read_users(db: Session = Depends(get_db)):
#     users = db.query(models.User).all()
#     return users

# @router.put("/users/{user_id}", response_model=models.User)
# def update_user(user_id: int, new_name: str, db: Session = Depends(get_db)):
#     user = crud.update_user(db=db, user_id=user_id, new_name=new_name)
#     if user is None:
#         raise HTTPException(status_code=404, detail="User not found")
#     return user

# @router.delete("/users/{user_id}", response_model=models.User)
# def delete_user(user_id: int, db: Session = Depends(get_db)):
#     user = crud.delete_user(db=db, user_id=user_id)
#     if user is None:
#         raise HTTPException(status_code=404, detail="User not found")
#     return user

# @router.delete("/users/")
# def drop_table(db: Session = Depends(get_db)):
#     if db.query(models.User).first():
#         models.User.__table__.drop(database.engine)
#         db.commit()
#         return {"message": "Table dropped"}
#     else:
#         return {"message": "Table is empty or does not exist"}
