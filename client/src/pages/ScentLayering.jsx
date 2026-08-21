import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Sparkles, AlertTriangle, RotateCcw } from 'lucide-react';

const COCKTAIL_DATABASE = {
  "woody+citrus": {
    result: "The Vibrant Forest Gold (सिट्रस वुड)",
    vibe: "Fresh yet deeply mysterious and alpha.",
    explanation: "जब आप वूडी (जैसे चंदन/सिडारवुड) के भारीपन को सिट्रस (नींबू/बर्गमॉट) की ताजगी के साथ मिलाते हैं, तो सिट्रस के हल्के मॉलिक्यूल्स हवा में तुरंत तैरते हैं जबकि वूडी नोट्स उसे स्किन पर टिकाए रखते हैं। यह एक बहुत ही क्रिस्प, स्पोर्टी और अमीर वाइब देता है।",
    rating: "⭐⭐⭐⭐⭐ (5/5) - Perfect Masterpiece"
  },
  "woody+floral": {
    result: "The Royal Cashmere Bloom (मखमली फूल और लकड़ी)",
    vibe: "Poetic, sensual, and extremely high-end.",
    explanation: "फूलों (जैसे रोज़/जैस्मीन) की मिठास जब गहरे सिडारवुड या ऊद के साथ मिलती है, तो यह खुशबू की कड़वाहट और मिठास को पूरी तरह बैलेंस कर देती है। यह कॉम्बिनेशन बहुत ही सिडक्टिव और रोमान्टिक शामों के लिए बेस्ट है।",
    rating: "⭐⭐⭐⭐⭐ (4.8/5) - Highly Recommended"
  },
  "woody+oriental": {
    result: "The Midnight Oud Incense (रहस्यमयी अरेबियन नाइट)",
    vibe: "Super dark, intense, smoky, and commanding.",
    explanation: "चेतावनी! यह कॉम्बिनेशन बहुत हैवी है। अंबर और वैनिला (Oriental) जब लकड़ी (Woody) के साथ मिलते हैं, तो यह एक बेहद रईस, गाढ़ी और नशीली खुशबू बनाते हैं। इसे सिर्फ सर्दियों में या रॉयल शादियों में ही स्प्रे करें।",
    rating: "⭐⭐⭐⭐ (4.2/5) - Use with Caution (Very Heavy)"
  },
  "citrus+floral": {
    result: "The Mediterranean Breeze (ताज़ा बागान)",
    vibe: "Energetic, youthful, clean, and bright.",
    explanation: "यह कॉम्बिनेशन बिल्कुल एक ताज़ा खिले हुए फूलों के बगीचे जैसा है जिसके बगल से ठंडी समुद्री हवा चल रही हो। गर्मियों के दिनों और कैज़ुअल मीटिंग्स के लिए यह आपको तुरंत 10x फ्रेश फील कराएगा।",
    rating: "⭐⭐⭐⭐⭐ (4.7/5) - Summer Essential"
  },
  "citrus+oriental": {
    result: "The Exotic Amber Zing (मसालेदार संतरा)",
    vibe: "Edgy, unique, and experimental.",
    explanation: "ओरिएंटल के भारी मसाले (जैसे दालचीनी/केसर) जब ताज़ा नींबू के साथ टकराते हैं, तो एक बहुत ही अनोखा खट्टा-मीठा ब्लास्ट होता है। यह हर किसी को पसंद नहीं आता, लेकिन जो लगाते हैं वो भीड़ में सबसे अलग चमकते हैं।",
    rating: "⭐⭐⭐ (3.8/5) - Experimental Bold Choice"
  },
  "floral+oriental": {
    result: "The Golden Velvet Potion (शाही मखमली इत्र)",
    vibe: "Hypnotic, sweet, and incredibly rich.",
    explanation: "जैस्मीन या ट्यूबरोज़ की मादक खुशबू जब वैनिला और अंबर के गर्म बेस के साथ बैठती है, तो एक बहुत ही प्रीमियम और मखमली एलीट वाइब देती है। यह खुशबू आपके कपड़ों से हफ्तों तक नहीं जाएगी।",
    rating: "⭐⭐⭐⭐⭐ (4.9/5) - Masterpiece Layering"
  }
};

