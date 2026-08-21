import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { Sparkles } from 'lucide-react'

export default function Hero() {
  const [fill, setFill] = useState(0)

  useEffect(() => {
    const t = setTimeout(() => setFill(94), 400)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className="relative overflow-hidden bg-glow-radial">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28 grid md:grid-cols-2 gap-14 items-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="eyebrow inline-flex items-center gap-2">
            <Sparkles size={13} /> AI Perfume Intelligence Platform
          </span>
          <h1 className="mt-5 font-display text-4xl md:text-6xl leading-[1.05] text-ivory">
            A fragrance mind that
            <span className="text-gold italic"> knows the note </span>
            before you do.
          </h1>
          <p className="mt-6 text-mauve text-base md:text-lg max-w-lg">
            Five connected AI modules — recommendation, consultation, sentiment,
            marketing and analytics — distilled into one platform so every scent
            decision your brand makes is backed by data.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <NavLink to="/recommendation" className="btn-gold">
              Try the recommendation engine
            </NavLink>
            <NavLink to="/analytics" className="btn-ghost">
              View analytics demo
            </NavLink>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="card p-8 relative"
        >
          <p className="eyebrow">Live match preview</p>
          <h3 className="font-display text-2xl mt-2 text-ivory">Velvet Oud No. 12</h3>
          <p className="text-mauve text-sm mt-1">Evening · Cool weather · Amber &amp; oud</p>

          <div className="mt-6 space-y-1.5">
            <div className="flex justify-between text-xs font-mono text-mauve">
              <span>Compatibility score</span>
              <span className="text-amber">{fill}%</span>
            </div>
            <div className="vial-track">
              <div className="vial-fill" style={{ width: `${fill}%` }} />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-mauve text-xs">Longevity</p>
              <p className="text-ivory font-medium mt-0.5">7–9 hours</p>
            </div>
            <div>
              <p className="text-mauve text-xs">Layering</p>
              <p className="text-ivory font-medium mt-0.5">+ Sandalwood base</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
