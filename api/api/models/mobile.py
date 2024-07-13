# database.py
from sqlalchemy import Column, String, DateTime, func, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker,relationship
import os
from .database_models import Photo2MobileUser 
from dotenv import load_dotenv

# .envファイルを読み込む
load_dotenv()
# 環境変数の取得
database_url = os.getenv('DATABASE_URL')

engine = create_engine(database_url)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

"""
class MobileUser(Base):
    __tablename__ = "mobile_users"
    id = Column(String, primary_key=True, index=True)
    name = Column(String, index=True)
    createdDate = Column(DateTime, default=func.now())
    Updateddate = Column(DateTime, default=func.now(), onupdate=func.now())
    #photo_associations = relationship("Photo2MobileUser", back_populates="user")
"""