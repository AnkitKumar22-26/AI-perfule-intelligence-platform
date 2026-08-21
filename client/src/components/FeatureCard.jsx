import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

export default function FeatureCard({ icon: Icon, index, title, description, to, tags = [] }) {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.25, ease: 'easeOut' }} className="h-full">
      <NavLink to={to} className="card group block p-7 h-full">
        <div className="flex items-start justify-between">
          <div className="h-11 w-11 rounded-xl bg-gold/10 flex items-center justify-center text-gold transition-colors group-hover:bg-gold group-hover:text-ink">
            <Icon size={20} />
          </div>
          <span className="font-mono text-xs text-mauve">{index}</span>
        </div>

        <h3 className="font-display text-xl mt-5 text-ivory group-hover:text-gold transition-colors">
          {title}
        </h3>
        <p className="text-mauve text-sm mt-2 leading-relaxed">{description}</p>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {tags.map((t) => (
              <span key={t} className="text-[11px] px-2.5 py-1 rounded-full bg-white/5 text-mauve">
                {t}
              </span>
            ))}
          </div>
        )}

        <div className="mt-5 inline-flex items-center gap-1.5 text-sm text-gold opacity-0 group-hover:opacity-100 transition-opacity">
          Open module <ArrowUpRight size={15} />
        </div>
      </NavLink>
    </motion.div>
  )
}
