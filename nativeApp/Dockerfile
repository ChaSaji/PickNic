# node20のイメージをダウンロード
FROM node:20-alpine

# 必要なライブラリをインストール
RUN apk update && apk add bash

# 作業ディレクトリを設定
WORKDIR /app

# package.jsonとpackage-lock.jsonをコピー
COPY package.json package-lock.json ./

# npm ciで依存関係をインストール
RUN npm ci

# 全てのソースコードをコピー
COPY . .

# Expo CLIをグローバルにインストール
RUN npm install -g expo-cli

# ホスト名とポートを設定してアプリケーションを起動するエントリーポイントを設定
# EXPO_PACKAGER_HOSTNAMEを適切なホスト名に設定する
ENV EXPO_PACKAGER_HOSTNAME=0.0.0.0

# ホスト名を指定してexpo startコマンドを実行
ENTRYPOINT ["npm", "run", "start", "--tunnel"]

# アプリケーションがリッスンするポートを開放
EXPOSE 19000
EXPOSE 19001
EXPOSE 19002