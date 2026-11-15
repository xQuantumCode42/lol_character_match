import research from "../../docs/research/champion-profiles.json";
import official from "../../docs/research/official-champions-16.22.1.json";
import {
  dimensions,
  type Champion,
  type Dimension,
  type Fantasy,
  type LaneId,
  type Style,
  type Traits,
} from "../domain/types";

// These editorial profiles can be calibrated independently of the official kit data.
const archetypes = {
  duelist: [
    "Fiora",
    "Jax",
    "Tryndamere",
    "Camille",
    "Gwen",
    "Irelia",
    "Riven",
    "Yasuo",
    "Yone",
  ],
  brawler: [
    "Aatrox",
    "Darius",
    "DrMundo",
    "Garen",
    "Illaoi",
    "Mordekaiser",
    "Nasus",
    "Olaf",
    "Sett",
    "Trundle",
    "Udyr",
    "Urgot",
    "Volibear",
    "Warwick",
    "Zaahen",
  ],
  diver: [
    "Ambessa",
    "Briar",
    "Diana",
    "Hecarim",
    "JarvanIV",
    "Kled",
    "LeeSin",
    "MonkeyKing",
    "Nocturne",
    "Pantheon",
    "RekSai",
    "Vi",
    "XinZhao",
    "Renekton",
    "Shyvana",
  ],
  assassin: [
    "Akali",
    "Ekko",
    "Elise",
    "Evelynn",
    "Fizz",
    "Kassadin",
    "Katarina",
    "Khazix",
    "Leblanc",
    "Locke",
    "Naafiri",
    "Nidalee",
    "Pyke",
    "Qiyana",
    "Rengar",
    "Talon",
    "Zed",
  ],
  marksman: [
    "Akshan",
    "Aphelios",
    "Ashe",
    "Caitlyn",
    "Corki",
    "Draven",
    "Ezreal",
    "Graves",
    "Jhin",
    "Jinx",
    "Kaisa",
    "Kalista",
    "Kindred",
    "KogMaw",
    "Lucian",
    "MissFortune",
    "Quinn",
    "Samira",
    "Senna",
    "Sivir",
    "Smolder",
    "Tristana",
    "Twitch",
    "Varus",
    "Vayne",
    "Xayah",
    "Yunara",
    "Zeri",
  ],
  artillery: ["Velkoz", "Xerath", "Ziggs", "Zoe"],
  burst: ["Ahri", "Annie", "Brand", "Lux", "Neeko", "Syndra", "Veigar", "Vex"],
  mage: [
    "Anivia",
    "Aurora",
    "Cassiopeia",
    "Hwei",
    "Lissandra",
    "Orianna",
    "Ryze",
    "Swain",
    "Taliyah",
    "Viktor",
    "Vladimir",
    "AurelionSol",
    "Karthus",
    "Rumble",
    "Mel",
    "Sylas",
  ],
  enchanter: [
    "Ivern",
    "Janna",
    "Karma",
    "Lulu",
    "Milio",
    "Nami",
    "Renata",
    "Seraphine",
    "Sona",
    "Soraka",
    "Taric",
    "Yuumi",
    "Zilean",
    "Morgana",
  ],
  initiator: [
    "Alistar",
    "Amumu",
    "Blitzcrank",
    "Chogath",
    "Galio",
    "Gragas",
    "Leona",
    "Malphite",
    "Maokai",
    "Nautilus",
    "Ornn",
    "Rakan",
    "Rammus",
    "Rell",
    "Sejuani",
    "Sion",
    "Skarner",
    "Zac",
    "Nunu",
    "Thresh",
  ],
  guardian: ["Braum", "Poppy", "Shen", "TahmKench"],
  builder: [
    "Heimerdinger",
    "Shaco",
    "Teemo",
    "Zyra",
    "Yorick",
    "Malzahar",
    "Azir",
  ],
  skirmisher: [
    "Belveth",
    "Gangplank",
    "Gnar",
    "Kayle",
    "Kayn",
    "Kennen",
    "Lillia",
    "MasterYi",
    "Singed",
    "Viego",
    "TwistedFate",
    "Bard",
    "Fiddlesticks",
    "Jayce",
    "KSante",
    "Nilah",
  ],
} as const;

