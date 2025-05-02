"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Quote } from "lucide-react"

export default function LoveQuotes() {
  const [currentQuote, setCurrentQuote] = useState(0)

  const quotes = [
    {
      text: "Ocho meses de amor que valen por toda una vida de felicidad.",
      author: "Con amor infinito",
    },
    {
      text: "Gracias por ser la razón de mi sonrisa todos los días.",
      author: "Te amo más que ayer y menos que mañana",
    },
    {
      text: "Cada día a tu lado es una nueva aventura llena de amor y felicidad.",
      author: "Para ti, con todo mi amor",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev === quotes.length - 1 ? 0 : prev + 1))
    }, 8000)

    return () => clearInterval(interval)
  }, [quotes.length])

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
          Palabras de Amor
        </motion.h2>

        <div className="max-w-3xl mx-auto h-64 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuote}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center p-6"
            >
              <Quote className="w-12 h-12 text-cyan-500/50 mb-6" />
              <p className="text-2xl text-cyan-100 mb-6 italic">{quotes[currentQuote].text}</p>
              <p className="text-cyan-300 font-medium">{quotes[currentQuote].author}</p>
            </motion.div>
          </AnimatePresence>

          {/* Quote navigation dots */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {quotes.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuote(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentQuote ? "bg-cyan-300 w-6" : "bg-cyan-700 hover:bg-cyan-500"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