export default function ScentLayering() {
  const [scentA, setScentA] = useState('');
  const [scentB, setScentB] = useState('');
  const [cocktailResult, setCocktailResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleMix = () => {
    if (!scentA || !scentB) return;
    setLoading(true);
    
    setTimeout(() => {
      if (scentA === scentB) {
        setCocktailResult({
          result: `Double ${scentA.toUpperCase()} Power`,
          vibe: "No change, just stronger!",
          explanation: "भाई, दो एक जैसी खुशबू मिलाने से कोई नया कॉकटेल नहीं बनता, बस उसी खुशबू की ताकत और प्रोजेक्शन डबल हो जाती है। कुछ नया ट्राई करने के लिए दो अलग फैमिली चुनिए!",
          rating: "⭐⭐ (2/5) - Waste of Layering"
        });
      } else {
        const key1 = `${scentA}+${scentB}`;
        const key2 = `${scentB}+${scentA}`;
        const finalData = COCKTAIL_DATABASE[key1] || COCKTAIL_DATABASE[key2];
        setCocktailResult(finalData);
      }
      setLoading(false);
    }, 1200); // लक्ज़री एआई प्रोसेसिंग इफ़ेक्ट के लिए टाइमर
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl bg-[#12100F]/40 backdrop-blur-md border border-white/5 p-8 sm:p-10 shadow-2xl relative">
        
        <div className="text-center space-y-2 mb-8">
          <div className="inline-flex p-2.5 bg-orange-500/5 border border-orange-500/20 rounded-full text-orange-500">
            <Layers className="w-5 h-5 animate-spin-slow" />
          </div>
          <h2 className="font-serif text-2xl tracking-wide">AI Scent Layering Engine</h2>
          <p className="text-xs font-light opacity-60 tracking-wider">Mix two perfume profiles to preview your bespoke custom blend</p>
        </div>

        <AnimatePresence mode="wait">
          {!cocktailResult ? (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
              
              {/* पहला सेंट सिलेक्शन */}
              <div className="space-y-2">
                <label className="text-[10px] tracking-widest uppercase text-orange-500 font-semibold block">Select Base Perfume Profile (Scent A)</label>
                <select 
                  value={scentA} 
                  onChange={(e) => setScentA(e.target.value)}
                  className="w-full bg-[#161413] border border-white/5 p-3 text-sm focus:border-orange-500 outline-none transition-all rounded"
                >
                  <option value="">-- Choose First Profile --</option>
                  <option value="woody">🪵 Woody (Cedar, Sandalwood, Oud)</option>
                  <option value="citrus">🍊 Citrus (Lemon, Bergamot, Fresh)</option>
                  <option value="floral">🌹 Floral (Rose, Jasmine, Iris)</option>
                  <option value="oriental">✨ Oriental (Amber, Vanilla, Spices)</option>
                </select>
              </div>

              {/* दूसरा सेंट सिलेक्शन */}
              <div className="space-y-2">
                <label className="text-[10px] tracking-widest uppercase text-orange-500 font-semibold block">Select Layering Perfume Profile (Scent B)</label>
                <select 
                  value={scentB} 
                  onChange={(e) => setScentB(e.target.value)}
                  className="w-full bg-[#161413] border border-white/5 p-3 text-sm focus:border-orange-500 outline-none transition-all rounded"
                >
                  <option value="">-- Choose Second Profile --</option>
                  <option value="woody">🪵 Woody (Cedar, Sandalwood, Oud)</option>
                  <option value="citrus">🍊 Citrus (Lemon, Bergamot, Fresh)</option>
                  <option value="floral">🌹 Floral (Rose, Jasmine, Iris)</option>
                  <option value="oriental">✨ Oriental (Amber, Vanilla, Spices)</option>
                </select>
              </div>

              {/* मिक्स बटन */}
              <button
                disabled={!scentA || !scentB || loading}
                onClick={handleMix}
                className="w-full bg-orange-500 text-white font-serif tracking-widest uppercase py-3.5 px-4 text-xs hover:bg-orange-600 disabled:opacity-30 disabled:hover:bg-orange-500 transition-all flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <span className="animate-pulse">Analyzing Olfactory Chemistry...</span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Blend Scent Cocktail</span>
                  </>
                )}
              </button>

            </motion.div>
          ) : (
            /* एआई रिजल्ट स्क्रीन */
            <motion.div key="result" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6 text-center py-2">
              <div className="space-y-1">
                <span className="text-[9px] tracking-[0.3em] uppercase text-orange-500 font-semibold block">Bespoke Cocktail Alchemy</span>
                <h3 className="font-serif text-xl text-[#FAF6F0]">{cocktailResult.result}</h3>
              </div>

              <div className="bg-[#161413] border border-white/[0.05] p-5 text-left space-y-3 rounded shadow-inner">
                <div>
                  <span className="text-[8px] tracking-[0.2em] uppercase text-orange-500/60 font-semibold block">The Aura & Vibe:</span>
                  <p className="text-xs font-normal tracking-wide italic text-orange-400">"{cocktailResult.vibe}"</p>
                </div>
                
                <div className="border-t border-white/5 pt-3">
                  <span className="text-[8px] tracking-[0.2em] uppercase text-orange-500/60 font-semibold block mb-1">Molecular Explanation:</span>
                  <p className="text-xs font-light leading-relaxed tracking-wide opacity-80 text-justify">
                    {cocktailResult.explanation}
                  </p>
                </div>

                <div className="border-t border-white/5 pt-2.5 flex justify-between items-center text-[10px]">
                  <span className="tracking-[0.2em] uppercase text-white/40">AI Compatibility Rating:</span>
                  <span className="font-medium text-orange-400">{cocktailResult.rating}</span>
                </div>
              </div>

              {/* सेफ्टी वार्निंग नोट */}
              <div className="text-[10px] text-orange-500/70 bg-orange-500/5 p-3 border border-orange-500/10 flex items-center space-x-2 text-left rounded">
                <AlertTriangle className="w-4 h-4 text-orange-500 shrink-0" />
                <span>Pro Tip: heavy सेंट को पहले स्प्रे करें और लाइट सिट्रस सेंट को उसके ऊपर स्प्रे करें ताकि बेहतरीन ब्लास्ट मिले।</span>
              </div>

              <button
                onClick={() => setCocktailResult(null)}
                className="inline-flex items-center space-x-2 border border-orange-500/30 px-5 py-2.5 text-xs tracking-[0.2em] uppercase text-orange-400 hover:bg-orange-500 hover:text-white transition-all rounded"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Mix Another Formula</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}