"use client";

import Image from "next/image";
import { Suspense, useEffect, useState, useRef } from "react";

type FloatingHeart = {
  id: number;
  left: number;
  delay: number;
  size: number;
};

function MainContent() {
  const [slide, setSlide] = useState(0);
  const [floatingHearts, setFloatingHearts] = useState<FloatingHeart[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

    const slides = [
    {
      text: "My Love… If I could hold your face right now, I would simply say thank you… because loving you has been the greatest honor of my life.",
      media: "/image1.jpg",
      type: "image",
    },
    {
      text: "Before you, I didn’t even know my heart had this much room for peace. You came into my life so gently, yet you changed everything so deeply.",
      media: "/image2.jpg",
      type: "image",
    },
    {
      text: "You are my answered prayer, my calm after long days, my safe place in a noisy world. Every single day with you feels like a gift heaven wrapped specially for me.",
      media: "/image3.jpg",
      type: "image",
    },
    {
      text: "Your patience with me, your kindness, the way you stand by me even when I don’t have all the words… it humbles me. You love me in ways I didn’t know I needed.",
      media: "/image4.jpg",
      type: "image",
    },
    {
      text: "This Valentine’s Day, I want you to hear it clearly — my heart is not just with you… it is yours. Completely. Freely. Forever.",
      media: "/image5.jpg",
      type: "image",
    },
    {
      text: "Happy Valentine's Day! I miss you already and I can't wait for our date. 💘",
      media: "/image6.jpg",
      type: "video",
      isFinal: true,
    },
  ];


  useEffect(() => {
    audioRef.current = new Audio("/music.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;

    // Initialize floating hearts
    const hearts: FloatingHeart[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 8,
      size: Math.random() * 20 + 15,
    }));
    setFloatingHearts(hearts);
  }, []);

  const handleNextSlide = () => {
    if (slide === 0 && audioRef.current) {
      audioRef.current.play().catch((e) => console.log("Audio blocked", e));
    }
    if (slide < slides.length - 1) {
      setSlide(slide + 1);
    }
  };

  const currentSlide = slides[slide];

  return (
    <main className="min-h-screen flex items-center justify-center p-4 relative bg-gradient-to-br from-rose-50 via-white to-pink-100 text-slate-800 overflow-hidden">
      {/* Background Hearts */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingHearts.map((h) => (
          <span
            key={h.id}
            className="floating-heart text-rose-200/60"
            style={{
              left: `${h.left}%`,
              animationDelay: `${h.delay}s`,
              fontSize: `${h.size}px`,
            }}
          >
            ❤️
          </span>
        ))}
      </div>

      <section className="relative z-10 w-full max-w-lg flex flex-col items-center animate-fade-in" key={slide}>
        <div className="text-center space-y-6 w-full">
          
          {/* Media Display */}
          <div className="flex justify-center w-full mb-6">
            <div className="scrapbook-frame animate-soft-float bg-white">
              {currentSlide.type === "video" ? (
                <video
                  src={currentSlide.media}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="photo-border w-full max-h-[40vh] object-cover"
                />
              ) : (
                <Image
                  src={currentSlide.media}
                  alt="Valentine moment"
                  width={400}
                  height={500}
                  className="photo-border"
                  priority
                  unoptimized
                />
              )}
              {/* Tape Effect */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-8 bg-white/40 backdrop-blur-sm border border-white/20 -rotate-2 shadow-sm" />
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-4 px-6">
            {slide === 0 && (
              <span className="font-script text-rose-400 text-5xl block mb-2">
                Hi Babe,
              </span>
            )}
            <h1 className={`${currentSlide.isFinal ? "text-4xl md:text-5xl font-script text-rose-500" : "text-2xl md:text-3xl font-bold"} leading-tight tracking-tight text-slate-800`}>
              {currentSlide.text}
            </h1>
          </div>

          {/* Button - Hidden on last slide */}
          {!currentSlide.isFinal && (
            <button
              onClick={handleNextSlide}
              className="px-14 py-4 mt-4 bg-rose-500 text-white font-bold rounded-full shadow-lg shadow-rose-200 hover:scale-105 active:scale-95 transition-all uppercase tracking-widest text-sm cursor-pointer"
            >
              Next
            </button>
          )}

          {currentSlide.isFinal && (
             <p className="mt-10 text-rose-300 text-[10px] tracking-[0.4em] uppercase font-bold">
             02 • 14 • 26
           </p>
          )}
        </div>
      </section>
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="bg-rose-50 min-h-screen" />}>
      <MainContent />
    </Suspense>
  );
      }
