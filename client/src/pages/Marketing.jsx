import { useState } from 'react'
import { motion } from 'framer-motion'
import { Megaphone, Copy, Check, RefreshCw, Download } from 'lucide-react'
import Loader from '../components/Loader.jsx'
import { useToast } from '../components/Toast.jsx'

const TONES = ['Elegant', 'Playful', 'Minimal', 'Bold']
const PLATFORMS = ['Instagram', 'Facebook', 'LinkedIn', 'Twitter / X', 'Google Ads']
const GOALS = ['Brand awareness', 'Launch a new product', 'Drive sales', 'Grow email list', 'Engagement']

const TONE_VOICE = {
  Elegant: { emoji: '✨', voice: 'refined, understated' },
  Playful: { emoji: '💫', voice: 'fun, energetic' },
  Minimal: { emoji: '·', voice: 'clean, restrained' },
  Bold: { emoji: '🔥', voice: 'confident, punchy' }
}

const GOAL_CTA = {
  'Brand awareness': 'Discover the story behind the scent.',
  'Launch a new product': 'Be the first to try it — shop the launch.',
  'Drive sales': 'Shop now and save on your first bottle.',
  'Grow email list': 'Join the list for early access and drops.',
  'Engagement': 'Tell us your favorite note in the comments.'
}

const CAPTION_VARIANTS = [
  (p, a, v) => `${v.emoji} Meet ${p} — crafted for ${a} who notice every detail. ${v.emoji}`,
  (p, a, v) => `${v.emoji} ${p} isn't just a scent, it's a signature. Made for ${a}. ${v.emoji}`,
  (p, a, v) => `Introducing ${p} — a ${v.voice} fragrance built for ${a}. ${v.emoji}`
]

// Template-based generator standing in for the OpenAI-powered content model.
// Swap `buildContent` for a POST to a FastAPI /marketing/generate route that
// forwards brand, audience, tone, platform and goal to the OpenAI API.
function buildContent({ product, audience, tone, platform, goal }, variantSeed = 0) {
  const p = product || 'your fragrance'
  const a = audience || 'fragrance lovers'
  const v = TONE_VOICE[tone] || TONE_VOICE.Elegant
  const cta = GOAL_CTA[goal] || GOAL_CTA['Brand awareness']
  const caption = CAPTION_VARIANTS[variantSeed % CAPTION_VARIANTS.length](p, a, v)
  const tag = `#${(p || 'newlaunch').replace(/\s+/g, '')}`

  return {
    instagram: `${caption}\n\n${cta}`,
    facebook: `${p} has arrived. Designed for ${a} with a ${v.voice} character — the kind of scent people ask about. ${cta}`,
    linkedin: `Proud to introduce ${p}, our latest fragrance built with ${a} in mind. It reflects a ${v.voice} brand identity we've been developing — and we think you'll notice the difference from the first spray. ${cta}`,
    twitter: `${p} is here. ${v.voice.split(',')[0]}, made for ${a}. ${cta} ${tag}`,
    googleAds: `${p} — ${v.voice.split(',')[0].trim()} fragrance for ${a}. ${cta} Shop the collection today.`,
    seoDescription: `${p} is a ${v.voice} fragrance designed for ${a}. Explore notes, longevity and layering tips, and shop ${p} online now.`,
    metaDescription: `Shop ${p} — a ${v.voice} scent for ${a}. Free shipping on your first order.`,
    description: `${p} is a fragrance built for ${a}. With a ${v.voice} personality, it opens with bright top notes and settles into a warm, memorable base — designed to be worn, not just sprayed.`,
    email: `Subject: ${p} is here\n\nHi there,\n\nWe've just released ${p}, made with ${a} in mind. Expect a ${v.voice} character and long-lasting wear.\n\n${cta}\n\nReply to this email or shop the collection today.`,
    cta,
    hashtags: `${tag} #Fragrance #${tone}Scent #PerfumeLovers #ScentOfTheDay #${(platform || 'Marketing').replace(/[^a-zA-Z]/g, '')}`
  }
}

