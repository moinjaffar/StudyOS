"use client";

import { useState } from "react";
import { Priority } from "@/lib/types";

export function TaskGoalPanel({ onRefresh }: { onRefresh: () => Promise<void> }) {
  const [task, setTask] = useState({ title: "", subject: "", deadline: "", priority: "medium" as Priority });
  const [goal, setGoal] = useState({ title: "", subject: "", targetDays: 30 });

  async function createTask() {
    await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...task, completed: false })
    });
    setTask({ title: "", subject: "", deadline: "", priority: "medium" });
    await onRefresh();
  }

  async function createGoal() {
    await fetch("/api/goals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...goal, completed: false, progress: 0, startDate: new Date().toISOString() })
    });
    setGoal({ title: "", subject: "", targetDays: 30 });
    await onRefresh();
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="card">
        <h3 className="section-title">Task System</h3>
        <div className="space-y-2">
          <input className="w-full rounded-lg bg-slate-800 p-2" placeholder="Task title" value={task.title} onChange={(e) => setTask({ ...task, title: e.target.value })} />
          <input className="w-full rounded-lg bg-slate-800 p-2" placeholder="Subject" value={task.subject} onChange={(e) => setTask({ ...task, subject: e.target.value })} />
          <input className="w-full rounded-lg bg-slate-800 p-2" type="date" value={task.deadline} onChange={(e) => setTask({ ...task, deadline: e.target.value })} />
          <select className="w-full rounded-lg bg-slate-800 p-2" value={task.priority} onChange={(e) => setTask({ ...task, priority: e.target.value as Priority })}>
            <option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option>
          </select>
          <button className="rounded-lg bg-brand-500 px-3 py-2" onClick={createTask}>Create Task</button>
        </div>
      </div>
      <div className="card">
        <h3 className="section-title">Long-term Goals</h3>
        <div className="space-y-2">
          <input className="w-full rounded-lg bg-slate-800 p-2" placeholder="Goal title" value={goal.title} onChange={(e) => setGoal({ ...goal, title: e.target.value })} />
          <input className="w-full rounded-lg bg-slate-800 p-2" placeholder="Subject" value={goal.subject} onChange={(e) => setGoal({ ...goal, subject: e.target.value })} />
          <input className="w-full rounded-lg bg-slate-800 p-2" type="number" min={1} value={goal.targetDays} onChange={(e) => setGoal({ ...goal, targetDays: Number(e.target.value) })} />
          <button className="rounded-lg bg-brand-700 px-3 py-2" onClick={createGoal}>Create Goal</button>
        </div>
      </div>
    </div>
  );
}
