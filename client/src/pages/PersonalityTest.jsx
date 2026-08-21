import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RotateCcw, Check, HelpCircle, Quote } from 'lucide-react';

const QUESTIONS = [
  { id: 1, q: "Choose your ideal weekend escape:", options: [{ text: "A secluded log cabin in a misty forest", score: "woody" }, { text: "A sun-drenched Mediterranean beach villa", score: "citrus" }, { text: "An elegant Parisian botanical glasshouse", score: "floral" }, { text: "A vibrant, spice-scented Moroccan souk", score: "oriental" }] },
  { id: 2, q: "What is your fabric or attire of choice?", options: [{ text: "Heavy bespoke tweed or raw denim", score: "woody" }, { text: "Crisp white linen or breathable cotton", score: "citrus" }, { text: "Flowing silk or delicate embroidered lace", score: "floral" }, { text: "Rich dark velvet or textured premium suede", score: "oriental" }] },
  { id: 3, q: "Select an architectural ambiance that moves you:", options: [{ text: "Raw Brutalism with exposed timber and concrete", score: "woody" }, { text: "Minimalist floor-to-ceiling glass overlooking oceans", score: "citrus" }, { text: "Classic Renaissance opulence with gold mouldings", score: "floral" }, { text: "Dimly lit Art Deco lounges with brass accents", score: "oriental" }] },
  { id: 4, q: "Your choice of beverage to stimulate the mind:", options: [{ text: "Smoky single-malt whiskey or black coffee", score: "woody" }, { text: "Iced matcha latte or cold-pressed citrus water", score: "citrus" }, { text: "Fine Jasmine white tea or Champagne", score: "floral" }, { text: "Spiced chai or an exotic dark rum cocktail", score: "oriental" }] },
  { id: 5, q: "How do you prefer to make an entrance?", options: [{ text: "Subtle, enigmatic, noticed only by those close", score: "woody" }, { text: "Radiant, fresh, giving off an effortless charm", score: "citrus" }, { text: "Graceful, romantic, leaving an artistic trail", score: "floral" }, { text: "Bold, commanding, unforgettable and deep", score: "oriental" }] },
  { id: 6, q: "Which time of day mirrors your internal clock?", options: [{ text: "A foggy, quiet dawn in the mountains", score: "woody" }, { text: "High noon with bright, blinding sunlight", score: "citrus" }, { text: "Golden hour just as the sun dips low", score: "floral" }, { text: "Midnight under a starless, quiet sky", score: "oriental" }] },
  { id: 7, q: "What art form resonates with your soul?", options: [{ text: "Abstract wooden sculptures and architecture", score: "woody" }, { text: "Vibrant, high-contrast modern photography", score: "citrus" }, { text: "Classic poetry and impressionist oil paintings", score: "floral" }, { text: "Complex psychological cinema and jazz rhythms", score: "oriental" }] },
  { id: 8, q: "Pick a natural element you feel closest to:", options: [{ text: "Ancient earth, mossy roots, and towering trees", score: "woody" }, { text: "Crashing sea waves and refreshing thunderstorms", score: "citrus" }, { text: "Blooming cherry blossoms and midnight rain", score: "floral" }, { text: "Burning incense, warm sand, and open campfires", score: "oriental" }] },
  { id: 9, q: "What is your primary state of mind?", options: [{ text: "Grounded, analytical, and fiercely independent", score: "woody" }, { text: "Optimistic, high-energy, and adventurous", score: "citrus" }, { text: "Empathetic, expressive, and deeply romantic", score: "floral" }, { text: "Ambitious, complex, and intensely passionate", score: "oriental" }] },
  { id: 10, q: "Your ultimate comfort sensory experience is:", options: [{ text: "The smell of old antique books and rain", score: "woody" }, { text: "Biting into a sharp, fresh, cold fruit", score: "citrus" }, { text: "Walking through a fresh dew-covered garden", score: "floral" }, { text: "The warm, wrapping embrace of sweet vanilla and amber", score: "oriental" }] }
];

