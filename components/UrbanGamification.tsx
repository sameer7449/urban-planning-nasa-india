'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  SparklesIcon, 
  BuildingOfficeIcon, 
  TruckIcon,
  SunIcon,
  CloudIcon,
  HeartIcon,
  TrophyIcon,
  StarIcon
} from '@heroicons/react/24/outline'

interface Intervention {
  id: string
  name: string
  type: 'tree' | 'park' | 'transport' | 'building' | 'solar'
  cost: number
  impact: {
    aqi: number
    temperature: number
    vegetation: number
    health: number
  }
  icon: React.ComponentType<{ className?: string }>
  color: string
  description: string
}

interface Mission {
  id: string
  title: string
  description: string
  target: string
  current: number
  targetValue: number
  reward: number
  completed: boolean
  icon: React.ComponentType<{ className?: string }>
}

const UrbanGamification: React.FC = () => {
  const [selectedIntervention, setSelectedIntervention] = useState<Intervention | null>(null)
  const [cityMetrics, setCityMetrics] = useState({
    aqi: 198,
    temperature: 42,
    vegetation: 18,
    health: 65,
    budget: 1000000
  })
  const [interventions, setInterventions] = useState<Intervention[]>([])
  const [missions, setMissions] = useState<Mission[]>([])
  const [showResults, setShowResults] = useState(false)

  const availableInterventions: Intervention[] = [
    {
      id: 'tree-planting',
      name: 'Plant Trees',
      type: 'tree',
      cost: 50000,
      impact: { aqi: -15, temperature: -2, vegetation: 5, health: 8 },
      icon: SparklesIcon,
      color: '#22c55e',
      description: 'Plant 1000 trees in urban areas'
    },
    {
      id: 'urban-park',
      name: 'Create Urban Park',
      type: 'park',
      cost: 200000,
      impact: { aqi: -25, temperature: -4, vegetation: 15, health: 15 },
      icon: BuildingOfficeIcon,
      color: '#10b981',
      description: 'Build a 5-acre urban park with green infrastructure'
    },
    {
      id: 'electric-transport',
      name: 'Electric Transport',
      type: 'transport',
      cost: 300000,
      impact: { aqi: -30, temperature: -1, vegetation: 0, health: 12 },
      icon: TruckIcon,
      color: '#3b82f6',
      description: 'Deploy electric buses and charging stations'
    },
    {
      id: 'green-building',
      name: 'Green Building',
      type: 'building',
      cost: 150000,
      impact: { aqi: -10, temperature: -3, vegetation: 8, health: 6 },
      icon: BuildingOfficeIcon,
      color: '#8b5cf6',
      description: 'Retrofit buildings with green roofs and walls'
    },
    {
      id: 'solar-farm',
      name: 'Solar Farm',
      type: 'solar',
      cost: 400000,
      impact: { aqi: -20, temperature: -2, vegetation: 0, health: 10 },
      icon: SunIcon,
      color: '#f59e0b',
      description: 'Install solar panels on rooftops and open spaces'
    }
  ]

  const availableMissions: Mission[] = [
    {
      id: 'reduce-pollution',
      title: 'Clean Air Challenge',
      description: 'Reduce AQI below 150 in downtown area',
      target: 'AQI',
      current: 198,
      targetValue: 150,
      reward: 50000,
      completed: false,
      icon: CloudIcon
    },
    {
      id: 'increase-greenery',
      title: 'Green City Mission',
      description: 'Increase vegetation coverage to 30%',
      target: 'Vegetation',
      current: 18,
      targetValue: 30,
      reward: 75000,
      completed: false,
      icon: SparklesIcon
    },
    {
      id: 'cool-city',
      title: 'Cool City Initiative',
      description: 'Reduce average temperature below 38°C',
      target: 'Temperature',
      current: 42,
      targetValue: 38,
      reward: 100000,
      completed: false,
      icon: SunIcon
    }
  ]

  useEffect(() => {
    setMissions(availableMissions)
  }, [])

  const handleInterventionSelect = (intervention: Intervention) => {
    setSelectedIntervention(intervention)
  }

  const handleInterventionApply = () => {
    if (!selectedIntervention) return

    if (cityMetrics.budget >= selectedIntervention.cost) {
      const newMetrics = {
        aqi: Math.max(0, cityMetrics.aqi + selectedIntervention.impact.aqi),
        temperature: Math.max(20, cityMetrics.temperature + selectedIntervention.impact.temperature),
        vegetation: Math.min(100, cityMetrics.vegetation + selectedIntervention.impact.vegetation),
        health: Math.min(100, cityMetrics.health + selectedIntervention.impact.health),
        budget: cityMetrics.budget - selectedIntervention.cost
      }

      setCityMetrics(newMetrics)
      setInterventions([...interventions, selectedIntervention])
      setShowResults(true)
      setSelectedIntervention(null)

      // Check mission completion
      checkMissionCompletion(newMetrics)
    }
  }

  const checkMissionCompletion = (metrics: typeof cityMetrics) => {
    setMissions(prevMissions => 
      prevMissions.map(mission => {
        let current = 0
        switch (mission.target) {
          case 'AQI':
            current = metrics.aqi
            break
          case 'Vegetation':
            current = metrics.vegetation
            break
          case 'Temperature':
            current = metrics.temperature
            break
        }

        const completed = mission.target === 'Temperature' ? 
          current <= mission.targetValue : 
          current >= mission.targetValue

        if (completed && !mission.completed) {
          // Award reward
          setCityMetrics(prev => ({
            ...prev,
            budget: prev.budget + mission.reward
          }))
        }

        return { ...mission, current, completed }
      })
    )
  }

  const getHealthColor = (health: number) => {
    if (health >= 80) return 'text-green-400'
    if (health >= 60) return 'text-yellow-400'
    if (health >= 40) return 'text-orange-400'
    return 'text-red-400'
  }

  return (
    <div className="space-y-6">
      {/* City Health Dashboard */}
      <motion.div 
        className="bg-gradient-to-br from-gray-900 to-blue-900 rounded-2xl p-6 text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">City Health Dashboard</h2>
          <div className="flex items-center space-x-2">
            <TrophyIcon className="h-6 w-6 text-yellow-400" />
            <span className="text-lg font-semibold">Budget: ${cityMetrics.budget.toLocaleString()}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-black/30 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <CloudIcon className="h-5 w-5 text-blue-400" />
              <span className="text-sm">Air Quality</span>
            </div>
            <div className="text-2xl font-bold">{cityMetrics.aqi}</div>
            <div className="text-xs text-gray-400">AQI</div>
          </div>

          <div className="bg-black/30 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <SunIcon className="h-5 w-5 text-orange-400" />
              <span className="text-sm">Temperature</span>
            </div>
            <div className="text-2xl font-bold">{cityMetrics.temperature}°C</div>
            <div className="text-xs text-gray-400">Average</div>
          </div>

          <div className="bg-black/30 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <SparklesIcon className="h-5 w-5 text-green-400" />
              <span className="text-sm">Vegetation</span>
            </div>
            <div className="text-2xl font-bold">{cityMetrics.vegetation}%</div>
            <div className="text-xs text-gray-400">Coverage</div>
          </div>

          <div className="bg-black/30 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <HeartIcon className="h-5 w-5 text-red-400" />
              <span className="text-sm">Health Index</span>
            </div>
            <div className={`text-2xl font-bold ${getHealthColor(cityMetrics.health)}`}>
              {cityMetrics.health}
            </div>
            <div className="text-xs text-gray-400">Score</div>
          </div>
        </div>
      </motion.div>

      {/* Interventions Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Available Interventions */}
        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-soft"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Urban Interventions
          </h3>
          <div className="space-y-3">
            {availableInterventions.map((intervention) => (
              <motion.div
                key={intervention.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                  selectedIntervention?.id === intervention.id
                    ? 'border-nasa-500 bg-nasa-50 dark:bg-nasa-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
                onClick={() => handleInterventionSelect(intervention)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center space-x-3">
                  <div 
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: `${intervention.color}20` }}
                  >
                    <intervention.icon 
                      className="h-6 w-6" 
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {intervention.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {intervention.description}
                    </p>
                    <div className="flex items-center space-x-4 mt-2 text-xs">
                      <span className="text-gray-500">Cost: ${intervention.cost.toLocaleString()}</span>
                      <span className="text-green-600">AQI: {intervention.impact.aqi}</span>
                      <span className="text-blue-600">Temp: {intervention.impact.temperature}°C</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {selectedIntervention && (
            <motion.div
              className="mt-4 p-4 bg-nasa-50 dark:bg-nasa-900/20 rounded-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Selected: {selectedIntervention.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Cost: ${selectedIntervention.cost.toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={handleInterventionApply}
                  disabled={cityMetrics.budget < selectedIntervention.cost}
                  className="px-4 py-2 bg-nasa-600 text-white rounded-lg hover:bg-nasa-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  Apply Intervention
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Missions */}
        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-soft"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            City Missions
          </h3>
          <div className="space-y-4">
            {missions.map((mission) => (
              <motion.div
                key={mission.id}
                className={`p-4 rounded-lg border ${
                  mission.completed 
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
                    : 'border-gray-200 dark:border-gray-700'
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-start space-x-3">
                  <mission.icon className={`h-6 w-6 ${
                    mission.completed ? 'text-green-500' : 'text-gray-400'
                  }`} />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {mission.title}
                      </h4>
                      {mission.completed && (
                        <StarIcon className="h-4 w-4 text-yellow-500" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {mission.description}
                    </p>
                    <div className="flex items-center space-x-4 text-xs">
                      <span>Progress: {mission.current}/{mission.targetValue}</span>
                      <span className="text-green-600">Reward: ${mission.reward.toLocaleString()}</span>
                    </div>
                    <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-nasa-600 h-2 rounded-full transition-all duration-500"
                        style={{ 
                          width: `${Math.min(100, (mission.current / mission.targetValue) * 100)}%` 
                        }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Results Animation */}
      <AnimatePresence>
        {showResults && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowResults(false)}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md mx-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <motion.div
                  className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5 }}
                >
                  <TrophyIcon className="h-8 w-8 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Intervention Applied!
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Your city's health metrics have been updated.
                </p>
                <button
                  onClick={() => setShowResults(false)}
                  className="px-6 py-2 bg-nasa-600 text-white rounded-lg hover:bg-nasa-700 transition-colors"
                >
                  Continue
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default UrbanGamification
