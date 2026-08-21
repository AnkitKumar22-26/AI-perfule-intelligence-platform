export default function VialMeter({ label, value, suffix = '%' }) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs font-mono text-mauve">
        <span>{label}</span>
        <span className="text-amber">{value}{suffix}</span>
      </div>
      <div className="vial-track">
        <div className="vial-fill" style={{ width: `${value}%` }} />
      </div>
    </div>
  )
}
