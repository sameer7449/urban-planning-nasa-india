'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  CloudIcon, 
  SunIcon, 
  ExclamationTriangleIcon,
  ChartBarIcon,
  ClockIcon,
  ArrowUpIcon,
  ArrowDownIcon
} from '@heroicons/react/24/outline'

interface PredictionData {
  timestamp: string
  aqi: number
  temperature: number
  humidity: number
  windSpeed: number
  confidence: number
}

interface AIPredictionsProps {
  city: string
}

const AIPredictions: React.FC<AIPredictionsProps> = ({ city }) => {
  const [predictions, setPredictions] = useState<PredictionData[]>([])
  const [selectedMetric, setSelectedMetric] = useState<'aqi' | 'temperature' | 'humidity'>('aqi')
  const [isGenerating, setIsGenerating] = useState(false)
  const [showForecast, setShowForecast] = useState(false)

  // Generate AI predictions
  const generatePredictions = async () => {
    setIsGenerating(true)
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const baseData = {
      aqi: 198,
      temperature: 42,
      humidity: 65,
      windSpeed: 12
    }

    const newPredictions: PredictionData[] = []
    for (let i = 0; i < 24; i++) {
      const hour = new Date()
      hour.setHours(hour.getHours() + i)
      
      // Simulate realistic predictions with some randomness
      const aqiVariation = Math.sin(i * 0.3) * 20 + Math.random() * 10 - 5
      const tempVariation = Math.sin(i * 0.2) * 3 + Math.random() * 2 - 1
      
      newPredictions.push({
        timestamp: hour.toISOString(),
        aqi: Math.max(0, Math.min(500, baseData.aqi + aqiVariation)),
        temperature: Math.max(20, Math.min(50, baseData.temperature + tempVariation)),
        humidity: Math.max(20, Math.min(90, baseData.humidity + Math.random() * 10 - 5)),
        windSpeed: Math.max(0, baseData.windSpeed + Math.random() * 4 - 2),
        confidence: Math.max(0.6, 1 - (i * 0.02)) // Confidence decreases over time
      })
    }
    
    setPredictions(newPredictions)
    setIsGenerating(false)
    setShowForecast(true)
  }

  const getAQIColor = (aqi: number) => {
    if (aqi <= 50) return '#22c55e'
    if (aqi <= 100) return '#eab308'
    if (aqi <= 150) return '#f97316'
    if (aqi <= 200) return '#ef4444'
    if (aqi <= 300) return '#8b5cf6'
    return '#7c2d12'
  }

  const getAQILevel = (aqi: number) => {
    if (aqi <= 50) return 'Good'
    if (aqi <= 100) return 'Moderate'
    if (aqi <= 150) return 'Unhealthy for Sensitive'
    if (aqi <= 200) return 'Unhealthy'
    if (aqi <= 300) return 'Very Unhealthy'
    return 'Hazardous'
  }

  const getTemperatureColor = (temp: number) => {
    if (temp <= 25) return '#3b82f6'
    if (temp <= 30) return '#22c55e'
    if (temp <= 35) return '#eab308'
    if (temp <= 40) return '#f97316'
    return '#ef4444'
  }

  const getRiskLevel = (metric: string, value: number) => {
    if (metric === 'aqi') {
      if (value > 200) return { level: 'Critical', color: 'text-red-500', icon: ExclamationTriangleIcon }
      if (value > 150) return { level: 'High', color: 'text-orange-500', icon: ExclamationTriangleIcon }
      if (value > 100) return { level: 'Medium', color: 'text-yellow-500', icon: ExclamationTriangleIcon }
      return { level: 'Low', color: 'text-green-500', icon: ChartBarIcon }
    }
    
    if (metric === 'temperature') {
      if (value > 40) return { level: 'Critical', color: 'text-red-500', icon: ExclamationTriangleIcon }
      if (value > 35) return { level: 'High', color: 'text-orange-500', icon: ExclamationTriangleIcon }
      if (value > 30) return { level: 'Medium', color: 'text-yellow-500', icon: ExclamationTriangleIcon }
      return { level: 'Low', color: 'text-green-500', icon: ChartBarIcon }
    }
    
    return { level: 'Normal', color: 'text-blue-500', icon: ChartBarIcon }
  }

  return (
    <div className="space-y-6">
      {/* AI Prediction Header */}
      <motion.div 
        className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 rounded-2xl p-6 text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">AI-Powered Predictions</h2>
            <p className="text-purple-200">
              Advanced machine learning models predict urban health metrics for {city}
            </p>
          </div>
          <motion.button
            onClick={generatePredictions}
            disabled={isGenerating}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isGenerating ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Generating...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <ChartBarIcon className="h-5 w-5" />
                <span>Generate Forecast</span>
              </div>
            )}
          </motion.button>
        </div>

        {/* Metric Selector */}
        <div className="flex space-x-2">
          {[
            { key: 'aqi', label: 'Air Quality', icon: CloudIcon },
            { key: 'temperature', label: 'Temperature', icon: SunIcon },
            { key: 'humidity', label: 'Humidity', icon: ChartBarIcon }
          ].map((metric) => (
            <button
              key={metric.key}
              onClick={() => setSelectedMetric(metric.key as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                selectedMetric === metric.key
                  ? 'bg-white/20 text-white'
                  : 'bg-white/10 text-purple-200 hover:bg-white/15'
              }`}
            >
              <metric.icon className="h-4 w-4" />
              <span>{metric.label}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Predictions Display */}
      <AnimatePresence>
        {showForecast && predictions.length > 0 && (
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-soft"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              24-Hour Forecast: {selectedMetric.toUpperCase()}
            </h3>

            {/* Prediction Chart */}
            <div className="relative h-64 mb-6">
              <div className="absolute inset-0 flex items-end space-x-1">
                {predictions.slice(0, 24).map((prediction, index) => {
                  const value = prediction[selectedMetric]
                  const maxValue = selectedMetric === 'aqi' ? 500 : selectedMetric === 'temperature' ? 50 : 100
                  const height = (value / maxValue) * 100
                  const color = selectedMetric === 'aqi' ? getAQIColor(value) : 
                              selectedMetric === 'temperature' ? getTemperatureColor(value) : '#3b82f6'
                  
                  return (
                    <motion.div
                      key={index}
                      className="flex-1 bg-opacity-80 rounded-t"
                      style={{ 
                        height: `${height}%`,
                        backgroundColor: color
                      }}
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ duration: 0.5, delay: index * 0.02 }}
                    />
                  )
                })}
              </div>
              
              {/* Confidence Overlay */}
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                {predictions.slice(0, 24).map((prediction, index) => (
                  <motion.div
                    key={index}
                    className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-30"
                    style={{ 
                      left: `${(index / 23) * 100}%`,
                      opacity: prediction.confidence * 0.3
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: prediction.confidence * 0.3 }}
                    transition={{ duration: 0.5, delay: index * 0.02 }}
                  />
                ))}
              </div>
            </div>

            {/* Key Predictions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {predictions.slice(0, 3).map((prediction, index) => {
                const time = new Date(prediction.timestamp)
                const value = prediction[selectedMetric]
                const risk = getRiskLevel(selectedMetric, value)
                const RiskIcon = risk.icon

                return (
                  <motion.div
                    key={index}
                    className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <div className="flex items-center space-x-1">
                        <RiskIcon className={`h-4 w-4 ${risk.color}`} />
                        <span className={`text-xs font-medium ${risk.color}`}>
                          {risk.level}
                        </span>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {Math.round(value)}
                      {selectedMetric === 'temperature' && '°C'}
                      {selectedMetric === 'humidity' && '%'}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Confidence: {Math.round(prediction.confidence * 100)}%
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Risk Alerts */}
            <div className="mt-6">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Risk Alerts
              </h4>
              <div className="space-y-2">
                {predictions.filter(p => {
                  const value = p[selectedMetric]
                  return (selectedMetric === 'aqi' && value > 150) || 
                         (selectedMetric === 'temperature' && value > 35)
                }).slice(0, 3).map((prediction, index) => {
                  const time = new Date(prediction.timestamp)
                  const value = prediction[selectedMetric]
                  const risk = getRiskLevel(selectedMetric, value)
                  const RiskIcon = risk.icon

                  return (
                    <motion.div
                      key={index}
                      className="flex items-center space-x-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <RiskIcon className="h-5 w-5 text-red-500" />
                      <div className="flex-1">
                        <div className="font-medium text-red-900 dark:text-red-100">
                          {risk.level} Risk Alert
                        </div>
                        <div className="text-sm text-red-700 dark:text-red-300">
                          {time.toLocaleString()} - {Math.round(value)}
                          {selectedMetric === 'temperature' && '°C'}
                          {selectedMetric === 'aqi' && ' AQI'}
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default AIPredictions
