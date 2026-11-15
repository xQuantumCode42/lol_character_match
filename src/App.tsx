import { useEffect, useState } from "react";
import {
  ArrowRight,
  Check,
  Compass,
  HeartHandshake,
  RotateCcw,
  Sparkles,
  Target,
} from "lucide-react";
import { questions } from "./data/questions";
import {
  createSession,
  isComplete,
  isValidAnswer,
  restoreSession,
  selectOption,
} from "./domain/session";
import type { Session } from "./domain/types";
import { Quiz } from "./components/Quiz";
import { Results } from "./components/Results";
import { Modal } from "./components/Modal";

const storageKey = "rift-compass.session.v1";

export function App() {
  const [session, setSession] = useState<Session>(() => {
    try {
      return restoreSession(localStorage.getItem(storageKey));
    } catch {
      return createSession();
    }
  });
  const [storageError, setStorageError] = useState(false);
  const [about, setAbout] = useState(false);
  const [reset, setReset] = useState(false);
  const answeredCount = questions.filter((question) =>
    isValidAnswer(question, session.answers[question.id]),
  ).length;

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(session));
      setStorageError(false);
    } catch {
      setStorageError(true);
    }
  }, [session]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [session.screen, session.questionIndex]);

  const start = () =>
    setSession((previous) => {
      const firstMissing = questions.findIndex(
        (question) => !isValidAnswer(question, previous.answers[question.id]),
      );
      return {
        ...previous,
        screen: isComplete(previous.answers) ? "results" : "quiz",
        questionIndex: firstMissing < 0 ? previous.questionIndex : firstMissing,
      };
    });
  const updateAnswer = (id: string) =>
    setSession((previous) => {
      const question = questions[previous.questionIndex];
      return {
        ...previous,
        answers: {
          ...previous.answers,
          [question.id]: selectOption(
            question,
            previous.answers[question.id] || [],
            id,
          ),
        },
      };
    });

  return (
    <div className="app-shell">
      <header className="app-header">
        <button
          className="brand"
          onClick={() =>
            setSession((previous) => ({ ...previous, screen: "home" }))
          }
          aria-label="召喚本色首頁"
        >
          <span className="brand-mark">
            <Compass size={25} strokeWidth={1.5} />
          </span>
          <span>
            召喚本色<small>RIFT COMPASS</small>
          </span>
        </button>
        <div className="header-actions">
          {session.screen !== "home" && (
            <button className="text-button" onClick={() => setReset(true)}>
              <RotateCcw size={14} />
              <span>重新測驗</span>
            </button>
          )}
          <button
            className="text-button about-button"
            onClick={() => setAbout(true)}
          >
            關於測驗
          </button>
        </div>
      </header>

      {storageError && (
        <div className="storage-notice" role="status">
          目前無法保存進度。你仍可完成本次測驗，關閉後進度可能遺失。
        </div>
      )}

      {session.screen === "home" && (
        <main className="home-page">
          <section className="home-hero">
            <img
              className="hero-art"
              src="./assets/home-ahri.jpg"
              alt="英雄聯盟英雄阿璃"
            />
            <div className="hero-shade" />
            <div className="hero-copy">
              <p className="eyebrow">每種個性，都有自己的發揮方式</p>
              <h1>
                你的個性，
                <br />
                該站在哪裡？
              </h1>
              <p className="hero-description">
                從日常的小選擇，探索你的冒險風格。
                <br />
                找到想投入的位置，與值得專精的英雄。
              </p>
              <button className="primary-button gold-button" onClick={start}>
                {answeredCount
                  ? answeredCount === 30
                    ? "查看我的結果"
                    : "繼續我的探索"
                  : "找到我的本色"}
                <ArrowRight size={19} />
              </button>
              <p className="hero-meta">
                30 道情境題<span>約 6–8 分鐘</span>無需遊戲經驗
              </p>
            </div>
            <div className="art-caption">
              阿璃<span>九尾妖狐</span>
            </div>
          </section>

          <section className="home-intro">
            <div>
              <p className="eyebrow dark-eyebrow">從你出發</p>
              <h2>先認識自己，再選擇冒險。</h2>
            </div>
            <p>
              你喜歡獨自鑽研，還是和夥伴一起突破？
              <br />
              每個答案，都讓適合你的玩法更清晰。
            </p>
          </section>
          <div className="home-features">
            <div>
              <span className="feature-icon">
                <HeartHandshake size={22} />
              </span>
              <h3>照著直覺回答</h3>
              <p>
                旅行、興趣、朋友間的小事，
                <br />
                選出最像你的反應。
              </p>
            </div>
            <div>
              <span className="feature-icon">
                <Sparkles size={22} />
              </span>
              <h3>加入一點想像</h3>
              <p>
                選擇心動的能力與角色風格，
                <br />
                讓喜好也成為方向。
              </p>
            </div>
            <div>
              <span className="feature-icon">
                <Target size={22} />
              </span>
              <h3>帶走具體起點</h3>
              <p>
                位置解說、英雄推薦與練習重點，
                <br />
                幫助你踏出第一步。
              </p>
            </div>
          </div>
          {answeredCount > 0 && (
            <div className="saved-progress">
              <Check size={15} />
              已在這台電腦保存 {answeredCount} 題答案。
              <button className="text-button" onClick={() => setReset(true)}>
                重新開始
              </button>
            </div>
          )}
        </main>
      )}

      {session.screen === "quiz" && (
        <Quiz
          question={questions[session.questionIndex]}
          index={session.questionIndex}
          selected={session.answers[questions[session.questionIndex].id] || []}
          answeredCount={answeredCount}
          onSelect={updateAnswer}
          onBack={() =>
            setSession((previous) => ({
              ...previous,
              questionIndex: previous.questionIndex - 1,
            }))
          }
          onNext={() =>
            setSession((previous) =>
              previous.questionIndex === questions.length - 1
                ? { ...previous, screen: "results" }
                : { ...previous, questionIndex: previous.questionIndex + 1 },
            )
          }
        />
      )}

      {session.screen === "results" && (
        <Results
          answers={session.answers}
          onReview={() =>
            setSession((previous) => ({
              ...previous,
              screen: "quiz",
              questionIndex: 0,
            }))
          }
        />
      )}

      <footer className="app-footer">
        <span>召喚本色 · 0.1.0</span>
        <span>
          {session.screen === "quiz"
            ? storageError
              ? "本次作答暫存於記憶體"
              : "進度自動保存在這台電腦"
            : "依玩法偏好探索 · 173 位英雄"}
        </span>
      </footer>

      {reset && (
        <Modal title="重新開始這次探索？" onClose={() => setReset(false)}>
          <p>目前的答案會清除，你可以從第一題重新選擇。</p>
          <div className="dialog-actions">
            <button
              className="secondary-button"
              onClick={() => setReset(false)}
            >
              保留答案
            </button>
            <button
              className="primary-button"
              onClick={() => {
                setSession({ ...createSession(), screen: "quiz" });
                setReset(false);
              }}
            >
              重新開始
              <ArrowRight size={17} />
            </button>
          </div>
        </Modal>
      )}

      {about && (
        <Modal title="關於召喚本色" onClose={() => setAbout(false)}>
          <p>
            透過 24 題生活情境與 6
            題奇幻偏好，探索你可能喜歡的位置與英雄。答案與結果保存在本機，測驗可離線完成。
          </p>
          <h3>推薦如何產生</h3>
          <p>
            生活與玩法特徵占 64%，位置傾向占 16%，操作節奏占
            8%，外型與力量主題各占 6%。起步推薦會額外考慮學習負擔。
          </p>
          <p>
            配對採用可調整的研究模型，適合度仍需實際試玩確認。位置候選尚未核對目前版本出場率，問卷也尚未經心理計量驗證。
          </p>
          <h3>資料與美術</h3>
          <p>
            英雄資料採用 Riot Data Dragon 16.22.1，調查日期 2026-11-15。收錄全部
            173 位英雄，官方原始難度與本 app 的學習負擔分開處理。
          </p>
          <p className="source-links">
            <a
              href="https://www.leagueoflegends.com/zh-tw/champions/"
              target="_blank"
              rel="noreferrer"
            >
              官方英雄介紹 ↗
            </a>
            <a
              href="https://developer.riotgames.com/docs/lol#data-dragon"
              target="_blank"
              rel="noreferrer"
            >
              Data Dragon ↗
            </a>
          </p>
          <p className="legal">
            Rift Compass is not endorsed by Riot Games and does not reflect the
            views or opinions of Riot Games or anyone officially involved in
            producing or managing Riot Games properties. Riot Games and all
            associated properties are trademarks or registered trademarks of
            Riot Games, Inc.
          </p>
        </Modal>
      )}
    </div>
  );
}
