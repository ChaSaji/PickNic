# python3.10のイメージをダウンロード
FROM python:3.10-buster
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# 必要なライブラリをインストール
RUN apt -y update && apt -y upgrade && apt -y install libopencv-dev

# pipを使ってpoetryをインストール
RUN pip install poetry

# poetryの定義ファイルをWORKDIRにコピー
COPY pyproject.toml poetry.lock ./

# poetryでライブラリをインストール
RUN poetry install

# ソースコードをWORKDIRにコピー
COPY . .

# データベースのマイグレーションを実行
RUN poetry run python3 migrate_db.py

# uvicornのサーバーを立ち上げるコマンドを指定
ENTRYPOINT ["poetry", "run", "python3", "main.py"]
