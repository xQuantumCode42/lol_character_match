import { useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Compass,
  Crosshair,
  ExternalLink,
  Map,
  Search,
  Shield,
  Sparkles,
  Swords,
  TreePine,
} from "lucide-react";
import { dimensionLabels } from "../data/champions";
import { laneById, lanes } from "../data/lanes";
import { getRecommendations } from "../domain/matching";
import {
  dimensions,
  type Answers,
  type LaneId,
  type RankedChampion,
} from "../domain/types";
import { Modal } from "./Modal";

const laneIcons = {
  top: Swords,
  jungle: TreePine,
  mid: Sparkles,
  bottom: Crosshair,
  support: Shield,
};

function ChampionCard({
  item,
  onOpen,
}: {
  item: RankedChampion;
  onOpen: () => void;
}) {
  const champion = item.champion;
  return (
    <article className="champion-card">
      <div className="champion-card-top">
        <img src={`./assets/champions/${champion.id}.png`} alt="" />
        <div>
          <span className="champion-title">{champion.title}</span>
          <h3>{champion.name}</h3>
        </div>
      </div>
      <p className="champion-appeal">{champion.appeal}。</p>
      <p className="champion-reason">{item.reasons[0]}</p>
      <button className="card-link" onClick={onOpen}>
        認識{champion.name}
        <ArrowUpRight size={17} />
      </button>
    </article>
  );
}

