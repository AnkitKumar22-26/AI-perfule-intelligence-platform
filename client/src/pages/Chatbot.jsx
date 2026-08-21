import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, Send, Copy, RefreshCw, Trash2, Mic, Check, History } from 'lucide-react'
import Loader from '../components/Loader.jsx'
import { useToast } from '../components/Toast.jsx'

// Reply engine lives client-side today. To go live, replace `getReply` with a
// POST to a FastAPI /chat endpoint that forwards the conversation + this
// same catalogue/context object to the OpenAI API, with the key read from a
// server-side environment variable (never shipped to the browser).
const CATALOGUE = {
  oud: { name: 'Velvet Oud No. 12', price: 145, tier: 'premium', cheaper: 'Spiced Amber Wood ($88)', luxury: 'Midnight Amber ($152)' },
  vanilla: { name: 'Golden Vanilla Musk', price: 138, tier: 'premium', cheaper: 'Fresh Linen ($52)', luxury: 'Midnight Amber ($152)' },
  citrus: { name: 'Citrus Bloom', price: 58, tier: 'budget', cheaper: 'Summer Neroli ($49)', luxury: 'Jasmine Rain ($110)' },
  floral: { name: 'Rose Noir', price: 92, tier: 'mid', cheaper: 'Fresh Linen ($52)', luxury: 'Jasmine Rain ($110)' },
  musk: { name: 'Fresh Linen', price: 52, tier: 'budget', cheaper: 'Summer Neroli ($49)', luxury: 'Golden Vanilla Musk ($138)' },
  amber: { name: 'Spiced Amber Wood', price: 88, tier: 'mid', cheaper: 'Fresh Linen ($52)', luxury: 'Midnight Amber ($152)' },
  woody: { name: 'Sea Salt & Cedar', price: 74, tier: 'mid', cheaper: 'Citrus Bloom ($58)', luxury: 'Spiced Amber Wood ($88)' }
}

const NOTE_INFO = {
  oud: 'Oud is a rich, resinous, woody note — deep and long-lasting, often the backbone of premium evening fragrances. It shines most in cool weather and grows warmer as it dries down.',
  vanilla: 'Vanilla adds warmth and sweetness. On its own it can feel simple, but layered with amber or musk it becomes a rounded, comforting base note that lasts for hours.',
  citrus: 'Citrus notes (bergamot, lemon, neroli) are bright, sharp top notes. They make the strongest first impression but fade fastest — usually within the first hour or two.',
  floral: 'Floral notes like rose and jasmine sit in the heart of a fragrance. They soften harsher top notes and give a scent its emotional character — romantic, fresh, or powdery depending on the flower.',
  musk: 'Musk is a soft, skin-like base note. Modern "white musk" is clean and laundry-fresh; darker musks feel more intimate and sensual. It\'s often used to extend a fragrance\'s life.',
  amber: 'Amber is a warm, resinous base note (technically an accord of labdanum, vanilla and benzoin). It\'s one of the longest-lasting note families and pairs beautifully with oud or spice.',
  woody: 'Woody notes — cedar, sandalwood, vetiver — add structure and depth. They\'re versatile across seasons and often used to "ground" brighter top notes.'
}

function detectNotes(t) {
  return Object.keys(NOTE_INFO).filter((n) => t.includes(n))
}

