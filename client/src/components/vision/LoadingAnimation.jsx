import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function LoadingAnimation() {
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-6">
      <div className="relative w-24 h-24">
        <motion.div 
          className="absolute inset-0 rounded-full border border-orange-500/20 bg-orange-500/5"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute inset-2 rounded-full border-t-2 border-b-2 border-orange-500"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
        />
        <div className="absolute inset-0 flex items-center justify-center text-orange-500">
          <Sparkles className="w-6 h-6 animate-pulse" />
        </div>
      </div>
      <div className="text-center space-y-2">
        <h4 className="font-serif text-sm tracking-[0.2em] uppercase text-orange-400">Quantum Style Evaluation</h4>
        <p className="text-xs font-light opacity-50 max-w-xs mx-auto leading-relaxed">
          Analyzing fabric weights, color coordinates, ambient scene layers, and accessories...
        </p>
      </div>
    </div>
  );
}