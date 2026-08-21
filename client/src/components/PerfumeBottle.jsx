const FAMILY_GRADIENTS = {
  oud: ['#7C3AED', '#2e1065'],
  amber: ['#f59e0b', '#7c2d12'],
  vanilla: ['#fcd34d', '#b45309'],
  floral: ['#ec4899', '#831843'],
  citrus: ['#facc15', '#65a30d'],
  musk: ['#c4b5fd', '#6d28d9'],
  woody: ['#84cc16', '#3f6212'],
  aquatic: ['#38bdf8', '#0369a1'],
  spice: ['#f97316', '#7c2d12']
}

export default function PerfumeBottle({ family = 'floral', size = 56 }) {
  const [from, to] = FAMILY_GRADIENTS[family] || FAMILY_GRADIENTS.floral
  const gradId = `bottle-grad-${family}`

  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={from} />
          <stop offset="100%" stopColor={to} />
        </linearGradient>
      </defs>
      <rect x="16" y="3" width="8" height="6" rx="1.5" fill={to} />
      <path
        d="M13 12.5 h14 a3 3 0 0 1 3 3 v16 a5 5 0 0 1 -5 5 H15 a5 5 0 0 1 -5 -5 v-16 a3 3 0 0 1 3 -3 Z"
        fill={`url(#${gradId})`}
        opacity="0.92"
      />
      <rect x="11" y="22" width="18" height="9.5" fill={to} opacity="0.4" />
      <rect x="14" y="16" width="12" height="3" rx="1" fill="white" opacity="0.25" />
    </svg>
  )
}
