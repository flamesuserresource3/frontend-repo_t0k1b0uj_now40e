export default function ProgressBar({ current, total }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div className="w-full h-2 bg-green-100 rounded-full overflow-hidden">
      <div
        className="h-full bg-green-500 transition-all"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
