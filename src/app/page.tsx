// app/page.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Confetti from "react-confetti";
import confetti from "canvas-confetti";
import { Heart, Sparkles, Gift, Star, Music } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// --- 🌟 GLOBAL ANIMATED BACKGROUND (The Chaos & Vibe) ---
const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#FFE6F4]">
      {/* Moving Gradient Blobs */}
      <motion.div
        animate={{
          x: [0, 100, -100, 0],
          y: [0, -100, 100, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#FF9ECF] rounded-full mix-blend-multiply filter blur-[100px] opacity-40"
      />
      <motion.div
        animate={{
          x: [0, -150, 150, 0],
          y: [0, 150, -150, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-[#FFD6EC] rounded-full mix-blend-multiply filter blur-[120px] opacity-60"
      />

      {/* Floating Kawaii Elements (Hearts, Stars, Sparkles) */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: "110vh", x: `${Math.random() * 100}vw`, opacity: Math.random() * 0.5 + 0.3 }}
          animate={{ y: "-10vh", rotate: 360 }}
          transition={{ duration: Math.random() * 10 + 10, repeat: Infinity, ease: "linear" }}
          className="absolute text-pink-300"
          style={{ fontSize: `${Math.random() * 20 + 10}px` }}
        >
          {i % 3 === 0 ? "💖" : i % 3 === 1 ? "✨" : "🌸"}
        </motion.div>
      ))}
    </div>
  );
};

// --- 1️⃣ HERO SECTION ---
const HeroSection = ({ onStart }: { onStart: () => void }) => {
  const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden px-4 z-10">
      {windowDimensions.width > 0 && <Confetti width={windowDimensions.width} height={windowDimensions.height} recycle={false} numberOfPieces={500} colors={['#FFC0CB', '#FF7EB3', '#ffffff', '#FFD6EC']} />}
      
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.6, duration: 1.2 }}
        className="z-10 text-center bg-white/30 backdrop-blur-md p-8 md:p-12 rounded-3xl border-2 border-white/50 shadow-2xl"
      >
        <motion.div 
          animate={{ rotate: [-5, 5, -5] }} 
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="inline-block mb-4 text-5xl md:text-7xl"
        >
          👑
        </motion.div>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-[#FF7EB3] drop-shadow-lg mb-4 tracking-tight leading-tight">
          Happy Birthday <br /> <span className="text-white drop-shadow-md text-5xl sm:text-7xl md:text-8xl">Ashmita Mitra</span>
        </h1>
        
        <motion.button
          whileHover={{ scale: 1.1, rotate: 2, boxShadow: "0px 0px 20px rgba(255,126,179,0.8)" }}
          whileTap={{ scale: 0.9 }}
          onClick={onStart}
          className="mt-8 px-8 py-4 bg-gradient-to-r from-[#FF7EB3] to-[#FF9ECF] text-white font-black text-lg md:text-2xl rounded-full shadow-xl flex items-center gap-3 mx-auto transition-all"
        >
          <Sparkles size={24} /> TAP TO START THE CHAOS <Sparkles size={24} />
        </motion.button>
      </motion.div>
    </section>
  );
};