function getReply(rawInput, context) {
  const t = rawInput.toLowerCase()
  const mentioned = detectNotes(t)
  const ref = mentioned[0] || context.lastNote

  if (t.includes('cheap') || t.includes('budget') || t.includes('affordable')) {
    if (ref && CATALOGUE[ref]) {
      return { text: `For something more budget-friendly in the ${ref} family, try **${CATALOGUE[ref].cheaper}** — it keeps a similar character at a lower price point than ${CATALOGUE[ref].name}.`, note: ref }
    }
    return { text: 'Tell me a note or perfume you like (e.g. "cheaper alternative to oud") and I\'ll point you to a similar option at a lower price.', note: context.lastNote }
  }

  if (t.includes('luxury') || t.includes('expensive') || t.includes('premium') || t.includes('upgrade')) {
    if (ref && CATALOGUE[ref]) {
      return { text: `If you want to go more premium in the ${ref} family, **${CATALOGUE[ref].luxury}** is the elevated pick — more complex development and stronger projection than ${CATALOGUE[ref].name}.`, note: ref }
    }
    return { text: 'Tell me a note or perfume and I\'ll suggest a more premium alternative in that family.', note: context.lastNote }
  }

  if (t.includes('compare') || t.includes(' vs ') || t.includes('versus')) {
    if (mentioned.length >= 2) {
      const [a, b] = mentioned
      return {
        text: `**${a[0].toUpperCase() + a.slice(1)} vs ${b[0].toUpperCase() + b.slice(1)}**\n- Longevity: ${a} typically outlasts ${b} on skin\n- Projection: ${a} tends to project further once it dries down\n- Best for: ${a} suits evening/cool weather, ${b} suits daytime/warmer weather\n\nIf you want one fragrance that leans on both, look for a scent that opens with ${b} and settles into ${a} — that gives you the best of both.`,
        note: a
      }
    }
    return { text: 'Give me two note families to compare, like "compare oud vs citrus" — I\'ll break down longevity, projection and best occasion for each.', note: context.lastNote }
  }

  if (mentioned.length > 0) {
    return { text: NOTE_INFO[mentioned[0]], note: mentioned[0] }
  }

  if (t.includes('layer')) {
    return {
      text: `**Layering tips:**\n- Apply your boldest scent first, closer to the skin\n- Add a lighter, complementary scent on pulse points (wrists, neck)\n- A good starting combo: a musk or vanilla base with a citrus or floral top\n${context.lastNote ? `\nSince you mentioned ${context.lastNote}, try layering it with a lighter citrus or floral top note to soften it for daytime wear.` : ''}`,
      note: context.lastNote
    }
  }

  if (t.includes('long') || t.includes('last')) {
    return { text: 'Longevity comes down to concentration: parfum lasts 8+ hours, EDP roughly 6–8, EDT 3–5. Base notes like oud, amber and musk also extend wear time — the higher the concentration of those in the base, the longer it lasts on skin.', note: context.lastNote }
  }

  if (t.includes('recommend') || t.includes('suggest') || t.includes('what should i')) {
    return { text: 'Happy to help — tell me the occasion and season (e.g. "evening in winter") or head to the Recommendation Engine for a scored, ranked match based on your full preferences.', note: context.lastNote }
  }

  if (t.includes('hi') || t.includes('hello') || t.includes('hey')) {
    return { text: "Hello! I'm your fragrance consultant. Ask me about a note (oud, vanilla, citrus, floral, musk, amber, woody), request a comparison, or ask for a cheaper or more premium alternative.", note: context.lastNote }
  }

  return {
    text: `I can help with that — could you tell me a bit more? Try mentioning a specific note (oud, vanilla, citrus, floral, musk, amber, woody), ask me to compare two, or ask for layering or longevity advice.`,
    note: context.lastNote
  }
}

function timestamp() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

// Minimal markdown: **bold**, "- " bullet lines, line breaks. Keeps the chat
// dependency-free while still giving the ChatGPT-style formatted look.
function renderMarkdown(text) {
  const lines = text.split('\n')
  return lines.map((line, i) => {
    const isBullet = line.trim().startsWith('- ')
    const content = isBullet ? line.trim().slice(2) : line
    const parts = content.split(/(\*\*[^*]+\*\*)/g).map((part, j) =>
      part.startsWith('**') && part.endsWith('**')
        ? <strong key={j} className="font-semibold text-primary">{part.slice(2, -2)}</strong>
        : <span key={j}>{part}</span>
    )
    return (
      <div key={i} className={isBullet ? 'flex gap-2 pl-1' : ''}>
        {isBullet && <span className="text-primary">•</span>}
        <span>{parts}</span>
      </div>
    )
  })
}

