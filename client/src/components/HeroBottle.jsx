export default function HeroBottle({ className = '' }) {
  return (
    <svg
      viewBox="0 0 260 400"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Illustration of a luxury perfume bottle"
    >
      <defs>
        <linearGradient id="hb-glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgb(var(--c-secondary))" stopOpacity="0.35" />
          <stop offset="55%" stopColor="rgb(var(--c-primary))" stopOpacity="0.22" />
          <stop offset="100%" stopColor="rgb(var(--c-bg))" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="hb-liquid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgb(var(--c-primary))" stopOpacity="0.9" />
          <stop offset="100%" stopColor="rgb(var(--c-secondary))" stopOpacity="0.75" />
        </linearGradient>
        <linearGradient id="hb-cap" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgb(var(--c-secondary))" />
          <stop offset="100%" stopColor="rgb(var(--c-primary))" />
        </linearGradient>
        <radialGradient id="hb-glow" cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor="rgb(var(--c-primary))" stopOpacity="0.35" />
          <stop offset="100%" stopColor="rgb(var(--c-primary))" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="130" cy="180" rx="150" ry="150" fill="url(#hb-glow)" />

      <rect x="103" y="18" width="54" height="34" rx="6" fill="url(#hb-cap)" />
      <rect x="112" y="4" width="36" height="18" rx="4" fill="rgb(var(--c-secondary))" />

      <path
        d="M92 52 H168 a10 10 0 0 1 10 10 v46 a34 34 0 0 1 10 28 v170 a26 26 0 0 1 -26 26 H98 a26 26 0 0 1 -26 -26 V136 a34 34 0 0 1 10 -28 V62 a10 10 0 0 1 10 -10 Z"
        fill="url(#hb-glass)"
        stroke="rgb(var(--c-primary) / 0.4)"
        strokeWidth="1.5"
      />

      <path
        d="M74 230 h112 v92 a26 26 0 0 1 -26 26 H100 a26 26 0 0 1 -26 -26 Z"
        fill="url(#hb-liquid)"
        opacity="0.85"
      />

      <rect x="85" y="120" width="14" height="150" rx="7" fill="white" opacity="0.12" />

      <rect x="86" y="188" width="88" height="34" rx="3" fill="rgb(var(--c-bg))" opacity="0.55" stroke="rgb(var(--c-primary) / 0.5)" strokeWidth="0.75" />
      <line x1="98" y1="199" x2="162" y2="199" stroke="rgb(var(--c-primary))" strokeWidth="1" opacity="0.8" />
      <line x1="104" y1="209" x2="156" y2="209" stroke="rgb(var(--c-primary))" strokeWidth="0.75" opacity="0.6" />
    </svg>
  )
}