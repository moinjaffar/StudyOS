interface Props {
  label: string;
  value: string | number;
  hint?: string;
}

export function MetricCard({ label, value, hint }: Props) {
  return (
    <div className="card">
      <p className="text-xs uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-2 text-3xl font-semibold">{value}</p>
      {hint ? <p className="mt-2 text-sm text-slate-400">{hint}</p> : null}
    </div>
  );
}
