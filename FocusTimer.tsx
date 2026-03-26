"use client";

import { useEffect, useState } from "react";

export function FocusTimer({ onSessionSaved }: { onSessionSaved: () => Promise<void> }) {
  const [subject, setSubject] = useState("General");
  const [minutes, setMinutes] = useState(25);
  const [secondsLeft, setSecondsLeft] = useState(minutes * 60);
  const [running, setRunning] = useState(false);
  const [mode, setMode] = useState<"pomodoro" | "deep">("pomodoro");

  useEffect(() => setSecondsLeft(minutes * 60), [minutes]);

  useEffect(() => {
    if (!running) return;
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setRunning(false);
          void saveSession();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [running]);

  async function saveSession() {
    const spentMinutes = Math.max(1, Math.round((minutes * 60 - secondsLeft) / 60));
    await fetch("/api/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject, mode, minutes: spentMinutes })
    });
    await onSessionSaved();
  }

  function setPomodoro() {
    setMode("pomodoro");
    setMinutes(25);
  }

  return (
    <div className="card">
      <h3 className="section-title">Focus Timer</h3>
      <div className="mb-3 flex gap-2">
        <button className="rounded-lg bg-slate-800 px-3 py-1" onClick={setPomodoro}>Pomodoro 25/5</button>
        <button className="rounded-lg bg-slate-800 px-3 py-1" onClick={() => setMode("deep")}>Deep Work</button>
      </div>
      <input className="mb-2 w-full rounded-lg bg-slate-800 p-2" placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
      {mode === "deep" ? (
        <input className="mb-2 w-full rounded-lg bg-slate-800 p-2" type="number" min={5} value={minutes} onChange={(e) => setMinutes(Number(e.target.value))} />
      ) : null}
      <p className="text-4xl font-semibold">{String(Math.floor(secondsLeft / 60)).padStart(2, "0")}:{String(secondsLeft % 60).padStart(2, "0")}</p>
      <div className="mt-3 flex gap-2">
        <button className="rounded-lg bg-brand-500 px-3 py-2" onClick={() => setRunning((v) => !v)}>{running ? "Pause" : "Start"}</button>
        <button className="rounded-lg bg-slate-700 px-3 py-2" onClick={() => { setRunning(false); setSecondsLeft(minutes * 60); }}>Reset</button>
      </div>
    </div>
  );
}
