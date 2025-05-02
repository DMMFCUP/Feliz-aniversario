"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function MemoryGallery() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const photos = [
    { src: "/placeholder.svg?height=500&width=800", caption: "Salidita al parque" },
    { src: "/placeholder.svg?height=500&width=800", caption: "Eres mi media naranja" },
    { src: "/placeholder.svg?height=500&width=800", caption: "ñam, comida" },
    { src: "/placeholder.svg?height=500&width=800", caption: "Nuestras lindas manos" },
    { src: "/placeholder.svg?height=500&width=800", caption: "Tu sonrisa que ilumina mi mundo" },
  ]

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }

  useEffect(() => {
    resetTimeout()
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex === photos.length - 1 ? 0 : prevIndex + 1))
    }, 5000)

    return () => {
      resetTimeout()
    }
  }, [currentIndex, photos.length])

  const goToPrevious = () => {
    resetTimeout()
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? photos.length - 1 : prevIndex - 1))
  }

  const goToNext = () => {
    resetTimeout()
    setCurrentIndex((prevIndex) => (prevIndex === photos.length - 1 ? 0 : prevIndex + 1))
  }

  const goToSlide = (index: number) => {
    resetTimeout()
    setCurrentIndex(index)
  }

  const playHoverSound = () => {
    const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2566/2566-preview.mp3")
    audio.volume = 0.2
    audio.play()
  }

  return (
    <section className="py-12 mb-10">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold text-center text-cyan-300 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Nuestros Recuerdos Especiales
        </motion.h2>

        <motion.div
          className="relative max-w-4xl mx-auto h-[400px] md:h-[500px] overflow-hidden rounded-xl shadow-2xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Main slider */}
          <div className="relative h-full w-full">
            {photos.map((photo, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentIndex ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                <Image src={photo.src || "/placeholder.svg"} alt={photo.caption} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{photo.caption}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation arrows */}
          <button
            onClick={goToPrevious}
            onMouseEnter={playHoverSound}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full backdrop-blur-sm transition-all"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={goToNext}
            onMouseEnter={playHoverSound}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full backdrop-blur-sm transition-all"
          >
            <ChevronRight size={24} />
          </button>

          {/* Dots navigation */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {photos.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                onMouseEnter={playHoverSound}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex ? "bg-white scale-125" : "bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
