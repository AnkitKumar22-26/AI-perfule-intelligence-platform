import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { LineChart as LineChartIcon, Sparkles, ThumbsUp, ThumbsDown, Lightbulb } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import VialMeter from '../components/VialMeter.jsx'
import Loader from '../components/Loader.jsx'
import { useToast } from '../components/Toast.jsx'

const SAMPLE_REVIEWS = [
  'This perfume is amazing, the longevity is incredible and I get compliments daily.',
  'Love the vanilla and amber notes, smells expensive and warm.',
  "It's okay but fades within two hours, expected more for the price.",
  'The bottle leaked in transit and customer service was slow to respond.',
  'A solid daily scent, nothing extraordinary but pleasant and clean.',
  'Absolutely obsessed with the oud base, best purchase this year.',
  'Too strong and synthetic smelling, gave me a headache.',
  'Great value, the citrus top notes are refreshing for summer.'
]

const POSITIVE_WORDS = ['amazing', 'love', 'incredible', 'great', 'obsessed', 'refreshing', 'pleasant', 'best', 'expensive', 'warm', 'solid', 'clean', 'compliments']
const NEGATIVE_WORDS = ['fades', 'leaked', 'slow', 'headache', 'synthetic', 'okay', 'strong']
const NOTE_WORDS = ['oud', 'vanilla', 'citrus', 'floral', 'musk', 'amber', 'woody', 'aquatic', 'spice']

const SUGGESTIONS = {
  fades: 'Consider reformulating with a higher base-note concentration to extend longevity.',
  leaked: 'Audit bottle seals and shipping packaging to reduce transit damage.',
  slow: 'Review customer service response-time SLAs — this is a repeat theme.',
  headache: 'Flag this batch for a lighter synthetic load or offer a "sensitive" variant.',
  synthetic: 'Consider a naturals-forward reformulation for scent-sensitive customers.'
}

function classify(text) {
  const t = text.toLowerCase()
  let score = 0
  POSITIVE_WORDS.forEach((w) => { if (t.includes(w)) score += 1 })
  NEGATIVE_WORDS.forEach((w) => { if (t.includes(w)) score -= 1 })
  if (score > 0) return 'positive'
  if (score < 0) return 'negative'
  return 'neutral'
}

const COLORS = { positive: '#7C3AED', neutral: '#94A3B8', negative: '#EC4899' }