export function Results({
  answers,
  onReview,
}: {
  answers: Answers;
  onReview: () => void;
}) {
  const result = useMemo(() => getRecommendations(answers), [answers]);
  const [selected, setSelected] = useState<RankedChampion | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [search, setSearch] = useState("");
  const [filterLane, setFilterLane] = useState<LaneId | "">("");
  const primary = laneById[result.lanes[0].id];
  const secondary = laneById[result.lanes[1].id];
  const LaneIcon = laneIcons[primary.id];
  const SecondaryIcon = laneIcons[secondary.id];
  const strongest = [...dimensions]
    .filter((dimension) => dimension !== "range")
    .sort((a, b) => result.profile.traits[b] - result.profile.traits[a])
    .slice(0, 3);
  const filtered = result.ranking.filter((item) => {
    const hero = item.champion;
    const text =
      `${hero.name} ${hero.id} ${hero.title} ${hero.themes.join(" ")}`.toLowerCase();
    return (
      text.includes(search.toLowerCase().trim()) &&
      (!filterLane || hero.lanes.includes(filterLane))
    );
  });

  return (
    <main className="results-page">
      <div className="results-heading">
        <div>
          <p className="eyebrow dark-eyebrow">YOUR RIFT COMPASS</p>
          <h1>這是你的冒險起點。</h1>
        </div>
        <button className="text-button" onClick={onReview}>
          回看我的答案
          <ArrowUpRight size={16} />
        </button>
      </div>
      <section className="lane-result">
        <div className="lane-identity">
          <span className="lane-symbol">
            <LaneIcon size={36} strokeWidth={1.3} />
          </span>
          <div>
            <p>建議先探索</p>
            <h2>{primary.name}</h2>
            <span className="lane-english">{primary.english}</span>
          </div>
        </div>
        <div className="lane-description">
          <div className="trait-chips">
            {strongest.map((trait) => (
              <span key={trait}>{dimensionLabels[trait]}</span>
            ))}
          </div>
          <h3>{primary.appeal}</h3>
          <p>{primary.introduction}</p>
        </div>
      </section>

      <div className="section-heading">
        <div>
          <h2>從這三位開始試玩</h2>
          <p>依你的偏好與起步負擔，在{primary.name}挑選三種值得感受的玩法。</p>
        </div>
        <span className="section-hint">點開查看練習重點</span>
      </div>
      <div className="champion-grid">
        {result.starters.map((item) => (
          <ChampionCard
            key={item.champion.id}
            item={item}
            onOpen={() => setSelected(item)}
          />
        ))}
      </div>

      <div className="result-bottom-grid">
        <section className="challenge-card">
          <span className="feature-icon small-icon">
            <Compass size={20} />
          </span>
          <div className="challenge-copy">
            <p className="eyebrow dark-eyebrow">值得長期挑戰</p>
            <h3>{result.challenge.champion.name}</h3>
            <p>
              {result.challenge.champion.appeal}
              。可以在熟悉基本操作後，慢慢探索這位英雄的細節。
            </p>
            <button
              className="card-link"
              onClick={() => setSelected(result.challenge)}
            >
              看看要練什麼
              <ArrowRight size={16} />
            </button>
          </div>
          <img
            src={`./assets/champions/${result.challenge.champion.id}.png`}
            alt=""
          />
        </section>
        <section className="secondary-lane">
          <SecondaryIcon size={23} strokeWidth={1.5} />
          <div>
            <p className="eyebrow dark-eyebrow">另一個探索方向</p>
            <h3>{secondary.name}</h3>
            <p>{secondary.introduction}</p>
          </div>
        </section>
      </div>

      <section className="first-practice">
        <Map size={21} />
        <div>
          <h3>第一次進入練習模式</h3>
          <p>{primary.practice}</p>
        </div>
      </section>
      <div className="results-footnote">
        <p>
          推薦來自可調整的玩法模型，適合程度可透過試玩確認。英雄資料版本
          16.22.1，位置為研究候選。
        </p>
        <button className="secondary-button" onClick={() => setShowAll(true)}>
          探索全部 173 位英雄
          <ArrowRight size={16} />
        </button>
      </div>

      {showAll && (
        <Modal title="探索全部英雄" onClose={() => setShowAll(false)}>
          <p className="muted">
            依本次答案的綜合契合傾向排序。起步推薦另有考慮學習負擔。
          </p>
          <div className="catalog-filters">
            <label className="search-box">
              <Search size={17} />
              <input
                aria-label="搜尋英雄"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="搜尋英雄、英文名或力量主題"
              />
            </label>
            <select
              aria-label="篩選位置"
              value={filterLane}
              onChange={(event) =>
                setFilterLane(event.target.value as LaneId | "")
              }
            >
              <option value="">全部位置</option>
              {lanes.map((lane) => (
                <option key={lane.id} value={lane.id}>
                  {lane.name}
                </option>
              ))}
            </select>
          </div>
          <p className="catalog-count" aria-live="polite">
            {filtered.length} 位英雄
          </p>
          <div className="catalog-list">
            {filtered.map((item) => (
              <button
                key={item.champion.id}
                className="catalog-item"
                onClick={() => setSelected(item)}
              >
                <img
                  src={`./assets/champions/${item.champion.id}.png`}
                  alt=""
                  loading="lazy"
                />
                <span>
                  <strong>{item.champion.name}</strong>
                  <small>{item.champion.title}</small>
                </span>
                <span className="catalog-lanes">
                  {item.champion.lanes
                    .map((lane) => laneById[lane].name)
                    .join("・")}
                </span>
                <ArrowUpRight size={16} />
              </button>
            ))}
          </div>
          {!filtered.length && (
            <p className="empty-state">
              找不到符合條件的英雄，試試其他名稱或位置。
            </p>
          )}
        </Modal>
      )}

      {selected && (
        <Modal
          title={`認識${selected.champion.name}`}
          onClose={() => setSelected(null)}
        >
          <div className="detail-hero">
            <img
              src={`./assets/champions/${selected.champion.id}.png`}
              alt={selected.champion.name}
            />
            <div>
              <p>{selected.champion.title}</p>
              <h3>{selected.champion.name}</h3>
              <span>
                {selected.champion.lanes
                  .map((lane) => laneById[lane].name)
                  .join("・")}
              </span>
            </div>
          </div>
          <h3>為什麼值得試試</h3>
          {selected.reasons.map((reason) => (
            <p key={reason}>{reason}</p>
          ))}
          <h3>你會體驗到</h3>
          <p>
            {selected.champion.distance}。{selected.champion.mechanics}。
          </p>
          <h3>需要慢慢熟悉的地方</h3>
          <p>{selected.champion.learning}。</p>
          <h3>起步練習</h3>
          <p>
            {laneById[selected.bestLane].practice}接著挑一個重點練習「
            {selected.champion.learning.split("、")[0]}」。
          </p>
          <div className="detail-themes">
            {selected.champion.themes.map((theme) => (
              <span key={theme}>{theme}</span>
            ))}
          </div>
          <p className="detail-note">
            位置候選與偏好解讀來自研究分析，實際路線適用性仍需依版本與試玩確認。
          </p>
          <a
            className="official-link"
            href={selected.champion.source}
            target="_blank"
            rel="noreferrer"
          >
            查看官方英雄與技能介紹
            <ExternalLink size={15} />
          </a>
        </Modal>
      )}
    </main>
  );
}
