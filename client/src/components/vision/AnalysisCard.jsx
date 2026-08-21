import React from 'react';
import { motion } from 'framer-motion';
import { Shirt, Palette, ShieldAlert, Sparkles, Compass, Eye } from 'lucide-react';

export default function AnalysisCard({ data }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#12100F]/60 backdrop-blur-md border border-white/5 p-6 space-y-6 shadow-xl"
    >
      <div className="flex items-center space-x-2 border-b border-white/5 pb-4">
        <Eye className="w-4 h-4 text-orange-500" />
        <h3 className="font-serif text-base tracking-wide uppercase text-white">Visual Style Profile</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-light tracking-wide">
        <div className="space-y-1 bg-white/[0.02] border border-white/5 p-4 rounded">
          <span className="text-[9px] uppercase tracking-widest text-orange-500/80 font-medium block flex items-center gap-1">
            <Shirt className="w-3 h-3" /> Apparel Architecture
          </span>
          <p className="text-sm font-normal text-[#FAF6F0]">{data.clothingStyle}</p>
        </div>

        <div className="space-y-1 bg-white/[0.02] border border-white/5 p-4 rounded">
          <span className="text-[9px] uppercase tracking-widest text-orange-500/80 font-medium block flex items-center gap-1">
            <Palette className="w-3 h-3" /> Visual Chromatics
          </span>
          <p className="text-sm font-normal text-[#FAF6F0]">{data.dominantColors}</p>
        </div>

        <div className="space-y-1 bg-white/[0.02] border border-white/5 p-4 rounded">
          <span className="text-[9px] uppercase tracking-widest text-orange-500/80 font-medium block flex items-center gap-1">
            <Compass className="w-3 h-3" /> Ambient Setting
          </span>
          <p className="text-sm font-normal text-[#FAF6F0]">{data.setting} • {data.dayEvening}</p>
        </div>

        <div className="space-y-1 bg-white/[0.02] border border-white/5 p-4 rounded">
          <span className="text-[9px] uppercase tracking-widest text-orange-500/80 font-medium block flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Aesthetic Mood
          </span>
          <p className="text-sm font-normal text-[#FAF6F0]">{data.fashionAesthetic} ({data.visualMood})</p>
        </div>
      </div>

      <div className="bg-orange-500/5 border border-orange-500/10 p-4 rounded flex justify-between items-center">
        <div>
          <span className="text-[9px] uppercase tracking-widest text-orange-400 font-semibold block">Inferred Context</span>
          <p className="text-xs font-serif text-[#FAF6F0] mt-0.5">{data.inferredOccasion.name}</p>
        </div>
        <div className="text-right">
          <span className="text-[9px] uppercase tracking-widest text-white/40 block">Confidence</span>
          <span className="text-sm font-serif text-orange-500">{data.inferredOccasion.confidenceScore}%</span>
        </div>
      </div>

      <div className="text-[10px] text-white/40 border-t border-white/5 pt-4 flex items-start space-x-2">
        <ShieldAlert className="w-3.5 h-3.5 text-orange-500/40 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          *Privacy Compliance: This model does not evaluate facial biometrics or identity structures. Content logic is derived completely from style layout arrays.
        </p>
      </div>
    </motion.div>
  );
}