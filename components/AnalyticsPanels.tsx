import { DashboardSummary } from "@/lib/types";

export function AnalyticsPanels({ summary }: { summary: DashboardSummary | null }) {
  if (!summary) return null;

  const maxMinutes = Math.max(1, ...summary.subjectAnalytics.map((s) => s.minutes));

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="card">
        <h3 className="section-title">Subject-wise Analytics</h3>
        <div className="space-y-2">
          {summary.subjectAnalytics.map((subject) => (
            <div key={subject.subject}>
              <div className="mb-1 flex justify-between text-sm">
                <span>{subject.subject}</span>
                <span>{subject.minutes} min</span>
              </div>
              <div className="h-2 rounded bg-slate-800">
                <div className="h-2 rounded bg-brand-500" style={{ width: `${(subject.minutes / maxMinutes) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h3 className="section-title">Timeline Heatmap (30 days)</h3>
        <div className="grid grid-cols-10 gap-1">
          {summary.timelineHeatmap.map((entry) => (
            <div
              key={entry.date}
              title={`${entry.date}: ${entry.minutes} min`}
              className="h-4 rounded"
              style={{ backgroundColor: `rgba(59,130,246,${Math.min(1, entry.minutes / 120)})` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