type Archetype = keyof typeof archetypes;
const targets: Record<Archetype, Partial<Traits>> = {
  duelist: {
    independence: 0.85,
    precision: 0.85,
    risk: 0.7,
    mobility: 0.7,
    complexity: 0.75,
    protection: 0.2,
    range: 0.2,
  },
  brawler: {
    independence: 0.75,
    initiative: 0.7,
    risk: 0.65,
    patience: 0.7,
    protection: 0.4,
    range: 0.2,
    mobility: 0.3,
    complexity: 0.35,
  },
  diver: {
    initiative: 0.9,
    mobility: 0.85,
    risk: 0.8,
    teamwork: 0.7,
    range: 0.2,
    complexity: 0.6,
  },
  assassin: {
    independence: 0.8,
    risk: 0.8,
    precision: 0.8,
    mobility: 0.85,
    complexity: 0.75,
    protection: 0.2,
    range: 0.25,
    patience: 0.7,
  },
  marksman: {
    teamwork: 0.7,
    patience: 0.75,
    precision: 0.85,
    range: 0.85,
    protection: 0.15,
    risk: 0.4,
    complexity: 0.55,
  },
  artillery: {
    range: 0.95,
    precision: 0.95,
    patience: 0.75,
    mobility: 0.2,
    risk: 0.25,
    setup: 0.6,
    protection: 0.2,
  },
  burst: {
    precision: 0.75,
    range: 0.7,
    control: 0.75,
    patience: 0.65,
    initiative: 0.65,
    protection: 0.3,
  },
  mage: {
    range: 0.65,
    control: 0.85,
    complexity: 0.75,
    setup: 0.7,
    patience: 0.7,
    precision: 0.7,
  },
  enchanter: {
    teamwork: 0.95,
    protection: 0.95,
    independence: 0.2,
    control: 0.65,
    range: 0.75,
    risk: 0.25,
    precision: 0.6,
  },
  initiator: {
    teamwork: 0.85,
    initiative: 0.9,
    protection: 0.75,
    control: 0.85,
    range: 0.2,
    risk: 0.75,
    precision: 0.6,
  },
  guardian: {
    protection: 0.95,
    teamwork: 0.9,
    initiative: 0.45,
    control: 0.8,
    range: 0.2,
    risk: 0.4,
    patience: 0.75,
  },
  builder: {
    setup: 0.95,
    control: 0.85,
    patience: 0.8,
    complexity: 0.7,
    mobility: 0.25,
    independence: 0.7,
  },
  skirmisher: {
    mobility: 0.75,
    complexity: 0.75,
    initiative: 0.65,
    patience: 0.7,
    control: 0.6,
  },
};

