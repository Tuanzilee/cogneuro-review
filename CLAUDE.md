# CLAUDE.md — cogneuro-review

## Repo 用途
hai 的「認知神經科學導論」（邱倚璿老師，1151）每週複習 PWA（手機為主）。骨架複製自 `psychtest-review`：單頁 `index.html` ＋ runtime fetch JSON，無 build、無框架。目前只在本機（2026-10-08 建立），**尚未建 GitHub repo、尚未 push**；建 repo 與每次 push 前一律先問 hai（公開 repo，內容不放講義或課本原文）。預計 repo 名 `cogneuro-review`，Pages `tuanzilee.github.io/cogneuro-review`。

## 檔案結構
```
index.html     ← 全部 UI 與邏輯（localStorage 前綴 cn_）
concepts.json / quiz.json / weeks.json  ← 由 tools/build_data.py 產生，不要直接改 JSON
tools/build_data.py ← 內容原始檔（CARDS／QUIZ／WEEKS）：改這裡再執行 python3 tools/build_data.py
tools/gen_audio.py  ← 雲哲男聲 zh-TW-YunJheNeural：`~/.venvs/tts/bin/python tools/gen_audio.py`
audio/ check.py sw.js manifest.json icon-*.png（米色底「腦」字）
```
預覽：母資料夾 `.claude/launch.json` 的 `cogneuro-review`，埠 8768。

## 資料 schema（與心理測驗相同，id 前綴 C）
- concepts：`C_W{週}_C{兩位數}`；quiz：`C_W{週}_Q{兩位數}`。**id 依 CARDS／QUIZ 順序編號，只能往後追加，不要插入或刪除（進度綁 id）**。
- 卡片欄位借兩個：`def` ＝概念，結尾放一句「考場句：…」；`example` ＝證據、人物或隨堂測驗對應。
- 主題（topic）：心智與大腦、腦結構、電生理、腦造影方法、損傷與刺激。新卡優先沿用。
- `index.html`：`MID_WEEK = 8`（期中考 11/5 在 W8，範圍到聽覺 Ch8＝W7 內容）；`REV1 = ['腦結構','電生理','腦造影方法']` 是 10/15 實體複習測驗①（Ch2–4）範圍，首頁範圍選單有「複習測驗① Ch2–4」。

## 週次編號（hai 2026-10-08 指正）
週次＝學期第幾週。W1＝9/17 導論；W2＝9/24 大腦結構；W3＝10/1 電生理；**W4＝10/8 同時講 Ch4 腦造影與 Ch5 損傷／刺激（不要搞混）**；W5＝10/15 Ch5 續＋賴姿伶老師 Talk，有複習測驗② Ch2/3/4；W6＝10/22 視覺；W7＝10/29 聽覺；**W8＝11/5 期中考（到 Ch8 聽覺）**。注意素材資料夾 `W05_…` 放的是 Ch5 投影片，但 Ch5 的內容在 app 裡歸 W4（講義與 Plaud 皆如此）；W5 若有新進度再補。
後續：W9 注意（Ch9）、W10 記憶、W11 執行功能、W12 閱讀、W13 語言、W14 情緒與社會。

## 素材（`~/Desktop/P. 進行中專案/FJU psy/02_修課/1151/1151_認知神經科學導論/`）
- 優先序：**投影片 ＞ 課本**；歷史、人物、年代、實驗以投影片為準；用詞與課本不同處以教師為準（identity theory、double-aspect theory、phrenology 評價）。
- `cogneuro-handover.md`（進度、評分、68 個教師關鍵字白名單、章號對照）、`20260917_認知神經科學_課本關鍵字解釋.json`（白話解釋與易混淆點，術語校正用）。
- Plaud 逐字稿未經核聽，專有名詞以講義為準。Ch10 不考。

## 每週新增內容（hai 說「更新認知神經科學 W{n}」）
1. 讀當週 `Dis_*.pdf`（有文字層，`pdftotext -layout`）、Plaud 逐字稿的知識點區、單元目標 docx。
2. 在 `tools/build_data.py` 追加 CARDS／QUIZ／WEEKS，執行 `python3 tools/build_data.py`。
3. `~/.venvs/tts/bin/python tools/gen_audio.py` 補音檔（約 90 秒以上，背景跑）→ `python3 check.py`。
4. bump `sw.js` 的 `CACHE`；本機預覽驗證；**push 前先問 hai**。

## 題型
概念選擇題為主；加「辨認」（哪個腦葉、哪種工具、哪種設計）與「判斷」（解析度取捨、雙重分離證據、造影與損傷不一致）。課堂隨堂測驗題已改寫進題庫，不逐字抄。

## 查證紀錄（2026-10-08）
- 全部內容來自：W1–W5 講義投影片（pdftotext）、W2–W4 Plaud 知識點區、handover、課本關鍵字 JSON。細節如 Gamma 30–80 Hz、N170 130–200 ms、N400 250–500 ms 取自講義／Plaud 摘要，尚未對原始論文逐條查證。
- 投影片的腦波表格排版混亂（Beta 12–30、Alpha 8–12、Theta 4–8、Delta <4），卡片照講義數值寫。
- 「上丘偏視覺、下丘偏聽覺」：講義寫上丘管視、聽、觸覺，教師總結補充上丘也與聽覺有關；考場以「上視下聽」為主。

## 待確認
- 中央溝／側溝的「中央裂（central fissure）」講義寫法與 Plaud「中央溝」是否同義（應為同一條，講義是舊譯）。
- W4 Ch5 的 H.M. 手術細節（講義只寫切除內側顳葉含海馬迴），沒補課本原文。
- 賴姿伶老師 Talk（W5）是否納入期中範圍。
- W5 逐字稿到了再補。
