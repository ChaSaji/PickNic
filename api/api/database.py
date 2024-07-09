import os
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy import create_engine
from dotenv import load_dotenv

# .envファイルを読み込む
load_dotenv()

# データベースURL
SQLALCHEMY_DATABASE_URL = os.getenv('DATABASE_URL')
if not SQLALCHEMY_DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is not set")

# 非同期エンジンを作成
async_engine = create_engine(SQLALCHEMY_DATABASE_URL)

# 非同期セッションメーカーを作成
session_local = sessionmaker(autocommit=False, autoflush=False, bind=async_engine)

# ベースクラスを作成
Base = declarative_base()

# データベースセッションを取得
async def get_db():
    with session_local() as session:
        yield session
