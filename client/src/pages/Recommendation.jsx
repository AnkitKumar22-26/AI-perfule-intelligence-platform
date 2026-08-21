import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Wand2, Check, X, ThumbsUp, ThumbsDown, ExternalLink, AlertTriangle, ShieldCheck, Bookmark, Trash2, Sparkles } from 'lucide-react'
import VialMeter from '../components/VialMeter.jsx'
import Loader from '../components/Loader.jsx'
import PerfumeBottle from '../components/PerfumeBottle.jsx'
import { useToast } from '../components/Toast.jsx'
import { useSavedRecommendations } from '../hooks/useSavedRecommendations.js'
import { rankPerfumes, HARD_FILTER_LABELS } from '../utils/recommendationEngine.js'
import { PERFUMES, OCCASIONS, WEATHERS, SEASONS, BUDGETS, NOTE_FAMILIES, GENDERS, AGE_RANGES } from '../data/perfumes.js'

export default function Recommendation() {
  const [form, setForm] = useState({
    occasion: 'evening', weather: 'cool', season: 'winter', budget: 'mid', note: 'amber', gender: 'unisex', age: '25-34'
  })
  const [outcome, setOutcome] = useState(null) // { mode, results }
  const [loading, setLoading] = useState(false)
  const { saved, save, remove, isSaved } = useSavedRecommendations()
  const toast = useToast()

  const handleChange = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setOutcome(null)
    setTimeout(() => {
      const result = rankPerfumes(PERFUMES, form, 3)
      setOutcome(result)
      setLoading(false)
      toast(result.mode === 'strict' ? 'Perfect matches found!' : 'Showing closest smart alternatives')
    }, 850)
  }

  const shareRecommendation = async (r) => {
    const text = `${r.name} by ${r.brand} — ${r.reason}`
    if (navigator.share) {
      try { await navigator.share({ title: r.name, text }) } catch { /* user cancelled */ }
    } else {
      await navigator.clipboard?.writeText(text)
      toast('Summary copied to clipboard')
    }
  }

  const mode = outcome?.mode
  const results = outcome?.results

  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <span className="eyebrow inline-flex items-center gap-2"><Wand2 size={13} /> Module 01</span>
      <h1 className="font-display text-3xl md:text-4xl mt-3 text-ivory">AI Recommendation Engine</h1>
      <p className="text-mauve mt-3 max-w-xl text-sm leading-relaxed">
        Select your preferences below. The engine will match strict requirements first, then fine-tune based on your preferred style traits.
      </p>

      <div className="grid md:grid-cols-5 gap-8 mt-10">
        {/* Left Side: Controls */}
        <div className="md:col-span-2 space-y-6">
          <form onSubmit={handleSubmit} className="card p-7 space-y-4 h-fit">
            <Field label="Occasion (strict)" options={OCCASIONS} onChange={handleChange('occasion')} />
            <Field label="Weather (strict)" options={WEATHERS} onChange={handleChange('weather')} />
            <Field label="Budget (strict)" options={BUDGETS} onChange={handleChange('budget')} />
            <Field label="Gender (strict)" options={GENDERS} onChange={handleChange('gender')} />
            <Field label="Season (style preference)" options={SEASONS} onChange={handleChange('season')} />
            <Field label="Preferred fragrance family" options={NOTE_FAMILIES} onChange={handleChange('note')} />
            <Field label="Age range" options={AGE_RANGES} onChange={handleChange('age')} />
            <button type="submit" disabled={loading} className="btn-gold w-full mt-2 disabled:opacity-60">
              {loading ? 'Analyzing Matrix…' : 'Discover Matches'}
            </button>
          </form>

          {/* Saved panel */}
          <div className="card p-6">
            <p className="eyebrow inline-flex items-center gap-2 mb-3"><Bookmark size={12} /> Saved Items</p>
            {saved.length === 0 && <p className="text-mauve text-xs">Picks persist across sessions.</p>}
            <div className="space-y-2">
              {saved.map((s) => (
                <div key={s.name} className="flex items-center justify-between gap-3 text-sm">
                  <div className="min-w-0">
                    <p className="text-ivory/90 truncate text-xs">{s.name}</p>
                    <p className="text-mauve text-[11px]">{s.brand}</p>
                  </div>
                  <button onClick={() => remove(s.name)} className="text-mauve hover:text-accent shrink-0">
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Smart Results View */}
        <div className="md:col-span-3 space-y-5">
          {loading && (
            <div className="card p-7">
              <Loader label="Computing best matches from perfume catalog..." />
            </div>
          )}

          {!loading && !outcome && (
            <div className="card p-7 h-full flex flex-col items-center justify-center text-center text-mauve py-20">
              <Wand2 className="text-primary/40 mb-3 animate-pulse" size={32} />
              <p className="text-sm">Configure your parameters and click discover.</p>
            </div>
          )}

          {/* Clean Smart Status Banner instead of long boring paragraph */}
          {!loading && mode === 'strict' && (
            <div className="bg-primary/5 rounded-xl px-4 py-3 border border-primary/20 flex items-center gap-2.5">
              <ShieldCheck size={15} className="text-primary shrink-0" />
              <p className="text-xs text-ivory/90 font-medium">
                Verified Matches: Satisfying 100% of your exact requirements.
              </p>
            </div>
          )}

          {!loading && mode === 'fallback' && (
            <div className="bg-amber-500/5 rounded-xl px-4 py-3 border border-amber-500/20 flex items-center gap-2.5">
              <Sparkles size={15} className="text-amber-400 shrink-0" />
              <p className="text-xs text-ivory/90 font-medium">
                Alternative Picks: Showing closest matches based on your style.
              </p>
            </div>
          )}

          {/* Recommendations Render List */}
          <AnimatePresence>
            {!loading && results && results.map((r, i) => (
              <motion.div
                key={r.name}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className={`card p-6 ${i === 0 && mode === 'strict' ? 'ring-1 ring-primary/30' : ''}`}
              >
                <div className="flex items-start gap-4">
                  <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center shrink-0">
                    <PerfumeBottle family={r.notes?.[0] || 'amber'} size={34} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-primary">
                        {mode === 'strict' ? (i === 0 ? 'Best Choice' : `Option ${i + 1}`) : `Alternative ${i + 1}`}
                      </span>
                      <span className="font-mono text-xs text-accent bg-accent/5 px-2 py-0.5 rounded">
                        {mode === 'strict' ? 'Match' : 'Closeness'} {r.score}%
                      </span>
                    </div>
                    <h3 className="font-display text-lg mt-1 text-ivory truncate">{r.name}</h3>
                    <p className="text-mauve text-xs">{r.brand} · ${r.price} {r.currency || 'USD'}</p>
                  </div>
                </div>

                <div className="mt-4">
                  <VialMeter label="Compatibility Score" value={r.score} />
                </div>

                {/* Matrix Status Chips */}
                <div className="mt-4">
                  <p className="text-[10px] font-semibold text-mauve uppercase tracking-wider mb-1.5">Strict Requirements</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <MatchChip label="Occasion" ok={!!r.match?.occasion} />
                    <MatchChip label="Weather" ok={!!r.match?.weather} />
                    <MatchChip label="Budget" ok={!!r.match?.budget} />
                    <MatchChip label="Gender" ok={!!r.match?.gender} />
                  </div>
                </div>

                <div className="mt-3">
                  <p className="text-[10px] font-semibold text-mauve uppercase tracking-wider mb-1.5">Style Profiles</p>
                  <div className="grid grid-cols-2 gap-2 max-w-[240px]">
                    <MatchChip label="Season" ok={!!r.match?.season} soft />
                    <MatchChip label="Note" ok={!!r.match?.note} soft />
                  </div>
                </div>

                {/* Technical Pyramid Specifications */}
                <div className="grid sm:grid-cols-3 gap-4 mt-5 pt-4 border-t border-white/5 text-xs">
                  <div>
                    <span className="text-mauve font-medium">Notes Structure</span>
                    <p className="text-ivory/80 mt-1 leading-relaxed">
                      {(r.topNotes || []).slice(0, 2).join(', ')} → {(r.baseNotes || []).slice(0, 1).join('')}
                    </p>
                  </div>
                  <div>
                    <span className="text-mauve font-medium">Performance</span>
                    <p className="text-ivory/80 mt-1">{r.longevity || 'Moderate'} · {r.projection || 'Norm'}</p>
                  </div>
                  <div>
                    <span className="text-mauve font-medium">Sillage Profile</span>
                    <p className="text-ivory/80 mt-1">{r.sillage || 'Standard'}</p>
                  </div>
                </div>

                {/* Pros / Cons Section */}
                <div className="grid sm:grid-cols-2 gap-4 mt-4 bg-white/[0.01] p-3 rounded-xl border border-white/5">
                  <div>
                    <span className="text-[11px] text-primary flex items-center gap-1 font-medium"><ThumbsUp size={11} /> Pros</span>
                    <ul className="mt-1 space-y-0.5">
                      {(r.pros || []).slice(0, 2).map((pr) => <li key={pr} className="text-[11px] text-ivory/70 truncate">• {pr}</li>)}
                    </ul>
                  </div>
                  <div>
                    <span className="text-[11px] text-accent flex items-center gap-1 font-medium"><ThumbsDown size={11} /> Cons</span>
                    <ul className="mt-1 space-y-0.5">
                      {(r.cons || []).slice(0, 2).map((c) => <li key={c} className="text-[11px] text-ivory/70 truncate">• {c}</li>)}
                    </ul>
                  </div>
                </div>

                <p className="text-ivory/70 text-xs leading-relaxed mt-4">
                  {r.reason}
                </p>

                {/* Contextual Smart Footer Indicator */}
                {mode === 'fallback' && r.failedHardFilters && r.failedHardFilters.length > 0 && (
                  <p className="text-[11px] text-accent/90 mt-3 font-mono bg-accent/5 px-2.5 py-1 rounded w-fit border border-accent/10">
                    • Deviates on: {r.failedHardFilters.map((k) => HARD_FILTER_LABELS[k] || k).join(', ')}
                  </p>
                )}

                {/* Actions Panel */}
                <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-white/5">
                  <button
                    onClick={() => { save(r); toast(`Saved ${r.name}`) }}
                    disabled={isSaved(r.name)}
                    className="btn-ghost text-xs px-3 py-1.5 disabled:opacity-60"
                  >
                    {isSaved(r.name) ? 'Saved' : 'Save'}
                  </button>
                  <button onClick={() => shareRecommendation(r)} className="btn-ghost text-xs px-3 py-1.5">Share</button>
                  <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); toast('Connect a store integration to enable checkout') }}
                    className="btn-ghost text-xs px-3 py-1.5 inline-flex items-center gap-1"
                  >
                    Store <ExternalLink size={11} />
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

function MatchChip({ label, ok, soft }) {
  const getStyles = () => {
    if (!ok) return 'bg-accent/5 text-accent/70 border border-accent/10'; 
    if (soft) return 'bg-secondary/5 text-secondary/90 border border-secondary/10'; 
    return 'bg-primary/5 text-primary/90 border border-primary/10'; 
  }

  return (
    <div className={`flex items-center gap-1.5 text-[11px] px-2 py-1 rounded-lg transition-all ${getStyles()}`}>
      {ok ? <Check size={11} className="shrink-0" /> : <X size={11} className="shrink-0" />}
      <span className={!ok ? "line-through opacity-50" : ""}>{label}</span>
    </div>
  )
}

function Field({ label, options, onChange }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-mauve mb-1 block">{label}</span>
      <select className="input-field text-xs py-1.5" onChange={onChange} defaultValue={options[0]?.value}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </label>
  )
}