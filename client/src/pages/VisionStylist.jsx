import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, Image as ImageIcon, RefreshCw, Sparkles, Camera, Info } from 'lucide-react';

import { analyzeStyleImage } from '../services/visionService';
import { getPerfumeRecommendationsByStyle } from '../utils/perfumeMapper';

import LoadingAnimation from '../components/vision/LoadingAnimation';
import AnalysisCard from '../components/vision/AnalysisCard';
import RecommendationCard from '../components/vision/RecommendationCard';

export default function VisionStylist() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [activeMode, setActiveMode] = useState('upload'); 
  
  const [loading, setLoading] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const startCamera = async () => {
    setActiveMode('camera');
    setAnalysisData(null);
    setRecommendations([]);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 1280, height: 720, facingMode: "user" } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }
    } catch (err) {
      console.error(err);
      setActiveMode('upload');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      
      canvas.toBlob((blob) => {
        const file = new File([blob], `capture-${Date.now()}.jpg`, { type: "image/jpeg" });
        setSelectedImage(file);
        setImagePreviewUrl(URL.createObjectURL(file));
        stopCamera();
      }, 'image/jpeg');
    }
  };

  const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => { setIsDragging(false); };
  const handleDrop = (e) => {
    e.preventDefault(); setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) processFile(e.dataTransfer.files[0]);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) processFile(e.target.files[0]);
  };

  const processFile = (file) => {
    setSelectedImage(file);
    setImagePreviewUrl(URL.createObjectURL(file));
    setAnalysisData(null);
    setRecommendations([]);
  };

  const triggerVisionAnalysis = async () => {
    if (!selectedImage) return;
    setLoading(true);
    try {
      const analysis = await analyzeStyleImage(selectedImage);
      const suggestions = getPerfumeRecommendationsByStyle(analysis);
      setAnalysisData(analysis);
      setRecommendations(suggestions);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen text-[#FAF6F0] py-8 px-4 max-w-6xl mx-auto space-y-10 block">
      
      {/* Header */}
      <div className="text-center space-y-2 block">
        <div className="inline-flex p-2.5 bg-orange-500/10 border border-orange-500/20 text-orange-500 rounded-full mb-1">
          <Camera className="w-5 h-5" />
        </div>
        <h1 className="font-serif text-3xl tracking-wide text-white block">AI Vision Perfume Stylist</h1>
        <p className="text-xs font-light opacity-60 tracking-widest max-w-xl mx-auto leading-relaxed block">
          Advanced real-time fashion and silhouette mapping. Our intelligence engine decodes your outfit coordinates, tone metrics, and style aesthetics to curate a bespoke olfactory signature.
        </p>
      </div>

      {/* Selector Tabs */}
      {!imagePreviewUrl && !loading && (
        <div className="flex justify-center space-x-3 max-w-xs mx-auto bg-[#12100F] p-1 border border-white/5 rounded">
          <button 
            onClick={() => { stopCamera(); setActiveMode('upload'); }}
            className={`flex-1 py-2 text-[10px] tracking-widest uppercase transition-all rounded ${activeMode === 'upload' ? 'bg-orange-500 text-white' : 'text-white/40 hover:text-white'}`}
          >
            File Upload
          </button>
          <button 
            onClick={startCamera}
            className={`flex-1 py-2 text-[10px] tracking-widest uppercase transition-all rounded ${activeMode === 'camera' ? 'bg-orange-500 text-white' : 'text-white/40 hover:text-white'}`}
          >
            Live Camera
          </button>
        </div>
      )}

      {/* Main Execution Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start block w-full">
        
        {/* Left Side Container */}
        <div className="lg:col-span-5 space-y-4 block">
          <div 
            onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}
            className={`border border-white/10 rounded p-6 text-center min-h-[340px] flex flex-col justify-center items-center relative bg-[#12100F] shadow-2xl ${
              isDragging ? 'border-orange-500 bg-orange-500/5' : ''
            }`}
          >
            <AnimatePresence mode="wait">
              
              {imagePreviewUrl ? (
                <motion.div key="preview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full flex flex-col items-center space-y-4">
                  <div className="relative w-full max-h-[280px] rounded overflow-hidden border border-white/10 shadow-xl">
                    <img src={imagePreviewUrl} alt="Target Object" className="w-full object-cover" />
                  </div>
                  {!loading && !analysisData && (
                    <button onClick={triggerVisionAnalysis} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-serif tracking-widest uppercase py-3 text-xs transition-all flex items-center justify-center space-x-2 rounded">
                      <Sparkles className="w-4 h-4" /> <span>Analyze Captured Look</span>
                    </button>
                  )}
                  {!loading && (
                    <button onClick={() => { stopCamera(); setSelectedImage(null); setImagePreviewUrl(null); setAnalysisData(null); }} className="text-[10px] tracking-widest uppercase text-white/40 hover:text-orange-500 transition-colors">
                      <RefreshCw className="w-3 h-3 inline mr-1" /> Re-Take / Change
                    </button>
                  )}
                </motion.div>
              ) : (
                activeMode === 'camera' ? (
                  <motion.div key="camera" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full flex flex-col items-center space-y-4">
                    <div className="relative w-full aspect-video rounded overflow-hidden border border-white/5 bg-black">
                      <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover scale-x-[-1]"></video>
                    </div>
                    
                    <button 
                      onClick={capturePhoto}
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white border border-orange-500/20 font-serif tracking-widest uppercase py-3 text-xs transition-all flex items-center justify-center space-x-2 rounded shadow-lg"
                    >
                      <Camera className="w-4 h-4" /> <span>Capture Look (Click)</span>
                    </button>
                  </motion.div>
                ) : (
                  <motion.div key="upload" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4 flex flex-col items-center">
                    <div className="p-4 bg-white/[0.02] border border-white/5 rounded-full text-white/20"><ImageIcon className="w-8 h-8" /></div>
                    <p className="text-xs font-light tracking-wide opacity-50">Drag and drop your outfit picture here</p>
                    <label className="cursor-pointer bg-white/5 text-white border border-white/10 text-[10px] tracking-widest uppercase py-2.5 px-5 rounded hover:bg-white/10 transition-all">
                      Browse Files
                      <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                    </label>
                  </motion.div>
                )
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Side Container */}
        <div className="lg:col-span-7 block w-full">
          <AnimatePresence mode="wait">
            {loading && (
              <motion.div key="load" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-[#12100F] p-8 border border-white/5 rounded w-full block">
                <LoadingAnimation />
              </motion.div>
            )}
            
            {!loading && !analysisData && (
              <motion.div key="emp" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="border border-white/5 bg-[#12100F]/40 p-12 text-center rounded min-h-[340px] flex items-center justify-center text-xs font-light opacity-40 leading-relaxed block w-full">
                Activate the live camera module or drop an image asset above to initialize stylistic object mapping.
              </motion.div>
            )}

            {!loading && analysisData && (
              <motion.div key="data" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 block w-full">
                
                {/* Extracted Card */}
                <AnalysisCard data={analysisData} />

                {/* Recommendations */}
                <div className="space-y-4 mt-6 block w-full">
                  <div className="text-left border-b border-white/5 pb-2 block">
                    <span className="text-[10px] tracking-[0.25em] uppercase text-orange-500 font-semibold block">Matched Scent Architecture</span>
                    <h3 className="font-serif text-lg text-white block">Suggested Masterpieces</h3>
                  </div>

                  <div className="grid grid-cols-1 gap-4 block w-full">
                    {recommendations.map((perfume) => (
                      <div key={perfume.id} className="bg-[#12100F] border border-white/5 p-5 rounded relative block space-y-4 w-full">
                        
                        {/* Emoji Bottle area */}
                        <div className="flex items-center space-x-4 w-full">
                          <div className="w-14 h-14 bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/20 rounded flex items-center justify-center text-2xl shadow-inner shrink-0">
                            {perfume.imageEmoji}
                          </div>
                          <div className="min-w-0 flex-1">
                            <span className="text-[9px] tracking-widest text-orange-400 uppercase block truncate">{perfume.brand} • {perfume.fragranceFamily}</span>
                            <h4 className="font-serif text-base text-white mt-0.5 truncate">{perfume.name}</h4>
                          </div>
                          <div className="bg-orange-500/10 border border-orange-500/20 px-2 py-0.5 text-[9px] font-serif text-orange-400 rounded shrink-0">
                            {perfume.confidenceScore}% Match
                          </div>
                        </div>

                        {/* Integration Reason */}
                        <div className="bg-white/[0.01] border border-white/5 p-3 rounded text-xs font-light leading-relaxed block">
                          <span className="text-[9px] font-medium text-orange-500 uppercase tracking-wider block mb-1 flex items-center gap-1">
                            <Info className="w-3 h-3" /> Scent Integration Reason:
                          </span>
                          <p className="text-white/90 italic">{perfume.matchReason}</p>
                        </div>

                        {/* Telemetry */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-[10px] font-light opacity-75 border-t border-white/5 w-full">
                          <div>
                            <span className="text-[8px] uppercase tracking-widest text-white/40 block">Extracted Inputs</span>
                            <p className="truncate text-[#FAF6F0]" title={perfume.extractedInput}>{perfume.extractedInput}</p>
                          </div>
                          <div>
                            <span className="text-[8px] uppercase tracking-widest text-white/40 block">Notes Composition</span>
                            <p className="truncate text-[#FAF6F0]" title={perfume.notes}>{perfume.notes}</p>
                          </div>
                          <div>
                            <span className="text-[8px] uppercase tracking-widest text-white/40 block">Longevity & Trail</span>
                            <p className="text-[#FAF6F0] truncate">{perfume.longevity}</p>
                          </div>
                        </div>

                      </div>
                    ))}
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