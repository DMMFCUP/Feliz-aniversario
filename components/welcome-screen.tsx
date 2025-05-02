"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import HamsterWheel from "./hamster-wheel"
import { motion } from "framer-motion"

interface WelcomeScreenProps {
  onEnter: () => void
}

export default function WelcomeScreen({ onEnter }: WelcomeScreenProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simulate loading with progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsLoading(false)
          return 100
        }
        return prev + 5
      })
    }, 150)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-cyan-900 via-blue-800 to-indigo-900 flex flex-col items-center justify-center z-50 overflow-hidden">
      {/* Animated stars background */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              opacity: Math.random() * 0.8 + 0.2,
              animation: `twinkle ${Math.random() * 5 + 3}s infinite ${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="absolute top-0 right-0 w-40 h-40 overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full">
          <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 rotate-45 bg-gradient-to-r from-teal-400 to-cyan-500 text-white py-2 w-80 text-center shadow-lg">
            <span className="font-bold">8 Meses Juntos ❤️</span>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-medium mb-6 text-cyan-300">Cargando nuestra historia de amor...</h2>
          <div className="w-64 h-3 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 rounded-full transition-all duration-300"
              style={{
                width: `${progress}%`,
                backgroundSize: "200% 100%",
                animation: "gradientMove 2s linear infinite",
              }}
            />
          </div>
          <p className="mt-2 text-cyan-200">{progress}%</p>
          <style jsx>{`
            @keyframes gradientMove {
              0% { background-position: 0% 50%; }
              100% { background-position: 100% 50%; }
            }
            @keyframes twinkle {
              0%, 100% { opacity: 0.2; }
              50% { opacity: 1; }
            }
          `}</style>
        </div>
      ) : (
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-6xl font-bold text-cyan-300 mb-6"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 0.8,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              repeatDelay: 1,
            }}
          >
            ¡Mi Amor!
          </motion.h1>

          <motion.p
            className="text-3xl text-center mx-8 mb-8 text-teal-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            8 meses de amor infinito...
            <br />
            Cada momento contigo es mágico
          </motion.p>

          <motion.div
            className="mb-10"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <HamsterWheel />
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => {
                const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/1420/1420-preview.mp3")
                audio.play()
                setTimeout(() => onEnter(), 500)
              }}
              className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-bold py-4 px-8 rounded-full shadow-lg animate-pulse"
            >
              Descubre Nuestra Historia
            </Button>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