export default function Marketing() {
  const [form, setForm] = useState({
    product: 'Velvet Oud No. 12', audience: 'evening perfume lovers', tone: 'Elegant',
    platform: 'Instagram', goal: 'Launch a new product'
  })
  const [content, setContent] = useState(null)
  const [copied, setCopied] = useState('')
  const [loading, setLoading] = useState(false)
  const [seed, setSeed] = useState(0)
  const toast = useToast()

  const generate = (nextSeed = 0) => {
    setLoading(true)
    setTimeout(() => {
      setContent(buildContent(form, nextSeed))
      setLoading(false)
    }, 700)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSeed(0)
    generate(0)
  }

  const regenerate = () => {
    const next = seed + 1
    setSeed(next)
    generate(next)
  }

  const copy = (key, text) => {
    navigator.clipboard?.writeText(text)
    setCopied(key)
    toast('Copied to clipboard')
    setTimeout(() => setCopied(''), 1500)
  }

  const downloadAll = () => {
    if (!content) return
    const text = `INSTAGRAM CAPTION\n${content.instagram}\n\nFACEBOOK POST\n${content.facebook}\n\nLINKEDIN POST\n${content.linkedin}\n\nTWITTER / X POST\n${content.twitter}\n\nGOOGLE ADS\n${content.googleAds}\n\nSEO DESCRIPTION\n${content.seoDescription}\n\nMETA DESCRIPTION\n${content.metaDescription}\n\nPRODUCT DESCRIPTION\n${content.description}\n\nEMAIL CAMPAIGN\n${content.email}\n\nCALL TO ACTION\n${content.cta}\n\nHASHTAGS\n${content.hashtags}\n`
    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${(form.product || 'campaign').replace(/\s+/g, '-').toLowerCase()}-marketing.txt`
    a.click()
    URL.revokeObjectURL(url)
    toast('Downloaded as .txt')
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-14">
      <span className="eyebrow inline-flex items-center gap-2"><Megaphone size={13} /> Module 04</span>
      <h1 className="font-display text-3xl md:text-4xl mt-3 text-ivory">AI Marketing Studio</h1>
      <p className="text-mauve mt-3 max-w-xl">
        Generate platform-specific captions, ad copy, SEO/meta descriptions,
        an email campaign and hashtags from a product, audience, tone,
        platform and campaign goal.
      </p>

      <div className="grid md:grid-cols-2 gap-8 mt-10">
        <form onSubmit={handleSubmit} className="card p-7 space-y-5 h-fit">
          <label className="block">
            <span className="text-sm text-mauve mb-1.5 block">Product name</span>
            <input className="input-field" value={form.product} onChange={(e) => setForm((f) => ({ ...f, product: e.target.value }))} />
          </label>
          <label className="block">
            <span className="text-sm text-mauve mb-1.5 block">Target audience</span>
            <input className="input-field" value={form.audience} onChange={(e) => setForm((f) => ({ ...f, audience: e.target.value }))} />
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label className="block">
              <span className="text-sm text-mauve mb-1.5 block">Tone</span>
              <select className="input-field" value={form.tone} onChange={(e) => setForm((f) => ({ ...f, tone: e.target.value }))}>
                {TONES.map((t) => <option key={t}>{t}</option>)}
              </select>
            </label>
            <label className="block">
              <span className="text-sm text-mauve mb-1.5 block">Platform</span>
              <select className="input-field" value={form.platform} onChange={(e) => setForm((f) => ({ ...f, platform: e.target.value }))}>
                {PLATFORMS.map((t) => <option key={t}>{t}</option>)}
              </select>
            </label>
          </div>
          <label className="block">
            <span className="text-sm text-mauve mb-1.5 block">Campaign goal</span>
            <select className="input-field" value={form.goal} onChange={(e) => setForm((f) => ({ ...f, goal: e.target.value }))}>
              {GOALS.map((t) => <option key={t}>{t}</option>)}
            </select>
          </label>
          <button type="submit" disabled={loading} className="btn-gold w-full mt-2 disabled:opacity-60">
            {loading ? 'Generating…' : 'Generate content'}
          </button>
        </form>

        <div className="space-y-4">
          {loading && (
            <div className="card p-7 flex items-center justify-center py-16">
              <Loader label="Writing your campaign" />
            </div>
          )}

          {!loading && !content && (
            <div className="card p-7 h-full flex flex-col items-center justify-center text-center text-mauve py-16">
              <Megaphone className="text-primary mb-3" size={26} />
              <p className="text-sm">Your generated content will appear here.</p>
            </div>
          )}

          {!loading && content && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <div className="flex gap-2">
                <button onClick={regenerate} className="btn-ghost text-xs px-3 py-2 inline-flex items-center gap-1.5">
                  <RefreshCw size={13} /> Regenerate caption
                </button>
                <button onClick={downloadAll} className="btn-ghost text-xs px-3 py-2 inline-flex items-center gap-1.5">
                  <Download size={13} /> Download as .txt
                </button>
              </div>
              <ContentBlock title="Instagram caption" text={content.instagram} onCopy={() => copy('ig', content.instagram)} copied={copied === 'ig'} />
              <ContentBlock title="Facebook post" text={content.facebook} onCopy={() => copy('fb', content.facebook)} copied={copied === 'fb'} />
              <ContentBlock title="LinkedIn post" text={content.linkedin} onCopy={() => copy('li', content.linkedin)} copied={copied === 'li'} />
              <ContentBlock title="Twitter / X post" text={content.twitter} onCopy={() => copy('tw', content.twitter)} copied={copied === 'tw'} />
              <ContentBlock title="Google Ads copy" text={content.googleAds} onCopy={() => copy('ads', content.googleAds)} copied={copied === 'ads'} />
              <ContentBlock title="SEO description" text={content.seoDescription} onCopy={() => copy('seo', content.seoDescription)} copied={copied === 'seo'} />
              <ContentBlock title="Meta description" text={content.metaDescription} onCopy={() => copy('meta', content.metaDescription)} copied={copied === 'meta'} />
              <ContentBlock title="Product description" text={content.description} onCopy={() => copy('desc', content.description)} copied={copied === 'desc'} />
              <ContentBlock title="Email campaign" text={content.email} onCopy={() => copy('email', content.email)} copied={copied === 'email'} pre />
              <ContentBlock title="Call to action" text={content.cta} onCopy={() => copy('cta', content.cta)} copied={copied === 'cta'} />
              <ContentBlock title="Hashtags" text={content.hashtags} onCopy={() => copy('tags', content.hashtags)} copied={copied === 'tags'} />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

function ContentBlock({ title, text, onCopy, copied, pre }) {
  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs text-primary font-medium">{title}</p>
        <button onClick={onCopy} className="text-mauve hover:text-primary transition-colors" aria-label={`Copy ${title}`}>
          {copied ? <Check size={15} /> : <Copy size={15} />}
        </button>
      </div>
      {pre ? (
        <pre className="text-sm text-ivory/90 whitespace-pre-wrap font-body leading-relaxed">{text}</pre>
      ) : (
        <p className="text-sm text-ivory/90 leading-relaxed">{text}</p>
      )}
    </div>
  )
}
