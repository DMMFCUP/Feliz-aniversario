"use client"

import { useEffect, useState } from "react"

export default function Timeline() {
  const [activeIndex, setActiveIndex] = useState(-1)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number.parseInt(entry.target.getAttribute("data-index") || "-1")
            if (index >= 0) {
              setActiveIndex(index)
            }
          }
        })
      },
      { threshold: 0.5 },
    )

    const elements = document.querySelectorAll(".timeline-item")
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const timelineEvents = [
    {
      date: "2 de septiembre",
      title: "Nuestro comienzo",
      description: "Cuando nos marcó el inicio de algo maravilloso mi cielo.",
    },
    {
      date: "2 de octubre",
      title: "Primer mes juntos",
      description: "Un mes de descubrirnos y enamorarnos cada día más.",
    },
    {
      date: "2 de noviembre",
      title: "Segundo mes",
      description: "Construyendo recuerdos y fortaleciendo nuestro amor.",
    },
    {
      date: "2 de diciembre",
      title: "Tercer mes",
      description: "Celebrando cada momento juntos con alegría.",
    },
    {
      date: "2 de enero",
      title: "Cuarto mes",
      description: "Comenzando el año con nuestro amor más fuerte que nunca.",
    },
    {
      date: "2 de febrero",
      title: "Quinto mes",
      description: "Cinco meses de aventuras y momentos inolvidables.",
    },
    {
      date: "2 de marzo",
      title: "Sexto mes",
      description: "Medio año de amor, risas y complicidad.",
    },
    {
      date: "2 de abril",
      title: "Séptimo mes",
      description: "Cada día te amo más que el anterior.",
    },
    {
      date: "2 de mayo",
      title: "¡Octavo mes!",
      description: "Hoy celebramos 8 meses de amor incondicional.",
    },
  ]

  return (
    <section className="py-12 mb-10">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-rose-600 mb-12">Nuestra Historia de Amor</h2>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-rose-300 via-fuchsia-300 to-violet-300 rounded-full"></div>

          {/* Timeline events */}
          {timelineEvents.map((event, index) => (
            <div
              key={index}
              data-index={index}
              className={`timeline-item flex items-center mb-12 transition-all duration-700 ${
                activeIndex >= index ? "opacity-100" : "opacity-30"
              }`}
            >
              <div className={`w-1/2 pr-8 text-right ${index % 2 === 1 ? "md:order-2" : ""}`}>
                <h3 className="text-xl font-bold text-rose-600">{event.date}</h3>
                <h4 className="text-lg font-medium text-fuchsia-600 mb-2">{event.title}</h4>
                <p className="text-gray-600">{event.description}</p>
              </div>

              <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                <div
                  className={`w-6 h-6 rounded-full bg-white border-4 ${
                    activeIndex >= index ? "border-rose-500" : "border-gray-300"
                  } z-10`}
                ></div>
              </div>

              <div className={`w-1/2 pl-8 ${index % 2 === 1 ? "md:order-1" : ""}`}>
                {index % 2 === 0 && (
                  <div className="md:block hidden">
                    <h3 className="text-xl font-bold text-rose-600">{event.date}</h3>
                    <h4 className="text-lg font-medium text-fuchsia-600 mb-2">{event.title}</h4>
                    <p className="text-gray-600">{event.description}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
