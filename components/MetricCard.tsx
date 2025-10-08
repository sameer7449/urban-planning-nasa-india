import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { DataSource } from '@/lib/dataSources'
import { InformationCircleIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline'

interface MetricCardProps {
  title: string
  value: string
  unit: string
  change: string
  changeType: 'increase' | 'decrease' | 'neutral'
  description: string
  source: DataSource
  timestamp: string
  uncertainty?: string
  icon: React.ComponentType<{ className?: string }>
  className?: string
  trend?: 'up' | 'down' | 'stable'
  priority?: 'low' | 'medium' | 'high' | 'critical'
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  unit,
  change,
  changeType,
  description,
  source,
  timestamp,
  uncertainty,
  icon: Icon,
  className = '',
  trend = 'stable',
  priority = 'medium'
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    })
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'border-l-red-500 bg-red-50 dark:bg-red-900/20'
      case 'high': return 'border-l-orange-500 bg-orange-50 dark:bg-orange-900/20'
      case 'medium': return 'border-l-blue-500 bg-blue-50 dark:bg-blue-900/20'
      case 'low': return 'border-l-green-500 bg-green-50 dark:bg-green-900/20'
      default: return 'border-l-gray-500 bg-gray-50 dark:bg-gray-900/20'
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '↗️'
      case 'down': return '↘️'
      case 'stable': return '→'
      default: return '→'
    }
  }

  const handleDownload = () => {
    // Create CSV data for this metric
    const csvData = [
      ['Metric', 'Value', 'Unit', 'Change', 'Timestamp', 'Source'],
      [title, value, unit, change, timestamp, `${source.name} ${source.dataset}`]
    ].map(row => row.join(',')).join('\n')
    
    const blob = new Blob([csvData], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${title.toLowerCase().replace(/\s+/g, '-')}-data.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <motion.div 
      className={`relative bg-white dark:bg-gray-800 rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 border-l-4 ${getPriorityColor(priority)} ${className}`}
      role="region" 
      aria-label={`${title} metric`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -2 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300" id={`${title.toLowerCase().replace(/\s+/g, '-')}-label`}>
                {title}
              </p>
              <span className="text-lg">{getTrendIcon(trend)}</span>
              <button
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                aria-label="Show metric information"
              >
                <InformationCircleIcon className="h-4 w-4" />
              </button>
            </div>
            
            <div className="flex items-baseline space-x-2 mb-2">
              <p className="text-3xl font-bold text-gray-900 dark:text-white" aria-describedby={`${title.toLowerCase().replace(/\s+/g, '-')}-label`}>
                {value}
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400">{unit}</p>
              {uncertainty && (
                <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                  ±{uncertainty}
                </span>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                changeType === 'increase' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' : 
                changeType === 'decrease' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : 
                'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
              }`}>
                {change} vs last month
              </span>
            </div>
          </div>
          
          <div className="flex flex-col items-end space-y-2">
            <motion.div
              animate={{ 
                scale: isHovered ? 1.1 : 1,
                rotate: isHovered ? 5 : 0
              }}
              transition={{ duration: 0.2 }}
            >
              <Icon className="h-8 w-8 text-nasa-600 dark:text-nasa-400" aria-hidden="true" />
            </motion.div>
            
            <button
              onClick={handleDownload}
              className="p-1.5 text-gray-400 hover:text-nasa-600 dark:hover:text-nasa-400 transition-colors"
              aria-label="Download metric data as CSV"
            >
              <ArrowDownTrayIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{description}</p>
        
        {/* Data Source Information */}
        <div className="space-y-2 text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center justify-between">
            <span className="font-medium">Source:</span>
            <span className="text-nasa-600 dark:text-nasa-400">{source.name}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium">Dataset:</span>
            <span className="truncate ml-2">{source.dataset}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium">Updated:</span>
            <span className="text-nasa-600 dark:text-nasa-400">{formatTimestamp(timestamp)}</span>
          </div>
        </div>
      </div>

      {/* Tooltip */}
      {showTooltip && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="absolute z-10 w-80 p-4 mt-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-strong"
          role="tooltip"
        >
          <div className="text-sm">
            <p className="font-semibold text-gray-900 dark:text-white mb-2">
              {title} - Detailed Information
            </p>
            <div className="space-y-1 text-gray-600 dark:text-gray-300">
              <p><span className="font-medium">Current Value:</span> {value} {unit}</p>
              <p><span className="font-medium">Change:</span> {change} vs last month</p>
              <p><span className="font-medium">Uncertainty:</span> {uncertainty || 'Not specified'}</p>
              <p><span className="font-medium">Data Source:</span> {source.name}</p>
              <p><span className="font-medium">Last Acquired:</span> {formatTimestamp(source.lastUpdated)}</p>
              <p><span className="font-medium">Last Processed:</span> {formatTimestamp(source.processingTime)}</p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default MetricCard
