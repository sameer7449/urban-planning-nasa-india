'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MapPinIcon, 
  SunIcon, 
  CloudIcon, 
  SparklesIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline'

interface DistrictData {
  id: string
  name: string
  x: number
  y: number
  aqi: number
  temperature: number
  vegetation: number
  population: number
  healthRisk: 'low' | 'medium' | 'high' | 'critical'
  color: string
}

interface Interactive3DMapProps {
  city: string
  selectedLayer: string
  onDistrictClick: (district: DistrictData) => void
}

const Interactive3DMap: React.FC<Interactive3DMapProps> = ({ 
  city, 
  selectedLayer, 
  onDistrictClick 
}) => {
  const [hoveredDistrict, setHoveredDistrict] = useState<string | null>(null)
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null)
  const [timeSlider, setTimeSlider] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const districts: DistrictData[] = [
    {
      id: 'downtown',
      name: 'Downtown',
      x: 0.3,
      y: 0.4,
      aqi: 198,
      temperature: 42,
      vegetation: 15,
      population: 85000,
      healthRisk: 'critical',
      color: '#ff4444'
    },
    {
      id: 'residential',
      name: 'Residential',
      x: 0.6,
      y: 0.3,
      aqi: 145,
      temperature: 38,
      vegetation: 25,
      population: 120000,
      healthRisk: 'high',
      color: '#ff8844'
    },
    {
      id: 'industrial',
      name: 'Industrial',
      x: 0.2,
      y: 0.6,
      aqi: 220,
      temperature: 45,
      vegetation: 8,
      population: 45000,
      healthRisk: 'critical',
      color: '#ff2222'
    },
    {
      id: 'greenbelt',
      name: 'Green Belt',
      x: 0.8,
      y: 0.2,
      aqi: 85,
      temperature: 32,
      vegetation: 65,
      population: 25000,
      healthRisk: 'low',
      color: '#44ff44'
    },
    {
      id: 'commercial',
      name: 'Commercial',
      x: 0.5,
      y: 0.5,
      aqi: 165,
      temperature: 40,
      vegetation: 12,
      population: 75000,
      healthRisk: 'high',
      color: '#ff6644'
    }
  ]

  const getDistrictColor = (district: DistrictData) => {
    switch (selectedLayer) {
      case 'aqi':
        if (district.aqi > 200) return '#ff2222'
        if (district.aqi > 150) return '#ff6644'
        if (district.aqi > 100) return '#ffaa44'
        if (district.aqi > 50) return '#ffff44'
        return '#44ff44'
      case 'temperature':
        if (district.temperature > 40) return '#ff2222'
        if (district.temperature > 35) return '#ff6644'
        if (district.temperature > 30) return '#ffaa44'
        return '#44ff44'
      case 'vegetation':
        if (district.vegetation > 50) return '#44ff44'
        if (district.vegetation > 30) return '#88ff44'
        if (district.vegetation > 15) return '#ffaa44'
        return '#ff6644'
      case 'health':
        switch (district.healthRisk) {
          case 'critical': return '#ff2222'
          case 'high': return '#ff6644'
          case 'medium': return '#ffaa44'
          case 'low': return '#44ff44'
          default: return '#888888'
        }
      default:
        return district.color
    }
  }

  const getDistrictHeight = (district: DistrictData) => {
    const baseHeight = 20
    const maxHeight = 120
    
    switch (selectedLayer) {
      case 'population':
        return baseHeight + (district.population / 1000)
      case 'temperature':
        return baseHeight + (district.temperature * 2)
      case 'aqi':
        return baseHeight + (district.aqi / 2)
      default:
        return baseHeight + 40
    }
  }

  const handleDistrictClick = (district: DistrictData) => {
    setSelectedDistrict(district.id)
    onDistrictClick(district)
  }

  const getLayerInfo = (layer: string) => {
    switch (layer) {
      case 'aqi':
        return { title: 'Air Quality Index', unit: 'AQI', icon: CloudIcon }
      case 'temperature':
        return { title: 'Temperature', unit: '°C', icon: SunIcon }
      case 'vegetation':
        return { title: 'Vegetation Coverage', unit: '%', icon: SparklesIcon }
      case 'health':
        return { title: 'Health Risk', unit: 'Level', icon: ExclamationTriangleIcon }
      default:
        return { title: 'Population Density', unit: 'people/km²', icon: MapPinIcon }
    }
  }

  const layerInfo = getLayerInfo(selectedLayer)

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 rounded-2xl overflow-hidden">
      {/* 3D City Model */}
      <div className="relative w-full h-full p-8">
        <div className="absolute top-4 left-4 z-10">
          <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3 text-white">
            <h3 className="text-lg font-bold mb-2">{city} - 3D Urban Model</h3>
            <div className="flex items-center space-x-2 text-sm">
              <layerInfo.icon className="h-4 w-4" />
              <span>{layerInfo.title}</span>
            </div>
          </div>
        </div>

        {/* Timeline Slider */}
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3 text-white">
            <div className="flex items-center space-x-2 mb-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="px-3 py-1 bg-nasa-600 rounded text-sm hover:bg-nasa-700 transition-colors"
              >
                {isPlaying ? 'Pause' : 'Play'}
              </button>
              <span className="text-sm">Timeline</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={timeSlider}
              onChange={(e) => setTimeSlider(Number(e.target.value))}
              className="w-32 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>

        {/* 3D Districts */}
        <div className="relative w-full h-full">
          {districts.map((district, index) => {
            const height = getDistrictHeight(district)
            const color = getDistrictHeight(district)
            const isHovered = hoveredDistrict === district.id
            const isSelected = selectedDistrict === district.id

            const districtColor = getDistrictColor(district)
            
            return (
              <motion.div
                key={district.id}
                className="absolute cursor-pointer"
                style={{
                  left: `${district.x * 100}%`,
                  top: `${district.y * 100}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: isHovered ? 1.2 : isSelected ? 1.1 : 1,
                  opacity: 1,
                  y: isHovered ? -10 : 0
                }}
                transition={{ duration: 0.3 }}
                onHoverStart={() => setHoveredDistrict(district.id)}
                onHoverEnd={() => setHoveredDistrict(null)}
                onClick={() => handleDistrictClick(district)}
                whileHover={{ scale: 1.2, y: -10 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* 3D Building */}
                <div
                  className="relative"
                  style={{
                    width: '60px',
                    height: `${height}px`,
                    backgroundColor: districtColor,
                    boxShadow: `0 0 ${height/2}px ${districtColor}40`
                  }}
                >
                  {/* Building sides for 3D effect */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(90deg, ${districtColor} 0%, ${districtColor}80 50%, ${districtColor}40 100%)`,
                      transform: 'skewX(-15deg)',
                      transformOrigin: 'left'
                    }}
                  />
                  
                  {/* Building top */}
                  <div
                    className="absolute top-0 left-0 w-full h-2"
                    style={{
                      background: `linear-gradient(45deg, ${districtColor} 0%, ${districtColor}cc 100%)`,
                      transform: 'skewX(-15deg)'
                    }}
                  />

                  {/* District Label */}
                  <motion.div
                    className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {district.name}
                  </motion.div>

                  {/* Data Overlay */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        className="absolute -top-20 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs p-2 rounded-lg min-w-32"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                      >
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span>AQI:</span>
                            <span className="font-bold">{district.aqi}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Temp:</span>
                            <span className="font-bold">{district.temperature}°C</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Green:</span>
                            <span className="font-bold">{district.vegetation}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Risk:</span>
                            <span className={`font-bold ${
                              district.healthRisk === 'critical' ? 'text-red-400' :
                              district.healthRisk === 'high' ? 'text-orange-400' :
                              district.healthRisk === 'medium' ? 'text-yellow-400' :
                              'text-green-400'
                            }`}>
                              {district.healthRisk}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 z-10">
          <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3 text-white">
            <h4 className="text-sm font-bold mb-2">Legend</h4>
            <div className="space-y-1 text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                <span>Critical</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-orange-500 rounded"></div>
                <span>High Risk</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                <span>Medium Risk</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span>Low Risk</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Heat waves */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-red-500/5 to-transparent"
          animate={{
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Pollution haze */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-yellow-500/3 to-transparent"
          animate={{
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>
    </div>
  )
}

export default Interactive3DMap
