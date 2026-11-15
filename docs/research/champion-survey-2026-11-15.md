# LoL 全英雄特性調查與測驗補題草案

調查日期為 2026-11-15，使用 Riot Data Dragon 16.22.1 的 zh_TW 資料。官方英雄目錄有 173 個獨立英雄連結，Data Dragon 有 173 位，本調查的逐位分析也有 173 筆。範圍是 PC《英雄聯盟》的標準英雄名單。

## 來源與分析方式

逐位檢視被動、Q、W、E、R 的技能描述，並使用官方職業標籤、難度數值、普攻射程和背景作為輔助。各英雄列的名稱連到官方介紹頁。逐位 Data Dragon 來源網址與清理過的技能文字保存在 [官方資料快照](official-champions-16.22.1.json)，整理後的欄位保存在 [英雄分析資料](champion-profiles.json)。

- 名單依據為 [官方繁體中文英雄目錄](https://www.leagueoflegends.com/zh-tw/champions/)。
- 資料格式依據為 [Riot Data Dragon 文件](https://developer.riotgames.com/docs/lol#data-dragon)。
- 版本依據為 [官方版本列表](https://ddragon.leagueoflegends.com/api/versions.json)。
- 全名單依據為 [16.22.1 繁體中文英雄資料](https://ddragon.leagueoflegends.com/cdn/16.22.1/data/zh_TW/champion.json)。

官方文件說明 Data Dragon 可能在更新後延遲，資料版本也可能與特定地區客戶端不同。因此本調查固定記錄來源版本，尚未以台服實際遊戲逐項核對。技能摘要採用本次下載文字，後續應在重製或改動時重查。

表中的官方分類和難度為來源原始欄位。玩法摘要、學習負擔、可能吸引力與奇幻主題為研究分析。吸引力是待驗證的偏好假設，目前尚無經驗證的人格分數或推薦權重。

「候選位置」依技能用途與既有玩法提出，全部仍需在發布前核對版本適用性。本調查未蒐集 16.22 的各位置出場率、勝率或裝備統計。洛克的中路／打野，以及其他明列候選的條目，尤其需要位置驗證。位置縮寫採上路、打野、中路、下路輸出、輔助，對應「上、野、中、下、輔」。官方「輔助」職業標籤描述能力用途，與輔助位置需要分別處理。

Data Dragon 難度數值介於 0 至 10，這是另一個獨立欄位。埃可尚、銳兒、瑟菈紛、薇可絲的來源值為 0，需另行核對其解讀。新手負擔還涉及瞄準、走位、資源、知識、時機與合作，應逐項參考表中的學習負擔。例如菲歐拉原始難度為 3，但破綻與格擋仍要求距離、反應及對手技能知識。

## 對測驗設計的影響

1. 同一位置包含多種喜好。上路候選同時包含決鬥、承傷、召喚物、陷阱與跨圖支援。應同時評估位置與英雄玩法。
2. 支援動機可能出現在不同位置。埃爾文的黛西與護盾、慎的跨圖保護、米里歐的增益、派克的處決分享，提供不同的助人方式。
3. 操作負擔有多種來源。赫威偏向法術選擇，亞菲利歐涉及武器與彈藥，汎偏向走位反應，維爾戈與賽勒斯需要更多其他英雄知識。
4. 自主需求與團隊依賴要分開觀察。克黎思妲有明確誓約配合，悠咪依附友軍移動，銳空依靠友軍作為撤退支點，這些都值得在結果中解釋。
5. 成長感有不同形式。納瑟斯與維迦持續疊層，凱爾隨等級改變攻擊方式，卡力斯、凱莎與維克特提供不同的進化選擇。
6. 召喚物的操作方式不同。阿祈爾需要控制沙兵與本體的相對位置，約瑞科需要管理軍團推進，漢默丁格偏重固定炮臺布局，娜菲芮則由犬群配合目標攻擊。
7. 重製後技能需要重新讀取。本次希瓦娜資料含真龍鱗甲、防護爆炸與變龍強化；梅爾 W 的文字描述為摧毀敵軍射彈後反擊，並為友軍提供增益；娜菲芮的強化與追擊分別位於 W 與 R。以上摘要均依本次來源。
8. 奇幻偏好應以多個標籤形成加分。外型與主題容許複選，保留好奇心與尚未形成偏好的新手。

以上結論為依官方技能整理的產品研究判斷，各英雄證據見下表及來源快照。

## 全部 173 位英雄

「官方分類／難度」中的數字是 Data Dragon 原始難度。其餘欄位為分析初稿。依英雄 ID 排序，方便與資料檔比對。

| 英雄與 ID | 官方分類／難度 | 候選位置 | 距離與核心機制 | 可能吸引的偏好 | 新手主要學習負擔 | 奇幻主題 |
|---|---|---|---|---|---|---|
| [厄薩斯](https://www.leagueoflegends.com/zh-tw/champions/aatrox/)<br>Aatrox | 鬥士／4 | 上 | 近戰。三段劍擊命中不同範圍，衝刺調整並以傷害回血 | 在激烈交鋒中持續站住 | 劍擊落點、距離與回血窗口 | 冥血巨劍、墮落神祇 |
| [阿璃](https://www.leagueoflegends.com/zh-tw/champions/ahri/)<br>Ahri | 法師／刺客／5 | 中 | 中距離法術、近身切入。魅惑抓人，多段衝刺與往返法球 | 靈活試探後抓住機會 | 方向技能命中與進退路線 | 狐靈、魅惑、靈魂 |
| [阿卡莉](https://www.leagueoflegends.com/zh-tw/champions/akali/)<br>Akali | 刺客／7 | 中、上 | 近戰。煙幕藏身，多段位移與環印強化攻擊 | 貼身周旋、出其不意 | 能量、環印走位與連段撤退 | 忍者、煙霧、苦無 |
| [埃可尚](https://www.leagueoflegends.com/zh-tw/champions/akshan/)<br>Akshan | 射手／刺客／0 | 中 | 遠程普攻、近距離擺盪。鉤爪擺盪、偽裝，擊殺特定敵人可復活隊友 | 獨自行動也能扭轉隊友命運 | 擺盪地形、雙發節奏與目標選擇 | 俠盜、鉤爪、復仇 |
| [亞歷斯塔](https://www.leagueoflegends.com/zh-tw/champions/alistar/)<br>Alistar | 坦克／輔助／7 | 輔 | 近戰。衝撞與擊飛，承傷減免並保護或推離敵人 | 替團隊撞開局面、承受火力 | 連段方向與開戰後隊友距離 | 牛頭巨人、蠻力 |
| [安比薩](https://www.leagueoflegends.com/zh-tw/champions/ambessa/)<br>Ambessa | 鬥士／刺客／10 | 上 | 近戰。技能後衝刺，穿插普攻返還能量 | 連續追擊與精密移動 | 能量循環、技能邊緣與連段 | 軍閥、雙刃、武技 |
| [阿姆姆](https://www.leagueoflegends.com/zh-tw/champions/amumu/)<br>Amumu | 坦克／輔助／3 | 野 | 近戰、繃帶突進。繃帶接近敵人，再以範圍暈眩創造團戰機會 | 一次行動幫助整個團隊 | 繃帶命中與進場時機 | 木乃伊、詛咒、孤獨 |
| [艾妮維亞](https://www.leagueoflegends.com/zh-tw/champions/anivia/)<br>Anivia | 法師／10 | 中 | 遠程法術。冰牆改變通路，冰球與風暴控制區域 | 預先布置、讓對方受地形限制 | 牆的位置、技能連動與魔力 | 冰晶鳳凰、冰雪、重生 |
| [安妮](https://www.leagueoflegends.com/zh-tw/champions/annie/)<br>Annie | 法師／輔助／6 | 中、輔 | 中距離法術。管理施法次數，暈眩爆發並召喚泰貝爾 | 把準備好的力量一次釋放 | 暈眩層數、施法距離與熊的指令 | 小女孩、火焰、玩具熊 |
| [亞菲利歐](https://www.leagueoflegends.com/zh-tw/champions/aphelios/)<br>Aphelios | 射手／10 | 下 | 遠程普攻。五種武器輪替，主副武器與彈藥相互影響 | 研究組合、以準備換取多樣解法 | 武器順序、彈藥與組合記憶 | 月光、武器庫、沉默獵手 |
| [艾希](https://www.leagueoflegends.com/zh-tw/champions/ashe/)<br>Ashe | 射手／輔助／4 | 下 | 遠程普攻。持續緩速、獵鷹偵察與遠距離暈眩箭 | 穩定輸出並提供情報與機會 | 走位、偵察目標與大箭預判 | 寒冰、弓箭、領袖 |
| [翱銳龍獸](https://www.leagueoflegends.com/zh-tw/champions/aurelionsol/)<br>AurelionSol | 法師／7 | 中 | 中距離持續法術。收集星塵強化龍息、黑洞與落星 | 逐步累積成宏大的力量 | 安全發育、吐息站位與飛行路徑 | 星辰、巨龍、宇宙 |
| [歐羅拉](https://www.leagueoflegends.com/zh-tw/champions/aurora/)<br>Aurora | 法師／刺客／5 | 中、上 | 中距離法術。靈咒往返、隱形跳躍與區域內傳送 | 在不同位置穿梭、反覆拉扯 | 進退距離與區域邊界運用 | 兔耳、精靈、雙界 |
| [阿祈爾](https://www.leagueoflegends.com/zh-tw/champions/azir/)<br>Azir | 法師／射手／9 | 中 | 遠程、士兵代打。布置沙兵代替攻擊，位移與禁軍牆重塑戰線 | 指揮陣形、掌握攻擊空間 | 本體與沙兵距離、位移連段 | 沙漠皇帝、軍隊 |
| [巴德](https://www.leagueoflegends.com/zh-tw/champions/bard/)<br>Bard | 輔助／法師／9 | 輔 | 中距離。收集編鐘、設置神龕、穿牆通道與範圍凝滯 | 四處探索、創造特殊路線 | 遊走時機、通道與凝滯影響雙方 | 宇宙旅者、精靈、音律 |
| [貝爾薇斯](https://www.leagueoflegends.com/zh-tw/champions/belveth/)<br>Belveth | 鬥士／10 | 野 | 近戰。累積攻速、多方向衝刺，以珊瑚變身並召喚虛空魚 | 持續進化、擴張自己的力量 | 衝刺方向、資源取得與變身窗口 | 虛空女皇、異形、軍群 |
| [布里茨](https://www.leagueoflegends.com/zh-tw/champions/blitzcrank/)<br>Blitzcrank | 坦克／輔助／4 | 輔 | 近戰、遠距離抓取。飛拳拉人，擊飛並破盾沉默 | 一次精準命中改變局面 | 鉤子的命中與拉回的目標是否合適 | 蒸汽機器人、鐵拳 |
| [布蘭德](https://www.leagueoflegends.com/zh-tw/champions/brand/)<br>Brand | 法師／輔助／4 | 輔、野、中 | 中距離法術。技能疊加燃燒，觸發爆炸與彈跳火焰 | 讓連鎖反應在密集敵人間擴散 | 技能順序、命中與自身站位 | 烈焰、災難、焚燒 |
| [布郎姆](https://www.leagueoflegends.com/zh-tw/champions/braum/)<br>Braum | 坦克／輔助／3 | 輔 | 近戰。盾牌攔截、跳向隊友，合作疊加暈眩 | 親自擋下危險、和夥伴互補 | 盾牌方向、保護目標與被動配合 | 巨盾、守護者、冰雪 |
| [布蕾爾](https://www.leagueoflegends.com/zh-tw/champions/briar/)<br>Briar | 鬥士／刺客／3 | 野 | 近戰。進入自動追擊的狂熱，以尖叫中止並恢復控制 | 投入追獵、在失控邊緣反轉 | 狂熱限制、停止時機與大絕落點 | 吸血、枷鎖、狂野 |
| [凱特琳](https://www.leagueoflegends.com/zh-tw/champions/caitlyn/)<br>Caitlyn | 射手／6 | 下 | 長射程普攻。射程壓制、陷阱布置與爆頭連動 | 保持距離、精準懲罰踏入陷阱的人 | 陷阱預判、射程邊界與爆頭銜接 | 狙擊手、警探、步槍 |
| [卡蜜兒](https://www.leagueoflegends.com/zh-tw/champions/camille/)<br>Camille | 鬥士／刺客／4 | 上 | 近戰。鉤牆突進、延遲強化踢擊與單人結界 | 精確挑選目標、完成俐落決鬥 | 鉤索角度、二段攻擊與隔離時機 | 機械義肢、優雅、獵手 |
| [卡莎碧雅](https://www.leagueoflegends.com/zh-tw/champions/cassiopeia/)<br>Cassiopeia | 法師／10 | 中 | 中距離持續法術。毒霧限制位移，連續毒牙與面向判定石化 | 持續施壓、限制對手行動 | 施法頻率、距離與石化朝向 | 蛇身、劇毒、石化 |
| [科加斯](https://www.leagueoflegends.com/zh-tw/champions/chogath/)<br>Chogath | 坦克／法師／5 | 上 | 近戰、遠距離控場。擊飛與沉默限制對手，吞噬累積體型與生命 | 成為越來越巨大的威脅 | 延遲擊飛預判與吞噬血量判斷 | 虛空巨獸、吞噬、巨大化 |
| [庫奇](https://www.leagueoflegends.com/zh-tw/champions/corki/)<br>Corki | 射手／法師／6 | 下、中 | 遠程普攻與飛彈。穿插普攻、機槍與飛彈，以俯衝調整位置 | 火力與飛行帶來的機動作戰 | 射擊距離、技能穿插與俯衝用途 | 飛行員、機械、火砲 |
| [達瑞斯](https://www.leagueoflegends.com/zh-tw/champions/darius/)<br>Darius | 鬥士／坦克／2 | 上 | 近戰。流血疊層、外圈回血與連續斬殺 | 正面壓迫、越戰越有威脅 | 外圈距離、接近敵人與層數管理 | 重斧、征服、處決 |
| [黛安娜](https://www.leagueoflegends.com/zh-tw/champions/diana/)<br>Diana | 鬥士／刺客／4 | 野、中 | 近戰。月光標記接突進，拉聚敵人後爆發 | 抓準時機衝入人群 | 標記命中、突進重置與團戰進場 | 月光、彎刃、戰士 |
| [達瑞文](https://www.leagueoflegends.com/zh-tw/champions/draven/)<br>Draven | 射手／8 | 下 | 遠程普攻。接住迴旋斧維持火力，累積資源等待擊殺兌現 | 高強度表演、讓操作即時得到回報 | 接斧落點、走位與兌現風險 | 角鬥士、飛斧、張揚 |
| [蒙多醫生](https://www.leagueoflegends.com/zh-tw/champions/drmundo/)<br>DrMundo | 坦克／鬥士／5 | 上 | 近戰、投擲消耗。骨鋸緩速、抵擋硬控與大量生命回復 | 承受攻擊後繼續向前 | 骨鋸命中、生命與回復時機 | 怪醫、化學改造、巨力 |
| [艾克](https://www.leagueoflegends.com/zh-tw/champions/ekko/)<br>Ekko | 刺客／法師／8 | 野、中 | 近戰。預放時間場，突進打出爆發並倒回舊位置 | 冒險後留有回溯與反轉空間 | 延遲控制、殘影位置與撤退時機 | 時間、街頭發明家 |
| [伊莉絲](https://www.leagueoflegends.com/zh-tw/champions/elise/)<br>Elise | 刺客／法師／9 | 野 | 遠近形態切換。人形結繭接蜘蛛撲殺，以升空避險 | 快速轉換模式、主動製造突破 | 兩套技能、結繭命中與升空用途 | 蜘蛛、變形、黑暗魔法 |
| [伊芙琳](https://www.leagueoflegends.com/zh-tw/champions/evelynn/)<br>Evelynn | 刺客／法師／10 | 野 | 近戰、偽裝接近。偽裝繞近，等待魅惑後爆發並後撤 | 潛伏、挑選時機的一擊 | 視野、魅惑等待與撤退方向 | 惡魔、誘惑、暗影 |
| [伊澤瑞爾](https://www.leagueoflegends.com/zh-tw/champions/ezreal/)<br>Ezreal | 射手／法師／7 | 下 | 遠程技能與普攻。持續命中能量彈縮短冷卻，瞬移調整位置 | 邊移動邊精準射擊 | 技能命中、普攻穿插與瞬移節制 | 探險家、魔法護手 |
| [費德提克](https://www.leagueoflegends.com/zh-tw/champions/fiddlesticks/)<br>Fiddlesticks | 法師／輔助／9 | 野 | 中近距離法術。稻草人視野、隱蔽恐懼與範圍烏鴉風暴 | 藏好自己，再帶來集體驚嚇 | 視野布置、進場角度與引導施法 | 遠古恐懼、稻草人、烏鴉 |
| [菲歐拉](https://www.leagueoflegends.com/zh-tw/champions/fiora/)<br>Fiora | 鬥士／刺客／3 | 上 | 近戰。找破綻、格擋反擊並繞行擊中四個方向 | 細膩的一對一較量 | 破綻走位、反應格擋與對手知識 | 決鬥家、細劍、優雅 |
| [飛斯](https://www.leagueoflegends.com/zh-tw/champions/fizz/)<br>Fizz | 刺客／鬥士／6 | 中 | 近戰。突進穿刺、躍起避開指定與鯊魚追擊 | 用靈巧與欺敵化解危險 | 無法指定時機、進退與魚的命中 | 海洋精怪、三叉戟、鯊魚 |
| [加里歐](https://www.leagueoflegends.com/zh-tw/champions/galio/)<br>Galio | 坦克／法師／5 | 中、輔 | 近戰、法術消耗。嘲諷承傷、衝撞與遠距離降落支援 | 在夥伴遇險時趕到現場 | 支援觀察、嘲諷蓄力與落點 | 石像巨人、英雄式救援 |
| [剛普朗克](https://www.leagueoflegends.com/zh-tw/champions/gangplank/)<br>Gangplank | 鬥士／9 | 上 | 近戰、槍與桶遠距離爆破。火藥桶連鎖引爆、射擊與全圖砲擊 | 精心布置後引發大爆炸 | 桶的血量節奏、連桶與遠方觀察 | 海盜、火藥、艦砲 |
| [蓋倫](https://www.leagueoflegends.com/zh-tw/champions/garen/)<br>Garen | 鬥士／坦克／5 | 上 | 近戰。加速沉默、旋轉攻擊、減傷與指定處決 | 直接接戰、完成明確目標 | 接近方式、防禦時機與斬殺血量 | 重甲騎士、巨劍、正義 |
| [吶兒](https://www.leagueoflegends.com/zh-tw/champions/gnar/)<br>Gnar | 鬥士／坦克／8 | 上 | 遠近形態切換。小型態迴力鏢拉扯，怒氣變身後範圍控場 | 靈巧與巨大力量輪流出場 | 怒氣變身時機、雙形態距離 | 可愛野獸、巨獸、變形 |
| [古拉格斯](https://www.leagueoflegends.com/zh-tw/champions/gragas/)<br>Gragas | 鬥士／法師／5 | 上、野、中 | 近戰、酒桶遠投。酒桶延遲爆炸、衝撞與炸退改變位置 | 把對手送到自己想要的位置 | 桶的時間、碰撞與炸退角度 | 酒桶、豪放、衝撞 |
| [葛雷夫](https://www.leagueoflegends.com/zh-tw/champions/graves/)<br>Graves | 射手／3 | 野 | 中近距離普攻。散彈、裝填、煙幕與衝刺形成近距離射擊循環 | 強勁火力與機動周旋 | 子彈阻擋、裝填節奏與近身風險 | 槍手、散彈槍、煙幕 |
| [關](https://www.leagueoflegends.com/zh-tw/champions/gwen/)<br>Gwen | 鬥士／5 | 上 | 近戰。剪刀中心線、短衝刺與隔絕遠方威脅的聖霧 | 在自己的交鋒範圍內精細操作 | 剪擊中心、聖霧邊界與普攻循環 | 人偶、剪刀、縫紉魔法 |
| [赫克林](https://www.leagueoflegends.com/zh-tw/champions/hecarim/)<br>Hecarim | 鬥士／坦克／6 | 野 | 近戰。跑速轉化火力，衝撞與恐懼騎兵突擊 | 高速奔馳、帶頭衝散陣形 | 移動路線、衝撞方向與切入時機 | 幽靈騎兵、速度、戰爭 |
| [漢默丁格](https://www.leagueoflegends.com/zh-tw/champions/heimerdinger/)<br>Heimerdinger | 法師／輔助／8 | 中、上、輔 | 遠程、固定炮臺。配置炮臺守住區域，選擇強化炮臺或彈藥 | 建立自己的據點與防線 | 炮臺布局、守區與強化技能選擇 | 發明家、炮臺、科技 |
| [赫威](https://www.leagueoflegends.com/zh-tw/champions/hwei/)<br>Hwei | 法師／輔助／9 | 中、輔 | 遠程法術。從傷害、增益、控制各組選擇法術組合 | 用豐富工具解決不同情境 | 組合記憶、即時選擇與命中 | 畫師、情緒、魔法繪畫 |
| [伊羅旖](https://www.leagueoflegends.com/zh-tw/champions/illaoi/)<br>Illaoi | 鬥士／坦克／4 | 上 | 近戰、靈魂拉取。在地形旁建立觸手，拉出靈魂並反擊圍攻 | 守住自己的領域、迎接挑戰 | 觸手位置、靈魂命中與敵人進退 | 海神祭司、觸手、試煉 |
| [伊瑞莉雅](https://www.leagueoflegends.com/zh-tw/champions/irelia/)<br>Irelia | 鬥士／刺客／5 | 上、中 | 近戰。透過擊殺與標記重置突進，疊攻速持續攻擊 | 在多個目標之間連續穿梭 | 士兵血量、標記、雙刃暈眩與路徑 | 舞者、浮空刀刃 |
| [埃爾文](https://www.leagueoflegends.com/zh-tw/champions/ivern/)<br>Ivern | 輔助／法師／7 | 野 | 遠程、召喚物。釋放野怪、造草、給盾並指揮黛西 | 照顧夥伴、透過伙伴與環境發揮 | 特殊野區流程、黛西指令與盾的時機 | 森林、樹人、石像好友 |
| [珍娜](https://www.leagueoflegends.com/zh-tw/champions/janna/)<br>Janna | 輔助／法師／7 | 輔 | 遠程法術。旋風中斷接近，護盾強化與風暴擊退治療 | 及時阻止危險靠近夥伴 | 反應中斷、盾的時機與擊退方向 | 風靈、守護、風暴 |
| [嘉文四世](https://www.leagueoflegends.com/zh-tw/champions/jarvaniv/)<br>JarvanIV | 鬥士／坦克／5 | 野、上 | 近戰。旗槍位移擊飛，競技場限制敵人活動 | 帶頭開路、創造團隊集火空間 | 旗槍連段、進場距離與地形影響 | 皇子、戰旗、長槍 |
| [賈克斯](https://www.leagueoflegends.com/zh-tw/champions/jax/)<br>Jax | 鬥士／5 | 上、野 | 近戰。連續攻擊疊攻速，閃避普攻後暈眩反擊 | 反覆磨練決鬥、持續交鋒 | 反擊時機、跳躍目標與長短交戰 | 武器大師、神祕戰士 |
| [杰西](https://www.leagueoflegends.com/zh-tw/champions/jayce/)<br>Jayce | 鬥士／射手／7 | 上、中 | 遠近形態切換。加速砲消耗，再切換戰鎚接近或擊退 | 遠近切換、依局面選工具 | 兩套技能、加速門瞄準與轉形時機 | 發明家、變形武器、雷電 |
| [燼](https://www.leagueoflegends.com/zh-tw/champions/jhin/)<br>Jhin | 射手／法師／6 | 下 | 遠程普攻與超遠射擊。四發彈匣、第四發爆發、陷阱與長程狙擊 | 有節拍地精準完成每一次出手 | 裝填空窗、第四發與狙擊命中 | 藝術家、面具、戲劇 |
| [吉茵珂絲](https://www.leagueoflegends.com/zh-tw/champions/jinx/)<br>Jinx | 射手／6 | 下 | 遠程普攻。切換槍砲，參與擊殺後大幅加速連續追擊 | 累積火力後進入停不下來的狀態 | 安全站位、武器選擇與追擊節制 | 瘋狂發明、火箭、混亂 |
| [凱莎](https://www.leagueoflegends.com/zh-tw/champions/kaisa/)<br>Kaisa | 射手／法師／6 | 下 | 中距離普攻、遠程技能。疊印記、裝備進化，選擇突進收尾位置 | 成長進化、抓住瞬間進場 | 進化條件、印記與突進落點 | 虛空共生、獵手、進化 |
| [克黎思妲](https://www.leagueoflegends.com/zh-tw/champions/kalista/)<br>Kalista | 射手／7 | 下 | 遠程、攻擊跳躍。攻擊間跳步、累積長矛拔出，與誓約夥伴連動 | 持續移動、和固定搭檔配合 | 跳步節奏、拔矛血量與誓約溝通 | 復仇幽魂、長矛、誓約 |
| [卡瑪](https://www.leagueoflegends.com/zh-tw/champions/karma/)<br>Karma | 法師／輔助／5 | 輔、中 | 遠程法術。真言強化傷害、連結或團隊護盾加速 | 依局面切換進攻與支援 | 強化技能選擇、連結距離與隊形 | 精神領袖、靈能、均衡 |
| [卡爾瑟斯](https://www.leagueoflegends.com/zh-tw/champions/karthus/)<br>Karthus | 法師／7 | 野、中 | 遠程落點、近身傷害圈。連續延遲爆破，死後施法與全圖傷害 | 持續施法、跨越距離影響局面 | 落點預判、魔力與全圖血量觀察 | 死靈、安魂曲、死亡 |
| [卡薩丁](https://www.leagueoflegends.com/zh-tw/champions/kassadin/)<br>Kassadin | 刺客／法師／8 | 中 | 近戰、短距離法術。反覆空間跳躍，連用提高傷害與魔力負擔 | 逐步成長後自由穿梭 | 前期生存、魔力與連跳節制 | 虛空、裂隙、行者 |
| [卡特蓮娜](https://www.leagueoflegends.com/zh-tw/champions/katarina/)<br>Katarina | 刺客／法師／8 | 中 | 近戰。撿匕首、瞬移，參與擊殺縮短冷卻 | 在混戰中連續接手下一個目標 | 匕首位置、控制技能與重置判斷 | 刺客、匕首、旋刃 |
| [凱爾](https://www.leagueoflegends.com/zh-tw/champions/kayle/)<br>Kayle | 射手／法師／7 | 上、中 | 隨等級由近轉遠。升級逐步解鎖攻擊強化，以無敵保護目標 | 耐心累積、體驗逐段蛻變 | 前期距離限制、發育與無敵時機 | 天使、聖火、審判 |
| [慨影](https://www.leagueoflegends.com/zh-tw/champions/kayn/)<br>Kayn | 鬥士／刺客／8 | 野 | 近戰。穿牆移動、進入敵人身體，選擇不同變身路線 | 探索特殊路徑、選擇成長方向 | 變身資源、路線與兩種形態用途 | 影武者、冥血鐮刀、雙面 |
| [凱能](https://www.leagueoflegends.com/zh-tw/champions/kennen/)<br>Kennen | 法師／4 | 上 | 遠程、近身大範圍法術。技能印記疊暈，化作雷球後以風暴進場 | 靈巧試探後帶來群體衝擊 | 印記層數、能量與風暴切入 | 雷電忍者、小型角色 |
| [卡力斯](https://www.leagueoflegends.com/zh-tw/champions/khazix/)<br>Khazix | 刺客／6 | 野 | 近戰。針對孤立目標、隱形與技能進化 | 挑選落單獵物、定製能力 | 孤立條件、進化選擇與視野 | 虛空獵食者、進化、蟲形 |
| [鏡爪](https://www.leagueoflegends.com/zh-tw/champions/kindred/)<br>Kindred | 射手／4 | 野 | 遠程普攻。標記追獵永久成長，範圍內暫時阻止死亡 | 追尋目標、決定生死邊界 | 印記風險、拉距與大絕雙方受益 | 神羊與魔狼、死亡、雙生 |
| [克雷德](https://www.leagueoflegends.com/zh-tw/champions/kled/)<br>Kled | 鬥士／7 | 上 | 近戰、下馬後改變。坐騎代承傷，下馬後累積勇氣重新上馬 | 背水一戰、重整後繼續衝鋒 | 坐騎狀態、勇氣與追擊承諾 | 騎乘、狂戰、古怪伙伴 |
| [寇格魔](https://www.leagueoflegends.com/zh-tw/champions/kogmaw/)<br>KogMaw | 射手／法師／6 | 下 | 遠程普攻與砲擊。強化射程與百分比傷害，以遠程炮擊補足火力 | 在安全位置持續傾瀉火力 | 缺少位移的站位與強化窗口 | 虛空幼獸、酸液、砲台 |
| [卡桑帝](https://www.leagueoflegends.com/zh-tw/champions/ksante/)<br>KSante | 坦克／鬥士／9 | 上 | 近戰。防禦與控制保護陣形，轉為拼死一搏追擊隔離目標 | 在守護與決鬥之間切換 | 雙形態技能、牆體與轉形風險 | 獵獸者、重武器、變形 |
| [勒布朗](https://www.leagueoflegends.com/zh-tw/champions/leblanc/)<br>Leblanc | 刺客／法師／9 | 中 | 中距離爆發。位移留下返回點、鎖鏈與複製技能連動 | 虛實欺敵、進退自如 | 返回點、連段選擇與鎖鏈距離 | 幻術、分身、魔女 |
| [李星](https://www.leagueoflegends.com/zh-tw/champions/leesin/)<br>LeeSin | 鬥士／刺客／6 | 野 | 近戰。兩段技能穿插普攻，接近友敵並踢回目標 | 即興操作、改變對手位置 | 能量、目標切換與踢擊方向 | 武僧、武術、龍 |
| [雷歐娜](https://www.leagueoflegends.com/zh-tw/champions/leona/)<br>Leona | 坦克／輔助／4 | 輔 | 近戰。突進束縛、連續暈眩與防禦強化 | 果斷開戰、替夥伴固定目標 | 隊友跟進距離與進場承諾 | 太陽、重甲、劍盾 |
| [莉莉亞](https://www.leagueoflegends.com/zh-tw/champions/lillia/)<br>Lillia | 鬥士／法師／8 | 野 | 中近距離法術。邊緣旋擊累積速度，標記多人再使其沉睡 | 輕快繞行、聚集一次大型機會 | 移速維持、外圈與睡眠時機 | 鹿妖精、夢境、森林 |
| [麗珊卓](https://www.leagueoflegends.com/zh-tw/champions/lissandra/)<br>Lissandra | 法師／6 | 中 | 中近距離法術。冰爪位移、群體定身與指定凍結或自保 | 限制關鍵目標、凍住混亂局面 | 進場冰爪、自保與控人的取捨 | 冰霜女巫、黑冰 |
| [洛克](https://www.leagueoflegends.com/zh-tw/champions/locke/)<br>Locke | 刺客／法師／5 | 中、野（均待驗證） | 近戰。咒釘標記接普攻，自損換攻速並以位移追擊處決 | 用生命換取短時間壓迫與收尾 | 自損回復窗口、標記與切入撤離 | 驅魔師、咒釘、燃魂 |
| [路西恩](https://www.leagueoflegends.com/zh-tw/champions/lucian/)<br>Lucian | 射手／刺客／6 | 下 | 中距離普攻。技能後雙發射擊，衝刺穿插普攻並配合友軍增益 | 快速連打、短距離交鋒 | 技能普攻銜接、衝刺與短射程 | 雙槍、驅魔、光明 |
| [露璐](https://www.leagueoflegends.com/zh-tw/champions/lulu/)<br>Lulu | 輔助／法師／5 | 輔 | 遠程法術。皮克斯附身，變形限制或強化友軍，巨大化救援 | 讓夥伴更強、打斷敵人的計畫 | 同一技能對友敵用途與目標選擇 | 精靈、奇幻、變形 |
| [拉克絲](https://www.leagueoflegends.com/zh-tw/champions/lux/)<br>Lux | 法師／輔助／5 | 中、輔 | 遠程法術。束縛、延遲引爆光區、往返護盾與直線光束 | 在遠處精準命中並照顧隊友 | 瞄準、技能連動與保持距離 | 光明、魔法少女、光束 |
| [墨菲特](https://www.leagueoflegends.com/zh-tw/champions/malphite/)<br>Malphite | 坦克／法師／2 | 上 | 近戰。防禦護盾、降低攻速，以高速撞擊擊飛多人 | 承受壓力後用一次撞擊開局 | 大絕目標、距離與隊友位置 | 岩石巨人、撞擊 |
| [馬爾札哈](https://www.leagueoflegends.com/zh-tw/champions/malzahar/)<br>Malzahar | 法師／6 | 中 | 中距離法術、召喚物。傳染持續傷害、虛靈推進與指定壓制 | 讓準備的機制持續運作、鎖定威脅 | 持續傷害傳遞、虛靈存活與壓制站位 | 虛空先知、蟲群、精神控制 |
| [茂凱](https://www.leagueoflegends.com/zh-tw/champions/maokai/)<br>Maokai | 坦克／輔助／3 | 野、輔、上 | 近戰、遠程區域控制。樹苗偵察、纏繞突進與廣域樹牆 | 掌握通路、保護或限制整片區域 | 樹苗位置、進場與大絕路徑 | 樹人、自然、荊棘 |
| [易大師](https://www.leagueoflegends.com/zh-tw/champions/masteryi/)<br>MasterYi | 鬥士／刺客／4 | 野 | 近戰。普攻縮短突襲冷卻，冥想減傷與擊殺延長強化 | 累積熟練後持續追擊 | 進場前等待控制、突襲與冥想時機 | 劍聖、冥想、速度 |
| [梅爾](https://www.leagueoflegends.com/zh-tw/champions/mel/)<br>Mel | 法師／輔助／5 | 中、輔（候選） | 遠程法術。射彈疊加處決印記，新星攔截射彈並給予友軍增益 | 以魔法火力與防禦反擊掌握節奏 | 新星時機、光球命中與印記血量 | 金光、貴族、魔法屏障 |
| [米里歐](https://www.leagueoflegends.com/zh-tw/champions/milio/)<br>Milio | 輔助／法師／5 | 輔 | 遠程法術。火球擊退、營火治療加射程，護盾與群體解控 | 擴大夥伴的發揮空間、即時解除危機 | 保護目標、解控反應與自身距離 | 溫暖火焰、營火、伙伴 |
| [好運姐](https://www.leagueoflegends.com/zh-tw/champions/missfortune/)<br>MissFortune | 射手／法師／1 | 下 | 遠程普攻。換目標強化攻擊、彈射子彈與錐形彈幕 | 尋找漂亮角度、一次覆蓋多人 | 彈射角度、彈幕引導與安全位置 | 海盜、雙槍、彈雨 |
| [悟空](https://www.leagueoflegends.com/zh-tw/champions/wukong/)<br>MonkeyKing | 鬥士／坦克／3 | 上、野 | 近戰。分身與隱形位移，突進並旋轉擊飛 | 真假配合、切入擾亂人群 | 分身用途、進場與旋轉控制 | 猴王、分身、長棍 |
| [魔鬥凱薩](https://www.leagueoflegends.com/zh-tw/champions/mordekaiser/)<br>Mordekaiser | 鬥士／法師／4 | 上 | 近戰。持續傷害圈、儲傷護盾，把目標帶入異界決鬥 | 主宰近身空間、強制一對一 | 接近目標、護盾回復與隔離選擇 | 亡靈君王、重甲、異界 |
| [魔甘娜](https://www.leagueoflegends.com/zh-tw/champions/morgana/)<br>Morgana | 輔助／法師／1 | 輔、中 | 遠程法術、近身鎖鏈。長時間束縛、持續傷害區與阻擋控制的黑盾 | 限制威脅、保住夥伴行動自由 | 束縛命中、黑盾時機與鎖鏈風險 | 墮落天使、黑暗魔法、鎖鏈 |
| [娜菲芮](https://www.leagueoflegends.com/zh-tw/champions/naafiri/)<br>Naafiri | 刺客／鬥士／2 | 野、中 | 近戰、獵犬群。犬群配合標記攻擊，無法指定強化與鎖定追擊 | 率領獵犬一起捕獵 | 犬群狀態、切入與追擊後生存 | 冥血獵犬、群獵、刀刃 |
| [娜米](https://www.leagueoflegends.com/zh-tw/champions/nami/)<br>Nami | 輔助／法師／5 | 輔 | 遠程法術。水泡控場、水流彈跳治療、強化友軍與潮浪 | 和夥伴互相接應、掌握攻防節奏 | 水泡預判、彈跳位置與強化時機 | 人魚、海潮、治療 |
| [納瑟斯](https://www.leagueoflegends.com/zh-tw/champions/nasus/)<br>Nasus | 鬥士／坦克／6 | 上 | 近戰。擊殺疊加打擊威力，衰老限制與巨型強化 | 耐心累積、感受數值逐步增長 | 補尾刀、前期承壓與接近目標 | 沙漠神祇、胡狼、成長 |
| [納帝魯斯](https://www.leagueoflegends.com/zh-tw/champions/nautilus/)<br>Nautilus | 坦克／輔助／6 | 輔 | 近戰、鉤錨接近。鉤錨、普攻定身與追蹤擊飛連續限制 | 抓到目標後讓團隊集中處理 | 鉤錨碰撞、進場與保人選擇 | 深海巨人、重甲、船錨 |
| [妮可](https://www.leagueoflegends.com/zh-tw/champions/neeko/)<br>Neeko | 法師／輔助／5 | 中、輔 | 中距離法術、近身控制。偽裝單位、分身誘導，隱藏大範圍進場意圖 | 出奇制勝、用偽裝創造驚喜 | 偽裝可信度、進場位置與範圍判斷 | 變色龍、變形、花朵 |
| [奈德麗](https://www.leagueoflegends.com/zh-tw/champions/nidalee/)<br>Nidalee | 刺客／法師／8 | 野 | 遠近形態切換。標槍或陷阱標記，轉為美洲獅突進，也可治療 | 精準獵捕、兩套能力靈活切換 | 標槍命中、標記追擊與雙形態循環 | 獸形、標槍、荒野 |
| [淣菈](https://www.leagueoflegends.com/zh-tw/champions/nilah/)<br>Nilah | 鬥士／刺客／10 | 下 | 近戰、短距離延伸攻擊。短射程揮刃、分享治療護盾、閃避與聚敵 | 與夥伴並肩、深入人群釋放力量 | 短射程生存、友軍增益與切入 | 水刃、歡悅、神祕力量 |
| [夜曲](https://www.leagueoflegends.com/zh-tw/champions/nocturne/)<br>Nocturne | 鬥士／刺客／4 | 野 | 近戰、遠距離突進。遮蔽敵方視野後突進，護盾擋技能並恐懼目標 | 主動選定獵物、瞬間逼近 | 全圖目標判斷、護盾反應與進場風險 | 夢魘、黑暗、利刃 |
| [努努和威朗普](https://www.leagueoflegends.com/zh-tw/champions/nunu/)<br>Nunu | 坦克／法師／4 | 野 | 近戰。滾雪球沿路進場、吞噬野怪與蓄力暴風雪 | 帶著夥伴四處奔跑、主動幫忙 | 雪球轉向、路線與暴風雪位置 | 孩童與雪人、冰雪、友情 |
| [歐拉夫](https://www.leagueoflegends.com/zh-tw/champions/olaf/)<br>Olaf | 鬥士／坦克／3 | 上、野 | 近戰。撿斧縮短冷卻，低血量強化並免疫控制追打 | 越危急越敢向前、正面突破 | 血量、斧頭路徑與追擊持續條件 | 狂戰士、雙斧、不屈 |
| [奧莉安娜](https://www.leagueoflegends.com/zh-tw/champions/orianna/)<br>Orianna | 法師／輔助／7 | 中 | 遠程、獨立球體位置。球體定位決定傷害、護盾與拉聚範圍 | 精確布置、與進場夥伴連動 | 本體和球的位置、魔力與團隊連動 | 機械舞者、魔法球 |
| [鄂爾](https://www.leagueoflegends.com/zh-tw/champions/ornn/)<br>Ornn | 坦克／5 | 上 | 近戰、遠距離召喚。就地打造裝備、強化隊友道具與地形擊飛 | 長期準備、打造團隊優勢 | 易碎連動、撞牆與召喚物二次撞擊 | 鍛造神、熔岩、山羊 |
| [潘森](https://www.leagueoflegends.com/zh-tw/champions/pantheon/)<br>Pantheon | 鬥士／刺客／4 | 上、中、輔 | 近戰、投矛。強化技能、指定跳暈、盾擋正面與長距離落地 | 果斷出擊、在需要時支援 | 強化層數、擋傷方向與支援時機 | 戰士、長矛、盾牌 |
| [波比](https://www.leagueoflegends.com/zh-tw/champions/poppy/)<br>Poppy | 坦克／鬥士／6 | 上、野、輔 | 近戰。擋衝刺、把目標撞向牆面，蓄力擊飛送離戰場 | 否決敵人突進、守住關鍵位置 | 反衝刺反應、牆角與大絕用途 | 小英雄、巨鎚、守護 |
| [派克](https://www.leagueoflegends.com/zh-tw/champions/pyke/)<br>Pyke | 輔助／刺客／7 | 輔 | 近戰、鉤刺抓取。偽裝接近、拉人與位移暈眩，處決分享金錢 | 主動狩獵、讓收尾回饋隊友 | 技能命中、脆弱身體與處決門檻 | 亡靈刺客、魚叉、深海 |
| [姬亞娜](https://www.leagueoflegends.com/zh-tw/champions/qiyana/)<br>Qiyana | 刺客／8 | 中 | 近戰。借取不同地形元素強化技能，以地形爆發控場 | 利用環境、打出變化連段 | 元素選擇、地形與高速連段 | 元素女皇、環刃、叢林 |
| [葵恩](https://www.leagueoflegends.com/zh-tw/champions/quinn/)<br>Quinn | 射手／刺客／5 | 上 | 遠程普攻。獵鷹標記、降低視野、彈跳拉距與高速飛行 | 獨立行動、快速轉換地點 | 射程拉扯、飛行路線與支援取捨 | 遊俠、獵鷹、飛行 |
| [銳空](https://www.leagueoflegends.com/zh-tw/champions/rakan/)<br>Rakan | 輔助／5 | 輔 | 近戰、頻繁位移。衝入人群擊飛魅惑，再跳回隊友給盾 | 華麗切入、在夥伴之間穿梭 | 隊友距離、控制連段與撤退路線 | 羽翼、舞者、魅惑 |
| [拉姆斯](https://www.leagueoflegends.com/zh-tw/champions/rammus/)<br>Rammus | 坦克／5 | 野 | 近戰。滾球接近、嘲諷迫使攻擊並反彈普攻傷害 | 用堅硬防禦懲罰攻擊自己的人 | 滾球路徑、嘲諷目標與防禦時機 | 披甲生物、反彈、滾動 |
| [雷珂煞](https://www.leagueoflegends.com/zh-tw/champions/reksai/)<br>RekSai | 鬥士／坦克／3 | 野 | 近戰、地底形態。地底感知、隧道改變路線，鑽出擊飛並追擊 | 掌握隱藏路徑、追蹤動靜 | 地底視野限制、隧道與怒氣 | 地底獵食者、異形、隧道 |
| [銳兒](https://www.leagueoflegends.com/zh-tw/champions/rell/)<br>Rell | 坦克／輔助／0 | 輔 | 近戰、騎乘形態。騎乘切換重甲，破盾暈眩並以磁場聚敵 | 衝入陣中、替隊伍聚集目標 | 落地承諾、形態切換與隊友跟進 | 金屬騎士、磁力、坐騎 |
| [睿娜妲．格萊斯克](https://www.leagueoflegends.com/zh-tw/champions/renata/)<br>Renata | 輔助／法師／8 | 輔 | 遠程法術。延遲隊友死亡、標記協作與使敵軍互相攻擊 | 操控局勢、給夥伴最後一次機會 | 增益時機、雙方輸出與毒霧路徑 | 生化科技、權謀、操控 |
| [雷尼克頓](https://www.leagueoflegends.com/zh-tw/champions/renekton/)<br>Renekton | 鬥士／坦克／3 | 上 | 近戰。怒氣強化技能，衝刺進退、暈眩與回血 | 掌握短時間優勢、正面施壓 | 怒氣分配、換血長短與二段位移 | 巨鱷、暴君、狂怒 |
| [雷葛爾](https://www.leagueoflegends.com/zh-tw/champions/rengar/)<br>Rengar | 刺客／鬥士／8 | 野、上 | 近戰、草叢跳躍。草叢撲擊、殘虐強化技能與偽裝追獵 | 埋伏、選定獵物後爆發 | 草叢路徑、殘虐選擇與連段 | 獅形獵人、戰利品、獵殺 |
| [雷玟](https://www.leagueoflegends.com/zh-tw/champions/riven/)<br>Riven | 鬥士／刺客／8 | 上 | 近戰。三段劍擊、短衝刺護盾與普攻交織連段 | 長期磨練連段與臨場變化 | 技能普攻銜接、三段位移與距離 | 斷刃、劍士、符文 |
| [藍寶](https://www.leagueoflegends.com/zh-tw/champions/rumble/)<br>Rumble | 鬥士／法師／10 | 上、中 | 中近距離法術。管理熱能強化技能，火焰與直線火牆控場 | 把機械推到臨界點、切割戰場 | 熱能、過熱窗口與火牆方向 | 機甲、火焰、發明家 |
| [雷茲](https://www.leagueoflegends.com/zh-tw/champions/ryze/)<br>Ryze | 法師／7 | 中、上 | 中距離連續法術。印記改變連招效果，群體傳送移動隊伍 | 研究施法順序、帶隊改變位置 | 連招分支、魔力、短射程與傳送溝通 | 符文法師、卷軸、空間 |
| [煞蜜拉](https://www.leagueoflegends.com/zh-tw/champions/samira/)<br>Samira | 射手／刺客／6 | 下 | 遠程與近戰交織。不同招式疊評級、擋射彈，再近身傾瀉彈幕 | 華麗連段、在危險中心表演 | 評級、進場等待與擊殺重置 | 槍劍、傭兵、張揚 |
| [史瓦妮](https://www.leagueoflegends.com/zh-tw/champions/sejuani/)<br>Sejuani | 坦克／4 | 野 | 近戰、遠程投擲控制。撞擊、冰霜疊層與長程冰鏈，搭配近戰友軍 | 帶頭固定目標、和隊友連控 | 疊層配合、大絕命中與進場 | 冰霜戰士、野豬坐騎 |
| [姍娜](https://www.leagueoflegends.com/zh-tw/champions/senna/)<br>Senna | 輔助／射手／7 | 輔、下 | 遠程普攻。收集靈魂增長射程，射擊兼治療並全圖給盾 | 同時照顧夥伴與成長為火力 | 慢速攻擊、靈魂取得與射線對齊 | 光影、巨砲、亡魂 |
| [瑟菈紛](https://www.leagueoflegends.com/zh-tw/champions/seraphine/)<br>Seraphine | 輔助／法師／0 | 輔、下、中 | 遠程法術。重複施法、群體護盾治療與可延長的魅惑聲波 | 讓多人一起發揮、層層接力 | 回聲次數、友軍位置與控制銜接 | 歌手、音樂、共鳴 |
| [賽特](https://www.leagueoflegends.com/zh-tw/champions/sett/)<br>Sett | 鬥士／坦克／2 | 上 | 近戰。承傷累積重拳，拉聚兩側目標並抱摔敵人 | 承受壓力後以重拳回應 | 承傷量、重拳中心與抱摔方向 | 拳鬥士、力量、街頭 |
| [薩科](https://www.leagueoflegends.com/zh-tw/champions/shaco/)<br>Shaco | 刺客／9 | 野、輔 | 近戰、陷阱與分身。隱形背刺、盒子恐懼與可指揮分身 | 欺敵、提前布置讓人踩入圈套 | 陷阱準備、分身指令與撤退 | 惡魔小丑、玩偶、詭計 |
| [慎](https://www.leagueoflegends.com/zh-tw/champions/shen/)<br>Shen | 坦克／4 | 上、輔 | 近戰、跨圖支援。靈刃位置決定攻擊強化，格擋普攻並傳送保人 | 守住自己位置也留意遠方夥伴 | 靈刃、嘲諷與跨圖支援取捨 | 忍者、靈刃、守護 |
| [希瓦娜](https://www.leagueoflegends.com/zh-tw/champions/shyvana/)<br>Shyvana | 鬥士／坦克／4 | 野、上（候選） | 近戰、龍焰遠射。累積防禦層數，護盾與變龍強化基礎技能 | 累積後化龍、以體型與火力壓迫 | 變身窗口、近身與龍焰選擇 | 龍人、火焰、變形 |
| [辛吉德](https://www.leagueoflegends.com/zh-tw/champions/singed/)<br>Singed | 坦克／法師／5 | 上 | 近戰、身後持續毒霧。移動留下毒路，膠水限制位移並過肩摔 | 設計追逐路線、擾亂敵方節奏 | 路線、仇恨與甩人位置 | 鍊金術、毒霧、古怪 |
| [賽恩](https://www.leagueoflegends.com/zh-tw/champions/sion/)<br>Sion | 坦克／鬥士／5 | 上 | 近戰。蓄力重擊、擊殺永久加生命與可轉向長途衝撞 | 成為厚重前線、累積持久存在感 | 蓄力被打斷、衝撞轉向與生命管理 | 不死巨人、重斧、衝撞 |
| [希維爾](https://www.leagueoflegends.com/zh-tw/champions/sivir/)<br>Sivir | 射手／4 | 下 | 遠程普攻。彈射清理密集目標，法術盾與團隊加速 | 有效率清理、帶大家一起移動 | 護盾反應、短射程與團隊加速時機 | 傭兵、迴旋刃、沙漠 |
| [史加納](https://www.leagueoflegends.com/zh-tw/champions/skarner/)<br>Skarner | 坦克／鬥士／5 | 野、上 | 近戰。舉石強化攻擊，穿牆撞人並以尾刺拖走目標 | 穿越地形、搬移關鍵敵人 | 穿牆路線、撞牆角度與拖行方向 | 巨蠍、岩石、原始力量 |
| [史矛德](https://www.leagueoflegends.com/zh-tw/champions/smolder/)<br>Smolder | 射手／法師／6 | 下、中 | 遠程技能與普攻。疊層增強龍息，短暫飛行與召喚母親吐息 | 照顧幼龍成長、逐步擴張火力 | 堆層效率、站位與飛行保留 | 幼龍、火焰、家庭 |
| [索娜](https://www.leagueoflegends.com/zh-tw/champions/sona/)<br>Sona | 輔助／法師／4 | 輔 | 遠程法術、近身靈氣。切換治療、傷害和加速靈氣，選擇強化普攻效果 | 讓團隊持續受益、掌握施法節奏 | 光環距離、魔力與強化普攻選擇 | 琴師、音樂、守護 |
| [索拉卡](https://www.leagueoflegends.com/zh-tw/champions/soraka/)<br>Soraka | 輔助／法師／3 | 輔 | 遠程法術。以自身生命治療，命中敵人回復並全圖救援 | 即時照顧、把危機中的人拉回來 | 自身生命、敵方切入與全圖觀察 | 星辰、治癒、犧牲 |
| [斯溫](https://www.leagueoflegends.com/zh-tw/champions/swain/)<br>Swain | 法師／輔助／8 | 中、輔、下 | 中近距離法術。拉回敵人收集靈魂，變身吸取周圍生命 | 在混戰中持續存在、掌控區域 | 控制命中、吸血距離與進退 | 惡魔、渡鴉、統帥 |
| [賽勒斯](https://www.leagueoflegends.com/zh-tw/champions/sylas/)<br>Sylas | 法師／刺客／5 | 中 | 近戰。技能與強化普攻穿插，回血並偷用敵方大絕 | 依對手改變工具、臨場發揮 | 敵方大絕知識、連段與回血時機 | 鎖鏈、反叛、奪取魔法 |
| [星朵拉](https://www.leagueoflegends.com/zh-tw/champions/syndra/)<br>Syndra | 法師／8 | 中 | 遠程法術。布置黑暗星體、推球暈眩並集中球體爆發 | 精確控制位置、累積一次強攻 | 球的位置、推球角度與成長碎片 | 黑暗魔法、念力、星體 |
| [貪啃奇](https://www.leagueoflegends.com/zh-tw/champions/tahmkench/)<br>TahmKench | 坦克／輔助／5 | 上、輔 | 近戰。舔擊回血、灰血護盾，吞下隊友保護或吞敵 | 厚實承傷、把夥伴從危險中帶走 | 層數、護盾轉換與吞吐方向 | 河流巨怪、吞噬、契約 |
| [塔莉雅](https://www.leagueoflegends.com/zh-tw/champions/taliyah/)<br>Taliyah | 法師／輔助／5 | 中、野 | 中距離法術。移動投石、推人進石陣，長牆改變路線 | 以地形與移動控制戰局 | 推石連段、變動領域與支援路線 | 岩石、織造、衝浪 |
| [塔隆](https://www.leagueoflegends.com/zh-tw/champions/talon/)<br>Talon | 刺客／7 | 中、野 | 近戰。翻越地形、技能疊流血，隱形環刃切入 | 快速換路線、尋找突然出現的角度 | 翻牆冷卻、連段與離場路線 | 刺客、袖刃、跑酷 |
| [塔里克](https://www.leagueoflegends.com/zh-tw/champions/taric/)<br>Taric | 輔助／坦克／3 | 輔 | 近戰、連結投射技能。普攻刷新技能，與夥伴連結複製施法並延遲無敵 | 並肩作戰、共同撐過關鍵時刻 | 普攻循環、雙點暈眩與無敵預判 | 寶石、星辰、守護者 |
| [提摩](https://www.leagueoflegends.com/zh-tw/champions/teemo/)<br>Teemo | 射手／法師／6 | 上 | 遠程普攻、陷阱。毒性攻擊、致盲與隱形蘑菇控制通路 | 探索布置、讓準備持續產生效果 | 安全距離、蘑菇布局與路線選擇 | 小型斥候、蘑菇、毒素 |
| [瑟雷西](https://www.leagueoflegends.com/zh-tw/champions/thresh/)<br>Thresh | 輔助／坦克／7 | 輔 | 中近距離、鉤鎖。鉤人、位移打斷與燈籠接回夥伴 | 攻防兩用、創造特殊救援路線 | 鉤子選擇、燈籠溝通與反應位移 | 幽魂獄卒、鎖鏈、燈籠 |
| [崔絲塔娜](https://www.leagueoflegends.com/zh-tw/champions/tristana/)<br>Tristana | 射手／刺客／4 | 下、中 | 遠程普攻。疊加炸彈、跳躍追擊重置與擊退自保 | 積極找機會、連續推進 | 炸彈層數、跳躍重置與落點 | 小型砲手、火箭跳躍 |
| [特朗德](https://www.leagueoflegends.com/zh-tw/champions/trundle/)<br>Trundle | 鬥士／坦克／5 | 上、野 | 近戰。偷攻擊與防禦，冰柱改變通道並提高自身攻速 | 正面較量、削弱強敵後接管 | 冰柱卡位、偷取目標與追擊距離 | 巨魔、寒冰、掠奪 |
| [泰達米爾](https://www.leagueoflegends.com/zh-tw/champions/tryndamere/)<br>Tryndamere | 鬥士／刺客／5 | 上 | 近戰。怒氣強化暴擊，旋轉接近與短時間免死 | 在危險邊緣持續決鬥 | 怒氣、免死秒數與撤退時機 | 蠻王、大劍、不屈 |
| [逆命](https://www.leagueoflegends.com/zh-tw/champions/twistedfate/)<br>TwistedFate | 法師／射手／9 | 中 | 遠程普攻與法術。選牌切換用途，揭露敵方位置並傳送 | 觀察全局、在關鍵地點出現 | 選牌節拍、地圖觀察與落點 | 紙牌、賭徒、命運 |
| [圖奇](https://www.leagueoflegends.com/zh-tw/champions/twitch/)<br>Twitch | 射手／刺客／6 | 下 | 遠程普攻、偽裝接近。偽裝改變接近角度，穿透射擊與毒層引爆 | 隱藏火力、突然找到成排目標 | 現身時機、射線角度與脆弱站位 | 瘟疫鼠、毒液、伏擊 |
| [烏迪爾](https://www.leagueoflegends.com/zh-tw/champions/udyr/)<br>Udyr | 鬥士／坦克／7 | 野、上 | 近戰、四種姿態。切換姿態並覺醒其中一種，攻擊穿插護盾與控制 | 依局面調整狀態、持續追逐 | 姿態循環、覺醒選擇與接近路線 | 獸靈、武術、自然 |
| [烏爾加特](https://www.leagueoflegends.com/zh-tw/champions/urgot/)<br>Urgot | 鬥士／坦克／8 | 上 | 短射程普攻。六腳方向火力、連射、翻摔與低血量拖拽處決 | 厚重火力、把目標一步步逼入終局 | 繞行觸發腿砲、翻摔與處決血量 | 生化改造、多足、重火力 |
| [法洛士](https://www.leagueoflegends.com/zh-tw/champions/varus/)<br>Varus | 射手／法師／2 | 下、中 | 遠程普攻與蓄力箭。毒層連動技能，蓄力遠射與蔓延禁錮 | 精準長射與連續攻擊間切換 | 毒層、蓄力瞄準與無位移站位 | 冥血弓手、腐化、復仇 |
| [汎](https://www.leagueoflegends.com/zh-tw/champions/vayne/)<br>Vayne | 射手／刺客／8 | 下、上 | 中距離普攻。三擊真傷、翻滾隱形與釘牆擊退 | 細膩操作、對強大目標完成反擊 | 短射程、翻滾、釘牆與持續走位 | 暗夜獵手、弩箭、潛行 |
| [維迦](https://www.leagueoflegends.com/zh-tw/champions/veigar/)<br>Veigar | 法師／7 | 中、下 | 遠程法術。永久累積魔法力量，牢籠封路並以爆發收尾 | 一點一滴成長、最後釋放巨力 | 堆層、牢籠邊界與延遲落點 | 小型黑法師、邪惡魔法 |
| [威寇茲](https://www.leagueoflegends.com/zh-tw/champions/velkoz/)<br>Velkoz | 法師／輔助／8 | 中、輔 | 遠程法術。分裂射線、三層分解與引導雷射 | 計算角度、完成精準分解 | 幾何瞄準、疊層與引導時安全 | 虛空之眼、研究、雷射 |
| [薇可絲](https://www.leagueoflegends.com/zh-tw/champions/vex/)<br>Vex | 法師／0 | 中 | 中距離法術、遠距離切入。儲存恐懼打斷位移，命中黯影後追擊 | 反制冒進、抓準機會追擊 | 恐懼保留、大絕命中與進場判斷 | 陰鬱、小型法師、黯影 |
| [菲艾](https://www.leagueoflegends.com/zh-tw/champions/vi/)<br>Vi | 鬥士／刺客／4 | 野 | 近戰。蓄力衝拳、破甲與指定衝撞擊飛 | 鎖定關鍵目標、果斷突破 | 衝拳蓄力、隊友跟進與離場 | 巨型拳套、執法、力量 |
| [維爾戈](https://www.leagueoflegends.com/zh-tw/champions/viego/)<br>Viego | 鬥士／刺客／5 | 野 | 近戰。擊倒敵人後附身使用其能力，再跳向下一目標 | 變成對手、連續接管混戰 | 多英雄技能知識、附身選擇與重置 | 亡國君王、附身、黯霧 |
| [維克特](https://www.leagueoflegends.com/zh-tw/champions/viktor/)<br>Viktor | 法師／9 | 中 | 遠程法術。碎片進化技能，重力場、畫線雷射與可引導風暴 | 研究升級、逐漸完善自己的工具 | 雷射操作、區域預判與升級順序 | 奧術與機械、進化、雷射 |
| [弗拉迪米爾](https://www.leagueoflegends.com/zh-tw/champions/vladimir/)<br>Vladimir | 法師／鬥士／7 | 中、上 | 中近距離法術。吸血循環、蓄力血潮與血池避險 | 用生命作資源、在危機中回復 | 強化吸血窗口、血量與血池保留 | 血液魔法、貴族、不死 |
| [弗力貝爾](https://www.leagueoflegends.com/zh-tw/champions/volibear/)<br>Volibear | 鬥士／坦克／3 | 上、野 | 近戰。雷電連擊、重複撕咬回血，躍擊暫停敵塔 | 壓迫向前、以巨獸力量突破 | 重複命中目標、落雷與躍擊時機 | 雷霆巨熊、荒野、神祇 |
| [沃維克](https://www.leagueoflegends.com/zh-tw/champions/warwick/)<br>Warwick | 鬥士／坦克／3 | 野、上 | 近戰。追蹤低血量氣味、吸血撕咬與壓制撲擊 | 追尋獵物、在殘血交鋒中反撲 | 追擊節制、撲擊方向與咬住時機 | 狼人、血獵、化學改造 |
| [剎雅](https://www.leagueoflegends.com/zh-tw/champions/xayah/)<br>Xayah | 射手／5 | 下 | 遠程普攻。攻擊留下羽刃，召回形成傷害與定身 | 預先留下退路、讓追兵受制 | 羽毛幾何位置、召回與升空自保 | 羽翼、反叛、刀羽 |
| [齊勒斯](https://www.leagueoflegends.com/zh-tw/champions/xerath/)<br>Xerath | 法師／輔助／8 | 中、輔 | 超遠程法術。蓄力光束、落點轟炸與遠距離引導射擊 | 維持距離、精準遠程砲擊 | 瞄準、魔力、無位移與開大位置 | 純粹奧能、飛升、光束 |
| [趙信](https://www.leagueoflegends.com/zh-tw/champions/xinzhao/)<br>XinZhao | 鬥士／坦克／2 | 野 | 近戰。突進三擊擊飛，大絕排開其他敵人並抵擋遠方傷害 | 直接接戰、守住一小塊交鋒空間 | 目標選擇、第三擊與大絕邊界 | 長槍武者、護衛、決鬥 |
| [犽宿](https://www.leagueoflegends.com/zh-tw/champions/yasuo/)<br>Yasuo | 鬥士／刺客／10 | 中、上 | 近戰。借單位連續衝刺、風牆擋彈與擊飛接大絕 | 穿梭交鋒、把熟練操作連成一氣 | 兵線路徑、擊飛條件與風牆反應 | 浪人、疾風、武士刀 |
| [犽凝](https://www.leagueoflegends.com/zh-tw/champions/yone/)<br>Yone | 鬥士／刺客／8 | 中、上 | 近戰。靈體暫時出擊後返回，蓄風突進與直線聚敵 | 短時間深入敵陣，再回到起點 | 靈體倒數、返回位置與連段落點 | 雙刀、靈魂、獵魔 |
| [約瑞科](https://www.leagueoflegends.com/zh-tw/champions/yorick/)<br>Yorick | 鬥士／坦克／6 | 上 | 近戰、召喚物。霧行者與女士作戰，屍牆困人並標記集火 | 帶領小軍隊、持續推進自己的路線 | 召喚物生存、兵線與分頭行動 | 掘墓人、亡靈軍團 |
| [尤娜拉](https://www.leagueoflegends.com/zh-tw/champions/yunara/)<br>Yunara | 射手／4 | 下 | 遠程普攻。攻速與擴散攻擊，超凡狀態升級技能並解鎖衝刺 | 持續射擊、在強化期間加速發揮 | 普攻走位與超凡狀態前後差異 | 巫女、靈珠、修行 |
| [悠咪](https://www.leagueoflegends.com/zh-tw/champions/yuumi/)<br>Yuumi | 輔助／法師／2 | 輔 | 遠程、附著友軍。附著移動、導引飛彈、護盾與治療並強化摯友 | 和固定夥伴同行、維持增益 | 附著依賴、目標選擇與增益時機 | 魔法貓、魔法書、同行 |
| [薩亨](https://www.leagueoflegends.com/zh-tw/champions/zaahen/)<br>Zaahen | 鬥士／2 | 上、野（候選） | 近戰。持續交鋒疊決心，滿層可復活，拉人與回血 | 堅持交鋒、以續戰與復起回應壓力 | 決心窗口、連續命中與復活條件 | 冥血神祇、大刀、不屈 |
| [札克](https://www.leagueoflegends.com/zh-tw/champions/zac/)<br>Zac | 坦克／鬥士／8 | 野、上 | 近戰、長距離彈射。蓄力彈射進場，撿組織回血並拉撞兩個目標 | 從意想不到角度進場、持續干擾 | 蓄力落點、組織位置與雙目標選擇 | 軟泥、彈跳、重組 |
| [劫](https://www.leagueoflegends.com/zh-tw/champions/zed/)<br>Zed | 刺客／7 | 中 | 近戰、影分身遠投。本體與影子共同施法、換位並延遲引爆標記 | 多點布局、完成精準刺殺後離場 | 影子位置、能量與傷害計算 | 影忍、分身、手裡劍 |
| [婕莉](https://www.leagueoflegends.com/zh-tw/champions/zeri/)<br>Zeri | 射手／6 | 下 | 遠程瞄準射擊。以方向射擊作普攻，充能、滑牆與超載加速 | 持續移動瞄準、高速滑行 | 連續瞄準、地形與速度維持 | 電能、街頭、速度 |
| [希格斯](https://www.leagueoflegends.com/zh-tw/champions/ziggs/)<br>Ziggs | 法師／4 | 中、下 | 遠程法術。彈跳炸彈、雷區、炸藥包與遠距離巨型炸彈 | 遠距離轟炸、拆除與區域布置 | 彈跳軌跡、炸藥包方向與落點 | 爆破專家、炸彈、混亂 |
| [極靈](https://www.leagueoflegends.com/zh-tw/champions/zilean/)<br>Zilean | 輔助／法師／6 | 輔、中 | 遠程法術。雙炸彈暈眩、加速或減速，預放復活結界 | 操縱節奏、替夥伴保留重來機會 | 雙炸彈命中、技能刷新與復活預判 | 時間、老法師、復活 |
| [柔依](https://www.leagueoflegends.com/zh-tw/champions/zoe/)<br>Zoe | 法師／5 | 中 | 遠程法術、短暫傳送。改向飛星、催眠，撿取技能碎片與暫時換位 | 出其不意、把偶然機會變成招式 | 飛星路徑、碎片與強制返回位置 | 星靈、童趣、傳送 |
| [枷蘿](https://www.leagueoflegends.com/zh-tw/champions/zyra/)<br>Zyra | 法師／輔助／7 | 輔、中 | 遠程、固定植物。種子與法術組合長出植物，藤蔓定身與叢林擊飛 | 預先播種、讓區域持續替自己作戰 | 種子位置、植物用途與脆弱站位 | 植物、荊棘、自然 |

## 六題補充草案

保留前 24 題生活情境草案，加入以下六題後共 30 題。第 24 題已有一般性的能力幻想，第 25 題改問具體距離，第 26 題問節奏，第 27 題問管理方式，第 28 題問合作方式，第 29、30 題問外型與力量主題。題目適合度與答案是否容易理解，仍需新手試答。

### 第 25 題

你走進一場奇幻試煉，能挑選一件武器。哪種使用方式最讓你心動？

- A．貼近對手，用劍與步伐一招一式地較量。
- B．隔著一段距離，用弓或魔法精準命中。
- C．站在最前方，用巨盾和重擊穩穩推進。
- D．能隨時切換遠近，依情況改變打法。

觀察距離、承傷意願與轉換偏好。A、C 都包含近身偏好，C 額外提供承傷與推進訊號。這題需與生活題及其他補題合併解讀。

### 第 26 題

你的魔法能以四種方式施展，哪種節奏最讓你想反覆練習？

- A．持續射出小型光彈，邊移動邊命中。
- B．耐心瞄準，讓一次重擊決定局面。
- C．把不同招式串起來，連成流暢的動作。
- D．先布置符文，等時機成熟一起發動。

觀察持續操作、精準單次出手、連段與預置機制的吸引力。這些答案描述想練的體驗，實際能力仍需試玩觀察。

### 第 27 題

一位工匠願意替你打造魔法裝備，你最期待哪一種？

- A．一件可靠的兵器，讓我專心磨練每個細節。
- B．能切換型態的裝備，每個型態都有用途。
- C．幾位能接受指令的小伙伴，和我一起行動。
- D．一整套不同工具，讓我研究各種組合。

觀察專注單一操作、形態切換、召喚物與多工具的偏好。召喚物還需依英雄區分自動協作、固定布置與主動指令。

### 第 28 題

冒險隊伍遇上強敵，你最想擁有哪種和夥伴合作的能力？

- A．讓夥伴更強，讓他做到原本做不到的事。
- B．先抓住機會，再招呼大家一起跟上。
- C．和一位搭檔互相接招，完成漂亮的配合。
- D．各自處理一個目標，在關鍵時刻互相支援。

觀察增益、發起機會、緊密搭檔與分工自主。與前 24 題的合作題交叉檢查，避免重複計分過重。

### 第 29 題

如果要陪一個角色冒險很久，你最容易被哪些外型吸引？可以選最多兩項，也可以選「還沒有偏好」。

- A．以人形為主，有明確服裝和武器風格。
- B．動物、龍、異形或其他幻想生物。
- C．小巧可愛、古靈精怪的角色。
- D．機械、魔像或外型特殊的構造體。
- E．還沒有偏好，想先看不同角色。

E 與其他選項互斥。允許重疊標籤，例如部分英雄同時具有動物、小型或人形特徵。此題的分類是美術偏好描述。

### 第 30 題

哪兩種力量最容易讓你產生「我想試試看」的感覺？可以選最多兩項，也可以選「還沒有偏好」。

- A．火焰、冰雪、雷電或岩石。
- B．森林、植物、動物或治癒。
- C．星辰、光明或神聖力量。
- D．暗影、靈魂、詛咒或血液。
- E．機械、發明、火藥或重型武器。
- F．劍術、拳法、弓術或其他武藝。
- G．時間、空間、幻術或變形。
- H．還沒有偏好，想先看不同能力。

H 與其他選項互斥。各類可同時命中同一英雄的多個主題，先作偏好加分。測驗初版可將主題分數與玩法分數各自顯示來源，讓結果理由可被檢查。

## 下一步可用的資料結構

英雄分析資料已保留官方欄位與研究欄位，方便後續討論。推薦演算法還需要共同決定偏好維度、答案權重、位置適配與並列處理。覆蓋全部英雄與每位英雄都能成為合理推薦，是需要分別驗證的兩件事。

後續驗證應檢查每位英雄的推薦可達性、相似英雄的區分理由、輕微答案變動的穩定程度，以及新手試玩後的回饋。現有文件尚未執行推薦模擬、心理計量驗證或實際遊戲試玩。
