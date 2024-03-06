# 環境内容

- node: v20.11.0
- npm: v10.1.0

# プロジェクトの進め方

```
// developブランチに移動
git checkout develop

// Issueに対してdevelopからfeatureブランチを切る
git checkout -b feature/#Issue番号-何をするか分かる名前

// パッケージのインストール
npm install

// expo環境の立ち上げ
// 出てきたQRコードをスマホで確認（条件：スマホの"EXPO GO"をインストール、サインアップ済）
// コードを書き換えてスマホ側に同期されるか確認
npm run start
```
