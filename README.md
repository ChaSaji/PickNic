# 環境内容
- node: v20.11.0
- npm: v10.1.0

# プロジェクトの起動方法
```
// パッケージのインストール
npm install

// expo環境の立ち上げ
// 出てきたQRコードをスマホで確認（条件：スマホの"EXPO GO"をインストール、サインアップ済）
// コードを書き換えてスマホ側に同期されるか確認
npm run start
```

# 開発方法
## 作業の進め方
1. Issuesにタスクを登録
   - Title：取り組むタスクがわかるようにつける
   - Description：補足がある場合記入（推奨）
   - 赤枠(Assineers)：自分を設定
   - 黄枠(Labels)：タスクの種類を設定（自分で作成も可能）
![スクリーンショット 2024-03-06 17 59 19](https://github.com/ChaSaji/PickNic/assets/86280090/3cb926b6-f73d-42a6-b4d6-c58a5400762d)
2. localで作業ディレクトリをきる
   ```
   // リモートリポジトリの状態をpull
   git pull

   // developブランチに移動
   git checkout develop

   // developブランチにリモートのdevelopの状態をpull
   git pull origin develop

   // 作業ブランチをdevelopからきる
   git checkout -b feature/#OO(Issue番号)-XX(わかりやすい名前)
   ```
3. featureブランチ内で作業
   - 定期的にリモートのdevelopの状態を取得する（推奨）[何をしているかの参考](https://kray.jp/blog/git-pull-rebase/)
     - コンフリクトが起きたら解消、あるいは相談してください
   ```
   //　最新のdevelopからfeatureブランチを派生させる
   git pull --rebase origin develop
   ```
5. localからリモートリポジトリにpushする
   ```
   // developの最新の状態の取得
   git pull --rebase origin develop

   // ローカルブランチをリモートにpush
   git push origin HEAD
   ```
6. PR(プルリクエスト)を記入
   - 緑枠(base, compare)：baseをdevelop、compareを自分の作業ブランチに設定
   - Title：取り組んだ内容がわかるようにつける
   - Description：以下記述例
     ```
     closed #OO(対応するIssue番号を記入すると、PRがIssueと紐づく)
     
     ### やったこと
     - （自分の取り組んだ内容を箇条書き）
     
     ### 確認事項
     - （Reviewerに確認して欲しい内容を箇条書き）
     ```
   - 赤枠(Reviewers)：レビュワーを設定（特段どの人に見て欲しいかなければ全員設定してOK）
   - 黄枠(Assineers)：自分を設定
   - 茶枠(Labels)：タスクの種類を設定（Issue時と同じもの）
![スクリーンショット 2024-03-06 18 30 06](https://github.com/ChaSaji/PickNic/assets/86280090/446f36f8-2e90-4fc8-9e70-501cd5fbfa14)

## PRのレビュー方法
1. PRの画面から赤枠で囲んだAdd your Reviewを押す
![スクリーンショット 2024-03-06 18 43 55](https://github.com/ChaSaji/PickNic/assets/86280090/7090facc-4291-4c08-81a6-4b40428f417f)
2. コードレビュー
   - 赤枠：行選択（複数行はShiftを押しながら）をしてレビューが書ける
   - 黄枠：ファイル自体にレビューが書ける
![スクリーンショット 2024-03-06 18 51 20](https://github.com/ChaSaji/PickNic/assets/86280090/93f0720d-6eee-404d-b0ea-7ce6b2c2a8e8)
3. レビューを提出
   - 赤枠：2で書いたものをまとめて提出する
     - Comment：ただのコメント
     - Approve：PRの承認コメント
     - Request changes：PRの変更を要求するコメント
![スクリーンショット 2024-03-06 18 48 32](https://github.com/ChaSaji/PickNic/assets/86280090/288b017d-36f4-434a-bacb-c98cbb450ff3)

# 命名規則
## React Native
- UpperCamelCase
  - Reactコンポーネントとファイル名（/screens, /componentsなど）
- camelCase
  - 変数名
  - 関数名
  - 関数ファイル名（/libなど）
- CONSTANT_CASE
  - 定数
