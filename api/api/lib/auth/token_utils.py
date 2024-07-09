# token_utils.py
from datetime import datetime, timedelta
from typing import Union
from jose import JWTError, jwt

SECRET_KEY = "xxx"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 999999

def create_access_token(data: dict, expires_delta: Union[timedelta, None] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def decode_access_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        print(f"Decoded payload: {payload}")  # デバッグ情報を追加
        return payload
    except JWTError as e:
        print(f"JWTError: {e}")
        return None

def days_since():
    # 指定した日付をdatetimeオブジェクトに変換
    specified_date = datetime.strptime("2022-01-01", '%Y-%m-%d')
    # 現在の日付を取得
    current_date = datetime.now()
    # 日付の差を計算
    delta = current_date - specified_date
    # 経過日数を取得
    days_elapsed = delta.days
    return days_elapsed

# トークンブラックリスト
token_blacklist0 = set()
token_blacklist1 = set()
token_blacklist2 = set()

def add_token_to_blacklist(token: str):
    token_blacklist0.add(token)
    token_blacklist1.add(token)
    token_blacklist2.add(token)

    if(days_since()%3==0):
        token_blacklist0.clear()
    if(days_since()%3==1):
        token_blacklist1.clear()
    if(days_since()%3==2):
        token_blacklist2.clear()


def is_token_in_blacklist(token: str):
    return token in token_blacklist0 or token in token_blacklist1 or token in token_blacklist2