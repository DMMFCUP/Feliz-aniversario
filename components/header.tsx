"use client"

import { useState } from "react"
import { Heart } from "lucide-react"

interface HeaderProps {
  onFireworks: () => void
}

export default function Header({ onFireworks }: HeaderProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  const handleLoveClick = () => {
    // Play heart sound
    const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/1082/1082-preview.mp3")
    audio.play()

    // Trigger animation
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 1000)

    // Trigger fireworks
    onFireworks()
  }

  return (
    <header className="py-6 bg-gradient-to-r from-blue-900/80 to-cyan-900/80 backdrop-blur-md shadow-lg rounded-b-3xl mb-10">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <h1 className="text-3xl md:text-4xl font-bold text-cyan-300">Nuestro Universo de Amor</h1>
        <div className="flex space-x-4">
          <button
            onClick={handleLoveClick}
            className={`love-button text-white font-bold py-3 px-6 rounded-full focus:outline-none shadow-lg transform transition ${
              isAnimating ? "scale-125" : "hover:scale-110"
            }`}
          >
            <span className="flex items-center gap-2 text-white">
              <Heart className="h-5 w-5" fill="white" /> Te Amo
            </span>
          </button>
        </div>
      </div>

      <style jsx>{`
        .love-button {
          background: linear-gradient(90deg, #ff0000, #ff9500, #ffff00, #00ff00, #0000ff, #9500ff, #ff0000);
          background-size: 200% 200%;
          animation: rgbGradient 5s linear infinite;
        }

        @keyframes rgbGradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </header>
  )
}
