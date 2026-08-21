import VisionStylist from './pages/VisionStylist.jsx';
import WeatherScent from './pages/WeatherScent.jsx'
import ScentLayering from './pages/ScentLayering.jsx'
import PersonalityTest from './pages/PersonalityTest.jsx'
import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import PageTransition from './components/PageTransition.jsx'
import BackToTop from './components/BackToTop.jsx'
import { ToastProvider } from './components/Toast.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import Home from './pages/Home.jsx'
import Recommendation from './pages/Recommendation.jsx'
import Sentiment from './pages/Sentiment.jsx'
import Marketing from './pages/Marketing.jsx'
import Analytics from './pages/Analytics.jsx'
import AiConsultant from './pages/AiConsultant.jsx'
import NotFound from './pages/NotFound.jsx'
import './App.css'


function ScrollToTopBehavior() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    })
  }, [pathname])
  return null
}

export default function App() {
  const location = useLocation()
  const isChatPage = location.pathname === '/chatbot' || location.pathname === '/consultant'

  return (
    <ThemeProvider>
      <ToastProvider>
        <div className="min-h-screen flex flex-col bg-[#0A0908]">
          <ScrollToTopBehavior /> 
          <Navbar />
          
          {/* -mt-8 या -mt-12 करके हमने नैवबार और बॉडी का अनचाहा गैप पूरी तरह खत्म कर दिया है */}
          <main className={`flex-1 flex flex-col ${isChatPage ? 'h-[calc(100vh-4rem)] overflow-hidden' : '-mt-10 sm:-mt-14 pb-12'}`}>
            <AnimatePresence mode="wait">
             <Routes location={location} key={location.pathname}>
                <Route path="/" element={<PageTransition><Home /></PageTransition>} />
                <Route path="/recommendation" element={<PageTransition><Recommendation /></PageTransition>} />
                
                <Route path="/chatbot" element={<PageTransition><AiConsultant /></PageTransition>} />
                <Route path="/consultant" element={<PageTransition><AiConsultant /></PageTransition>} />
                
                {/* ➕ इन 4 नए राउट्स के पाथ को होमपेज के बटन्स से मैच कर दिया गया है */}
                <Route path="/scent-profiler" element={<PageTransition><PersonalityTest /></PageTransition>} />
                <Route path="/scent-layering" element={<PageTransition><ScentLayering /></PageTransition>} />
                <Route path="/mood-weather" element={<PageTransition><WeatherScent /></PageTransition>} />
                <Route path="/vision-stylist" element={<PageTransition><VisionStylist /></PageTransition>} />
                
                <Route path="/sentiment" element={<PageTransition><Sentiment /></PageTransition>} />
                <Route path="/marketing" element={<PageTransition><Marketing /></PageTransition>} />
                <Route path="/analytics" element={<PageTransition><Analytics /></PageTransition>} />
                
                {/* 🚨 NotFound (*) हमेशा सबसे नीचे होना चाहिए, ताकि ऊपर के सारे पेज पहले चेक हो सकें */}
                <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
              </Routes>
            </AnimatePresence>
          </main>
          
          {!isChatPage && <Footer />}
          {!isChatPage && <BackToTop />}
        </div>
      </ToastProvider>
    </ThemeProvider>
  )
}