const modifiers: Partial<Record<string, Partial<Traits>>> = {
  Akshan: { mobility: 0.95, protection: 0.65 },
  Aphelios: { complexity: 1, setup: 0.95, mobility: 0.2 },
  Ashe: { control: 0.9, teamwork: 0.9, complexity: 0.35 },
  Azir: { range: 0.85, complexity: 0.95, precision: 0.9 },
  Bard: { mobility: 0.95, teamwork: 0.9, protection: 0.75, control: 0.85 },
  Belveth: { patience: 0.9, risk: 0.75 },
  Caitlyn: { range: 0.95, setup: 0.85 },
  Draven: { risk: 0.85, precision: 0.95, initiative: 0.85 },
  Ezreal: { mobility: 0.85, precision: 0.95, independence: 0.7 },
  Fiddlesticks: { setup: 0.95, control: 0.9, initiative: 0.85 },
  Gangplank: { setup: 0.95, precision: 0.95, complexity: 0.95 },
  Graves: { range: 0.35, independence: 0.85, mobility: 0.8 },
  Hwei: { complexity: 1, range: 0.85, protection: 0.6 },
  Ivern: { setup: 0.85, complexity: 0.8, mobility: 0.5 },
  Jhin: { precision: 0.95, patience: 0.9, setup: 0.75 },
  Kalista: { teamwork: 0.95, precision: 0.95, mobility: 0.95 },
  Kayle: { patience: 1, range: 0.8, protection: 0.65, initiative: 0.3 },
  Kindred: { independence: 0.75, risk: 0.8, protection: 0.65 },
  Lillia: { mobility: 0.95, control: 0.8, range: 0.45 },
  Malzahar: { complexity: 0.4, control: 0.9, range: 0.65 },
  MasterYi: { precision: 0.7, risk: 0.8, patience: 0.85, control: 0.1 },
  Mel: { protection: 0.6, range: 0.85 },
  MissFortune: { complexity: 0.3, setup: 0.7 },
  Nidalee: { precision: 0.95, complexity: 0.95 },
  Pyke: { teamwork: 0.75, initiative: 0.9 },
  Quinn: { independence: 0.9, mobility: 0.95 },
  Rakan: { mobility: 0.95, complexity: 0.7 },
  Samira: { range: 0.35, risk: 0.9, complexity: 0.85, mobility: 0.85 },
  Senna: { protection: 0.85, teamwork: 0.9, patience: 0.85, range: 0.95 },
  Shaco: { mobility: 0.9, risk: 0.75 },
  Shen: { mobility: 0.7, independence: 0.65 },
  Singed: { independence: 0.9, mobility: 0.85, precision: 0.3, risk: 0.8 },
  Smolder: { patience: 0.95, complexity: 0.45 },
  Taric: { range: 0.2, precision: 0.75, complexity: 0.75 },
  Teemo: { range: 0.75, independence: 0.85 },
  TwistedFate: { control: 0.85, mobility: 0.9, teamwork: 0.8 },
  Varus: { range: 0.9, control: 0.8 },
  Vayne: { range: 0.55, precision: 0.95, complexity: 0.85, independence: 0.8 },
  Viego: { complexity: 0.95, risk: 0.8 },
  Xayah: { setup: 0.9, control: 0.8 },
  Yuumi: { independence: 0.05, teamwork: 1, mobility: 0.1, complexity: 0.25 },
  Zeri: { mobility: 0.95, precision: 0.95, complexity: 0.85 },
};

const creatureIds = new Set(
  "Alistar Anivia AurelionSol Azir Belveth Briar Chogath Elise Fiddlesticks Fizz Galio Gnar Hecarim Ivern Khazix Kindred KogMaw Lillia Malphite Maokai MonkeyKing Naafiri Nami Nasus Nunu Ornn Rammus RekSai Renekton Rengar Shyvana Skarner Smolder TahmKench Trundle Twitch Volibear Warwick Yuumi Zac".split(
    " ",
  ),
);
const smallIds = new Set(
  "Amumu Annie Corki Fizz Gnar Heimerdinger Kennen Lulu Milio Nunu Poppy Rumble Smolder Teemo Tristana Veigar Vex Yuumi Ziggs Zoe".split(
    " ",
  ),
);
const constructIds = new Set(
  "Blitzcrank Camille Galio Gwen Heimerdinger Malphite Orianna Rumble Urgot Viktor Zac".split(
    " ",
  ),
);
const fantasyPatterns: Record<Fantasy, RegExp> = {
  element: /火|冰|雷|岩|熔|風|寒|沙漠|海潮|水刃/,
  nature: /森林|植物|治|動物|獸|獵鷹|鹿|樹|海洋|人魚|蘑菇|友情|營火|自然/,
  celestial: /星|光|神|天使|太陽|月|宇宙|聖/,
  dark: /影|魂|詛咒|血|惡魔|亡|死|虛空|墮落|瘟疫|恐懼|夢魘|毒/,
  tech: /機|發明|火藥|砲|槍|化學|爆破|炸彈|科技|拳套/,
  martial: /劍|刀|刃|拳|弓|武|盾|斧|忍|戰士|騎|獵|長槍|長棍|長矛|飛斧|傭兵/,
  arcane:
    /時間|空間|幻|變形|符文|魔法|靈能|繪畫|念力|傳送|夢境|音樂|音律|琴|歌手/,
};

