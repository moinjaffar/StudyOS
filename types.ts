export type Priority = "low" | "medium" | "high";

export interface Task {
  id: string;
  title: string;
  subject: string;
  deadline: string;
  priority: Priority;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Goal {
  id: string;
  title: string;
  subject: string;
  targetDays: number;
  startDate: string;
  completed: boolean;
  progress: number;
  createdAt: string;
  updatedAt: string;
}

export interface FocusSession {
  id: string;
  subject: string;
  mode: "pomodoro" | "deep";
  minutes: number;
  createdAt: string;
}

export interface Achievement {
  id: string;
  label: string;
  unlocked: boolean;
}

export interface DashboardSummary {
  totalStudyMinutes: number;
  weeklyProgressPercent: number;
  dailyStreak: number;
  completionRate: number;
  xp: number;
  level: number;
  weakSubjects: string[];
  subjectAnalytics: Array<{ subject: string; minutes: number; tasksDone: number }>;
  timelineHeatmap: Array<{ date: string; minutes: number }>;
  achievements: Achievement[];
}
