import { useEffect, useLayoutEffect, useRef } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { NavLink } from 'react-router-dom'
import { Wand2, MessageCircle, LineChart, Megaphone, LayoutDashboard, User, Layers, CloudSun, Eye, Quote, Sparkles, ArrowDown, ArrowUpRight } from 'lucide-react';
import ParticleBackground from '../components/ParticleBackground.jsx'
import HeroBottle from '../components/HeroBottle.jsx'
import AnimatedCounter from '../components/AnimatedCounter.jsx'

gsap.registerPlugin(ScrollTrigger)

// ध्यान दें: अगर ये नए आइकन्स (User, Layers, CloudSun, Eye) फाइल के सबसे ऊपर इम्पोर्टेड नहीं हैं, 
// तो लाइन नंबर 1 या 2 पर जहाँ Lucide-React के बाकी आइकन्स इम्पोर्ट हैं, वहाँ इन्हें भी जोड़ देना।
// जैसे: import { Wand2, MessageCircle, LineChart, Megaphone, LayoutDashboard, User, Layers, CloudSun, Eye } from 'lucide-react';

const modules = [
  {
    icon: Sparkles,
    index: '01',
    title: 'Recommendation Engine',
    tagline: 'Strict where it matters, refined where it counts.',
    description:
      'Occasion, weather, budget and gender are treated as requirements, not preferences — a perfume that fails one is never shown as a false match. Season and fragrance family then rank what remains.',
    to: '/recommendation'
  },
  {
    icon: MessageCircle,
    index: '02',
    title: 'AI Consultant',
    tagline: 'A conversation, not a form.',
    description:
      'Ask about a note, request a comparison, or ask for a more affordable or more premium alternative — the consultant answers in context, without demanding you know the vocabulary first.',
    to: '/chatbot'
  },
  {
    icon: User,
    index: '03',
    title: 'Scent Profiler',
    tagline: 'Deep telemetry mapping of your personal taste identity.',
    description:
      'Analyze and map historical taste dynamics, favorite compounds, and lifestyle variables into a centralized digital scent passport tailored uniquely to you.',
    to: '/scent-profiler' // 🔥 App.jsx के path="/scent-profiler" से 100% मैच
  },
  {
    icon: Layers,
    index: '04',
    title: 'Scent Layering Matrix',
    tagline: 'Advanced molecular harmony for bespoke blending.',
    description:
      'Unlock the artistic formulas behind fragrance mixing. Our combination grid prevents note collisions, ensuring your custom blends project perfectly balanced base, middle, and top sequences.',
    to: '/scent-layering' // 🔥 App.jsx के path="/scent-layering" से 100% मैच
  },
  {
    icon: CloudSun,
    index: '05',
    title: 'Mood & Weather Tracker',
    tagline: 'Climatic adaptability for sensory elegance.',
    description:
      'Sync your signature scent profile with local atmospheric variables, temperature fluctuations, and emotional vectors to ensure your projection parameters match the ambient vibe.',
    to: '/mood-weather' // 🔥 App.jsx के path="/mood-weather" से 100% match
  },
  {
    icon: Eye,
    index: '06',
    title: 'AI Vision Stylist',
    tagline: 'Real-time outfit silhouette and shade coordinates mapping.',
    description:
      'Upload or capture your style assets live. Our smart vision matrix instantly decodes fabrics, color palette depths, and formality scores to recommend a matching luxury fragrance architecture.',
    to: '/vision-stylist' // 🔥 App.jsx के path="/vision-stylist" से 100% मैच
  },
  {
    icon: LineChart,
    index: '07',
    title: 'Sentiment Analysis',
    tagline: 'What your customers actually mean.',
    description:
      'Reviews are read for what they say about performance, projection and authenticity — not reduced to a single positive/negative label — so the signal underneath is never lost.',
    to: '/sentiment'
  },
  {
    icon: Megaphone,
    index: '08',
    title: 'Marketing Studio',
    tagline: 'Copy that knows the season.',
    description:
      'Platform, audience, tone and campaign goal shape every draft — captions, ads, SEO copy and email — so a fresh aquatic is never marketed to a winter buyer by mistake.',
    to: '/marketing'
  },
  {
    icon: LayoutDashboard,
    index: '09',
    title: 'Analytics Dashboard',
    tagline: 'One number, everywhere it appears.',
    description:
      'Revenue, growth, and AI influence on purchases — filtered the same way your customers filter, so what you see on the dashboard is what actually happened on the site.',
    to: '/analytics'
  }
];

