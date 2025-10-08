import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getAQIInfo, getAQIColor, aqiRanges } from '@/lib/dataSources'
import { InformationCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'

interface AQIBadgeProps {
  aqi: number
  className?: string
  showLegend?: boolean
}

const AQIBadge: React.FC<AQIBadgeProps> = ({ aqi, className = '', showLegend = false }) => {
  const [showTooltip, setShowTooltip] = useState(false)
  const aqiInfo = getAQIInfo(aqi)
  const colorClasses = getAQIColor(aqi)

  const getAQIIcon = (level: string) => {
    if (level.includes('Hazardous') || level.includes('Very Unhealthy')) {
      return <ExclamationTriangleIcon className="h-4 w-4" />
    }
    return <InformationCircleIcon className="h-4 w-4" />
  }

  return (
    <div className={`relative ${className}`}>
      <motion.div
        className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border-2 ${colorClasses} cursor-help transition-all duration-200 hover:scale-105`}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        role="button"
        tabIndex={0}
        aria-label={`AQI ${aqi} - ${aqiInfo.level}. ${aqiInfo.guidance}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="font-bold text-lg">{aqi}</span>
        <span className="ml-2 font-semibold">AQI</span>
        <span className="ml-2">{getAQIIcon(aqiInfo.level)}</span>
      </motion.div>
      
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute z-20 w-96 p-4 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl shadow-strong"
            role="tooltip"
          >
            <div className="text-sm">
              <div className="flex items-center space-x-2 mb-3">
                <div className={`w-4 h-4 rounded-full ${colorClasses.split(' ')[0]}`}></div>
                <p className="font-bold text-gray-900 dark:text-white text-lg">
                  AQI {aqi} — {aqiInfo.level}
                </p>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-3">
                {aqiInfo.guidance}
              </p>
              <div className="space-y-2 text-xs text-gray-500 dark:text-gray-400">
                <div className="flex justify-between">
                  <span className="font-medium">Range:</span>
                  <span>{aqiInfo.min}-{aqiInfo.max}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Health Impact:</span>
                  <span className="capitalize">{aqiInfo.level.toLowerCase()}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {showLegend && (
        <div className="mt-4">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">AQI Scale</h4>
          <div className="flex items-center space-x-1">
            {aqiRanges.map((range, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className="w-8 h-4 rounded-sm"
                  style={{ backgroundColor: range.color === 'green' ? '#00e400' : 
                                          range.color === 'yellow' ? '#ffff00' :
                                          range.color === 'orange' ? '#ff7e00' :
                                          range.color === 'red' ? '#ff0000' :
                                          range.color === 'purple' ? '#8f3f97' :
                                          '#7e0023' }}
                ></div>
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {range.min}-{range.max}
                </span>
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300 text-center">
                  {range.level.split(' ')[0]}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default AQIBadge
