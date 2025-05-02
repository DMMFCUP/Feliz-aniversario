"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Heart } from "lucide-react"

export default function LoveStory() {
  const [activeIndex, setActiveIndex] = useState(0)

  const milestones = [
    {
      date: "2 de septiembre",
      title: "Nuestro comienzo",
      description: "El día que nuestras vidas se unieron para siempre.",
      icon: <Heart className="w-6 h-6 text-cyan-300" />,
    },
    {
      date: "2 de octubre",
      title: "Primer mes juntos",
      description: "Celebramos nuestro primer mes descubriendo lo especial de nuestra conexión.",
      icon: <Calendar className="w-6 h-6 text-cyan-300" />,
    },
    {
      date: "2 de noviembre",
      title: "Segundo mes",
      description: "Cada día te amo más y descubro nuevas razones para admirarte.",
      icon: <Heart className="w-6 h-6 text-cyan-300" />,
    },
    {
      date: "2 de diciembre",
      title: "Tercer mes",
      description: "Tres meses de aventuras, risas y momentos inolvidables.",
      icon: <Calendar className="w-6 h-6 text-cyan-300" />,
    },
    {
      date: "2 de enero",
      title: "Cuarto mes",
      description: "Comenzando el año con nuestro amor más fuerte que nunca.",
      icon: <Heart className="w-6 h-6 text-cyan-300" />,
    },
    {
      date: "2 de febrero",
      title: "Quinto mes",
      description: "Cinco meses de construir juntos nuestra historia de amor.",
      icon: <Calendar className="w-6 h-6 text-cyan-300" />,
    },
    {
      date: "2 de marzo",
      title: "Sexto mes",
      description: "Medio año de amor, complicidad y momentos mágicos.",
      icon: <Heart className="w-6 h-6 text-cyan-300" />,
    },
    {
      date: "2 de abril",
      title: "Séptimo mes",
      description: "Siete meses de crecimiento juntos y amor incondicional.",
      icon: <Calendar className="w-6 h-6 text-cyan-300" />,
    },
    {
      date: "2 de mayo",
      title: "¡Octavo mes!",
      description: "Hoy celebramos 8 meses de amor, confianza y felicidad.",
      icon: <Heart className="w-6 h-6 text-cyan-300" fill="currentColor" />,
    },
  ]

  return (
    <section className="py-12 mb-10 bg-gradient-to-r from-blue-900/30 to-cyan-900/30 backdrop-blur-md rounded-3xl">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold text-center text-cyan-300 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Nuestra Historia de Amor
        </motion.h2>

        <div className="flex flex-col md:flex-row gap-8 max-w-5xl mx-auto">
          {/* Timeline navigation */}
          <div className="md:w-1/3">
            <div className="space-y-2">
              {milestones.map((milestone, index) => (
                <motion.button
                  key={index}
                  className={`w-full text-left p-3 rounded-lg transition-all flex items-center gap-3 ${
                    activeIndex === index
                      ? "bg-gradient-to-r from-cyan-900/70 to-teal-900/70 border-l-4 border-cyan-400"
                      : "hover:bg-blue-800/30"
                  }`}
                  onClick={() => setActiveIndex(index)}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex-shrink-0">{milestone.icon}</div>
                  <div>
                    <p className={`font-medium ${activeIndex === index ? "text-cyan-300" : "text-cyan-100"}`}>
                      {milestone.date}
                    </p>
                    <p className={`text-sm ${activeIndex === index ? "text-white" : "text-cyan-200/70"}`}>
                      {milestone.title}
                    </p>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Content display */}
          <div className="md:w-2/3">
            <motion.div
              className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-md p-6 rounded-xl border border-cyan-800/30 shadow-xl h-full"
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-cyan-900/70 rounded-full">{milestones[activeIndex].icon}</div>
                <div>
                  <h3 className="text-xl font-bold text-cyan-300">{milestones[activeIndex].date}</h3>
                  <p className="text-cyan-100">{milestones[activeIndex].title}</p>
                </div>
              </div>

              <p className="text-lg text-cyan-50 mb-4">{milestones[activeIndex].description}</p>

              <div className="mt-6 p-4 bg-blue-950/50 rounded-lg border border-cyan-900/30">
                <p className="text-cyan-200 italic">
                  "Cada día a tu lado es un regalo. Gracias por estos 8 meses maravillosos llenos de amor, risas y
                  momentos inolvidables."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
