#!/bin/bash
# Figmaデザインの画像をローカルの images/ フォルダに保存します。
# 使い方: このファイルをダブルクリック（または `bash 画像をダウンロード.command`）
# ※ Figmaのアセットリンクには有効期限があります。早めに実行してください。

cd "$(dirname "$0")" || exit 1
mkdir -p images

echo "画像をダウンロードしています..."

dl() { curl -fL --retry 2 "$2" -o "images/$1" && echo "  OK  images/$1" || echo "  NG  images/$1 (取得失敗)"; }

# --- TOPページ（index.html）用 ---
dl "hero-bg.jpg"            "https://www.figma.com/api/mcp/asset/076f2999-e2b8-4ef3-8b01-446fbd892e83"
dl "research-master.jpg"    "https://www.figma.com/api/mcp/asset/b4abc0e6-9375-4cf6-a36a-3c8fd918688b"
dl "research-undergrad.jpg" "https://www.figma.com/api/mcp/asset/3501c903-c487-4912-97f1-0c8298c6d942"
dl "logo-jaxa.png"          "https://www.figma.com/api/mcp/asset/c85fe0bb-ce3e-4aa1-ac2c-358f99e4038b"
dl "logo-perc.png"          "https://www.figma.com/api/mcp/asset/0a7bded7-5e5c-4636-aeb8-64a2beb699bc"

# --- 研究室概要ページ（about.html）用 ---
dl "overview-hero.jpg"      "https://www.figma.com/api/mcp/asset/7488fd8e-3d1a-4026-b845-5e6582f61bda"
dl "planet.jpg"             "https://www.figma.com/api/mcp/asset/e912fda0-afc3-47f4-8d89-801aad4e08e3"

echo ""
echo "完了しました。index.html をブラウザで開いてください。"
echo "（取得失敗 (NG) があった場合はリンク期限切れです。READMEの代替手順をご覧ください。）"
