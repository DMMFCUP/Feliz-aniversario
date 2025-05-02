"use client"

import { Heart } from "lucide-react"
import { motion } from "framer-motion"

interface FooterProps {
  onReset: () => void
}

export default function Footer({ onReset }: FooterProps) {
  return (
    <footer className="py-8 bg-gradient-to-r from-blue-900/80 to-cyan-900/80 backdrop-blur-md rounded-t-3xl">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-xl font-bold text-cyan-300 mb-2">Con todo mi amor para ti</p>
          <p className="mb-8 text-cyan-100">Siempre tuyo mi amor</p>

          <div className="flex justify-center mb-8">
            <Heart className="w-12 h-12 text-cyan-500 animate-pulse" fill="currentColor" />
          </div>

          <button
            onClick={onReset}
            className="mt-4 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-bold py-2 px-6 rounded-full focus:outline-none shadow-md transition-all hover:shadow-lg hover:scale-105"
          >
            Volver al inicio
          </button>

          <div className="mt-8 text-sm text-cyan-400/70">
            <p>Hecho con ❤️ para celebrar nuestros 8 meses juntos</p>
            <p>2 de mayo de 2023</p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
