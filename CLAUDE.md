# CLAUDE.md — cogneuro-review

## Repo 用途
hai 的「認知神經科學導論」（邱倚璿老師，1151）每週複習 PWA（手機為主）。骨架複製自 `psychtest-review`：單頁 `index.html` ＋ runtime fetch JSON，無 build、無框架。已部署：公開 repo `github.com/Tuanzilee/cogneuro-review`，Pages `tuanzilee.github.io/cogneuro-review`（main 分支根目錄，2026-10-08 上線）。每次 push 前一律先問 hai（公開 repo，內容不放講義或課本原文）。

## 檔案結構
```
index.html     ← 全部 UI 與邏輯（localStorage 前綴 cn_）
concepts.json / quiz.json / weeks.json  ← 由 tools/build_data.py 產生，不要直接改 JSON
tools/build_data.py ← W1–W4 內容與專有名詞對照表 GLOSSARY；tools/data_w5_w6.py ← W5、W6 內容；tools/data_w7.py ← W7 聽覺（之後新週次可照樣新增 data_wN.py 並在 build_data.py 匯入）：改這裡再執行 python3 tools/build_data.py
tools/gen_audio.py  ← 雲哲男聲 zh-TW-YunJheNeural：`~/.venvs/tts/bin/python tools/gen_audio.py`
img/ ← 自畫 SVG 示意圖 52 張，一張圖可配多張卡，86 張卡全部有圖（對照表在 build_data.py 的 IMG），米色底、卡通扁平風；build_data.py 的 IMG 對照表決定哪張卡配哪張圖
audio/ check.py sw.js manifest.json icon-*.png（米色底「腦」字）
```
預覽：母資料夾 `.claude/launch.json` 的 `cogneuro-review`，埠 8768。

## 申論題模式（2026-10-25 新增）
- 「申論」分頁：19 題，題目編號與優先度沿用 hai《期中考考點》（Ward 第 4 版章末申論題中文轉述；最高 4.1、4.4）。流程三步驟：① 先自己寫或口述（草稿存在手機 localStorage `cn_essay`）→ ② 看答題骨架（兩段式：先說清楚是什麼、再評估能告訴我們什麼＋要用的專業術語）→ ③ 看參考要點、常見陷阱、相關概念卡，再自評（還不行／差不多／可以）。自評「還不行」會把該題的相關概念加進錯題本。
- 內容在 `tools/data_essays.py`（ESSAYS）；build 後產生 `essays.json`。concepts 用 CARDS 的英文名，build 時轉成卡片 id；申論題的英文術語一律手寫，**不經過 ann() 自動標註**。
- 要點是用課堂內容（投影片、Plaud、App 概念卡）寫的，不是課本原文。引用到的文獻（Christ 2009、Lisofsky 2014、Monteleone 2009、Delgado-Herrera 2021、Knappe 2025、Rauschecker & Tian 2000、Alain 2001、Lomber 2008、Bizley 2009、Isenberg 2012）都只讀過摘要。5.1 的「假設」是我整理的框架，標了「請對照課本」。
- 新增申論題：在 ESSAYS 追加 dict（no、ch、pri、q、a、b、terms、pitfall、concepts），執行 `python3 tools/build_data.py`；check.py 會檢查概念存在與骨架完整。

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
- `09工具交接_cogneuro-handover.md`（進度、評分、68 個教師關鍵字白名單、章號對照）、`03複習測驗_20260917_認知神經科學_課本關鍵字解釋.json`（白話解釋與易混淆點，術語校正用）。
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

## 2026-10-21 更新（W5、W6）
- 素材資料夾已重新整理成前綴命名：`01課本教材_`（講義）、`02逐字稿_`、`03複習測驗_`、`04音檔音稿_`。W5＝10/15 逐字稿（期中準備、研究設計、光遺傳學、賴老師演講），W6＝10/21 逐字稿＋ Dis_07 The seeing brain。
- 新增主題「視覺」（W6）、「研究設計與前沿」（W5）；W5 的光遺傳學／記憶痕跡是課堂補充，不在關鍵字清單，卡片已標註「未查原始論文」。
- 進度異動（Plaud W5）：原定 11/19 實體課改 11/26（記憶、執行功能）；第 6–8 章 10/15 起提早開放，第 7 章截止 10/29；期中考 11/5 在 801、802，含申論題。

