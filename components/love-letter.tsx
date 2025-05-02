"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export default function LoveLetter() {
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

    const element = document.getElementById("love-letter")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="love-letter" className="py-10 mb-10 bg-gradient-to-r from-rose-100 to-violet-100 rounded-3xl">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 relative">
            <div
              className={`max-w-md mx-auto relative transform -rotate-2 transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <div className="bg-white p-8 relative rounded-lg shadow-lg border border-rose-200">
                <div className="absolute -top-4 left-10 w-20 h-6 bg-amber-200/60 transform -rotate-5"></div>
                <div className="absolute -top-3 right-12 w-20 h-6 bg-amber-200/60 transform rotate-5"></div>
                <h2 className="text-4xl font-bold text-rose-600 mb-6">Mi amor,</h2>
                <p className="text-gray-800 mb-4 text-lg">
                  Ocho meses han pasado desde que nuestros corazones se unieron. Ocho meses llenos de momentos
                  inolvidables, risas compartidas y amor puro.
                </p>
                <p className="text-gray-800 mb-4 text-lg">
                  Cada día a tu lado es una nueva aventura, y no puedo esperar para vivir muchos más momentos especiales
                  juntos.
                </p>
                <p className="text-gray-800 mb-6 text-lg">
                  Este 2 de mayo celebro no solo nuestro octavo mes juntos, sino también la fortuna de tenerte en mi
                  vida.
                </p>
                <p className="text-right text-rose-600 text-2xl font-medium">Con todo mi amor,</p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 mt-10 md:mt-0 flex justify-center">
            <div
              className={`relative transition-all duration-1000 delay-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <div className="p-4 bg-white shadow-xl max-w-xs transform rotate-3 transition-transform hover:rotate-6 duration-300">
                <div className="relative overflow-hidden rounded-lg">
                  <Image
                    src="/placeholder.svg?height=300&width=300"
                    alt="Nosotros"
                    width={300}
                    height={300}
                    className="mb-4 rounded-lg"
                  />
                </div>
                <p className="text-center text-gray-700">Nuestro momento especial ❤️</p>
                <div className="absolute -top-4 left-1/4 w-16 h-5 bg-amber-200/60 transform -rotate-2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