const stats = [
  { value: 12400, suffix: '+', label: 'Recommendations served' },
  { value: 100, suffix: '%', label: 'Strict-filter compliance' },
  { value: 24, suffix: '/7', label: 'Consultant availability' },
  { value: 5, suffix: '', label: 'Connected intelligence modules' }
]

const testimonials = [
  {
    quote: 'The recommendation engine will no longer show a heavy oud for a hot-weather office query — that alone changed how much we trust the tool.',
    name: 'Founder, independent fragrance house'
  },
  {
    quote: 'Sentiment analysis surfaced a specific complaint pattern about longevity we would have missed reading reviews by hand.',
    name: 'Ops lead, boutique perfumery'
  },
  {
    quote: 'Marketing Studio now checks season fit before it drafts copy — a small guardrail that saved us from a real mistake.',
    name: 'Marketing manager, D2C scent brand'
  }
]

export default function Home() {
  const heroRef = useRef(null)
  const bottleWrapRef = useRef(null)
  const storyRefs = useRef([])
  storyRefs.current = []

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useTransform(mouseY, [-260, 260], [8, -8])
  const rotateY = useTransform(mouseX, [-260, 260], [-8, 8])
  const translateX = useTransform(mouseX, [-260, 260], [-16, 16])
  const translateY = useTransform(mouseY, [-260, 260], [-12, 12])

  const handleMouseMove = (e) => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left - rect.width / 2)
    mouseY.set(e.clientY - rect.top - rect.height / 2)
  }

  const addStoryRef = (el) => {
    if (el && !storyRefs.current.includes(el)) storyRefs.current.push(el)
  }

  // GSAP hero entrance timeline — runs once on mount.
  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set('.hero-anim', { opacity: 1, y: 0 })
        return
      }
      gsap.set('.hero-anim', { opacity: 0, y: 26 })
      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .to('.hero-eyebrow', { opacity: 1, y: 0, duration: 0.6 })
        .to('.hero-headline', { opacity: 1, y: 0, duration: 0.9 }, '-=0.35')
        .to('.hero-sub', { opacity: 1, y: 0, duration: 0.7 }, '-=0.5')
        .to('.hero-cta', { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }, '-=0.4')
        .to('.hero-bottle-el', { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }, '-=0.7')
        .to('.hero-scroll-hint', { opacity: 1, duration: 0.6 }, '-=0.2')
    }, heroRef)
    return () => ctx.revert()
  }, [])

  // GSAP scroll-triggered storytelling — each module block reveals as it
  // enters the viewport, alternating slide direction for a narrative feel.
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      storyRefs.current.forEach((el, i) => {
        const fromX = i % 2 === 0 ? -60 : 60
        gsap.fromTo(
          el,
          { opacity: 0, x: fromX },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 78%',
              toggleActions: 'play none none reverse'
            }
          }
        )
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div>
      {/* ============ FULLSCREEN HERO ============ */}
      <section
        ref={heroRef}
        onMouseMove={handleMouseMove}
        className="relative min-h-screen flex items-center overflow-hidden"
      >
        <div className="absolute inset-0">
          <ParticleBackground density={70} className="opacity-70" />
        </div>
        <div className="absolute inset-0 bg-glow-radial" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 grid md:grid-cols-2 gap-14 items-center w-full">
          <div>
            <span className="hero-anim hero-eyebrow eyebrow inline-flex items-center gap-2">
              <Sparkles size={13} /> AI Perfume Intelligence Platform
            </span>
            <h1 className="hero-anim hero-headline font-display italic font-medium text-5xl md:text-7xl leading-[1.05] mt-6 text-ivory">
              An intelligence layer for
              <span className="shimmer-text not-italic font-semibold"> the art of scent.</span>
            </h1>
            <p className="hero-anim hero-sub mt-7 text-mauve text-base md:text-lg max-w-lg font-body">
              Five connected modules — recommendation, consultation, sentiment,
              marketing and analytics — built on one strict, honest rule: a
              result is never shown as a match unless it actually is one.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <NavLink to="/recommendation" className="hero-anim hero-cta btn-gold">
                Discover your scent
              </NavLink>
              <NavLink to="/analytics" className="hero-anim hero-cta btn-ghost">
                View the platform
              </NavLink>
            </div>
          </div>

          <div ref={bottleWrapRef} className="hero-anim hero-bottle-el flex justify-center w-full">
            <motion.div style={{ perspective: 1000 }}>
              <motion.div style={{ x: translateX, y: translateY, rotateX, rotateY }}>
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative group"
                >
                  {/* पीछे एक बड़ा और प्रीमियम डीप रेड ग्लो इफेक्ट */}
                  <div className="absolute inset-0 bg-red-600/25 rounded-3xl blur-[60px] opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* इमेज का साइज बड़ा (w-72 से md:w-96) कर दिया गया है */}
                  <div className="relative w-72 md:w-96 aspect-square rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent p-2.5 shadow-2xl backdrop-blur-sm">
                    <img 
                      src="https://img.freepik.com/premium-photo/red-perfume-bottle-hires-stock-photography-images_555090-44208.jpg?w=2000" 
                      alt="Professional Red Luxury Scent" 
                      className="w-full h-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* इमेज के निचले हिस्से में स्मूथ डार्क शेड */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                    
                    {/* प्रीमियम ओरिजिनल लेबल */}
                    <span className="absolute bottom-5 left-5 text-[10px] tracking-[0.25em] uppercase text-red-400 font-medium bg-black/60 px-3 py-1 rounded border border-red-500/20 backdrop-blur-md">
                      Crimson Luxe Ultra HD
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <div className="hero-anim hero-scroll-hint absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-mauve text-xs tracking-widest uppercase">
          Scroll
          <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
            <ArrowDown size={14} />
          </motion.span>
        </div>
      </section>

      {/* ============ STATS STRIP ============ */}
      <section className="mx-auto max-w-7xl px-6 -mt-6 md:-mt-10 pb-4 relative z-10">
        <div className="card p-6 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center md:text-left">
              <p className="font-display text-3xl md:text-4xl text-primary">
                <AnimatedCounter value={s.value} suffix={s.suffix} />
              </p>
              <p className="text-mauve text-xs mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>
{/* ============ SCROLL STORYTELLING: ALL 9 MODULES ============ */}
      <section className="mx-auto max-w-6xl px-6 py-24 md:py-32 space-y-28 md:space-y-36">
        <div className="text-center max-w-xl mx-auto">
          <span className="eyebrow">The AI Modules</span>
          <h2 className="font-display italic text-3xl md:text-5xl mt-4 text-ivory">
            One intelligence layer,<br />nine considered decisions.
          </h2>
        </div>

        {/* 01. Recommendation Engine */}
        <NavLink to="/recommendation" ref={addStoryRef} className="group block rounded-3xl transition-colors">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div>
              <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                <span className="text-xl">✨</span>
              </div>
              <span className="font-mono text-xs text-mauve">01</span>
              <h3 className="font-display italic text-3xl md:text-4xl mt-2 text-ivory transition-colors group-hover:text-primary">Recommendation Engine</h3>
              <p className="text-primary text-sm mt-2">Strict where it matters, refined where it counts.</p>
              <p className="text-mauve mt-4 leading-relaxed max-w-md">Occasion, weather, budget and gender are treated as requirements, not preferences.</p>
              <span className="btn-ghost inline-flex items-center gap-2 mt-6 text-sm transition-all group-hover:border-primary/60 group-hover:bg-primary/10">
                Open engine <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
            </div>
            <div className="card p-0 overflow-hidden flex items-center justify-center aspect-[4/3] transition-all duration-300 group-hover:border-primary/40 group-hover:shadow-vial">
              {/* सबसे ऊपर वाली इमेज वापस पुरानी रेड परफ्यूम वाली कर दी है */}
              <img src="https://img.freepik.com/premium-photo/perfume-bottle-surrounded-by-red-flowers-dark-branches-vibrant-red-background-creating-luxurious-elegant-composition_124507-303942.jpg" alt="Red Perfume" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
            </div>
          </div>
        </NavLink>

        {/* 02. AI Consultant */}
        <NavLink to="/chatbot" ref={addStoryRef} className="group block rounded-3xl transition-colors md:[direction:rtl]">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div className="md:[direction:ltr]">
              <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                <span className="text-xl">💬</span>
              </div>
              <span className="font-mono text-xs text-mauve">02</span>
              <h3 className="font-display italic text-3xl md:text-4xl mt-2 text-ivory transition-colors group-hover:text-primary">AI Consultant</h3>
              <p className="text-primary text-sm mt-2">A conversation, not a form.</p>
              <p className="text-mauve mt-4 leading-relaxed max-w-md">Ask about a note, request a comparison, or ask for a more affordable alternative seamlessly.</p>
              <span className="btn-ghost inline-flex items-center gap-2 mt-6 text-sm transition-all group-hover:border-primary/60 group-hover:bg-primary/10">
                Open consultant <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
            </div>
            <div className="md:[direction:ltr] card p-0 overflow-hidden flex items-center justify-center aspect-[4/3] transition-all duration-300 group-hover:border-primary/40 group-hover:shadow-vial">
              <img src="https://img.freepik.com/premium-photo/citrus-radiance-crystal-clear-elegance-symphony-orange-perfume_1077188-2998.jpg" alt="Orange Perfume" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
            </div>
          </div>
        </NavLink>

        {/* 03. Scent Profiler */}
        <NavLink to="/scent-profiler" ref={addStoryRef} className="group block rounded-3xl transition-colors">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div>
              <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                <span className="text-xl">👤</span>
              </div>
              <span className="font-mono text-xs text-mauve">03</span>
              <h3 className="font-display italic text-3xl md:text-4xl mt-2 text-ivory transition-colors group-hover:text-primary">Scent Profiler</h3>
              <p className="text-primary text-sm mt-2">Deep telemetry mapping of your personal taste identity.</p>
              <p className="text-mauve mt-4 leading-relaxed max-w-md">Analyze and map historical taste dynamics and favorite compounds into a digital scent passport.</p>
              <span className="btn-ghost inline-flex items-center gap-2 mt-6 text-sm transition-all group-hover:border-primary/60 group-hover:bg-primary/10">
                Open profiler <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
            </div>
            <div className="card p-0 overflow-hidden flex items-center justify-center aspect-[4/3] transition-all duration-300 group-hover:border-primary/40 group-hover:shadow-vial">
              <img src="https://png.pngtree.com/thumb_back/fw800/background/20241026/pngtree-blue-perfume-bottle-on-rocks-image_16317180.jpg" alt="Blue Perfume" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
            </div>
          </div>
        </NavLink>

        {/* 04. Scent Layering Matrix */}
        <NavLink to="/scent-layering" ref={addStoryRef} className="group block rounded-3xl transition-colors md:[direction:rtl]">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div className="md:[direction:ltr]">
              <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                <span className="text-xl">🥞</span>
              </div>
              <span className="font-mono text-xs text-mauve">04</span>
              <h3 className="font-display italic text-3xl md:text-4xl mt-2 text-ivory transition-colors group-hover:text-primary">Scent Layering Matrix</h3>
              <p className="text-primary text-sm mt-2">Advanced molecular harmony for bespoke blending.</p>
              <p className="text-mauve mt-4 leading-relaxed max-w-md">Unlock the artistic formulas behind fragrance mixing. Our combination grid prevents note collisions.</p>
              <span className="btn-ghost inline-flex items-center gap-2 mt-6 text-sm transition-all group-hover:border-primary/60 group-hover:bg-primary/10">
                Open matrix <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
            </div>
            <div className="md:[direction:ltr] card p-0 overflow-hidden flex items-center justify-center aspect-[4/3] transition-all duration-300 group-hover:border-primary/40 group-hover:shadow-vial">
              <img src="https://thumbs.dreamstime.com/b/stylish-perfume-bottle-blue-pedestal-elegant-flowers-background-stylish-perfume-bottle-blue-pedestal-327353434.jpg" alt="Cyan Perfume" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
            </div>
          </div>
        </NavLink>

        {/* 05. Mood & Weather Tracker */}
        <NavLink to="/mood-weather" ref={addStoryRef} className="group block rounded-3xl transition-colors">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div>
              <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                <span className="text-xl">🌤️</span>
              </div>
              <span className="font-mono text-xs text-mauve">05</span>
              <h3 className="font-display italic text-3xl md:text-4xl mt-2 text-ivory transition-colors group-hover:text-primary">Mood & Weather Tracker</h3>
              <p className="text-primary text-sm mt-2">Climatic adaptability for sensory elegance.</p>
              <p className="text-mauve mt-4 leading-relaxed max-w-md">Sync your signature scent profile with local atmospheric variables and temperature fluctuations.</p>
              <span className="btn-ghost inline-flex items-center gap-2 mt-6 text-sm transition-all group-hover:border-primary/60 group-hover:bg-primary/10">
                Open tracker <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
            </div>
            <div className="card p-0 overflow-hidden flex items-center justify-center aspect-[4/3] transition-all duration-300 group-hover:border-primary/40 group-hover:shadow-vial">
              <img src="https://png.pngtree.com/thumb_back/fw800/background/20240330/pngtree-luxurious-perfume-bottle-image_15698345.jpg" alt="Violet Perfume" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
            </div>
          </div>
        </NavLink>

        {/* 06. AI Vision Stylist */}
        <NavLink to="/vision-stylist" ref={addStoryRef} className="group block rounded-3xl transition-colors md:[direction:rtl]">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div className="md:[direction:ltr]">
              <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                <span className="text-xl">👁️</span>
              </div>
              <span className="font-mono text-xs text-mauve">06</span>
              <h3 className="font-display italic text-3xl md:text-4xl mt-2 text-ivory transition-colors group-hover:text-primary">AI Vision Stylist</h3>
              <p className="text-primary text-sm mt-2">Real-time outfit silhouette and shade coordinates mapping.</p>
              <p className="text-mauve mt-4 leading-relaxed max-w-md">Our smart vision matrix instantly decodes fabrics, color palette depths, and formality scores.</p>
              <span className="btn-ghost inline-flex items-center gap-2 mt-6 text-sm transition-all group-hover:border-primary/60 group-hover:bg-primary/10">
                Open stylist <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
            </div>
            <div className="md:[direction:ltr] card p-0 overflow-hidden flex items-center justify-center aspect-[4/3] transition-all duration-300 group-hover:border-primary/40 group-hover:shadow-vial">
              <img src="https://img.pikbest.com/wp/202346/bold-black-beauty-a-3d-rendered-perfume-and-cosmetics-set-in-dark-layout_9618793.jpg!bw700" alt="Black Perfume" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
            </div>
          </div>
        </NavLink>

        {/* 07. Sentiment Analyser */}
        <NavLink to="/sentiment" ref={addStoryRef} className="group block rounded-3xl transition-colors">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div>
              <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                <span className="text-xl">❤️</span>
              </div>
              <span className="font-mono text-xs text-mauve">07</span>
              <h3 className="font-display italic text-3xl md:text-4xl mt-2 text-ivory transition-colors group-hover:text-primary">Sentiment Analyser</h3>
              <p className="text-primary text-sm mt-2">Emotional wavelength mapping through aromatic feedback.</p>
              <p className="text-mauve mt-4 leading-relaxed max-w-md">Decode behavioral vibes and psychological trends to suggest scents that balance or elevate your present state.</p>
              <span className="btn-ghost inline-flex items-center gap-2 mt-6 text-sm transition-all group-hover:border-primary/60 group-hover:bg-primary/10">
                Open analyser <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
            </div>
            <div className="card p-0 overflow-hidden flex items-center justify-center aspect-[4/3] transition-all duration-300 group-hover:border-primary/40 group-hover:shadow-vial">
              <img src="https://fimgs.net/mdimg/perfume/social.117266.jpg" alt="Indigo Sentiment Analyser Perfume" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
            </div>
          </div>
        </NavLink>

        {/* 08. Market Studio */}
        <NavLink to="/market-studio" ref={addStoryRef} className="group block rounded-3xl transition-colors md:[direction:rtl]">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div className="md:[direction:ltr]">
              <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                <span className="text-xl">🏪</span>
              </div>
              <span className="font-mono text-xs text-mauve">08</span>
              <h3 className="font-display italic text-3xl md:text-4xl mt-2 text-ivory transition-colors group-hover:text-primary">Market Studio</h3>
              <p className="text-primary text-sm mt-2">Global niche trend capturing and inventory insights.</p>
              <p className="text-mauve mt-4 leading-relaxed max-w-md">Track trending global combinations, rare compound availability, and exclusive drops curated directly from the house.</p>
              <span className="btn-ghost inline-flex items-center gap-2 mt-6 text-sm transition-all group-hover:border-primary/60 group-hover:bg-primary/10">
                Open studio <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
            </div>
            <div className="md:[direction:ltr] card p-0 overflow-hidden flex items-center justify-center aspect-[4/3] transition-all duration-300 group-hover:border-primary/40 group-hover:shadow-vial">
              <img src="https://i.pinimg.com/originals/c2/d5/1d/c2d51dcd80e929795ca84d947b36b6b9.png" alt="Dark Violet Market Studio Perfume" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
            </div>
          </div>
        </NavLink>

        {/* 09. Analytics */}
        <NavLink to="/analytics" ref={addStoryRef} className="group block rounded-3xl transition-colors">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div>
              <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                <span className="text-xl">📊</span>
              </div>
              <span className="font-mono text-xs text-mauve">09</span>
              <h3 className="font-display italic text-3xl md:text-4xl mt-2 text-ivory transition-colors group-hover:text-primary">Analytics</h3>
              <p className="text-primary text-sm mt-2">Advanced matrix performance and projection metrics.</p>
              <p className="text-mauve mt-4 leading-relaxed max-w-md">Dive deep into charts containing consumption speed, longevity indexes, and absolute sillage scores over weeks.</p>
              <span className="btn-ghost inline-flex items-center gap-2 mt-6 text-sm transition-all group-hover:border-primary/60 group-hover:bg-primary/10">
                Open analytics <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
            </div>
            <div className="card p-0 overflow-hidden flex items-center justify-center aspect-[4/3] transition-all duration-300 group-hover:border-primary/40 group-hover:shadow-vial">
              {/* यहाँ Analytics के सामने आपकी लेटेस्ट मांगी गई HD इमेज बिल्कुल फिट कर दी गई है */}
              <img 
                src="https://d13luxury.in/cdn/shop/collections/3507173_d76a8c0b-102c-41a5-8454-832690888c58.png?v=1774009468&width=520" 
                alt="Premium Luxury Analytics Perfume" 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
              />
            </div>
          </div>
        </NavLink>
      </section>
      {/* ========================================================= */}
      {/* 🎬 सबसे नीचे का QUOTE BANNER SECTION (डार्क रेड बैकग्राउंड) */}
      {/* ========================================================= */}
      <div className="w-full max-w-6xl mx-auto px-6 mb-24">
        <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden border border-white/10 group">
          <img 
            src="https://img.freepik.com/premium-photo/luxurious-perfume-bottle-with-red-accents-dark-background_7023-373470.jpg" 
            alt="Luxurious Perfume Bottle Red Accents" 
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex flex-col justify-center items-center text-center p-6 md:p-12">
            <span className="text-xs md:text-sm font-mono text-primary tracking-widest uppercase mb-3">Scentelligence Elite</span>
            <h2 className="text-3xl md:text-5xl font-display italic text-ivory mb-4 tracking-tight max-w-2xl">
              Where Predictive AI Meets Haute Parfumerie
            </h2>
            <p className="text-mauve max-w-md text-sm md:text-base leading-relaxed">
              Stop guessing. Let data decode your next signature olfactory signature with millimeter precision.
            </p>
          </div>
        </div>
      </div>
      {/* ========================================================= */}
      {/* 🎬 1. बीच का IMAGE SECTION (रेड फोटो - सिल्क फैब्रिक वाली) */}
      {/* ========================================================= */}
      <div className="my-16 max-w-6xl mx-auto px-6">
        <div className="relative h-[350px] md:h-[450px] rounded-3xl overflow-hidden border border-white/10 group">
          <img 
            src="https://img.freepik.com/premium-photo/luxurious-elegance-perfume-red-fabric_1003686-18895.jpg?w=1060" 
            alt="Luxurious Elegance Perfume Red Fabric" 
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex flex-col justify-end p-8 md:p-12">
            <span className="text-xs font-mono text-primary tracking-widest uppercase mb-2">The Art of Sillage</span>
            <h4 className="text-2xl md:text-4xl font-display italic text-ivory mb-3 max-w-lg">Molecular Elegance</h4>
            <p className="text-sm md:text-base text-mauve max-w-md leading-relaxed">
              Every blend is designed to flow seamlessly like liquid silk, creating an unforgettable sensory cloud around you.
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 🎬 2. सबसे नीचे का IMAGE SECTION (रेड फोटो - डार्क बैकग्राउंड वाली) */}
      {/* ========================================================= */}
      <div className="w-full max-w-6xl mx-auto px-6 mb-24">
        <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden border border-white/10 group">
          <img 
            src="https://img.freepik.com/premium-photo/luxurious-perfume-bottle-with-red-accents-dark-background_7023-373470.jpg" 
            alt="Luxurious Perfume Bottle Red Accents" 
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex flex-col justify-center items-center text-center p-6 md:p-12">
            <span className="text-xs md:text-sm font-mono text-primary tracking-widest uppercase mb-3">Scentelligence Elite</span>
            <h2 className="text-3xl md:text-5xl font-display italic text-ivory mb-4 tracking-tight max-w-2xl">
              Where Predictive AI Meets Haute Parfumerie
            </h2>
            <p className="text-mauve max-w-md text-sm md:text-base leading-relaxed">
              Stop guessing. Let data decode your next signature olfactory signature with millimeter precision.
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 🎬 1. बीच का IMAGE SECTION (रेड फोटो - सिल्क फैब्रिक वाली) */}
      {/* ========================================================= */}
      <div className="my-16 max-w-6xl mx-auto px-6">
        <div className="relative h-[350px] md:h-[450px] rounded-3xl overflow-hidden border border-white/10 group">
          <img 
            src="https://img.freepik.com/premium-photo/luxurious-elegance-perfume-red-fabric_1003686-18895.jpg?w=1060" 
            alt="Luxurious Elegance Perfume Red Fabric" 
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex flex-col justify-end p-8 md:p-12">
            <span className="text-xs font-mono text-primary tracking-widest uppercase mb-2">The Art of Sillage</span>
            <h4 className="text-2xl md:text-4xl font-display italic text-ivory mb-3 max-w-lg">Molecular Elegance</h4>
            <p className="text-sm md:text-base text-mauve max-w-md leading-relaxed">
              Every blend is designed to flow seamlessly like liquid silk, creating an unforgettable sensory cloud around you.
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 🎬 2. सबसे नीचे का IMAGE SECTION (रेड फोटो - डार्क बैकग्राउंड वाली) */}
      {/* ========================================================= */}
      <div className="w-full max-w-6xl mx-auto px-6 mb-24">
        <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden border border-white/10 group">
          <img 
            src="https://img.freepik.com/premium-photo/luxurious-perfume-bottle-with-red-accents-dark-background_7023-373470.jpg" 
            alt="Luxurious Perfume Bottle Red Accents" 
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex flex-col justify-center items-center text-center p-6 md:p-12">
            <span className="text-xs md:text-sm font-mono text-primary tracking-widest uppercase mb-3">Scentelligence Elite</span>
            <h2 className="text-3xl md:text-5xl font-display italic text-ivory mb-4 tracking-tight max-w-2xl">
              Where Predictive AI Meets Haute Parfumerie
            </h2>
            <p className="text-mauve max-w-md text-sm md:text-base leading-relaxed">
              Stop guessing. Let data decode your next signature olfactory signature with millimeter precision.
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 🎬 1. बीच का IMAGE SECTION (रेड फोटो - सिल्क फैब्रिक वाली) */}
      {/* ========================================================= */}
      <div className="my-16 max-w-6xl mx-auto px-6">
        <div className="relative h-[350px] md:h-[450px] rounded-3xl overflow-hidden border border-white/10 group">
          <img 
            src="https://img.freepik.com/premium-photo/luxurious-elegance-perfume-red-fabric_1003686-18895.jpg?w=1060" 
            alt="Luxurious Elegance Perfume Red Fabric" 
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex flex-col justify-end p-8 md:p-12">
            <span className="text-xs font-mono text-primary tracking-widest uppercase mb-2">The Art of Sillage</span>
            <h4 className="text-2xl md:text-4xl font-display italic text-ivory mb-3 max-w-lg">Molecular Elegance</h4>
            <p className="text-sm md:text-base text-mauve max-w-md leading-relaxed">
              Every blend is designed to flow seamlessly like liquid silk, creating an unforgettable sensory cloud around you.
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 🎬 2. सबसे नीचे का IMAGE SECTION (रेड फोटो - डार्क बैकग्राउंड वाली) */}
      {/* ========================================================= */}
      <div className="w-full max-w-6xl mx-auto px-6 mb-24">
        <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden border border-white/10 group">
          <img 
            src="https://img.freepik.com/premium-photo/luxurious-perfume-bottle-with-red-accents-dark-background_7023-373470.jpg" 
            alt="Luxurious Perfume Bottle Red Accents" 
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex flex-col justify-center items-center text-center p-6 md:p-12">
            <span className="text-xs md:text-sm font-mono text-primary tracking-widest uppercase mb-3">Scentelligence Elite</span>
            <h2 className="text-3xl md:text-5xl font-display italic text-ivory mb-4 tracking-tight max-w-2xl">
              Where Predictive AI Meets Haute Parfumerie
            </h2>
            <p className="text-mauve max-w-md text-sm md:text-base leading-relaxed">
              Stop guessing. Let data decode your next signature olfactory signature with millimeter precision.
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 🎬 1. बीच का इमेज सेक्शन (पहली रेड फोटो - सिल्क फैब्रिक वाली) */}
      {/* ========================================================= */}
      <div className="my-16 max-w-6xl mx-auto px-6">
        <div className="relative h-[350px] md:h-[450px] rounded-3xl overflow-hidden border border-white/10 group">
          <img 
            src="https://img.freepik.com/premium-photo/luxurious-elegance-perfume-red-fabric_1003686-18895.jpg?w=1060" 
            alt="Luxurious Elegance Perfume Red Fabric" 
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex flex-col justify-end p-8 md:p-12">
            <span className="text-xs font-mono text-primary tracking-widest uppercase mb-2">The Art of Sillage</span>
            <h4 className="text-2xl md:text-4xl font-display italic text-ivory mb-3 max-w-lg">Molecular Elegance</h4>
            <p className="text-sm md:text-base text-mauve max-w-md leading-relaxed">
              Every blend is designed to flow seamlessly like liquid silk, creating an unforgettable sensory cloud around you.
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 🎬 2. सबसे नीचे का इमेज सेक्शन (दूसरी रेड फोटो - डार्क बैकग्राउंड वाली) */}
      {/* ========================================================= */}
      <div className="w-full max-w-6xl mx-auto px-6 mb-24">
        <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden border border-white/10 group">
          <img 
            src="https://img.freepik.com/premium-photo/luxurious-perfume-bottle-with-red-accents-dark-background_7023-373470.jpg" 
            alt="Luxurious Perfume Bottle Red Accents" 
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex flex-col justify-center items-center text-center p-6 md:p-12">
            <span className="text-xs md:text-sm font-mono text-primary tracking-widest uppercase mb-3">Scentelligence Elite</span>
            <h2 className="text-3xl md:text-5xl font-display italic text-ivory mb-4 tracking-tight max-w-2xl">
              Where Predictive AI Meets Haute Parfumerie
            </h2>
            <p className="text-mauve max-w-md text-sm md:text-base leading-relaxed">
              Stop guessing. Let data decode your next signature olfactory signature with millimeter precision.
            </p>
          </div>
        </div>
      </div>

      {/* ============ TESTIMONIALS ============ */}
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <div key={t.name} className="card p-6">
              <Quote className="text-primary/50" size={22} />
              <p className="text-ivory/90 text-sm mt-4 leading-relaxed">{t.quote}</p>
              <p className="text-mauve text-xs mt-4">— {t.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ ARCHITECTURE / TRUST BAND ============ */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="card p-8 md:p-10 grid md:grid-cols-3 gap-8">
          <div>
            <span className="eyebrow">Architecture</span>
            <h3 className="font-display italic text-2xl mt-2 text-ivory">Built to plug into a real stack</h3>
          </div>
          <div className="md:col-span-2 grid sm:grid-cols-2 gap-6 text-sm">
            <div>
              <p className="text-primary font-medium">Frontend</p>
              <p className="text-mauve mt-1">React + Tailwind (this app)</p>
            </div>
            <div>
              <p className="text-primary font-medium">Backend</p>
              <p className="text-mauve mt-1">FastAPI</p>
            </div>
            <div>
              <p className="text-primary font-medium">AI layer</p>
              <p className="text-mauve mt-1">OpenAI-powered recommendation, chatbot, sentiment &amp; content generation</p>
            </div>
            <div>
              <p className="text-primary font-medium">Database &amp; integrations</p>
              <p className="text-mauve mt-1">PostgreSQL · Shopify · WooCommerce · payment gateways · CRM</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="mx-auto max-w-5xl px-6 pb-28 text-center">
        <h2 className="font-display italic text-3xl md:text-5xl text-ivory">
          Your next scent decision,<br /><span className="shimmer-text not-italic font-semibold">considered.</span>
        </h2>
        <NavLink to="/recommendation" className="btn-gold inline-block mt-8">
          Start with the recommendation engine
        </NavLink>
      </section>
    </div>
  )
}