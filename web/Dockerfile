# ==================================================
# アプリのビルドレイヤー
# ==================================================
# node20のイメージをダウンロード
FROM node:20-alpine As build

# ビルド時の引数を定義
ARG NEXT_PUBLIC_API_URL

# 環境変数を設定
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

# 必要なライブラリをインストール
RUN apk add --no-cache libc6-compat

# 作業ディレクトリを設定
WORKDIR /app

# package.jsonとpackage-lock.jsonをコピー
COPY package.json package-lock.json ./

# npm ciで依存関係をインストール
RUN npm ci

# 全てのソースコードをコピー
COPY . .

# ビルドコマンドを実行
RUN npm run build

# ==================================================
# アプリの実行レイヤー
# ==================================================
# node20のイメージをダウンロード
FROM node:20-alpine AS runtime

# 作業ディレクトリを設定
WORKDIR /app

# ビルドステージからビルド成果物をコピー
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json

# アプリケーションを起動するエントリーポイントを設定
ENTRYPOINT ["npm", "start"]