// --- 2️⃣ PHOTO MEMORIES SECTION (Fixed Flexible Images) ---
const PhotoGallery = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<{ id: number; src: string } | null>(null);
  const rotations = [-4, 3, -2, 5, -5, 2, -3, 4, -1, 6, -6, 1, -4];

  const photos = Array.from({ length: 13 }, (_, i) => ({
    id: i + 1,
    src: `/photo${i + 1}.jpeg`, 
    rotation: rotations[i],
    floatDelay: Math.random() * 2 // Random float delay so they don't move at the same time
  }));

  return (
    <section className="min-h-screen py-20 md:py-32 flex flex-col items-center relative z-10">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16 relative"
      >
        <Star className="absolute -top-6 -left-8 text-yellow-400 fill-yellow-400 animate-pulse w-8 h-8 md:w-12 md:h-12" />
        <h2 className="text-4xl md:text-6xl font-black text-[#FF7EB3] drop-shadow-md px-4 leading-tight bg-white/60 inline-block p-4 rounded-3xl backdrop-blur-sm border border-white">
          Memories with the most <br /> iconic human ever 📸
        </h2>
        <Heart className="absolute -bottom-4 -right-6 text-[#FF7EB3] fill-[#FF7EB3] animate-bounce w-8 h-8 md:w-10 md:h-10" />
      </motion.div>

      {/* Masonry-style flexible grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-12 max-w-7xl w-full px-4 md:px-8">
        {photos.map((photo) => (
          <motion.div
            key={photo.id}
            initial={{ rotate: photo.rotation }}
            animate={{ y: [0, -10, 0] }} // Continuous float animation
            transition={{ duration: 3, repeat: Infinity, delay: photo.floatDelay, ease: "easeInOut" }}
            whileHover={{ scale: 1.08, rotate: 0, zIndex: 40 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedPhoto(photo)}
            className="bg-white p-2 pb-10 sm:p-3 sm:pb-12 md:p-4 md:pb-16 rounded-sm shadow-[0_10px_30px_rgba(255,126,179,0.3)] cursor-pointer transition-shadow hover:shadow-[0_20px_40px_rgba(255,126,179,0.6)] relative group"
          >
            {/* Cute piece of tape on top of the polaroid */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-4 md:w-16 md:h-5 bg-pink-200/70 rotate-[-3deg] shadow-sm z-20"></div>

            {/* FLEXIBLE IMAGE CONTAINER */}
            <div className="w-full bg-[#fafafa] flex items-center justify-center relative overflow-hidden min-h-[150px] sm:min-h-[200px]">
              
              {/* Loading Placeholder */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-pink-300 z-0">
                <Heart size={28} className="animate-pulse mb-2 opacity-50 fill-current" />
                <span className="font-mono text-[10px] md:text-xs font-bold opacity-60">Loading...</span>
              </div>
              
              {/* Actual Image: Takes natural shape without exceeding 300px height */}
              <img 
                src={photo.src} 
                alt={`Memory ${photo.id}`} 
                className="relative z-10 w-full max-h-[200px] md:max-h-[300px] object-contain opacity-0 transition-opacity duration-500"
                onLoad={(e) => e.currentTarget.classList.remove('opacity-0')}
                onError={(e) => e.currentTarget.style.display = 'none'} 
              />
            </div>
            
            {/* Handwritten style text */}
            <p className="absolute bottom-3 md:bottom-5 left-0 right-0 text-center font-mono text-pink-500 font-bold text-xs md:text-sm transform -rotate-1">
              Memory #{photo.id}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Fullscreen Popup Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-pink-900/40 backdrop-blur-xl p-4 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.5, y: 100, rotate: -5 }}
              animate={{ scale: 1, y: 0, rotate: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="bg-white p-4 pb-20 md:p-6 md:pb-24 rounded-xl shadow-2xl max-w-4xl w-full relative flex flex-col"
              onClick={(e) => e.stopPropagation()} 
            >
              <button 
                onClick={() => setSelectedPhoto(null)}
                className="absolute -top-4 -right-4 bg-white hover:bg-pink-100 text-[#FF7EB3] rounded-full p-3 z-30 shadow-xl border-2 border-pink-200"
              >
                ✕
              </button>
              
              <div className="w-full min-h-[300px] max-h-[75vh] bg-[#fafafa] flex items-center justify-center relative overflow-hidden border border-gray-100">
                <div className="absolute flex flex-col items-center text-pink-300 z-0">
                  <Heart size={48} className="animate-pulse mb-2 fill-current opacity-30" />
                </div>
                <img 
                  src={selectedPhoto.src} 
                  alt={`Memory ${selectedPhoto.id}`} 
                  className="w-full h-full max-h-[75vh] object-contain z-10 drop-shadow-lg"
                  onError={(e) => e.currentTarget.style.display = 'none'}
                />
              </div>
              <div className="absolute bottom-6 md:bottom-8 left-0 right-0 flex justify-center items-center gap-2">
                <Heart className="text-[#FF7EB3] fill-[#FF7EB3] w-5 h-5" />
                <p className="font-mono text-[#FF7EB3] font-black text-xl md:text-2xl">
                  Bestie Archive #{selectedPhoto.id}
                </p>
                <Heart className="text-[#FF7EB3] fill-[#FF7EB3] w-5 h-5" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

// --- 3️⃣ STORY MODE SECTION ---
const StorySection = () => {
  const containerRef = useRef(null);
  const textRefs = useRef<HTMLDivElement[]>([]);

  const story = [
    "Respected Ash aka my personal Jhandu Baam,",
    "Happy Birthday to the ONLY human on Earth who can explain a full chapter 5 minutes before an exam like it’s a TED Talk. I swear you are the reason I even pass things.",
    "The way you sacrifice your own study time just to make sure my two remaining brain cells understand the topic… bro, that’s love. PURE love.",
    "And your stories??? HELLO??? Oscar-winning, Netflix-level, masala-loaded storytelling the second you reach home. The amount of extra spice you add… even MDH masala feels insecure.",
    "I still remember when you entered school like this calm, sweet, agile little butterfly whom people used to take for granted… AND THEN I ARRIVED.",
    "Life said: Upgrade unlocked.",
    "Now this girl gives slangs better than me. I taught her three lines; she built an entire dictionary. Honestly, I feel like a proud professor watching my student get a PhD in Attitude Management.",
    "And let’s not forget: you’re hella pretty, an absolute legend of a bestie, my favourite partner in crime, and the person whose food somehow tastes 10x better than anything I try to make.",
    "If there’s food, gossip, chaos, or random plans involved — I know you’re the one I’m calling.",
    "I want you to achieve every single dream you’ve ever told me about — the Koenigsegg Jesko, BMW, spaceship, whatever crazy plan you have. Because I’m too broke to buy those, so you HAVE to succeed for both of us.",
    "And in the future we ARE going go-karting. If we crash, we crash together. If we win, we win together. If we fight, we fight together.",
    "But if someone irritates you… I’ll just sit there proudly watching you handle it like the icon you are.",
    "Love you idiot. Stay chaotic. Stay iconic. Stay my favourite Jhandu Baam forever.",
    "— Your unofficial mentor, Tams 💖"
  ];

  useEffect(() => {
    textRefs.current.forEach((el, i) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 80, scale: 0.8, rotate: i % 2 === 0 ? -5 : 5 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotate: 0,
          duration: 1.2,
          ease: "elastic.out(1, 0.7)",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            end: "bottom 60%",
            scrub: false, // Changed from scrub to make them pop instantly
          },
        }
      );
    });
  }, []);

  return (
    <section ref={containerRef} className="py-24 md:py-32 px-4 md:px-6 overflow-hidden relative z-10">
      <div className="max-w-2xl mx-auto space-y-8 md:space-y-16">
        {story.map((text, i) => (
          <div
            key={i}
            ref={(el) => { if (el) textRefs.current[i] = el; }}
            className={`relative p-5 md:p-8 rounded-3xl shadow-xl text-base sm:text-lg md:text-xl font-bold leading-relaxed border-2 border-white ${
              i % 2 === 0 
                ? "bg-white/90 backdrop-blur-sm text-[#FF7EB3] rounded-bl-sm ml-4 mr-8 md:ml-0 md:mr-20" 
                : "bg-gradient-to-r from-[#FF7EB3] to-[#FF9ECF] text-white rounded-br-sm ml-8 mr-4 md:ml-20 md:mr-0"
            }`}
          >
            {/* Cute speech bubble tail */}
            <div className={`absolute bottom-0 w-6 h-6 border-white bg-inherit ${i % 2 === 0 ? '-left-3 border-l-2 border-b-2 rounded-bl-xl' : '-right-3 border-r-2 border-b-2 rounded-br-xl'}`}></div>
            {text}
          </div>
        ))}
      </div>
    </section>
  );
};

// --- 4️⃣ MINI GAME ---
const MiniGame = () => {
  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState<{ id: number; left: string, duration: number }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHearts((prev) => [
        ...prev,
        { 
          id: Date.now(), 
          left: `${Math.random() * 80 + 10}%`,
          duration: Math.random() * 2 + 3 // Variable falling speed
        },
      ]);
    }, 600);
    return () => clearInterval(interval);
  }, []);

  const catchHeart = (id: number) => {
    setScore((s) => s + 1);
    setHearts((prev) => prev.filter((h) => h.id !== id));
    confetti({
      particleCount: 20,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#FFC0CB', '#FF7EB3', '#ffffff', '#FFEB3B']
    });
  };

  return (
    <section className="h-[60vh] md:h-[80vh] flex flex-col items-center justify-center py-10 relative overflow-hidden z-10 mx-4 my-10 bg-white/40 backdrop-blur-md rounded-3xl border-4 border-white shadow-2xl">
      <h2 className="text-3xl md:text-5xl font-black text-[#FF7EB3] drop-shadow-sm mb-6 text-center">Catch the Vibes!</h2>
      <div className="bg-gradient-to-r from-[#FF7EB3] to-[#FF9ECF] px-8 py-3 rounded-full text-white font-black text-2xl md:text-3xl shadow-[0_0_20px_rgba(255,126,179,0.5)] z-20">
        Score: {score}
      </div>
      
      {score >= 15 && (
        <motion.div 
          initial={{ scale: 0, rotate: -10 }} 
          animate={{ scale: 1, rotate: 0 }} 
          transition={{ type: "spring", bounce: 0.6 }}
          className="absolute inset-0 z-30 flex items-center justify-center bg-white/80 backdrop-blur-md p-4"
        >
          <div className="bg-white p-8 md:p-12 rounded-[3rem] border-8 border-pink-300 shadow-2xl text-center transform hover:scale-105 transition-transform">
            <h3 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FF7EB3] to-[#FF9ECF] drop-shadow-sm mb-4">
              Certified Best Friend <br/> Level: INFINITY 🏆
            </h3>
            <p className="text-gray-500 font-bold text-xl">You can stop catching now 😂</p>
          </div>
        </motion.div>
      )}

      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ top: "-10%", rotate: -20 }}
            animate={{ top: "110%", rotate: 20 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: heart.duration, ease: "linear" }}
            className="absolute cursor-pointer text-5xl md:text-6xl hover:scale-125 transition-transform filter drop-shadow-md z-10"
            style={{ left: heart.left }}
            onMouseDown={() => catchHeart(heart.id)}
            onTouchStart={() => catchHeart(heart.id)}
          >
            {heart.id % 2 === 0 ? "💖" : "💅"}
          </motion.div>
        ))}
      </AnimatePresence>
    </section>
  );
};

