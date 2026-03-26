"use client";

import { useCallback, useEffect, useState } from "react";
import { AIInsightPanel } from "@/components/AIInsightPanel";
import { AnalyticsPanels } from "@/components/AnalyticsPanels";
import { FocusTimer } from "@/components/FocusTimer";
import { MetricCard } from "@/components/MetricCard";
import { TaskGoalPanel } from "@/components/TaskGoalPanel";
import { DashboardSummary } from "@/lib/types";

interface InsightsResponse {
  summary: DashboardSummary;
  insights: { weakSubjects: string[]; suggestions: string[] };
}

export default function HomePage() {
  const [data, setData] = useState<InsightsResponse | null>(null);

  const load = useCallback(async () => {
    const response = await fetch("/api/ai/insights", { cache: "no-store" });
    const payload = (await response.json()) as InsightsResponse;
    setData(payload);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const summary = data?.summary;

  return (
    <main className="mx-auto min-h-screen max-w-7xl space-y-4 p-4 md:p-8">
      <header className="card">
        <h1 className="text-2xl font-bold md:text-4xl">StudyOS – AI Academic Command Center</h1>
        <p className="mt-2 text-sm text-slate-300">Track. Focus. Improve. Powered by analytics + AI insight loops.</p>
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Total Study Time" value={`${summary?.totalStudyMinutes ?? 0} min`} />
        <MetricCard label="Weekly Progress" value={`${summary?.weeklyProgressPercent ?? 0}%`} />
        <MetricCard label="Daily Streak" value={`${summary?.dailyStreak ?? 0} days`} />
        <MetricCard label="XP / Level" value={`${summary?.xp ?? 0} XP · L${summary?.level ?? 1}`} />
      </section>

      <TaskGoalPanel onRefresh={load} />
      <FocusTimer onSessionSaved={load} />
      <AnalyticsPanels summary={summary ?? null} />

      {data ? <AIInsightPanel weakSubjects={data.insights.weakSubjects} suggestions={data.insights.suggestions} /> : null}

      <section className="card">
        <h3 className="section-title">Gamification</h3>
        <div className="flex flex-wrap gap-2">
          {summary?.achievements.map((a) => (
            <span key={a.id} className={`rounded-full px-3 py-1 text-xs ${a.unlocked ? "bg-emerald-600" : "bg-slate-700"}`}>
              {a.label}
            </span>
          ))}
        </div>
      </section>
    </main>
  );
}
