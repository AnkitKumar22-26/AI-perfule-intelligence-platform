import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Zap, Shield, Flame } from 'lucide-react';

export default function RecommendationCard({ recommendations }) {
  return (
    <div className="space-y-6">
      <div className="text-left space-y-1 border-b border-white/5 pb-2">
        <span className="text-[10px] tracking-[0.3em] uppercase text-orange-500 font-semibold block">Olfactory Pairings</span>
        <h3 className="font-serif text-xl tracking-wide">Curated Haute Fragrances</h3>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {recommendations.map((perfume, index) => (
          <motion.div
            key={perfume.id}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.15 }}
            className="bg-[#12100F]/40 border border-white/5 p-6 hover:border-orange-500/20 transition-all shadow-lg relative group"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-[9px] tracking-widest text-orange-400 uppercase font-medium block">{perfume.fragranceFamily}</span>
                <h4 className="font-serif text-lg text-white group-hover:text-orange-500 transition-colors mt-0.5">{perfume.name}</h4>
              </div>
              <div className="bg-orange-500/10 border border-orange-500/20 px-2.5 py-1 text-[10px] font-serif text-orange-400 rounded">
                {perfume.confidenceScore}% Match
              </div>
            </div>

            <p className="text-xs font-light opacity-90 leading-relaxed bg-white/[0.01] p-3.5 border border-white/5 rounded italic text-[#FAF6F0]">
              {perfume.matchReason}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5 text-[11px] font-light tracking-wide border-t border-white/5 pt-4">
              <div className="space-y-1">
                <span className="text-[8px] uppercase tracking-widest text-white/40 block flex items-center gap-1"><Flame className="w-2.5 h-2.5" /> Notes</span>
                <p className="font-normal opacity-85 truncate" title={perfume.notes}>{perfume.notes}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[8px] uppercase tracking-widest text-white/40 block flex items-center gap-1"><Calendar className="w-2.5 h-2.5" /> Season</span>
                <p className="font-normal opacity-85">{perfume.bestSeason}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[8px] uppercase tracking-widest text-white/40 block flex items-center gap-1"><Zap className="w-2.5 h-2.5" /> Longevity</span>
                <p className="font-normal opacity-85">{perfume.longevity}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[8px] uppercase tracking-widest text-white/40 block flex items-center gap-1"><Shield className="w-2.5 h-2.5" /> Projection</span>
                <p className="font-normal opacity-85">{perfume.projection}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}