// --- 5️⃣ SURPRISE GIFT ---
const GiftReveal = () => {
  const [revealed, setRevealed] = useState(false);
  const [suspense, setSuspense] = useState(false);

  const handleReveal = () => {
    setSuspense(true);
    setTimeout(() => {
      setSuspense(false);
      setRevealed(true);
      confetti({ particleCount: 200, spread: 160, origin: { y: 0.5 } });
    }, 2500); 
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden z-10">
      {!revealed && !suspense && (
        <motion.button
          whileHover={{ scale: 1.1, boxShadow: "0px 0px 40px rgba(255, 126, 179, 1)" }}
          whileTap={{ scale: 0.9 }}
          onClick={handleReveal}
          className="bg-gradient-to-r from-[#FF7EB3] to-[#FF9ECF] text-white px-8 py-6 md:px-12 md:py-8 rounded-[3rem] text-2xl md:text-4xl font-black shadow-2xl flex items-center gap-4 z-10 text-center border-4 border-white"
        >
          <Gift size={40} className="md:w-12 md:h-12 animate-pulse" /> 
          CLICK FOR BIRTHDAY GIFT 
          <Gift size={40} className="md:w-12 md:h-12 animate-pulse" />
        </motion.button>
      )}

      {suspense && (
        <motion.div
          animate={{ 
            rotate: [0, -20, 20, -20, 20, 0], 
            scale: [1, 1.5, 1],
            filter: ["hue-rotate(0deg)", "hue-rotate(90deg)", "hue-rotate(0deg)"]
          }}
          transition={{ duration: 0.3, repeat: Infinity }}
          className="text-8xl md:text-9xl z-10 drop-shadow-2xl"
        >
          🎁
        </motion.div>
      )}

      {revealed && (
        <motion.div
          initial={{ scale: 0, rotate: -720, y: 200 }}
          animate={{ scale: 1, rotate: 0, y: 0 }}
          transition={{ type: "spring", bounce: 0.6, duration: 1.5 }}
          className="text-center flex flex-col items-center z-10 w-full px-2"
        >
          <div className="relative group">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-yellow-300 rounded-full -z-10 blur-md opacity-80"
            />
            
            <img 
              src="/gift1.jpeg" 
              alt="Birthday Gift" 
              className="w-full max-w-[300px] md:max-w-[450px] aspect-square object-cover rounded-2xl border-[12px] md:border-[16px] border-white shadow-[0_20px_50px_rgba(0,0,0,0.3)] mb-8 transform group-hover:scale-105 transition-transform duration-500 cursor-pointer"
              onError={(e) => {
                e.currentTarget.src = "https://placehold.co/500x500/8B4513/FFF?text=🦎+CHIPKALI";
              }}
            />
          </div>

          <motion.h2 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: "spring", bounce: 0.6 }}
            className="text-3xl md:text-5xl lg:text-6xl font-black text-white bg-green-500 p-6 md:p-8 rounded-[2rem] border-8 border-dashed border-white transform -rotate-3 shadow-2xl inline-block"
          >
            Ye le tere birthday ka gift 🦎<br/>
            <span className="text-xl md:text-3xl text-green-100 block mt-4 font-bold bg-black/20 p-2 rounded-xl">
              Ab bolo mat gift nehi diya 💅
            </span>
          </motion.h2>
        </motion.div>
      )}
    </section>
  );
};

