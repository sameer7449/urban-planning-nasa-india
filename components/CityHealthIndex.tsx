'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  HeartIcon, 
  ArrowUpIcon, 
  ArrowDownIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline'

interface HealthMetrics {
  airQuality: number
  temperature: number
  vegetation: number
  waterQuality: number
  wasteManagement: number
  publicHealth: number
  transportEfficiency: number
  energyConsumption: number
}

interface CityHealthIndexProps {
  city: string
  metrics: HealthMetrics
}

const CityHealthIndex: React.FC<CityHealthIndexProps> = ({ city, metrics }) => {
  const [overallScore, setOverallScore] = useState(0)
  const [scoreHistory, setScoreHistory] = useState<number[]>([])
  const [trend, setTrend] = useState<'up' | 'down' | 'stable'>('stable')

  // Calculate overall health index
  useEffect(() => {
    const weights = {
      airQuality: 0.25,
      temperature: 0.15,
      vegetation: 0.20,
      waterQuality: 0.15,
      wasteManagement: 0.10,
      publicHealth: 0.10,
      transportEfficiency: 0.03,
      energyConsumption: 0.02
    }

    const weightedScore = Object.entries(weights).reduce((total, [key, weight]) => {
      const value = metrics[key as keyof HealthMetrics]
      return total + (value * weight)
    }, 0)

    setOverallScore(Math.round(weightedScore))
    
    // Generate historical data for trend
    const history = Array.from({ length: 12 }, (_, i) => {
      const monthAgo = weightedScore + (Math.random() - 0.5) * 20
      return Math.max(0, Math.min(100, monthAgo))
    }).sort((a, b) => a - b)
    
    setScoreHistory(history)
    
    // Determine trend
    const recent = history.slice(-3).reduce((a, b) => a + b, 0) / 3
    const older = history.slice(0, 3).reduce((a, b) => a + b, 0) / 3
    
    if (recent > older + 5) setTrend('up')
    else if (recent < older - 5) setTrend('down')
    else setTrend('stable')
  }, [metrics])

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500'
    if (score >= 60) return 'text-yellow-500'
    if (score >= 40) return 'text-orange-500'
    return 'text-red-500'
  }

  const getScoreGradient = (score: number) => {
    if (score >= 80) return 'from-green-500 to-emerald-500'
    if (score >= 60) return 'from-yellow-500 to-orange-500'
    if (score >= 40) return 'from-orange-500 to-red-500'
    return 'from-red-500 to-red-700'
  }

  const getScoreLabel = (score: number) => {
    if (score >= 90) return 'Excellent'
    if (score >= 80) return 'Very Good'
    if (score >= 70) return 'Good'
    if (score >= 60) return 'Fair'
    if (score >= 50) return 'Poor'
    if (score >= 40) return 'Very Poor'
    return 'Critical'
  }

  const getRecommendations = (score: number) => {
    if (score >= 80) {
      return [
        'Maintain current initiatives',
        'Continue monitoring air quality',
        'Expand green infrastructure'
      ]
    } else if (score >= 60) {
      return [
        'Increase green space coverage',
        'Improve public transportation',
        'Implement air quality monitoring'
      ]
    } else if (score >= 40) {
      return [
        'Urgent: Reduce air pollution',
        'Plant more trees immediately',
        'Improve waste management systems'
      ]
    } else {
      return [
        'CRITICAL: Immediate action required',
        'Emergency air quality measures',
        'Rapid green infrastructure deployment'
      ]
    }
  }

  const metricCategories = [
    {
      name: 'Air Quality',
      value: metrics.airQuality,
      icon: '🌬️',
      description: 'Air pollution levels and quality'
    },
    {
      name: 'Temperature',
      value: metrics.temperature,
      icon: '🌡️',
      description: 'Urban heat island effect'
    },
    {
      name: 'Vegetation',
      value: metrics.vegetation,
      icon: '🌳',
      description: 'Green space coverage'
    },
    {
      name: 'Water Quality',
      value: metrics.waterQuality,
      icon: '💧',
      description: 'Water quality and availability'
    },
    {
      name: 'Waste Management',
      value: metrics.wasteManagement,
      icon: '♻️',
      description: 'Waste collection and processing'
    },
    {
      name: 'Public Health',
      value: metrics.publicHealth,
      icon: '🏥',
      description: 'Health infrastructure and outcomes'
    },
    {
      name: 'Transport',
      value: metrics.transportEfficiency,
      icon: '🚌',
      description: 'Public transportation efficiency'
    },
    {
      name: 'Energy',
      value: metrics.energyConsumption,
      icon: '⚡',
      description: 'Energy consumption patterns'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Main Health Index Card */}
      <motion.div 
        className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 rounded-2xl p-8 text-white relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12 animate-pulse" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">City Health Index</h2>
              <p className="text-blue-200">{city} Urban Health Assessment</p>
            </div>
            <div className="flex items-center space-x-2">
              {trend === 'up' && <ArrowUpIcon className="h-6 w-6 text-green-400" />}
              {trend === 'down' && <ArrowDownIcon className="h-6 w-6 text-red-400" />}
              {trend === 'stable' && <CheckCircleIcon className="h-6 w-6 text-blue-400" />}
              <span className="text-sm text-gray-300">
                {trend === 'up' ? 'Improving' : trend === 'down' ? 'Declining' : 'Stable'}
              </span>
            </div>
          </div>

          {/* Main Score Display */}
          <div className="flex items-center justify-center mb-8">
            <motion.div
              className="relative"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Circular Progress */}
              <div className="relative w-48 h-48">
                <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
                  {/* Background Circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="8"
                    fill="none"
                  />
                  {/* Progress Circle */}
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="url(#gradient)"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ strokeDasharray: '0 251.2' }}
                    animate={{ strokeDasharray: `${(overallScore / 100) * 251.2} 251.2` }}
                    transition={{ duration: 2, delay: 0.5 }}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#ef4444" />
                      <stop offset="50%" stopColor="#f59e0b" />
                      <stop offset="100%" stopColor="#22c55e" />
                    </linearGradient>
                  </defs>
                </svg>
                
                {/* Score Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.div
                    className="text-4xl font-bold"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1 }}
                  >
                    {overallScore}
                  </motion.div>
                  <div className="text-sm text-gray-300">Health Score</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Score Label and Description */}
          <div className="text-center">
            <motion.h3
              className={`text-2xl font-bold ${getScoreColor(overallScore)}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              {getScoreLabel(overallScore)}
            </motion.h3>
            <p className="text-gray-300 mt-2">
              {overallScore >= 80 ? 'Your city is performing excellently!' :
               overallScore >= 60 ? 'Good progress, but room for improvement.' :
               overallScore >= 40 ? 'Significant improvements needed.' :
               'Critical action required for urban health.'}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Detailed Metrics */}
      <motion.div 
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-soft"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          Health Metrics Breakdown
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metricCategories.map((metric, index) => (
            <motion.div
              key={metric.name}
              className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{metric.icon}</span>
                <span className={`text-lg font-bold ${
                  metric.value >= 80 ? 'text-green-500' :
                  metric.value >= 60 ? 'text-yellow-500' :
                  metric.value >= 40 ? 'text-orange-500' :
                  'text-red-500'
                }`}>
                  {metric.value}
                </span>
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                {metric.name}
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {metric.description}
              </p>
              <div className="mt-2 w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                <motion.div
                  className={`h-2 rounded-full bg-gradient-to-r ${
                    metric.value >= 80 ? 'from-green-500 to-emerald-500' :
                    metric.value >= 60 ? 'from-yellow-500 to-orange-500' :
                    metric.value >= 40 ? 'from-orange-500 to-red-500' :
                    'from-red-500 to-red-700'
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${metric.value}%` }}
                  transition={{ duration: 1, delay: 0.5 + (index * 0.1) }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recommendations */}
      <motion.div 
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-soft"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <div className="flex items-center space-x-2 mb-4">
          <InformationCircleIcon className="h-6 w-6 text-nasa-600" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            Recommendations
          </h3>
        </div>
        
        <div className="space-y-3">
          {getRecommendations(overallScore).map((recommendation, index) => (
            <motion.div
              key={index}
              className="flex items-start space-x-3 p-3 bg-nasa-50 dark:bg-nasa-900/20 rounded-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.6 + (index * 0.1) }}
            >
              <div className="w-2 h-2 bg-nasa-600 rounded-full mt-2 flex-shrink-0" />
              <p className="text-gray-700 dark:text-gray-300">{recommendation}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default CityHealthIndex
