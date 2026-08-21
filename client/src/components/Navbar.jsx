import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react'; // आपके थीम टॉगल आइकॉन के लिए

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { to: '/recommendation', label: 'Recommendation' },
    { to: '/chatbot', label: 'Consultant' },
    { to: '/scent-profiler', label: 'Scent Profiler' }, // ✅ ठीक कर दिया
    { to: '/scent-layering', label: 'Scent Layering' }, // ✅ ठीक कर दिया
    { to: '/mood-weather', label: 'Mood & Weather' },   // ✅ ठीक कर दिया
    { to: '/vision-stylist', label: 'Vision Stylist' }, // यह पहले से सही था
    { to: '/sentiment', label: 'Sentiment' },
    { to: '/marketing', label: 'Marketing Studio' },
    { to: '/analytics', label: 'Analytics' }
  ];

  return (
    <nav className="w-full bg-[#0D0B0A] border-b border-white/5 sticky top-0 z-50 backdrop-blur-md bg-opacity-90">
      {/* max-w-7xl से बढ़ाकर max-w-[95%] किया ताकि बड़ी स्क्रीन्स पर लिंक्स को पूरी जगह मिले */}
      <div className="max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo - Added pr-8 to give safe spacing from first link */}
          <div className="flex-shrink-0 pr-8 flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-3">
              {/* बोतल वाला लोगो */}
              <div className="w-6 h-6 border-2 border-orange-500 rounded-sm relative before:content-[''] before:absolute before:-top-1.5 before:left-1/2 before:-translate-x-1/2 before:w-2 before:h-1.5 before:bg-orange-500"></div>
              <span className="font-serif text-lg tracking-[0.25em] uppercase text-white hover:text-orange-500 transition-colors">
                Scentelligence
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links - Changed gap and padding to stop text clamping */}
          <div className="hidden xl:flex items-center space-x-1.5 flex-1 justify-center">
            {links.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  // वाइब्रेशन रोकने के लिए पैडिंग और बॉर्डर को हमेशा स्टेबल (box-sizing) रखा है
                  className={`px-2.5 py-2 text-[11px] font-light uppercase tracking-widest rounded transition-all duration-200 relative whitespace-nowrap box-border ${
                    isActive 
                      ? 'text-orange-500 bg-orange-500/5 font-normal border border-orange-500/10' 
                      : 'text-white/60 hover:text-white border border-transparent'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-2.5 right-2.5 h-[1px] bg-orange-500"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Theme & Profile Action Area */}
          <div className="hidden xl:flex items-center pl-4 space-x-3">
            <button className="p-2 text-white/60 hover:text-white transition-colors">
              <Moon className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Hamburger Menu Button */}
          <div className="xl:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-white/80 hover:text-white focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden bg-[#12100F] border-b border-white/5 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {links.map((link) => {
                const isActive = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsOpen(false)}
                    className={`block px-3 py-2.5 text-xs font-light uppercase tracking-widest rounded ${
                      isActive ? 'bg-orange-500/10 text-orange-500 font-normal border-l-2 border-orange-500' : 'text-white/60 hover:bg-white/5'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}