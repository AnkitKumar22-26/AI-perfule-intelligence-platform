import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Compass } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-28 text-center">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="h-16 w-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6">
          <Compass size={28} />
        </div>
        <p className="font-display text-7xl gradient-text font-semibold">404</p>
        <h1 className="font-display text-2xl mt-4 text-ivory">This scent has evaporated.</h1>
        <p className="text-mauve mt-3">The page you're looking for doesn't exist or has moved.</p>
        <NavLink to="/" className="btn-gold inline-block mt-8">Back to home</NavLink>
      </motion.div>
    </div>
  )
}
