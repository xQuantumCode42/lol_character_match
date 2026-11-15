import type { Option, Question } from "../domain/types";

type Choice = Omit<Option, "id">;
function question(
  number: number,
  title: string,
  choices: Choice[],
  maxSelections = 1,
): Question {
  return {
    id: `q${String(number).padStart(2, "0")}`,
    title,
    section: number <= 24 ? "daily" : "fantasy",
    maxSelections,
    options: choices.map((choice, index) => ({
      id: String.fromCharCode(97 + index),
      ...choice,
    })),
  };
}

export const questions: Question[] = [
  question(1, "朋友出遊，原訂行程突然取消，大家站在路邊互看。你通常會？", [
    {
      text: "整理附近幾個選擇，帶大家決定。",
      traits: { initiative: 2, control: 1 },
    },
    {
      text: "問問大家現在最想做什麼。",
      traits: { teamwork: 2, protection: 1 },
    },
    { text: "提議走進剛剛看到的奇怪小店。", traits: { risk: 2, mobility: 1 } },
    {
      text: "趁機自己逛一下，晚點再集合。",
      traits: { independence: 2, teamwork: -1 },
    },
  ]),
  question(2, "你得到一個完全自由的下午，最想怎麼度過？", [
    {
      text: "把最近一直練的興趣再推進一點。",
      traits: { patience: 2, precision: 1 },
    },
    { text: "找個人一起做些什麼。", traits: { teamwork: 2, independence: -1 } },
    { text: "去沒去過的地方晃晃。", traits: { mobility: 2, risk: 1 } },
    {
      text: "整理自己的空間，享受一切就位。",
      traits: { setup: 2, control: 1 },
    },
  ]),
  question(3, "一起做報告時，哪個工作最容易讓你投入？", [
    {
      text: "把其中一個部分做得很漂亮。",
      traits: { independence: 2, precision: 1 },
    },
    {
      text: "看各部分怎麼接起來，調整整體安排。",
      traits: { control: 2, complexity: 1 },
    },
    {
      text: "找出卡住的同伴，和他一起解決。",
      traits: { protection: 2, teamwork: 1 },
    },
    {
      text: "提出一個大家還沒想過的做法。",
      traits: { risk: 1, initiative: 1, complexity: 1 },
    },
  ]),
  question(4, "和朋友玩密室逃脫，你最容易出現在哪裡？", [
    {
      text: "盯著同一個機關，差一點就解開了。",
      traits: { patience: 2, precision: 1 },
    },
    {
      text: "到處跑，把不同地方的線索串起來。",
      traits: { mobility: 2, complexity: 1 },
    },
    {
      text: "和一個人搭檔，一起研究。",
      traits: { teamwork: 2, independence: -1 },
    },
    {
      text: "試著轉動某個看起來很可疑的東西。",
      traits: { initiative: 1, risk: 2 },
    },
  ]),
  question(5, "聚餐到了點餐時間，大家還在說「都可以」。你比較可能？", [
    {
      text: "直接提出一份搭配，讓大家修改。",
      traits: { initiative: 2, control: 1 },
    },
    {
      text: "先問清楚忌口和每個人想吃的東西。",
      traits: { protection: 2, teamwork: 1 },
    },
    {
      text: "等別人點完，補上缺少的種類。",
      traits: { initiative: -1, teamwork: 1, setup: 1 },
    },
    {
      text: "先決定自己的餐點，其他讓大家慢慢選。",
      traits: { independence: 2, control: -1 },
    },
  ]),
  question(6, "面前有一件沒人做過的事，你比較習慣？", [
    {
      text: "先試一小步，看看會發生什麼。",
      traits: { initiative: 2, risk: 1 },
    },
    {
      text: "觀察別人怎麼開始，再找切入點。",
      traits: { initiative: -1, patience: 1, precision: 1 },
    },
    { text: "把可能情況想過一遍，再動手。", traits: { setup: 2, risk: -1 } },
    {
      text: "找個人一起開始，邊做邊交換想法。",
      traits: { teamwork: 2, independence: -1 },
    },
  ]),
  question(7, "逛市集時，你看到一個很想買的東西，但只剩最後一個。你會？", [
    { text: "喜歡就拿下，錯過會一直惦記。", traits: { risk: 2, patience: -1 } },
    {
      text: "先確認品質和價格，再做決定。",
      traits: { risk: -1, precision: 2 },
    },
    {
      text: "想想它能不能和家裡的東西搭配。",
      traits: { setup: 2, complexity: 1 },
    },
    {
      text: "繼續逛，看看還有沒有更心動的。",
      traits: { patience: 1, mobility: 1, control: -1 },
    },
  ]),
  question(8, "桌遊裡出現一次機會，可以冒險換取大幅領先。你最在意？", [
    { text: "成功後能拉開多少差距。", traits: { risk: 2, initiative: 1 } },
    { text: "失敗後還有沒有補救空間。", traits: { risk: -2, protection: 1 } },
    {
      text: "現在是不是最值得出手的時刻。",
      traits: { patience: 1, precision: 2 },
    },
    {
      text: "這一步會怎麼影響一起玩的夥伴。",
      traits: { teamwork: 2, protection: 1 },
    },
  ]),
  question(9, "你正在煮飯，朋友突然傳訊息說需要幫忙。你通常會？", [
    {
      text: "先把手上的步驟做到能暫停，再回覆。",
      traits: { patience: 1, independence: 1, setup: 1 },
    },
    {
      text: "先看事情多急，再調整安排。",
      traits: { control: 1, protection: 1, complexity: 1 },
    },
    {
      text: "立刻聯絡他，邊了解邊處理。",
      traits: { protection: 2, initiative: 1 },
    },
    {
      text: "先提供一個他能自己開始做的方法。",
      traits: { independence: 1, teamwork: 1, setup: 1 },
    },
  ]),
  question(10, "你籌備一場活動時，最自然會注意到？", [
    {
      text: "最重要的那個環節準備好了沒。",
      traits: { precision: 2, setup: 1 },
    },
    {
      text: "時間、場地、人員之間有沒有衝突。",
      traits: { control: 2, complexity: 1 },
    },
    {
      text: "誰顯得不自在，或還沒融入。",
      traits: { protection: 2, teamwork: 1 },
    },
    {
      text: "有沒有什麼能讓大家驚喜的點子。",
      traits: { initiative: 1, risk: 1, setup: 1 },
    },
  ]),
  question(11, "看懸疑片時，最讓你投入的是？", [
    {
      text: "跟著主角，一步步破解眼前難題。",
      traits: { patience: 1, independence: 1, precision: 1 },
    },
    {
      text: "記住各條支線，猜它們怎麼連起來。",
      traits: { complexity: 2, setup: 1 },
    },
    {
      text: "觀察人物反應，猜誰隱瞞了事情。",
      traits: { precision: 1, control: 1, patience: 1 },
    },
    {
      text: "等一個意想不到的轉折，推翻自己的猜測。",
      traits: { risk: 1, complexity: 1, control: -1 },
    },
  ]),
  question(12, "到了陌生環境，你最先想掌握什麼？", [
    {
      text: "自己接下來要做的事情。",
      traits: { independence: 2, precision: 1 },
    },
    {
      text: "整個地方的配置和動線。",
      traits: { control: 1, setup: 1, mobility: 1 },
    },
    {
      text: "身邊有哪些人可以交流。",
      traits: { teamwork: 2, independence: -1 },
    },
    { text: "哪些地方值得去探索。", traits: { mobility: 2, risk: 1 } },
  ]),
  question(13, "一天結束時，哪件事最容易讓你覺得「今天很值得」？", [
    {
      text: "完成一件原本以為做不到的事。",
      traits: { risk: 1, complexity: 2 },
    },
    {
      text: "讓一團混亂終於照自己的安排運作。",
      traits: { control: 2, initiative: 1 },
    },
    {
      text: "因為我的幫忙，有人順利完成了事情。",
      traits: { protection: 2, teamwork: 1 },
    },
    {
      text: "累積一點進度，看見自己正在變熟練。",
      traits: { patience: 2, precision: 1 },
    },
  ]),
  question(14, "你和朋友一起完成一個很難的挑戰，最想回味哪一刻？", [
    {
      text: "自己處理了最難的那一段。",
      traits: { independence: 1, complexity: 2 },
    },
    {
      text: "大家照著我的提議，抓到成功的機會。",
      traits: { initiative: 2, teamwork: 1 },
    },
    {
      text: "我及時補了一手，讓大家繼續下去。",
      traits: { protection: 2, precision: 1 },
    },
    { text: "之前的準備終於一起發揮效果。", traits: { setup: 2, patience: 1 } },
  ]),
  question(15, "朋友送你一份很用心的禮物，哪種用心最打動你？", [
    {
      text: "他注意到我一直沒說出口的需要。",
      traits: { protection: 2, teamwork: 1 },
    },
    {
      text: "他挑了一個非常符合我品味的東西。",
      traits: { independence: 1, precision: 1 },
    },
    {
      text: "他安排了一次能一起經歷的冒險。",
      traits: { mobility: 1, teamwork: 1, risk: 1 },
    },
    {
      text: "他親手做了很久，細節都藏著心思。",
      traits: { patience: 2, precision: 1 },
    },
  ]),
  question(16, "如果能在一場表演中負責一件事，你最想體驗？", [
    {
      text: "站在台前，完成最精彩的一段。",
      traits: { initiative: 1, risk: 1, independence: 1 },
    },
    { text: "掌握節奏，讓整場順利推進。", traits: { control: 2, setup: 1 } },
    {
      text: "和搭檔配合，完成漂亮的雙人演出。",
      traits: { teamwork: 2, precision: 1 },
    },
    {
      text: "設計機關或效果，等觀眾驚呼。",
      traits: { setup: 2, complexity: 1 },
      styles: ["setup"],
    },
  ]),
  question(17, "你準備開始學一項新興趣，哪種過程最有吸引力？", [
    {
      text: "很快就能做出像樣的成果，再逐步加深。",
      traits: { complexity: -2, patience: 1 },
    },
    {
      text: "一開始很難，但學會後能玩出很多變化。",
      traits: { complexity: 2, patience: 1 },
    },
    {
      text: "有人一起練，能看見彼此進步。",
      traits: { teamwork: 2, patience: 1 },
    },
    {
      text: "可以自己研究，慢慢形成獨特做法。",
      traits: { independence: 1, complexity: 1, patience: 1 },
    },
  ]),
  question(18, "你喜歡上一首有點難的曲子，決定學會它。你會怎麼開始？", [
    { text: "拆成幾段，一段一段練熟。", traits: { patience: 2, precision: 1 } },
    {
      text: "先完整試一遍，找到最卡的地方。",
      traits: { initiative: 1, risk: 1, precision: 1 },
    },
    {
      text: "找教學，跟著成熟的方法走。",
      traits: { complexity: -1, setup: 1, patience: 1 },
    },
    {
      text: "先學最喜歡的片段，讓自己保持興趣。",
      traits: { independence: 1, patience: -1, initiative: 1 },
    },
  ]),
  question(19, "練了一陣子卻一直沒進步，什麼最能讓你繼續？", [
    { text: "知道自己具體卡在哪裡。", traits: { precision: 2, control: 1 } },
    {
      text: "看見熟練之後能做到多精彩。",
      traits: { complexity: 2, patience: 1 },
    },
    {
      text: "有夥伴一起練，也能互相回饋。",
      traits: { teamwork: 2, protection: 1 },
    },
    {
      text: "換一個方法，重新找到新鮮感。",
      traits: { mobility: 1, risk: 1, setup: -1 },
    },
  ]),
  question(20, "同一件事連續做了十次，你通常會開始？", [
    {
      text: "調整小細節，想做得更精準。",
      traits: { precision: 2, patience: 1 },
    },
    { text: "尋找更有效率的順序。", traits: { setup: 2, control: 1 } },
    {
      text: "加入不同變化，看看還能怎麼做。",
      traits: { complexity: 2, patience: -1 },
    },
    {
      text: "希望提高難度，試試自己的極限。",
      traits: { risk: 1, complexity: 2 },
    },
  ]),
  question(21, "計畫進行到一半，突然出了狀況。你最想先做什麼？", [
    {
      text: "先穩住眼前最急迫的問題。",
      traits: { initiative: 1, protection: 1, precision: 1 },
    },
    { text: "退一步看全局，重新安排。", traits: { control: 2, setup: 1 } },
    {
      text: "確認大家狀況，分配可以互相支援的事情。",
      traits: { teamwork: 2, protection: 1 },
    },
    {
      text: "抓住新出現的機會，乾脆改個方向。",
      traits: { mobility: 1, risk: 1, initiative: 1 },
    },
  ]),
  question(22, "你和一位做事節奏差很多的人搭檔，怎樣最讓你舒服？", [
    {
      text: "分清各自負責的部分，最後再整合。",
      traits: { independence: 2, teamwork: -1 },
    },
    { text: "先約好幾個互相確認的時間點。", traits: { setup: 2, teamwork: 1 } },
    {
      text: "一起做一段，慢慢找到共同節奏。",
      traits: { teamwork: 2, independence: -1 },
    },
    {
      text: "大方向說好，過程中隨時調整。",
      traits: { mobility: 1, setup: -1, risk: 1 },
    },
  ]),
  question(23, "以下哪種小麻煩，最容易讓你失去興致？", [
    {
      text: "每件事都得等別人同意，才能往下做。",
      traits: { independence: 2, initiative: 1 },
    },
    {
      text: "安排一直被打亂，沒辦法累積進度。",
      traits: { patience: 1, setup: 2 },
    },
    {
      text: "大家各做各的，很少互相回應。",
      traits: { teamwork: 2, independence: -1 },
    },
    {
      text: "每天都用同一種方式，幾乎沒有變化。",
      traits: { complexity: 2, setup: -1 },
    },
  ]),
  question(24, "如果你要在故事裡擁有一種能力，你最想選？", [
    {
      text: "越過障礙，瞬間抵達想去的地方。",
      traits: { mobility: 2, initiative: 1 },
    },
    {
      text: "改變周遭環境，讓事情依照自己的節奏發展。",
      traits: { control: 2, setup: 1 },
    },
    {
      text: "替重要的人擋下一次災難。",
      traits: { protection: 2, teamwork: 1 },
    },
    {
      text: "在適當時機，釋放累積已久的巨大力量。",
      traits: { patience: 2, setup: 1 },
      styles: ["burst"],
    },
  ]),
  question(25, "你走進一場奇幻試煉，能挑選一件武器。哪種使用方式最讓你心動？", [
    {
      text: "貼近對手，用劍與步伐一招一式地較量。",
      traits: { range: -2, precision: 1 },
    },
    {
      text: "隔著一段距離，用弓或魔法精準命中。",
      traits: { range: 2, precision: 1 },
    },
    {
      text: "站在最前方，用巨盾和重擊穩穩推進。",
      traits: { range: -1, protection: 2 },
    },
    {
      text: "能隨時切換遠近，依情況改變打法。",
      traits: { complexity: 1, mobility: 1 },
      styles: ["combo"],
    },
  ]),
  question(26, "你的魔法能以四種方式施展，哪種節奏最讓你想反覆練習？", [
    {
      text: "持續射出小型光彈，邊移動邊命中。",
      traits: { mobility: 1, precision: 1 },
      styles: ["sustained"],
    },
    {
      text: "耐心瞄準，讓一次重擊決定局面。",
      traits: { patience: 1, precision: 1 },
      styles: ["burst"],
    },
    {
      text: "把不同招式串起來，連成流暢的動作。",
      traits: { complexity: 2 },
      styles: ["combo"],
    },
    {
      text: "先布置符文，等時機成熟一起發動。",
      traits: { setup: 2 },
      styles: ["setup"],
    },
  ]),
  question(27, "一位工匠願意替你打造魔法裝備，你最期待哪一種？", [
    {
      text: "一件可靠的兵器，讓我專心磨練每個細節。",
      traits: { complexity: -2, precision: 1 },
    },
    {
      text: "能切換型態的裝備，每個型態都有用途。",
      traits: { complexity: 2, mobility: 1 },
      styles: ["combo"],
    },
    {
      text: "幾位能接受指令的小伙伴，和我一起行動。",
      traits: { setup: 2, control: 1 },
      styles: ["setup"],
    },
    {
      text: "一整套不同工具，讓我研究各種組合。",
      traits: { complexity: 2, setup: 1 },
      styles: ["combo"],
    },
  ]),
  question(28, "冒險隊伍遇上強敵，你最想擁有哪種和夥伴合作的能力？", [
    {
      text: "讓夥伴更強，讓他做到原本做不到的事。",
      traits: { protection: 2, teamwork: 1 },
    },
    {
      text: "先抓住機會，再招呼大家一起跟上。",
      traits: { initiative: 2, teamwork: 1 },
    },
    {
      text: "和一位搭檔互相接招，完成漂亮的配合。",
      traits: { teamwork: 2, precision: 1 },
    },
    {
      text: "各自處理一個目標，在關鍵時刻互相支援。",
      traits: { independence: 2, mobility: 1 },
    },
  ]),
  question(
    29,
    "如果要陪一個角色冒險很久，你最容易被哪些外型吸引？",
    [
      { text: "以人形為主，有明確服裝和武器風格。", forms: ["human"] },
      { text: "動物、龍、異形或其他幻想生物。", forms: ["creature"] },
      { text: "小巧可愛、古靈精怪的角色。", forms: ["small"] },
      { text: "機械、魔像或外型特殊的構造體。", forms: ["construct"] },
      { text: "還沒有偏好，想先看不同角色。", neutral: true },
    ],
    2,
  ),
  question(
    30,
    "哪兩種力量最容易讓你產生「我想試試看」的感覺？",
    [
      { text: "火焰、冰雪、雷電或岩石。", fantasies: ["element"] },
      { text: "森林、植物、動物或治癒。", fantasies: ["nature"] },
      { text: "星辰、光明或神聖力量。", fantasies: ["celestial"] },
      { text: "暗影、靈魂、詛咒或血液。", fantasies: ["dark"] },
      { text: "機械、發明、火藥或重型武器。", fantasies: ["tech"] },
      { text: "劍術、拳法、弓術或其他武藝。", fantasies: ["martial"] },
      { text: "時間、空間、幻術或變形。", fantasies: ["arcane"] },
      { text: "還沒有偏好，想先看不同能力。", neutral: true },
    ],
    2,
  ),
];
