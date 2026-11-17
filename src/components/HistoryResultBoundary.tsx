import { Component, type ReactNode } from "react";

export class HistoryResultBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  override state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  override render() {
    if (this.state.failed) {
      return (
        <main className="results-page history-page">
          <section className="history-card" role="alert">
            <h2>這筆紀錄的推薦格式目前無法顯示</h2>
            <p>原始紀錄已保留，可以從上方返回歷史紀錄查看其他結果。</p>
          </section>
        </main>
      );
    }
    return this.props.children;
  }
}
