# Desktop ToDo Widget

Linuxデスクトップ（Ubuntu等）の背景に常駐させて使用する、自分専用のToDo管理ウィジェットです。
「やるべきこと」「やりたいこと」「目標」の3つの軸でタスクを管理し、思考を整理するために作成しました。

## Features

- **3つのセクション管理**
  - **やるべきこと:** チェックボックスによる完了管理。
  - **やりたいこと:** クリックするとNotion風の詳細メモを展開可能。アイデア出しに最適。
  - **今月の目標:** 常に意識したい目標をシンプルに表示。
- **データ永続化**
  - Local Storageを使用しているため、アプリを閉じてもデータは保持されます（バックエンド不要）。
- **デスクトップ最適化**
  - 起動時にPC画面の右半分のエリア中央に自動で配置されます。
  - タスクバーに表示させず、壁紙の一部として馴染むように設計しています。

## Tech Stack

- **Core:** Electron
- **Frontend:** React, TypeScript
- **Build Tool:** Vite
- **Styling:** CSS (Atomic Design components)
- **State Management:** React Hooks + Local Storage

## Installation & Dev (開発環境の起動)

```bash
# 依存関係のインストール
npm install

# 開発モードで起動
npm run dev