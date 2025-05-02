"use client"

import { useState, useEffect } from "react"
import { Music, MicOffIcon as MusicOff } from "lucide-react"
import WelcomeScreen from "@/components/welcome-screen"
import Header from "@/components/header"
import Countdown from "@/components/countdown"
import MemoryGallery from "@/components/memory-gallery"
import InteractiveMemories from "@/components/interactive-memories"
import SpecialMoments from "@/components/special-moments"
import LoveQuotes from "@/components/love-quotes"
import Footer from "@/components/footer"
import Fireworks from "@/components/fireworks"

export default function AnniversaryPage() {
  const [showMain, setShowMain] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null)
  const [showFireworks, setShowFireworks] = useState(false)

  useEffect(() => {
    // Create audio element
    const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2688/2688-preview.mp3")
    audio.loop = true
    setAudioElement(audio)

    // Cleanup function
    return () => {
      if (audio) {
        audio.pause()
        audio.src = ""
      }
    }
  }, [])

  const toggleAudio = () => {
    if (audioElement) {
      if (isPlaying) {
        audioElement.pause()
      } else {
        audioElement.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleEnter = () => {
    setShowMain(true)
    // Start playing music when entering
    if (audioElement && !isPlaying) {
      audioElement.play()
      setIsPlaying(true)
    }
  }

  const triggerFireworks = () => {
    setShowFireworks(true)
    setTimeout(() => setShowFireworks(false), 5000)

    // Trigger love message
    const messageEvent = new CustomEvent("showLoveMessage", {
      detail: {
        message: getLoveMessage(),
      },
    })
    window.dispatchEvent(messageEvent)
  }

  const getLoveMessage = () => {
    const messages = [
      "Te amo más que a las estrellas",
      "Eres mi persona favorita en todo el universo",
      "Contigo todo es mejor",
      "Mi corazón late por ti",
      "Eres mi sueño hecho realidad",
      "Cada día te quiero más",
      "Eres mi felicidad",
      "Mi amor por ti crece cada día",
      "Eres lo mejor que me ha pasado",
      "Juntos somos invencibles",
    ]
    return messages[Math.floor(Math.random() * messages.length)]
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-900 to-blue-950 text-white overflow-hidden">
      {!showMain ? (
        <WelcomeScreen onEnter={handleEnter} />
      ) : (
        <div className="relative">
          {showFireworks && <Fireworks />}

          {/* Audio control button */}
          <button
            onClick={toggleAudio}
            className="fixed bottom-4 right-4 z-50 bg-white/20 backdrop-blur-md p-3 rounded-full shadow-lg hover:bg-white/30 transition-all"
            aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
          >
            {isPlaying ? <MusicOff size={20} /> : <Music size={20} />}
          </button>

          <div className="container mx-auto px-4 pb-20">
            <Header onFireworks={triggerFireworks} />
            <Countdown />
            <MemoryGallery />
            <InteractiveMemories />
            <SpecialMoments />
            <LoveQuotes />
            <Footer onReset={() => setShowMain(false)} />
          </div>
        </div>
      )}
    </div>
  )
}