const QUICK_REPLIES = ['Tell me about oud', 'Compare oud vs citrus', 'Cheaper alternative to oud', 'Layering tips']

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Hi, I'm your AI fragrance consultant. Ask me about notes, layering, comparisons, or budget/luxury alternatives.", time: timestamp() }
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [context, setContext] = useState({ lastNote: null })
  const [listening, setListening] = useState(false)
  const [copiedIdx, setCopiedIdx] = useState(null)
  const endRef = useRef(null)
  const toast = useToast()

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const respondTo = (text) => {
    setTyping(true)
    setTimeout(() => {
      const { text: replyText, note } = getReply(text, context)
      setMessages((m) => [...m, { role: 'bot', text: replyText, time: timestamp() }])
      setContext({ lastNote: note })
      setTyping(false)
    }, 650 + Math.random() * 500)
  }

  const sendText = (text) => {
    if (!text.trim()) return
    setMessages((m) => [...m, { role: 'user', text, time: timestamp() }])
    setInput('')
    respondTo(text)
  }

  const send = (e) => {
    e.preventDefault()
    sendText(input)
  }

  const regenerate = () => {
    const lastUser = [...messages].reverse().find((m) => m.role === 'user')
    if (!lastUser) return
    setMessages((m) => m.slice(0, -1))
    respondTo(lastUser.text)
  }

  const clearChat = () => {
    setMessages([{ role: 'bot', text: "Chat cleared. What would you like to know?", time: timestamp() }])
    setContext({ lastNote: null })
  }

  const copyMessage = (i, text) => {
    navigator.clipboard?.writeText(text)
    setCopiedIdx(i)
    setTimeout(() => setCopiedIdx(null), 1200)
  }

  const toggleVoice = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      toast('Voice input is not supported in this browser')
      return
    }
    const recognition = new SpeechRecognition()
    recognition.lang = 'en-US'
    recognition.onstart = () => setListening(true)
    recognition.onend = () => setListening(false)
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript
      setInput(transcript)
    }
    recognition.start()
  }

  const history = messages.filter((m) => m.role === 'user')

  return (
    <div className="mx-auto max-w-5xl px-6 py-14 grid lg:grid-cols-4 gap-6">
      <div className="lg:col-span-1 hidden lg:block">
        <div className="card p-5 sticky top-24">
          <p className="eyebrow inline-flex items-center gap-2 mb-3"><History size={12} /> History</p>
          {history.length === 0 && <p className="text-mauve text-xs">Your questions will appear here.</p>}
          <div className="space-y-1.5 max-h-96 overflow-y-auto">
            {history.map((m, i) => (
              <button
                key={i}
                onClick={() => sendText(m.text)}
                className="w-full text-left text-xs text-mauve hover:text-primary truncate px-2 py-1.5 rounded-lg hover:bg-primary/5 transition-colors"
              >
                {m.text}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="lg:col-span-3">
        <span className="eyebrow inline-flex items-center gap-2"><MessageCircle size={13} /> Module 02</span>
        <h1 className="font-display text-3xl md:text-4xl mt-3 text-ivory">AI Perfume Consultant</h1>
        <p className="text-mauve mt-3">Conversational fragrance advice — notes, layering, comparisons and budget/luxury alternatives.</p>

        <div className="flex flex-wrap items-center justify-between gap-3 mt-6">
          <div className="flex flex-wrap gap-2">
            {QUICK_REPLIES.map((q) => (
              <button key={q} onClick={() => sendText(q)} className="text-xs px-3 py-1.5 rounded-full border border-white/10 text-mauve hover:border-primary hover:text-primary transition-colors">
                {q}
              </button>
            ))}
          </div>
          <button onClick={clearChat} className="text-xs text-mauve hover:text-accent inline-flex items-center gap-1.5">
            <Trash2 size={13} /> Clear chat
          </button>
        </div>

        <div className="card mt-4 flex flex-col h-[520px]">
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <AnimatePresence initial={false}>
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] ${m.role === 'user' ? 'items-end' : 'items-start'} flex flex-col group`}>
                    <div
                      className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                        m.role === 'user' ? 'bg-gradient-to-r from-primary to-secondary text-white font-medium' : 'bg-white/5 text-ivory'
                      }`}
                    >
                      {m.role === 'bot' ? renderMarkdown(m.text) : m.text}
                    </div>
                    <div className="flex items-center gap-2 mt-1 px-1">
                      <span className="text-[10px] text-mauve">{m.time}</span>
                      {m.role === 'bot' && (
                        <button onClick={() => copyMessage(i, m.text)} className="opacity-0 group-hover:opacity-100 text-mauve hover:text-primary transition-opacity">
                          {copiedIdx === i ? <Check size={11} /> : <Copy size={11} />}
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {typing && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                <div className="bg-white/5 rounded-2xl px-4 py-2.5">
                  <Loader label="Typing" />
                </div>
              </motion.div>
            )}
            <div ref={endRef} />
          </div>

          <div className="border-t border-white/5 p-4">
            {messages.length > 1 && !typing && (
              <button onClick={regenerate} className="text-xs text-mauve hover:text-primary inline-flex items-center gap-1.5 mb-2">
                <RefreshCw size={12} /> Regenerate last response
              </button>
            )}
            <form onSubmit={send} className="flex gap-3">
              <input
                className="input-field"
                placeholder="Ask about a note, layering, comparisons…"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button type="button" onClick={toggleVoice} className={`btn-ghost px-3 ${listening ? 'text-accent border-accent' : ''}`} aria-label="Voice input">
                <Mic size={17} />
              </button>
              <button type="submit" className="btn-gold px-4" aria-label="Send message">
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
