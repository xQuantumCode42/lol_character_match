import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCheck,
  Sparkles,
} from "lucide-react";
import { questions } from "../data/questions";
import type { Question } from "../domain/types";

export function Quiz({
  question,
  index,
  selected,
  answeredCount,
  onSelect,
  onBack,
  onNext,
}: {
  question: Question;
  index: number;
  selected: string[];
  answeredCount: number;
  onSelect: (id: string) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const multi = question.maxSelections > 1;
  return (
    <main className="quiz-page">
      <div className="quiz-progress-label">
        <span>
          {question.section === "daily" ? "日常的你" : "你的奇幻偏好"}
        </span>
        <span>
          已回答 {answeredCount} / {questions.length}
        </span>
      </div>
      <div
        className="progress-track"
        role="progressbar"
        aria-label="作答進度"
        aria-valuenow={answeredCount}
        aria-valuemin={0}
        aria-valuemax={questions.length}
      >
        <div
          style={{ width: `${(answeredCount / questions.length) * 100}%` }}
        />
      </div>
      <div className="quiz-stages">
        <span className={question.section === "daily" ? "active" : "done"}>
          <CheckCheck size={15} />
          生活情境
        </span>
        <span className={question.section === "fantasy" ? "active" : ""}>
          <Sparkles size={15} />
          奇幻偏好
        </span>
      </div>
      <section className="question-panel" key={question.id}>
        <p className="eyebrow">
          QUESTION {String(index + 1).padStart(2, "0")} / 30
        </p>
        <h1 tabIndex={-1}>{question.title}</h1>
        <p className="question-hint">
          {multi
            ? "最多選兩項，也可以選「還沒有偏好」。"
            : "選最接近你平常反應的一項，每個選擇都有自己的樂趣。"}
        </p>
        <div
          className={`choices ${question.options.length > 4 ? "many-choices" : ""}`}
          role="group"
          aria-label="答案選項"
        >
          {question.options.map((option) => {
            const active = selected.includes(option.id);
            return (
              <button
                key={option.id}
                className={`choice ${active ? "selected" : ""}`}
                aria-pressed={active}
                onClick={() => onSelect(option.id)}
              >
                <span className="choice-letter">
                  {active ? <Check size={17} /> : option.id.toUpperCase()}
                </span>
                <span>{option.text}</span>
                <span
                  className={`choice-indicator ${multi ? "square" : ""}`}
                  aria-hidden="true"
                >
                  {active && <Check size={12} />}
                </span>
              </button>
            );
          })}
        </div>
        <div className="question-footer">
          <button
            className="text-button back-button"
            disabled={index === 0}
            onClick={onBack}
          >
            <ArrowLeft size={17} />
            上一題
          </button>
          <span className="selection-note" aria-live="polite">
            {multi &&
              (selected.length === 2
                ? "已選 2 項，點選已選項可取消。"
                : `已選 ${selected.length} 項`)}
          </span>
          <button
            className="primary-button"
            disabled={!selected.length}
            onClick={onNext}
          >
            {index === questions.length - 1 ? "看看我的本色" : "下一題"}
            <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </main>
  );
}
