# token_utils.py
from datetime import datetime, timedelta
from typing import Union
from jose import JWTError, jwt

SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

# トークンブラックリスト
token_blacklistDayOdd = set()
token_blacklistDayEven = set()

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
        return payload
    except JWTError:
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

OddCeleard=False
EvenCleard=False
def add_token_to_blacklist(token: str):
    token_blacklistDayOdd.add(token)
    token_blacklistDayEven.add(token)
    if(days_since()%2==0 and not OddCeleard):
        OddCeleard=True
        EvenCleard=False
        token_blacklistDayOdd.clear()
    if(days_since()%2==1 and not EvenCleard):
        EvenCleard=True
        EvenCleard=False
        token_blacklistDayEven.clear()

def is_token_in_blacklist(token: str):
    return token in token_blacklistDayEven or token in token_blacklistDayOdd