const SCENT_PROFILES = {
  woody: { 
    title: "The Avant-Garde Woodsman", 
    notes: "Cedarwood, Vetiver, Sandalwood, and Oakmoss", 
    desc: "Your personality is deeply grounded, intellectual, and secure. You don't scream for attention; your presence is a silent, commanding force.", 
    perfume: "Bleu de Chanel, Terre d'Hermès, or Tom Ford Oud Wood",
    whySuggested: "Since you chose misty forests, earth elements, raw fabrics like tweed, and deep single-malt vibes, your subconscious craves stability, history, and structure. These perfumes share the exact earthy and wooden molecule structure that mimics your calm, independent, and secure mental sanctuary.",
    quote: "“Scent is the wrapper of the soul. Wood doesn't shout; it endures. Wear it as your invisible armor.”"
  },
  citrus: { 
    title: "The Coastal Visionary", 
    notes: "Bergamot, Sicilian Lemon, Neroli, and Sea Salt", 
    desc: "You radiate boundless vitality, clarity, and an adventurous spirit. Your aura is clean, electric, and completely refreshing to everyone you meet.", 
    perfume: "Acqua di Giò, Creed Aventus, or Dior Sauvage EDT",
    whySuggested: "Your preference for bright sunlight, linen clothes, crisp fruits, and crashing sea waves shows that your energy is fluid, free, and dynamic. We suggested these scents because their top notes are rich in molecules that trigger freshness and positivity, perfectly matching your active and infectious charm.",
    quote: "“Like a burst of morning sun on a vast ocean, your presence brings the dead back to life. Stay electric.”"
  },
  floral: { 
    title: "The Romantic Connoisseur", 
    notes: "Damask Rose, Iris, Jasmine, and White Musk", 
    desc: "You are an artistic, eloquent soul driven by beauty, emotion, and deep connections. Your presence leaves an elegant, unforgettable poetic trail.", 
    perfume: "Dior Homme Intense, Maison Francis Kurkdjian Baccarat Rouge 540",
    whySuggested: "By selecting classic poetry, blooming gardens, flowing silks, and jasmine tea, your answers reveal a highly creative and empathetic spirit. These premium fragrances carry complex floral hearts that slowly release over time, mimicking the deep layers of your expressive and beautiful mind.",
    quote: "“Politeness is the flower of humanity, and your fragrance is its poetry. Let the world breathe your art.”"
  },
  oriental: { 
    title: "The Nocturnal Enigma", 
    notes: "Warm Amber, Vanilla, Saffron, and Dark Oud", 
    desc: "Mysterious, charismatic, and intensely sophisticated. You thrive in the shadows of the evening, projecting a seductive warmth that draws people in.", 
    perfume: "Tom Ford Noir Extreme, Yves Saint Laurent La Nuit de L'Homme, or Kilian Angels' Share",
    whySuggested: "Your alignment with velvet clothing, dim Art Deco lights, burning incense, and midnight skies reveals that you love depth, mystery, and luxury. These fragrances contain exotic resins, spices, and warm vanilla that anchor on the skin longer than any other family, mirroring your unforgettable, magnetic charisma.",
    quote: "“The moon does not beg for attention; it simply shines in the dark. Your fragrance is your unspoken mystery.”"
  }
};

