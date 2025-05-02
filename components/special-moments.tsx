"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Heart } from "lucide-react"

export default function SpecialMoments() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const moments = [
    {
      title: "Nuestro primer beso",
      description: "Un momento mágico que nunca olvidaré",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      title: "Nuestra primera cita",
      description: "El comienzo de algo maravilloso",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      title: "Nuestro lugar especial",
      description: "Donde siempre nos sentimos en casa",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      title: "Momentos de risas",
      description: "Contigo la felicidad es constante",
      image: "/placeholder.svg?height=300&width=300",
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  }

  const playHoverSound = () => {
    const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/1115/1115-preview.mp3")
    audio.volume = 0.2
    audio.play()
  }

  return (
    <section className="py-12 mb-10">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold text-center text-cyan-300 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Momentos Especiales
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {moments.map((moment, index) => (
            <motion.div
              key={index}
              className="relative group"
              variants={item}
              onMouseEnter={() => {
                setHoveredIndex(index)
                playHoverSound()
              }}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative h-80 overflow-hidden rounded-xl shadow-lg">
                <Image
                  src={moment.image || "/placeholder.svg"}
                  alt={moment.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>

                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold text-cyan-300 mb-2">{moment.title}</h3>
                  <p className="text-cyan-100 mb-4">{moment.description}</p>

                  <div
                    className={`flex items-center gap-2 transition-all duration-500 ${hoveredIndex === index ? "opacity-100" : "opacity-0"}`}
                  >
                    <Heart className="w-5 h-5 text-cyan-300" fill="currentColor" />
                    <span className="text-cyan-200 text-sm">Un recuerdo para siempre</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