## 2026-10-25 更新（Ch8 補完＋期中考頁）
- 新增 W7 第 13 張卡「單細胞記錄與聽覺表徵」（期中考優先題 8.2）與 2 題；補強 W7 既有卡：音調拓樸（耳蝸排列）、動作理論（強版本未獲支持）、McGurk（課本版 ba 聲＋ga 口型→da）、what／where（兩路徑不隔離）。**新卡一律加在該週清單最後面，不要插中間，否則 id 會位移。**
- 新增 W8 週頁「期中考：考點與答題方式」（無概念卡），內容依 hai 的《期中考考點》docx（Plaud W1–W6＋Ward 第 4 版章末申論題）：老師明說選擇題與申論題都會有，申論要先說是什麼、再評估能告訴我們什麼。
- 素材資料夾新檔：`03 複習測驗_20261022_…Ch1至Ch8_keywords講義.docx`、`TTS/`（hai 自製的各章音稿）、`01課本教材_單元目標與學習指引_Ch08.docx`（行程表，無內容；Ch8 是 Teams 同步課）。這些是 hai 自製或行程資料，不需要再轉成卡片。

## 查證紀錄（2026-10-25，Consensus 摘要）
- Rauschecker & Tian (2000, PNAS) 摘要：獼猴 lateral belt 神經元對中心頻率與頻寬、頻率調變掃描、猴叫聲有選擇性；前外側區對猴叫聲最專一，尾外側區空間選擇性最強；至少兩條流（空間流：顳上回後部→頂葉；型態或物體流：前部 lateral belt）。Alain 等人（2001, PNAS）：fMRI＋ERP 顯示辨別音高與辨別位置啟動不同腦區。只讀到摘要，未讀全文。

## 待確認
- 期中範圍：hai 2026-10-21 確認 **W7 今年是聽覺**，所以期中考（11/5）範圍到 Ch8 聽覺不變，`MID_WEEK = 8`。W6 逐字稿摘要寫的「聽覺延後、10/28 轉入注意力」與此不符，以 hai 說法為準。
- W7 沒有逐字稿，內容來自 Dis_08 講義與延伸閱讀「Ch08 類別知覺」；上完課後再核對。隨堂測驗第 3 題（後側 STS 的敘述哪個不正確）答案待老師公布，目前只在卡片說明裡寫推論。
- Plaud W6 的 LGN 細胞描述（M 管周邊與背側）和投影片（M 位置、P 形狀顏色大小、K 移動）略有不同，卡片以投影片為準。
- 中央溝／側溝的「中央裂（central fissure）」講義寫法與 Plaud「中央溝」是否同義（應為同一條，講義是舊譯）。
- W4 Ch5 的 H.M. 手術細節（講義只寫切除內側顳葉含海馬迴），沒補課本原文。
- 賴姿伶老師 Talk（W5）是否納入期中範圍。
- W5 逐字稿到了再補。

## 2026-10-31 FSRS 整合

- hai 已於 2026-10-31 授權推送此版 FSRS 整合；後續公開發布仍須先取得 hai 同意。
- 概念卡改用 ts-fsrs 6.0.0 / FSRS-7 排程；原題庫、概念 ID 與申論資料不變。
- 排程與資料保存的程式在 src/fsrs-adapter.mjs；src/browser-entry.mjs 暴露給 index.html 使用。修改後執行 npm run build 產生 vendor 瀏覽器程式。vendor JS 全部必須列入 sw.js 的快取清單，變更時 bump CACHE。
- cn_srs 保持舊資料；cn_srs_before_fsrs_v1 為首次儲存前備份；新排程、錯題旗標及歷程在 cn_fsrs_v1。不得虛構舊自評紀錄來反推模型狀態。
- 檢查：npm test、python3 check.py；另外驗證翻面自評、到期顯示與重新載入的保存。
