'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface CitySkylineProps {
  city: string
  className?: string
}

const CitySkyline: React.FC<CitySkylineProps> = ({ city, className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  const cityConfigs = {
    'Mumbai, Maharashtra': {
      buildings: [
        { x: 0, height: 0.3, width: 0.08, color: '#1a1a2e' },
        { x: 0.1, height: 0.6, width: 0.06, color: '#16213e' },
        { x: 0.2, height: 0.4, width: 0.07, color: '#0f3460' },
        { x: 0.3, height: 0.8, width: 0.05, color: '#1a1a2e' },
        { x: 0.4, height: 0.5, width: 0.08, color: '#16213e' },
        { x: 0.5, height: 0.9, width: 0.06, color: '#0f3460' },
        { x: 0.6, height: 0.7, width: 0.07, color: '#1a1a2e' },
        { x: 0.7, height: 0.4, width: 0.05, color: '#16213e' },
        { x: 0.8, height: 0.6, width: 0.08, color: '#0f3460' },
        { x: 0.9, height: 0.3, width: 0.06, color: '#1a1a2e' }
      ],
      landmarks: [
        { x: 0.15, y: 0.2, type: 'tower', color: '#ff6b6b' },
        { x: 0.75, y: 0.1, type: 'dome', color: '#4ecdc4' }
      ]
    },
    'Delhi, NCT': {
      buildings: [
        { x: 0, height: 0.4, width: 0.07, color: '#2c3e50' },
        { x: 0.1, height: 0.6, width: 0.06, color: '#34495e' },
        { x: 0.2, height: 0.3, width: 0.08, color: '#2c3e50' },
        { x: 0.3, height: 0.7, width: 0.05, color: '#34495e' },
        { x: 0.4, height: 0.5, width: 0.07, color: '#2c3e50' },
        { x: 0.5, height: 0.8, width: 0.06, color: '#34495e' },
        { x: 0.6, height: 0.4, width: 0.08, color: '#2c3e50' },
        { x: 0.7, height: 0.6, width: 0.05, color: '#34495e' },
        { x: 0.8, height: 0.3, width: 0.07, color: '#2c3e50' },
        { x: 0.9, height: 0.5, width: 0.06, color: '#34495e' }
      ],
      landmarks: [
        { x: 0.2, y: 0.15, type: 'dome', color: '#e74c3c' },
        { x: 0.6, y: 0.1, type: 'tower', color: '#f39c12' }
      ]
    },
    'Bangalore, Karnataka': {
      buildings: [
        { x: 0, height: 0.5, width: 0.08, color: '#27ae60' },
        { x: 0.1, height: 0.7, width: 0.06, color: '#2ecc71' },
        { x: 0.2, height: 0.4, width: 0.07, color: '#27ae60' },
        { x: 0.3, height: 0.6, width: 0.05, color: '#2ecc71' },
        { x: 0.4, height: 0.8, width: 0.08, color: '#27ae60' },
        { x: 0.5, height: 0.3, width: 0.06, color: '#2ecc71' },
        { x: 0.6, height: 0.7, width: 0.07, color: '#27ae60' },
        { x: 0.7, height: 0.5, width: 0.05, color: '#2ecc71' },
        { x: 0.8, height: 0.6, width: 0.08, color: '#27ae60' },
        { x: 0.9, height: 0.4, width: 0.06, color: '#2ecc71' }
      ],
      landmarks: [
        { x: 0.3, y: 0.2, type: 'tower', color: '#9b59b6' },
        { x: 0.7, y: 0.15, type: 'dome', color: '#3498db' }
      ]
    }
  }

  const config = cityConfigs[city as keyof typeof cityConfigs] || cityConfigs['Mumbai, Maharashtra']

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      const container = canvas.parentElement
      if (container) {
        const { width, height } = container.getBoundingClientRect()
        canvas.width = width
        canvas.height = height
        setDimensions({ width, height })
      }
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const drawSkyline = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Draw gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, '#0a0a0a')
      gradient.addColorStop(0.3, '#1a1a2e')
      gradient.addColorStop(0.7, '#16213e')
      gradient.addColorStop(1, '#0f3460')
      
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw buildings
      config.buildings.forEach((building, index) => {
        const x = building.x * canvas.width
        const y = canvas.height - (building.height * canvas.height)
        const width = building.width * canvas.width
        const height = building.height * canvas.height

        // Building shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)'
        ctx.fillRect(x + 2, y + 2, width, height)

        // Building
        ctx.fillStyle = building.color
        ctx.fillRect(x, y, width, height)

        // Building windows
        const windowSize = 4
        const windowSpacing = 8
        for (let wy = y + 10; wy < y + height - 10; wy += windowSpacing) {
          for (let wx = x + 5; wx < x + width - 5; wx += windowSpacing) {
            if (Math.random() > 0.3) {
              ctx.fillStyle = Math.random() > 0.5 ? '#ffd700' : '#ffffff'
              ctx.fillRect(wx, wy, windowSize, windowSize)
            }
          }
        }
      })

      // Draw landmarks
      config.landmarks.forEach(landmark => {
        const x = landmark.x * canvas.width
        const y = landmark.y * canvas.height
        const size = 20

        ctx.fillStyle = landmark.color
        if (landmark.type === 'tower') {
          ctx.fillRect(x - size/2, y, size, canvas.height - y)
        } else if (landmark.type === 'dome') {
          ctx.beginPath()
          ctx.arc(x, y, size, 0, Math.PI * 2)
          ctx.fill()
        }
      })
    }

    drawSkyline()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [city, dimensions])

  return (
    <div className={`relative w-full h-full ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ imageRendering: 'pixelated' }}
      />
      
      {/* Animated overlay effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Heat wave effect */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-red-500/10 to-transparent"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Pollution haze */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-yellow-500/5 to-transparent"
          animate={{
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        
        {/* Green space glow */}
        <motion.div
          className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-green-500/10 to-transparent"
          animate={{
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>
    </div>
  )
}

export default CitySkyline
