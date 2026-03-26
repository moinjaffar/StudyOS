import { DashboardSummary, FocusSession, Goal, Task } from "@/lib/types";
import { calcCompletionRate, calcLevel, calcStreak, calcWeeklyProgress, calcXp } from "@/lib/utils";

export function buildDashboardSummary(tasks: Task[], goals: Goal[], sessions: FocusSession[]): DashboardSummary {
  const totalStudyMinutes = sessions.reduce((acc, s) => acc + s.minutes, 0);
  const weeklyProgressPercent = calcWeeklyProgress(tasks);
  const dailyStreak = calcStreak(sessions);
  const completionRate = calcCompletionRate(tasks, goals);
  const xp = calcXp(tasks, sessions);
  const level = calcLevel(xp);

  const bySubject = new Map<string, { minutes: number; tasksDone: number; tasksTotal: number }>();

  sessions.forEach((s) => {
    const value = bySubject.get(s.subject) ?? { minutes: 0, tasksDone: 0, tasksTotal: 0 };
    value.minutes += s.minutes;
    bySubject.set(s.subject, value);
  });

  tasks.forEach((t) => {
    const value = bySubject.get(t.subject) ?? { minutes: 0, tasksDone: 0, tasksTotal: 0 };
    value.tasksTotal += 1;
    if (t.completed) value.tasksDone += 1;
    bySubject.set(t.subject, value);
  });

  const subjectAnalytics = [...bySubject.entries()].map(([subject, value]) => ({
    subject,
    minutes: value.minutes,
    tasksDone: value.tasksDone
  }));

  const weakSubjects = [...bySubject.entries()]
    .filter(([, v]) => v.tasksTotal > 0)
    .sort((a, b) => {
      const aRate = a[1].tasksDone / Math.max(1, a[1].tasksTotal);
      const bRate = b[1].tasksDone / Math.max(1, b[1].tasksTotal);
      return aRate - bRate;
    })
    .slice(0, 3)
    .map(([subject]) => subject);

  const timelineHeatmap = buildHeatmap(sessions);

  const achievements = [
    { id: "streak-3", label: "3-day streak", unlocked: dailyStreak >= 3 },
    { id: "focus-300", label: "300+ focus minutes", unlocked: totalStudyMinutes >= 300 },
    { id: "tasks-10", label: "10 completed tasks", unlocked: tasks.filter((t) => t.completed).length >= 10 }
  ];

  return {
    totalStudyMinutes,
    weeklyProgressPercent,
    dailyStreak,
    completionRate,
    xp,
    level,
    weakSubjects,
    subjectAnalytics,
    timelineHeatmap,
    achievements
  };
}

function buildHeatmap(sessions: FocusSession[]) {
  const dayMap = new Map<string, number>();
  for (let i = 0; i < 30; i += 1) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    dayMap.set(d.toISOString().slice(0, 10), 0);
  }

  sessions.forEach((s) => {
    const key = s.createdAt.slice(0, 10);
    if (dayMap.has(key)) dayMap.set(key, (dayMap.get(key) ?? 0) + s.minutes);
  });

  return [...dayMap.entries()].map(([date, minutes]) => ({ date, minutes })).reverse();
}

export function buildAiInsights(summary: DashboardSummary) {
  const tips: string[] = [];

  if (summary.weeklyProgressPercent < 60) {
    tips.push("Weekly completion is below 60%. Reduce daily task count and prioritize high-impact items.");
  }
  if (summary.dailyStreak < 2) {
    tips.push("Build momentum with a minimum 25-minute focus block each day.");
  }
  if (summary.weakSubjects.length) {
    tips.push(`Weak subjects detected: ${summary.weakSubjects.join(", ")}. Schedule these first in your day.`);
  }

  return {
    weakSubjects: summary.weakSubjects,
    suggestions: tips.length ? tips : ["You're doing great. Maintain consistency and review weekly."]
  };
}

export function assistantReply(question: string, summary: DashboardSummary) {
  const q = question.toLowerCase();
  if (q.includes("what should i study") || q.includes("today")) {
    const subject = summary.weakSubjects[0] ?? "your current priority subject";
    return `Start with ${subject} for a 50-minute block, then complete one high-priority task.`;
  }
  if (q.includes("weak") || q.includes("area")) {
    return summary.weakSubjects.length
      ? `Your weak areas are: ${summary.weakSubjects.join(", ")}.`
      : "No clear weak area detected yet. Log more task/session data for deeper analysis.";
  }
  if (q.includes("schedule")) {
    return "Suggested schedule: 2 Pomodoros for weak subject, 1 Pomodoro for revision, and 30-minute recap.";
  }

  return "Ask me about today's study plan, weak subjects, or schedule optimization.";
}