// --- 6️⃣ FOOTER ---
const Footer = () => (
  <footer className="pt-32 pb-20 flex flex-col items-center text-[#FF7EB3] text-center px-4 relative z-10">
    <motion.div 
      animate={{ scale: [1, 1.1, 1] }} 
      transition={{ repeat: Infinity, duration: 2 }}
    >
      <Heart className="w-16 h-16 fill-[#FF7EB3] mb-6 drop-shadow-md" />
    </motion.div>
    <h2 className="text-4xl md:text-6xl font-black mb-4 drop-shadow-sm">
      Happy Birthday <br/> Ashmita
    </h2>
    <p className="text-2xl md:text-3xl font-bold mb-10 text-gray-500">Wished by Tams 💗</p>
    <div className="px-8 py-4 bg-white border-4 border-[#FF7EB3] rounded-full text-sm md:text-lg uppercase tracking-widest font-black shadow-xl">
      🔓 Best Friend Forever Unlocked
    </div>
  </footer>
);

// --- MAIN PAGE ASSEMBLY ---
export default function BirthdayExperience() {
  const [started, setStarted] = useState(false);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  return (
    <main className="font-sans antialiased selection:bg-pink-400 selection:text-white overflow-x-hidden min-h-screen relative">
      {/* THIS IS THE NEW ANIMATED BACKGROUND SYSTEM */}
      <AnimatedBackground />

      {!started ? (
        <HeroSection onStart={() => setStarted(true)} />
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <HeroSection onStart={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })} />
          <PhotoGallery />
          <StorySection />
          <MiniGame />
          <GiftReveal />
          <Footer />
        </motion.div>
      )}
    </main>
  );
}