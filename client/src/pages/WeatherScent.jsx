import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CloudSun, Brain, Sparkles, Thermometer, MapPin } from 'lucide-react';

const WEATHER_MOOD_ENGINE = {
  "sunny+corporate": {
    perfume: "Bleu de Chanel or Creed Aventus",
    reason: "तेज धूप और गर्मी में सिट्रस और एम्बर का ब्लास्ट आपको फ्रेश रखेगा, जबकि इसका कॉर्पोरेट बेस मीटिंग्स में आपका कॉन्फिडेंस 10x बढ़ा देगा।",
    notes: "Bergamot, Mint, Pineapple, Vetiver"
  },
  "sunny+romantic": {
    perfume: "Maison Francis Kurkdjian Baccarat Rouge 540",
    reason: "धूप वाले खिले मौसम में फूलों की मिठास और सैफरन का यह कॉम्बिनेशन हवा में बहुत दूर तक जाता है और पार्टनर को तुरंत अट्रैक्ट करता है।",
    notes: "Jasmine, Saffron, Amberwood"
  },
  "sunny+chill": {
    perfume: "Acqua di Giò Profondo",
    reason: "गर्म मौसम में रिलैक्स करने के लिए इससे बेस्ट कुछ नहीं। यह पानी की ठंडी फुहार और समुद्री नमक जैसी फ्रेशनेस देता है।",
    notes: "Marine Notes, Green Mandarin, Rosemary"
  },
  "rainy+corporate": {
    perfume: "Terre d'Hermès",
    reason: "बारिश के मौसम में हवा में नमी बढ़ जाती है। ऐसे में इस परफ्यूम के गीली मिट्टी, मिनरल्स और कड़क सिट्रस नोट्स वातावरण में छा जाते हैं।",
    notes: "Flint, Orange, Cedar, Oakmoss"
  },
  "rainy+romantic": {
    perfume: "Dior Homme Intense",
    reason: "बारिश की ठंडी बूंदों के बीच आइरिस और कोकोआ (चॉकलेट) की यह गर्माहट एक बेहद नशीली, मखमली और रोमांटिक वाइब तैयार करती है।",
    notes: "Iris, Ambrette, Lavender, Cacao"
  },
  "rainy+chill": {
    perfume: "Tom Ford Oud Wood",
    reason: "बारिश के सुहाने मौसम में घर पर आराम करते हुए ऊद और चंदन की यह रहस्यमयी खुशबू मन को बहुत शांत और रिलैक्स रखती है।",
    notes: "Oud, Rosewood, Sandalwood"
  }
};

export default function WeatherScent() {
  const [weather, setWeather] = useState('');
  const [mood, setMood] = useState('');
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = () => {
    if (!weather || !mood) return;
    setLoading(true);

    setTimeout(() => {
      // अगर यूजर 'snowy' चुनता है तो हम डिफ़ॉल्ट 'rainy' (कोल्ड) लॉजिक पर सिंक कर देंगे
      const weatherKey = weather === 'snowy' ? 'rainy' : weather;
      const key = `${weatherKey}+${mood}`;
      setRecommendation(WEATHER_MOOD_ENGINE[key] || WEATHER_MOOD_ENGINE["sunny+chill"]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl bg-[#12100F]/40 backdrop-blur-md border border-white/5 p-8 sm:p-10 shadow-2xl">
        
        <div className="text-center space-y-2 mb-8">
          <div className="inline-flex p-2.5 bg-orange-500/5 border border-orange-500/20 rounded-full text-orange-500">
            <CloudSun className="w-5 h-5" />
          </div>
          <h2 className="font-serif text-2xl tracking-wide">Mood & Weather Scent Engine</h2>
          <p className="text-xs font-light opacity-60 tracking-wider">Synchronize your current environment and mental state with haute perfumery</p>
        </div>

        {/* लाइव लोकेशन सिंक बैज */}
        <div className="flex items-center justify-center space-x-1.5 text-[10px] tracking-widest uppercase text-orange-500/80 bg-orange-500/5 border border-orange-500/10 py-1.5 px-3 rounded max-w-xs mx-auto mb-6">
          <MapPin className="w-3 h-3" />
          <span>Location Locked: Lucknow, IN</span>
        </div>

        <div className="space-y-6">
          {/* मौसम का चुनाव */}
          <div className="space-y-2">
            <label className="text-[10px] tracking-widest uppercase text-orange-500 font-semibold flex items-center gap-1">
              <Thermometer className="w-3 h-3" /> Select Outside Weather
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'sunny', label: '☀️ Sunny / Hot' },
                { id: 'rainy', label: '🌧️ Rainy / Humid' },
                { id: 'snowy', label: '❄️ Cold / Overcast' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => { setWeather(item.id); setRecommendation(null); }}
                  className={`p-3 text-xs tracking-wide border transition-all ${
                    weather === item.id ? 'bg-orange-500/10 border-orange-500' : 'bg-[#161413] border-white/5 hover:border-orange-500/20'
                  }`}
                >
                  <span className="button-text-sync">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* मूड का चुनाव */}
          <div className="space-y-2">
            <label className="text-[10px] tracking-widest uppercase text-orange-500 font-semibold flex items-center gap-1">
              <Brain className="w-3 h-3" /> Select Your Current Inner Mood
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'corporate', label: '💼 Boardroom Exec' },
                { id: 'romantic', label: '🌹 Intimate Date' },
                { id: 'chill', label: '🧘 Stress Buster' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => { setMood(item.id); setRecommendation(null); }}
                  className={`p-3 text-xs tracking-wide border transition-all ${
                    mood === item.id ? 'bg-orange-500/10 border-orange-500' : 'bg-[#161413] border-white/5 hover:border-orange-500/20'
                  }`}
                >
                  <span className="button-text-sync">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* एनालिसिस बटन */}
          <button
            disabled={!weather || !mood || loading}
            onClick={handleAnalyze}
            className="w-full bg-orange-500 text-white font-serif tracking-widest uppercase py-3.5 px-4 text-xs hover:bg-orange-600 disabled:opacity-30 transition-all flex items-center justify-center space-x-2"
          >
            {loading ? <span className="animate-pulse">Reading Micro-Climate & Vibes...</span> : <span>Calculate Environmental Scent</span>}
          </button>

          {/* रिजल्ट का एनीमेशन */}
          <AnimatePresence>
            {recommendation && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="border-t border-white/5 pt-6 space-y-4">
                <div className="text-center">
                  <span className="text-[8px] tracking-[0.3em] uppercase text-orange-500 font-semibold block">Your Environmental Masterpiece</span>
                  <h4 className="font-serif text-lg text-orange-400 mt-1">{recommendation.perfume}</h4>
                </div>

                <div className="bg-[#161413] border border-white/[0.05] p-5 space-y-3 rounded">
                  <div>
                    <span className="text-[8px] tracking-[0.2em] uppercase text-white/40 font-semibold block">Why this fits this exact hour:</span>
                    <p className="text-xs font-light leading-relaxed tracking-wide opacity-90 text-justify mt-1">{recommendation.reason}</p>
                  </div>
                  <div className="border-t border-white/5 pt-3">
                    <span className="text-[8px] tracking-[0.2em] uppercase text-orange-500/60 font-semibold block">Scent Molecule Layer:</span>
                    <p className="text-xs font-normal tracking-wide opacity-80 mt-0.5">{recommendation.notes}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}