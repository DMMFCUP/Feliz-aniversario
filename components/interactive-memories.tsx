"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useAnimation } from "framer-motion"
import { Heart, Star, Gift, Music, Camera, Coffee, Plane } from "lucide-react"
import { Button } from "@/components/ui/button"
import confetti from "canvas-confetti"

export default function InteractiveMemories() {
  const [activeMemory, setActiveMemory] = useState<number | null>(null)
  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState("")
  const confettiCanvasRef = useRef<HTMLCanvasElement>(null)
  const controls = useAnimation()

  const memories = [
    {
      icon: <Heart className="w-10 h-10" />,
      title: "Momentos Románticos",
      description: "Todos esos instantes especiales que hemos compartido juntos.",
      color: "from-pink-500 to-rose-500",
      textColor: "text-pink-200",
      borderColor: "border-pink-400",
      sound: "https://assets.mixkit.co/active_storage/sfx/2092/2092-preview.mp3",
    },
    {
      icon: <Star className="w-10 h-10" />,
      title: "Sueños Compartidos",
      description: "Los planes que hemos hecho y los sueños que queremos cumplir juntos.",
      color: "from-purple-500 to-indigo-500",
      textColor: "text-purple-200",
      borderColor: "border-purple-400",
      sound: "https://assets.mixkit.co/active_storage/sfx/2019/2019-preview.mp3",
    },
    {
      icon: <Gift className="w-10 h-10" />,
      title: "Pequeños Detalles",
      description: "Esas pequeñas cosas que hacen que nuestro amor sea único y especial.",
      color: "from-amber-500 to-orange-500",
      textColor: "text-amber-200",
      borderColor: "border-amber-400",
      sound: "https://assets.mixkit.co/active_storage/sfx/1321/1321-preview.mp3",
    },
    {
      icon: <Music className="w-10 h-10" />,
      title: "Nuestra Banda Sonora",
      description: "Las canciones que nos recuerdan momentos especiales juntos.",
      color: "from-emerald-500 to-teal-500",
      textColor: "text-emerald-200",
      borderColor: "border-emerald-400",
      sound: "https://assets.mixkit.co/active_storage/sfx/2448/2448-preview.mp3",
    },
    {
      icon: <Camera className="w-10 h-10" />,
      title: "Recuerdos Capturados",
      description: "Fotografías y videos que inmortalizan nuestra historia de amor.",
      color: "from-blue-500 to-cyan-500",
      textColor: "text-blue-200",
      borderColor: "border-blue-400",
      sound: "https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3",
    },
    {
      icon: <Coffee className="w-10 h-10" />,
      title: "Momentos Cotidianos",
      description: "La magia de compartir el día a día y las pequeñas rutinas juntos.",
      color: "from-yellow-500 to-amber-500",
      textColor: "text-yellow-200",
      borderColor: "border-yellow-400",
      sound: "https://assets.mixkit.co/active_storage/sfx/1111/1111-preview.mp3",
    },
    {
      icon: <Plane className="w-10 h-10" />,
      title: "Aventuras Juntos",
      description: "Los viajes y experiencias que hemos vivido y los que nos esperan.",
      color: "from-red-500 to-rose-500",
      textColor: "text-red-200",
      borderColor: "border-red-400",
      sound: "https://assets.mixkit.co/active_storage/sfx/1987/1987-preview.mp3",
    },
  ]

  const secretMessages = [
    "Te amo más de lo que las palabras pueden expresar",
    "Eres mi persona favorita en todo el universo",
    "Gracias por hacerme tan feliz cada día",
    "Contigo quiero pasar el resto de mi vida",
    "Eres lo mejor que me ha pasado",
    "Mi corazón es tuyo para siempre",
    "Cada día te quiero más",
  ]

  useEffect(() => {
    if (activeMemory !== null) {
      // Play sound
      const audio = new Audio(memories[activeMemory].sound)
      audio.volume = 0.3
      audio.play()
    }
  }, [activeMemory, memories])

  const handleMemoryClick = (index: number) => {
    setActiveMemory(index)
    controls.start({
      scale: [1, 1.05, 1],
      transition: { duration: 0.5 },
    })
  }

  const triggerConfetti = () => {
    if (!confettiCanvasRef.current) return

    const canvas = confettiCanvasRef.current
    const myConfetti = confetti.create(canvas, {
      resize: true,
      useWorker: true,
    })

    myConfetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })

    // Play sound
    const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3")
    audio.volume = 0.3
    audio.play()

    // Show random message
    const randomMessage = secretMessages[Math.floor(Math.random() * secretMessages.length)]
    setMessage(randomMessage)
    setShowMessage(true)
    setTimeout(() => setShowMessage(false), 3000)
  }

  return (
    <section className="py-12 mb-10 relative overflow-hidden">
      <canvas
        ref={confettiCanvasRef}
        className="fixed inset-0 pointer-events-none z-50"
        style={{ width: "100%", height: "100%" }}
      />

      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold text-center text-cyan-300 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Nuestros Recuerdos Interactivos
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {memories.map((memory, index) => (
            <motion.div
              key={index}
              className={`bg-gradient-to-br ${memory.color} rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 ${activeMemory === index ? memory.borderColor : "border-transparent"}`}
              whileHover={{ y: -5 }}
              onClick={() => handleMemoryClick(index)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="p-6">
                <div className="flex justify-center mb-4">{memory.icon}</div>
                <h3 className="text-xl font-bold text-white text-center mb-2">{memory.title}</h3>
                <p className={`${memory.textColor} text-center`}>{memory.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {activeMemory !== null && (
          <motion.div
            className="max-w-3xl mx-auto bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-md rounded-xl p-6 border border-cyan-700/30 shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className={`p-3 rounded-full bg-gradient-to-br ${memories[activeMemory].color}`}>
                {memories[activeMemory].icon}
              </div>
              <h3 className="text-2xl font-bold text-cyan-300">{memories[activeMemory].title}</h3>
            </div>

            <p className="text-cyan-100 mb-6">{memories[activeMemory].description}</p>

            <div className="flex justify-center">
              <Button
                onClick={triggerConfetti}
                className={`bg-gradient-to-r ${memories[activeMemory].color} text-white font-bold py-2 px-6 rounded-full shadow-lg hover:shadow-xl transition-all`}
              >
                Descubrir Mensaje Secreto
              </Button>
            </div>
          </motion.div>
        )}

        {/* Secret message popup */}
        <div
          className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-pink-500 to-purple-500 text-white p-6 rounded-xl shadow-2xl z-50 transition-all duration-500 max-w-md text-center ${showMessage ? "opacity-100 scale-100" : "opacity-0 scale-0 pointer-events-none"}`}
        >
          <Heart className="w-12 h-12 mx-auto mb-4" fill="white" />
          <p className="text-2xl font-bold">{message}</p>
        </div>
      </div>
    </section>
  )
}