export default function PersonalityTest() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [scores, setScores] = useState({ woody: 0, citrus: 0, floral: 0, oriental: 0 });
  const [showResult, setShowResult] = useState(false);
  const [selectedInCurrent, setSelectedInCurrent] = useState(null);

  const handleOptionClick = (scoreType, idx) => {
    setSelectedInCurrent(idx);
    setScores(prev => ({ ...prev, [scoreType]: prev[scoreType] + 1 }));
    
    setTimeout(() => {
      if (currentIdx < QUESTIONS.length - 1) {
        setCurrentIdx(prev => prev + 1);
        setSelectedInCurrent(null);
      } else {
        setShowResult(true);
      }
    }, 400);
  };

  const getDominantProfile = () => {
    return Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
  };

  const resetTest = () => {
    setCurrentIdx(0);
    setScores({ woody: 0, citrus: 0, floral: 0, oriental: 0 });
    setShowResult(false);
    setSelectedInCurrent(null);
  };

  const currentQuestion = QUESTIONS[currentIdx];
  const dominantKey = showResult ? getDominantProfile() : null;
  const result = showResult ? SCENT_PROFILES[dominantKey] : null;

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 relative">
      <div className="w-full max-w-2xl bg-[#12100F]/40 backdrop-blur-md border border-white/5 p-8 sm:p-10 shadow-2xl relative z-10">
        
        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div key="quiz" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
              {/* प्रोग्रेस बार */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[10px] tracking-[0.2em] uppercase text-orange-500/60 font-semibold">
                  <span>Olfactory Profiler</span>
                  <span>Question {currentQuestion.id} / {QUESTIONS.length}</span>
                </div>
                <div className="h-[2px] w-full bg-white/5 overflow-hidden">
                  <motion.div className="h-full bg-orange-500" initial={{ width: "0%" }} animate={{ width: `${(currentQuestion.id / QUESTIONS.length) * 100}%` }} transition={{ duration: 0.3 }} />
                </div>
              </div>

              {/* सवाल */}
              <h3 className="font-serif text-lg sm:text-xl tracking-wide font-normal leading-relaxed">
                {currentQuestion.q}
              </h3>

              {/* ऑप्शंस */}
              <div className="grid grid-cols-1 gap-4">
                {currentQuestion.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleOptionClick(opt.score, idx)}
                    className={`w-full text-left p-4 text-xs sm:text-sm tracking-wide font-light transition-all duration-300 border flex items-center justify-between ${
                      selectedInCurrent === idx
                        ? 'bg-orange-500/10 border-orange-500'
                        : 'bg-[#161413] border-white/[0.05] hover:border-orange-500/30 hover:bg-[#1c1918]'
                    }`}
                  >
                    <span className="button-text-sync">{opt.text}</span>
                    {selectedInCurrent === idx && <Check className="w-4 h-4 text-orange-500 shrink-0 ml-2" />}
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div key="result" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", stiffness: 100 }} className="text-center space-y-8 py-4">
              <div className="inline-flex p-3 bg-orange-500/5 border border-orange-500/20 rounded-full animate-pulse">
                <Sparkles className="w-6 h-6 text-orange-500" />
              </div>
              
              <div className="space-y-2">
                <span className="text-[9px] tracking-[0.3em] uppercase text-orange-500 font-semibold block">Your Scent Identity Archetype</span>
                <h2 className="font-serif text-2xl sm:text-3xl tracking-wide">{result.title}</h2>
              </div>

              {/* मुख्य प्रोफाइल डिस्क्रिप्शन */}
              <div className="bg-[#161413] border border-white/[0.05] p-6 text-left space-y-4 max-w-xl mx-auto shadow-inner">
                <p className="text-xs sm:text-sm font-light leading-relaxed tracking-wide opacity-90">
                  {result.desc}
                </p>
                
                {/* ✦ नया सेक्शन: ट्रैकिंग एनालिसिस (Why Suggested) */}
                <div className="border-t border-white/5 pt-4 space-y-2">
                  <div className="flex items-center space-x-1.5 text-orange-500">
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span className="text-[9px] tracking-[0.2em] uppercase font-semibold">Psychographic Scent Analysis:</span>
                  </div>
                  <p className="text-xs font-light leading-relaxed tracking-wide opacity-80 text-justify">
                    {result.whySuggested}
                  </p>
                </div>

                <div className="border-t border-white/5 pt-3">
                  <span className="text-[8px] tracking-[0.2em] uppercase text-orange-500/60 font-medium block mb-1">Signature Accord Matrix:</span>
                  <p className="text-xs font-normal text-orange-400 tracking-wide">{result.notes}</p>
                </div>
              </div>

              {/* रिकमेंडेड परफ्यूम्स */}
              <div className="space-y-1">
                <span className="text-[9px] tracking-[0.2em] uppercase opacity-50 block">Recommended Haute Masterpieces</span>
                <p className="text-sm font-serif italic text-orange-400">{result.perfume}</p>
              </div>

              {/* ✦ नया सेक्शन: ब्यूटीफुल हैप्पीनेस कोट */}
              <div className="max-w-md mx-auto pt-2 pb-4 px-4 border-l-2 border-orange-500/30 italic font-serif text-xs opacity-90 flex items-start space-x-2 text-left">
                <Quote className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <span>{result.quote}</span>
              </div>

              <button
                onClick={resetTest}
                className="inline-flex items-center space-x-2 border border-orange-500/30 px-6 py-3 text-xs tracking-[0.2em] uppercase text-orange-400 hover:bg-orange-500 hover:text-white transition-all duration-300"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Profile Analysis</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}