const laneNames: Record<string, LaneId> = {
  上: "top",
  野: "jungle",
  中: "mid",
  下: "bottom",
  輔: "support",
};
const officialById = new Map(
  official.champions.map((champion) => [champion.id, champion]),
);

function getArchetype(id: string): Archetype {
  const entry = Object.entries(archetypes).find(([, members]) =>
    (members as readonly string[]).includes(id),
  );
  if (!entry) throw new Error(`Missing champion traits: ${id}`);
  return entry[0] as Archetype;
}

function getStyles(archetype: Archetype, text: string): Style[] {
  const styles: Style[] = [];
  if (/marksman|brawler|duelist/.test(archetype) || /持續|連續/.test(text))
    styles.push("sustained");
  if (/assassin|artillery|burst/.test(archetype) || /爆發|重擊|處決/.test(text))
    styles.push("burst");
  if (
    /duelist|diver|assassin|skirmisher/.test(archetype) ||
    /連段|切換|選擇法術/.test(text)
  )
    styles.push("combo");
  if (
    /builder/.test(archetype) ||
    /布置|配置|陷阱|預|球體|沙兵|疊層/.test(text)
  )
    styles.push("setup");
  return styles;
}

export const champions: Champion[] = research.champions.map((profile) => {
  const original = officialById.get(profile.id)!;
  const archetype = getArchetype(profile.id);
  const traits = Object.fromEntries(
    dimensions.map((dimension) => [dimension, 0.5]),
  ) as Traits;
  Object.assign(traits, targets[archetype]);
  const difficulty = original.officialInfo.difficulty || 6;
  traits.complexity = 0.6 * traits.complexity + (0.4 * difficulty) / 10;
  Object.assign(traits, modifiers[profile.id]);
  const text = profile.analysis.fantasyThemes.join("、");
  const forms: Champion["forms"] = [];
  if (
    !creatureIds.has(profile.id) ||
    ["Azir", "Elise", "Shyvana"].includes(profile.id)
  )
    forms.push("human");
  if (creatureIds.has(profile.id)) forms.push("creature");
  if (smallIds.has(profile.id)) forms.push("small");
  if (constructIds.has(profile.id)) forms.push("construct");
  const lanes = profile.analysis.candidateLanes
    .split("、")
    .map((value) => laneNames[value.trim()[0]])
    .filter(Boolean);
  return {
    id: profile.id,
    name: profile.name,
    title: original.title,
    classes: original.officialClasses,
    difficulty: original.officialInfo.difficulty,
    lanes,
    candidateNote: profile.analysis.candidateLanes,
    distance: profile.analysis.combatDistance,
    mechanics: profile.analysis.signatureMechanics,
    appeal: profile.analysis.possibleAppeal,
    learning: profile.analysis.learningPressure,
    themes: profile.analysis.fantasyThemes,
    source: original.sources.championPage!,
    traits,
    styles: getStyles(archetype, profile.analysis.signatureMechanics),
    forms,
    fantasies: (Object.entries(fantasyPatterns) as [Fantasy, RegExp][])
      .filter(([, pattern]) => pattern.test(text))
      .map(([key]) => key),
  };
});

export const dimensionLabels: Record<Dimension, string> = {
  independence: "自主行動",
  teamwork: "搭檔合作",
  initiative: "主動創造機會",
  risk: "冒險突破",
  patience: "耐心累積",
  precision: "精準打磨",
  mobility: "移動探索",
  complexity: "研究變化",
  protection: "照顧夥伴",
  control: "掌握局勢",
  range: "保持距離",
  setup: "提前布置",
};
