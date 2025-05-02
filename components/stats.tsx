"use client"

import { useEffect, useState } from "react"

export default function Stats() {
  const [isVisible, setIsVisible] = useState(false)
  const [counts, setCounts] = useState({
    days: 0,
    months: 0,
    smiles: 0,
  })

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

    const element = document.getElementById("stats-section")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (isVisible) {
      const duration = 2000 // 2 seconds for the animation
      const steps = 60 // 60 steps (for smooth animation)
      const interval = duration / steps

      let step = 0
      const timer = setInterval(() => {
        step++
        const progress = step / steps

        setCounts({
          days: Math.floor(progress * 240),
          months: Math.min(8, Math.floor(progress * 8)),
          smiles: Math.floor(progress * 1000),
        })

        if (step >= steps) {
          clearInterval(timer)
          setCounts({
            days: 240,
            months: 8,
            smiles: "∞" as any,
          })
        }
      }, interval)

      return () => clearInterval(timer)
    }
  }, [isVisible])

  return (
    <section id="stats-section" className="py-16 mb-10">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-rose-600 mb-12">Nuestros Números Especiales</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center p-6 bg-gradient-to-br from-rose-50 to-rose-100 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300">
            <div className="text-5xl font-bold text-rose-600 mb-2">{counts.days}</div>
            <p className="text-gray-600 text-lg">Días Juntos</p>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-fuchsia-50 to-fuchsia-100 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300">
            <div className="text-5xl font-bold text-fuchsia-600 mb-2">{counts.months}</div>
            <p className="text-gray-600 text-lg">Meses de Amor</p>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-violet-50 to-violet-100 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300">
            <div className="text-5xl font-bold text-violet-600 mb-2">{counts.smiles}</div>
            <p className="text-gray-600 text-lg">Sonrisas Compartidas</p>
          </div>
        </div>
      </div>
    </section>
  )
}
