"use client"

import { useState, useEffect } from "react"

export default function SecretMessages() {
  const [openMessage, setOpenMessage] = useState<number | null>(null)
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

    const element = document.getElementById("secret-messages")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const messages = [
    {
      title: "Toca para abrir",
      hint: "Un mensaje secreto para ti...",
      content:
        "Te amo por todas las pequeñas cosas que haces. Por tu sonrisa al despertar y por cómo me abrazas cuando más lo necesito (Gracias por tenerme siempre tanta paciencia).",
    },
    {
      title: "Toca para abrir",
      hint: "Un secreto de mi corazón...",
      content: "Cuando te miro, veo mi presente y mi futuro. No puedo imaginar mi vida sin ti a mi lado corazón.",
    },
    {
      title: "Toca para abrir",
      hint: "Una confesión para ti...",
      content:
        "A veces te observo cuando no te das cuenta, solo para apreciar lo afortunado que soy de tenerte en mi vida.",
    },
  ]

  const handleMessageClick = (index: number) => {
    // Play sound
    const audio = new Audio(
      "https://cdn.pixabay.com/download/audio/2021/08/09/audio_d391ae4b47.mp3?filename=message-incoming-132126.mp3",
    )
    audio.play()

    setOpenMessage(openMessage === index ? null : index)
  }

  return (
    <section id="secret-messages" className="py-12 mb-10">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-rose-600 mb-8">Mensajes Especiales</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`bg-white p-6 rounded-lg shadow-lg cursor-pointer transform transition-all duration-500 ${
                openMessage === index ? "scale-105 -rotate-0" : index % 2 === 0 ? "rotate-2" : "-rotate-2"
              } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{
                transitionDelay: `${index * 200}ms`,
                boxShadow:
                  openMessage === index
                    ? "0 20px 25px -5px rgba(244, 63, 94, 0.1), 0 10px 10px -5px rgba(244, 63, 94, 0.04)"
                    : "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
              }}
              onClick={() => handleMessageClick(index)}
            >
              <h3 className="text-xl font-bold text-rose-500 mb-2 text-center">{message.title}</h3>

              {openMessage !== index ? (
                <p className="text-center text-gray-500">{message.hint}</p>
              ) : (
                <div className="p-4 mt-2 bg-gradient-to-r from-rose-50 to-violet-50 rounded-lg animate-fade-in">
                  <p className="text-center text-gray-700">{message.content}</p>
                </div>
              )}

              <div className="mt-4 flex justify-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center bg-rose-100 text-rose-500 transition-transform duration-300 ${
                    openMessage === index ? "rotate-180" : ""
                  }`}
                >
                  {openMessage === index ? "↑" : "↓"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
