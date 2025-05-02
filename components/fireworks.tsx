"use client"

import { useEffect, useState } from "react"

interface Particle {
  id: number
  x: number
  y: number
  color: string
  velocity: {
    x: number
    y: number
  }
  alpha: number
  size: number
}

export default function Fireworks() {
  const [particles, setParticles] = useState<Particle[]>([])
  const [loveMessages, setLoveMessages] = useState<
    { id: number; message: string; x: number; y: number; opacity: number }[]
  >([])

  useEffect(() => {
    // Create initial fireworks
    createFireworks()

    // Add more fireworks every second
    const interval = setInterval(() => {
      createFireworks()
    }, 800)

    // Animation loop
    let animationId: number
    const animate = () => {
      setParticles((prevParticles) => {
        return prevParticles
          .map((particle) => ({
            ...particle,
            x: particle.x + particle.velocity.x,
            y: particle.y + particle.velocity.y,
            velocity: {
              x: particle.velocity.x * 0.98,
              y: particle.velocity.y * 0.98 + 0.1, // Add gravity
            },
            alpha: particle.alpha - 0.01,
          }))
          .filter((particle) => particle.alpha > 0)
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      clearInterval(interval)
      cancelAnimationFrame(animationId)
    }
  }, [])

  const createFireworks = () => {
    const x = Math.random() * window.innerWidth
    const y = Math.random() * (window.innerHeight / 2)
    const particleCount = 50 + Math.floor(Math.random() * 50)
    const color = getRandomColor()

    const newParticles: Particle[] = []

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2
      const speed = 1 + Math.random() * 3

      newParticles.push({
        id: Date.now() + i,
        x,
        y,
        color,
        velocity: {
          x: Math.cos(angle) * speed,
          y: Math.sin(angle) * speed,
        },
        alpha: 1,
        size: 2 + Math.random() * 3,
      })
    }

    setParticles((prev) => [...prev, ...newParticles])

    // Play sound
    const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/1389/1389-preview.mp3")
    audio.volume = 0.3
    audio.play()
  }

  const getRandomColor = () => {
    const colors = ["#00FFFF", "#FF1493", "#FFFF00", "#FF4500", "#7FFFD4", "#FF00FF"]
    return colors[Math.floor(Math.random() * colors.length)]
  }

  useEffect(() => {
    const handleLoveMessage = (event: CustomEvent) => {
      const message = event.detail.message
      const newMessage = {
        id: Date.now(),
        message,
        x: 30 + Math.random() * 40, // Position in the middle area of screen
        y: 30 + Math.random() * 40,
        opacity: 1,
      }

      setLoveMessages((prev) => [...prev, newMessage])

      // Remove message after animation
      setTimeout(() => {
        setLoveMessages((prev) => prev.filter((msg) => msg.id !== newMessage.id))
      }, 3000)
    }

    window.addEventListener("showLoveMessage", handleLoveMessage as EventListener)

    return () => {
      window.removeEventListener("showLoveMessage", handleLoveMessage as EventListener)
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            opacity: particle.alpha,
          }}
        />
      ))}

      {/* Love messages */}
      {loveMessages.map((msg) => (
        <div
          key={msg.id}
          className="absolute text-center font-bold text-2xl animate-float-up"
          style={{
            left: `${msg.x}%`,
            top: `${msg.y}%`,
            opacity: msg.opacity,
            color: getRandomColor(),
            textShadow: "0 0 10px rgba(0,0,0,0.5)",
            transform: "translate(-50%, -50%)",
          }}
        >
          {msg.message}
        </div>
      ))}
    </div>
  )
}