export default function Sentiment() {
  const [reviews, setReviews] = useState(SAMPLE_REVIEWS.join('\n'))
  const [analyzed, setAnalyzed] = useState(null)
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  const runAnalysis = (e) => {
    e.preventDefault()
    setLoading(true)
    setAnalyzed(null)
    setTimeout(() => {
      const lines = reviews.split('\n').map((l) => l.trim()).filter(Boolean)
      const classified = lines.map((text) => ({ text, sentiment: classify(text) }))
      setAnalyzed(classified)
      setLoading(false)
      toast(`Analyzed ${classified.length} reviews`)
    }, 800)
  }

  const distribution = useMemo(() => {
    if (!analyzed) return []
    const counts = { positive: 0, neutral: 0, negative: 0 }
    analyzed.forEach((r) => counts[r.sentiment]++)
    return Object.entries(counts).map(([name, value]) => ({ name, value }))
  }, [analyzed])

  const positiveKeywords = useMemo(() => {
    if (!analyzed) return []
    const counts = {}
    analyzed.forEach((r) => {
      const t = r.text.toLowerCase()
      POSITIVE_WORDS.forEach((w) => { if (t.includes(w)) counts[w] = (counts[w] || 0) + 1 })
    })
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 6)
  }, [analyzed])

  const negativeKeywords = useMemo(() => {
    if (!analyzed) return []
    const counts = {}
    analyzed.forEach((r) => {
      const t = r.text.toLowerCase()
      NEGATIVE_WORDS.forEach((w) => { if (t.includes(w)) counts[w] = (counts[w] || 0) + 1 })
    })
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 6)
  }, [analyzed])

  const trendingNotes = useMemo(() => {
    if (!analyzed) return []
    const counts = {}
    analyzed.forEach((r) => {
      const t = r.text.toLowerCase()
      NOTE_WORDS.forEach((n) => { if (t.includes(n)) counts[n] = (counts[n] || 0) + 1 })
    })
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 5)
  }, [analyzed])

  const suggestions = useMemo(() => {
    return negativeKeywords.map(([word]) => SUGGESTIONS[word]).filter(Boolean).slice(0, 3)
  }, [negativeKeywords])

  const positivePct = analyzed && analyzed.length ? Math.round((distribution.find((d) => d.name === 'positive')?.value || 0) / analyzed.length * 100) : 0
  const negativePct = analyzed && analyzed.length ? Math.round((distribution.find((d) => d.name === 'negative')?.value || 0) / analyzed.length * 100) : 0
  const neutralPct = analyzed && analyzed.length ? 100 - positivePct - negativePct : 0

  const strengths = analyzed?.filter((r) => r.sentiment === 'positive').slice(0, 3) || []
  const complaints = analyzed?.filter((r) => r.sentiment === 'negative').slice(0, 3) || []

  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <span className="eyebrow inline-flex items-center gap-2"><LineChartIcon size={13} /> Module 03</span>
      <h1 className="font-display text-3xl md:text-4xl mt-3 text-ivory">AI Sentiment Analysis</h1>
      <p className="text-mauve mt-3 max-w-xl">
        Paste customer reviews below (one per line). The engine classifies each
        as positive, neutral or negative, and surfaces top keywords, trends and suggested actions.
      </p>

      <div className="grid md:grid-cols-2 gap-8 mt-10">
        <form onSubmit={runAnalysis} className="card p-7 h-fit">
          <label className="block text-sm text-mauve mb-2">Reviews</label>
          <textarea
            className="input-field h-64 resize-none font-mono text-xs leading-relaxed"
            value={reviews}
            onChange={(e) => setReviews(e.target.value)}
          />
          <button type="submit" disabled={loading} className="btn-gold w-full mt-4 disabled:opacity-60">
            {loading ? 'Analyzing…' : 'Analyze sentiment'}
          </button>
        </form>

        <div className="card p-7">
          {loading && (
            <div className="h-full flex items-center justify-center py-16">
              <Loader label="Classifying reviews" />
            </div>
          )}

          {!loading && !analyzed && (
            <div className="h-full flex flex-col items-center justify-center text-center text-mauve py-16">
              <LineChartIcon className="text-primary mb-3" size={26} />
              <p className="text-sm">Results and trends will appear here.</p>
            </div>
          )}

          {!loading && analyzed && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <p className="eyebrow">Distribution</p>
              <div className="h-48 mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={distribution} dataKey="value" nameKey="name" innerRadius={45} outerRadius={70} paddingAngle={3}>
                      {distribution.map((d) => <Cell key={d.name} fill={COLORS[d.name]} stroke="none" />)}
                    </Pie>
                    <Tooltip contentStyle={{ background: 'rgb(var(--c-surface))', border: '1px solid rgb(var(--c-primary) / 0.3)', borderRadius: 10, color: 'rgb(var(--c-text))' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-2 text-center">
                <div><p className="font-display text-xl text-primary">{positivePct}%</p><p className="text-[11px] text-mauve">Positive</p></div>
                <div><p className="font-display text-xl text-mauve">{neutralPct}%</p><p className="text-[11px] text-mauve">Neutral</p></div>
                <div><p className="font-display text-xl text-accent">{negativePct}%</p><p className="text-[11px] text-mauve">Negative</p></div>
              </div>

              <div className="mt-4">
                <VialMeter label="Overall positive sentiment" value={positivePct} />
              </div>

              {trendingNotes.length > 0 && (
                <div className="mt-6 pt-5 border-t border-white/5">
                  <p className="text-xs text-mauve mb-2">Trending notes mentioned</p>
                  <div className="flex flex-wrap gap-2">
                    {trendingNotes.map(([note, count]) => (
                      <span key={note} className="text-[11px] px-2.5 py-1 rounded-full bg-primary/10 text-primary capitalize">{note} · {count}</span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>

      {analyzed && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mt-8 space-y-5">
          <div className="card p-7">
            <p className="eyebrow mb-3 inline-flex items-center gap-2"><Sparkles size={13} /> AI-generated summary</p>
            <p className="text-ivory/90 text-sm leading-relaxed">
              {positivePct}% of the {analyzed.length} reviews analyzed are positive
              {trendingNotes[0] ? `, most often driven by mentions of ${trendingNotes[0][0]}` : ''}.
              {negativePct > 0 ? ` ${negativePct}% are negative, with recurring mentions of ${negativeKeywords.slice(0, 2).map(([w]) => w).join(' and ')}.` : ' No significant negative sentiment was detected in this batch.'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div className="card p-6">
              <p className="eyebrow mb-3 inline-flex items-center gap-2 text-primary"><ThumbsUp size={13} /> Top positive keywords</p>
              <div className="flex flex-wrap gap-2">
                {positiveKeywords.length === 0 && <p className="text-mauve text-sm">None detected.</p>}
                {positiveKeywords.map(([w, c]) => (
                  <span key={w} className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary capitalize">{w} · {c}</span>
                ))}
              </div>
            </div>
            <div className="card p-6">
              <p className="eyebrow mb-3 inline-flex items-center gap-2 text-accent"><ThumbsDown size={13} /> Top negative keywords</p>
              <div className="flex flex-wrap gap-2">
                {negativeKeywords.length === 0 && <p className="text-mauve text-sm">None detected.</p>}
                {negativeKeywords.map(([w, c]) => (
                  <span key={w} className="text-xs px-2.5 py-1 rounded-full bg-accent/10 text-accent capitalize">{w} · {c}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div className="card p-6">
              <p className="eyebrow mb-3 inline-flex items-center gap-2 text-primary"><ThumbsUp size={13} /> Strengths</p>
              <div className="space-y-2.5">
                {strengths.length === 0 && <p className="text-mauve text-sm">No positive reviews in this batch.</p>}
                {strengths.map((r, i) => <p key={i} className="text-sm text-ivory/85 leading-relaxed border-b border-white/5 pb-2.5 last:border-0 last:pb-0">{r.text}</p>)}
              </div>
            </div>
            <div className="card p-6">
              <p className="eyebrow mb-3 inline-flex items-center gap-2 text-accent"><ThumbsDown size={13} /> Complaints</p>
              <div className="space-y-2.5">
                {complaints.length === 0 && <p className="text-mauve text-sm">No negative reviews in this batch.</p>}
                {complaints.map((r, i) => <p key={i} className="text-sm text-ivory/85 leading-relaxed border-b border-white/5 pb-2.5 last:border-0 last:pb-0">{r.text}</p>)}
              </div>
            </div>
          </div>

          {suggestions.length > 0 && (
            <div className="card p-6">
              <p className="eyebrow mb-3 inline-flex items-center gap-2"><Lightbulb size={13} /> Suggested actions</p>
              <ul className="space-y-1.5">
                {suggestions.map((s, i) => <li key={i} className="text-sm text-ivory/85">• {s}</li>)}
              </ul>
            </div>
          )}

          <div className="card p-7">
            <p className="eyebrow mb-4">Review breakdown</p>
            <div className="space-y-3">
              {analyzed.map((r, i) => (
                <div key={i} className="flex items-start justify-between gap-4 border-b border-white/5 pb-3 last:border-0 last:pb-0">
                  <p className="text-sm text-ivory/90 leading-relaxed">{r.text}</p>
                  <span className="text-[11px] px-2.5 py-1 rounded-full shrink-0 capitalize" style={{ background: `${COLORS[r.sentiment]}22`, color: COLORS[r.sentiment] }}>
                    {r.sentiment}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
