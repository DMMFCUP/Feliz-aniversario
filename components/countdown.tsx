"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    // Set the date for the 9-month anniversary (assuming 2 months from now)
    const currentDate = new Date()
    const targetDate = new Date()
    targetDate.setMonth(currentDate.getMonth() + 1)
    targetDate.setDate(2) // Assuming the anniversary is on the 2nd of each month

    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    // Calculate immediately
    calculateTimeLeft()

    // Then update every second
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [])

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

  return (
    <section className="py-8 mb-10">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-3xl mx-auto bg-gradient-to-r from-blue-900/50 via-cyan-900/50 to-teal-900/50 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-cyan-800/30"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <motion.h2 className="text-3xl font-bold text-center text-cyan-300 mb-6" variants={item}>
            Contando los días para nuestro 9º mes juntos
          </motion.h2>
          <div className="grid grid-cols-4 gap-4 text-center">
            <motion.div
              className="bg-blue-900/50 backdrop-blur-md p-4 rounded-lg shadow-md transform hover:scale-105 transition-transform border border-cyan-700/30"
              variants={item}
            >
              <div className="text-4xl font-bold text-cyan-300 mb-2">{String(timeLeft.days).padStart(2, "0")}</div>
              <p className="text-cyan-100">Días</p>
            </motion.div>
            <motion.div
              className="bg-blue-900/50 backdrop-blur-md p-4 rounded-lg shadow-md transform hover:scale-105 transition-transform border border-cyan-700/30"
              variants={item}
            >
              <div className="text-4xl font-bold text-cyan-300 mb-2">{String(timeLeft.hours).padStart(2, "0")}</div>
              <p className="text-cyan-100">Horas</p>
            </motion.div>
            <motion.div
              className="bg-blue-900/50 backdrop-blur-md p-4 rounded-lg shadow-md transform hover:scale-105 transition-transform border border-cyan-700/30"
              variants={item}
            >
              <div className="text-4xl font-bold text-cyan-300 mb-2">{String(timeLeft.minutes).padStart(2, "0")}</div>
              <p className="text-cyan-100">Minutos</p>
            </motion.div>
            <motion.div
              className="bg-blue-900/50 backdrop-blur-md p-4 rounded-lg shadow-md transform hover:scale-105 transition-transform border border-cyan-700/30"
              variants={item}
            >
              <div className="text-4xl font-bold text-cyan-300 mb-2">{String(timeLeft.seconds).padStart(2, "0")}</div>
              <p className="text-cyan-100">Segundos</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
