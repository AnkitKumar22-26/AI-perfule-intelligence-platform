import { NavLink } from 'react-router-dom'
import logo from '../assets/logo.svg'

const modules = [
  { to: '/recommendation', label: 'Recommendation Engine' },
  { to: '/chatbot', label: 'AI Consultant' },
  { to: '/sentiment', label: 'Sentiment Analysis' },
  { to: '/marketing', label: 'Marketing Studio' },
  { to: '/analytics', label: 'Analytics Dashboard' }
]

export default function Footer() {
  return (
    <footer className="relative border-t border-primary/10 mt-24 overflow-hidden">
      <div className="absolute inset-0 bg-glow-radial opacity-40 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 pt-16 pb-10">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <img src={logo} alt="" className="h-7 w-7" />
              <span className="font-display italic text-2xl gradient-text">Scentelligence</span>
            </div>
            <p className="text-mauve text-sm mt-4 max-w-sm leading-relaxed">
              An AI intelligence layer for fragrance brands — recommendation,
              consultation, sentiment, marketing and analytics, distilled
              into one considered, luxury-grade experience.
            </p>
          </div>

          <div>
            <p className="eyebrow mb-4">Modules</p>
            <ul className="space-y-2.5">
              {modules.map((m) => (
                <li key={m.to}>
                  <NavLink to={m.to} className="text-sm text-mauve hover:text-primary transition-colors">
                    {m.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-4">Platform</p>
            <ul className="space-y-2.5 text-sm text-mauve">
              <li>React + Tailwind frontend</li>
              <li>FastAPI backend (scaffolded)</li>
              <li>OpenAI-ready AI layer</li>
              <li>PostgreSQL data model</li>
            </ul>
          </div>
        </div>

        <div className="luxury-divider my-10" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-mauve">
          <p>© {new Date().getFullYear()} Scentelligence. Crafted with intelligence, worn with confidence.</p>
          <p className="font-mono">Frontend prototype — AI layer runs client-side pending backend integration</p>
        </div>
      </div>
    </footer>
  )
}