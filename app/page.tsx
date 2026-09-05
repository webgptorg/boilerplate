"use client";

import { useState } from "react";
import { PromptbookBrand } from "@/components/promptbook-brand";

type Screen = "context" | "call" | "after-call";

const transcript = [
  { speaker: "You", text: "Thanks for making time today. I would like to align on the launch plan." },
  { speaker: "Alex", text: "Absolutely. The product is ready, but we still need to confirm the customer email and the training date." },
  { speaker: "You", text: "Let’s assign owners now so we can leave with a clear plan." },
];

const initialActions = [
  { id: 1, text: "Confirm customer email copy", owner: "You", done: false },
  { id: 2, text: "Schedule the customer training session", owner: "Alex", done: false },
  { id: 3, text: "Share the final launch checklist", owner: "You", done: false },
];

export default function Home() {
  const [screen, setScreen] = useState<Screen>("context");
  const [context, setContext] = useState("");
  const [actions, setActions] = useState(initialActions);

  function toggleAction(id: number) {
    setActions((current) => current.map((action) => action.id === id ? { ...action, done: !action.done } : action));
  }

  function reset() {
    setContext("");
    setActions(initialActions);
    setScreen("context");
  }

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="container header-inner">
          <PromptbookBrand />
          <span className="header-status">Call notes</span>
        </div>
      </header>

      <main className="container app-content">
        <div className="app-heading">
          <div>
            <span className="eyebrow">Mock workspace</span>
            <h1>{screen === "context" ? "Prepare your call" : screen === "call" ? "Your call" : "Call complete"}</h1>
          </div>
          <div className="stepper" aria-label="Call progress">
            <span className={`step ${screen === "context" ? "active" : "complete"}`}>1</span><span className="step-line" />
            <span className={`step ${screen === "call" ? "active" : screen === "after-call" ? "complete" : ""}`}>2</span><span className="step-line" />
            <span className={`step ${screen === "after-call" ? "active" : ""}`}>3</span>
          </div>
        </div>

        {screen === "context" ? (
          <section className="workspace-card context-card">
            <div className="card-copy"><span className="card-kicker">Before the call</span><h2>What should we know?</h2><p>Add notes, goals, or background to give your call a useful starting point.</p></div>
            <label className="textarea-label" htmlFor="context">Call context</label>
            <textarea id="context" value={context} onChange={(event) => setContext(event.target.value)} placeholder="For example: We are planning the launch of the new customer portal..." rows={8} />
            <div className="card-footer"><span className="helper-text">You can edit this later.</span><button className="button button-primary" type="button" onClick={() => setScreen("call")}>Start mock call <span aria-hidden="true">→</span></button></div>
          </section>
        ) : null}

        {screen === "call" ? (
          <section className="workspace-card call-card">
            <div className="call-topline"><div><span className="card-kicker">Live mock transcription</span><h2>Product launch planning</h2></div><span className="recording-pill"><span className="recording-dot" /> Recording</span></div>
            <div className="microphone-stage"><div className="microphone-ring microphone-ring-one" /><div className="microphone-ring microphone-ring-two" /><div className="microphone-icon" aria-label="Microphone recording" role="img">♩</div><span>Listening to your call</span></div>
            <div className="transcript" aria-label="Call transcription">
              {transcript.map((line) => <div className="transcript-line" key={`${line.speaker}-${line.text}`}><strong>{line.speaker}</strong><p>{line.text}</p></div>)}
              <div className="transcript-line pending-line"><strong>Alex</strong><p><span /> <span /> <span /></p></div>
            </div>
            <div className="call-actions"><button className="button button-secondary" type="button" onClick={() => setScreen("context")}>Back</button><button className="button button-danger" type="button" onClick={() => setScreen("after-call")}><span className="stop-icon" /> End mock call</button></div>
          </section>
        ) : null}

        {screen === "after-call" ? (
          <div className="results-grid">
            <section className="workspace-card summary-card"><span className="card-kicker">After the call</span><h2>Here’s what happened</h2><p className="summary-lead">You and Alex aligned on the customer portal launch. The product is ready, with customer communication and training remaining before the launch date.</p><div className="summary-meta"><span>⏱ 24 min</span><span>✦ 3 key actions</span><span>◷ Just now</span></div><div className="context-note"><strong>Context used</strong><p>{context || "No additional context was added before this call."}</p></div></section>
            <section className="workspace-card actions-card"><div className="actions-heading"><div><span className="card-kicker">Next steps</span><h2>Action items</h2></div><span className="action-count">{actions.filter((action) => action.done).length}/{actions.length}</span></div><div className="action-list">{actions.map((action) => <label className={`action-item${action.done ? " action-done" : ""}`} key={action.id}><input type="checkbox" checked={action.done} onChange={() => toggleAction(action.id)} /><span className="custom-checkbox" /><span className="action-text"><strong>{action.text}</strong><small>Owner · {action.owner}</small></span></label>)}</div></section>
            <button className="button button-secondary start-over" type="button" onClick={reset}>Start another call</button>
          </div>
        ) : null}
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <PromptbookBrand />
          <span>Promptbook · 2026</span>
        </div>
      </footer>
    </div>
  );
}
