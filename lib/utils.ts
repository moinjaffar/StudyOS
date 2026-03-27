import { FocusSession, Goal, Task } from "@/lib/types";

export const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;

export function nowISO() {
  return new Date().toISOString();
}

export function isWithinOneYear(iso: string) {
  return Date.now() - new Date(iso).getTime() <= ONE_YEAR_MS;
}

export function calcStreak(sessions: FocusSession[]) {
  const days = new Set(sessions.map((s) => s.createdAt.slice(0, 10)));
  let streak = 0;
  const date = new Date();

  for (;;) {
    const key = date.toISOString().slice(0, 10);
    if (!days.has(key)) break;
    streak += 1;
    date.setDate(date.getDate() - 1);
  }

  return streak;
}

export function calcWeeklyProgress(tasks: Task[]) {
  const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const weeklyTasks = tasks.filter((t) => new Date(t.createdAt).getTime() >= weekAgo);
  if (!weeklyTasks.length) return 0;
  const done = weeklyTasks.filter((t) => t.completed).length;
  return Math.round((done / weeklyTasks.length) * 100);
}

export function calcCompletionRate(tasks: Task[], goals: Goal[]) {
  const total = tasks.length + goals.length;
  if (!total) return 0;
  const done = tasks.filter((t) => t.completed).length + goals.filter((g) => g.completed).length;
  return Math.round((done / total) * 100);
}

export function calcXp(tasks: Task[], sessions: FocusSession[]) {
  const taskXP = tasks.filter((t) => t.completed).length * 20;
  const sessionXP = sessions.reduce((acc, s) => acc + Math.round(s.minutes / 5), 0);
  return taskXP + sessionXP;
}

export function calcLevel(xp: number) {
  return Math.max(1, Math.floor(xp / 100) + 1);
}
