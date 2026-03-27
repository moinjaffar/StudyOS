"use client";

import { useState } from "react";

export function AIInsightPanel({ weakSubjects, suggestions }: { weakSubjects: string[]; suggestions: string[] }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("Ask: What should I study today?");

  async function askAssistant() {
    const res = await fetch("/api/ai/assistant", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question })
    });
    const data = await res.json();
    setAnswer(data.answer);
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="card">
        <h3 className="section-title">AI Insight Engine</h3>
        <p className="text-sm text-slate-300">Weak subjects: {weakSubjects.length ? weakSubjects.join(", ") : "None yet"}</p>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-300">
          {suggestions.map((tip) => <li key={tip}>{tip}</li>)}
        </ul>
      </div>

      <div className="card">
        <h3 className="section-title">AI Assistant</h3>
        <textarea className="w-full rounded-lg bg-slate-800 p-2" rows={3} placeholder="What should I study today?" value={question} onChange={(e) => setQuestion(e.target.value)} />
        <button className="mt-2 rounded-lg bg-brand-500 px-3 py-2" onClick={askAssistant}>Ask</button>
        <p className="mt-3 rounded-lg bg-slate-800 p-3 text-sm text-slate-200">{answer}</p>
      </div>
    </div>
  );
}
