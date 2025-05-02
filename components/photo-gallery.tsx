"use client"

import { useState, useEffect } from "react"
import { Heart } from "lucide-react"
import Image from "next/image"

export default function PhotoGallery() {
  const [activePhoto, setActivePhoto] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("photo-gallery")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const photos = [
    { src: "/placeholder.svg?height=300&width=300", caption: "Salidita al parque" },
    { src: "/placeholder.svg?height=300&width=300", caption: "Eres mi media naranja" },
    { src: "/placeholder.svg?height=300&width=300", caption: "ñam, comida" },
    { src: "/placeholder.svg?height=300&width=300", caption: "Nuestras lindas manos" },
    { src: "/placeholder.svg?height=300&width=300", caption: "Tu sonrisa que ilumina mi mundo" },
    { src: "/placeholder.svg?height=300&width=300", caption: "Mi lugar seguro" },
    { src: "/placeholder.svg?height=300&width=300", caption: "Bajo las estrellas" },
    { src: "/placeholder.svg?height=300&width=300", caption: "Recuerdo bonito de la Flor" },
    { src: "/placeholder.svg?height=300&width=300", caption: "Momentos de felicidad" },
    { src: "/placeholder.svg?height=300&width=300", caption: "Por muchos más recuerdos juntos" },
  ]

  return (
    <section id="photo-gallery" className="py-12 mb-10 bg-gradient-to-r from-rose-50 to-violet-50 rounded-3xl">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-rose-600 mb-8">Nuestros Momentos Especiales</h2>

        <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto">
          {photos.map((photo, index) => (
            <div
              key={index}
              className={`relative w-64 h-64 overflow-hidden rounded-lg shadow-lg cursor-pointer transition-all duration-700 transform ${
                isVisible ? `opacity-100 translate-y-0 delay-${index * 100}` : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onClick={() => setActivePhoto(index)}
              onMouseEnter={() => {
                const audio = new Audio(
                  "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8b8a7c9c6.mp3?filename=click-124467.mp3",
                )
                audio.volume = 0.2
                audio.play()
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-rose-500/20 to-violet-500/20 opacity-0 hover:opacity-100 transition-opacity z-10"></div>
              <Image
                src={photo.src || "/placeholder.svg"}
                alt={photo.caption}
                width={300}
                height={300}
                className="w-full h-full object-cover transition-all duration-500 hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent text-white text-center opacity-0 hover:opacity-100 transition-opacity z-20">
                {photo.caption}
              </div>
              <Heart
                className="absolute top-4 right-4 text-rose-500 opacity-0 hover:opacity-100 transition-all duration-300 transform hover:scale-125 z-20"
                size={24}
                fill="#f43f5e"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {activePhoto !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] bg-white rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={photos[activePhoto].src || "/placeholder.svg"}
              alt={photos[activePhoto].caption}
              width={800}
              height={600}
              className="w-full h-auto max-h-[80vh] object-contain"
            />
            <div className="p-4 bg-white">
              <h3 className="text-xl font-medium text-rose-600">{photos[activePhoto].caption}</h3>
            </div>
            <button
              className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 text-black hover:bg-white"
              onClick={() => setActivePhoto(null)}
            >
              ✕
            </button>
            <button
              className="absolute left-2 top-1/2 transform -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 text-black hover:bg-white"
              onClick={(e) => {
                e.stopPropagation()
                setActivePhoto(activePhoto === 0 ? photos.length - 1 : activePhoto - 1)
              }}
            >
              ←
            </button>
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 text-black hover:bg-white"
              onClick={(e) => {
                e.stopPropagation()
                setActivePhoto(activePhoto === photos.length - 1 ? 0 : activePhoto + 1)
              }}
            >
              →
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
