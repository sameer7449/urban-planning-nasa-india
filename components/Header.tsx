import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '@/contexts/ThemeContext'
import { 
  SunIcon, 
  MoonIcon, 
  InformationCircleIcon,
  GlobeAltIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline'

interface HeaderProps {
  selectedCity: string
  onCityChange: (city: string) => void
}

const Header: React.FC<HeaderProps> = ({ selectedCity, onCityChange }) => {
  const { isDark, toggleTheme } = useTheme()
  const [showDataSources, setShowDataSources] = useState(false)
  const [showAbout, setShowAbout] = useState(false)

  const cities = [
    'Mumbai, Maharashtra',
    'Delhi, NCT',
    'Bangalore, Karnataka',
    'Chennai, Tamil Nadu',
    'Kolkata, West Bengal'
  ]

  return (
    <header className="bg-white dark:bg-gray-900 shadow-soft border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <motion.div 
            className="flex items-center space-x-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center space-x-3">
              <motion.div 
                className="w-10 h-10 bg-gradient-to-br from-nasa-500 to-nasa-700 rounded-xl flex items-center justify-center shadow-medium"
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-white font-bold text-lg">🚀</span>
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Urban Planning with NASA Data
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Real-time Earth observation insights
                </p>
              </div>
            </div>
          </motion.div>
          
          <div className="flex items-center space-x-4">
            {/* City Selector */}
            <div className="flex items-center space-x-2">
              <label htmlFor="city-select" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Focus City:
              </label>
              <select
                id="city-select"
                value={selectedCity}
                onChange={(e) => onCityChange(e.target.value)}
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-nasa-500 focus:border-nasa-500 transition-colors"
              >
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Live Data Indicator */}
            <motion.div 
              className="flex items-center space-x-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 rounded-full"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-700 dark:text-green-300 font-medium">Live Data</span>
            </motion.div>

            {/* Navigation Links */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowDataSources(true)}
                className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-nasa-600 dark:hover:text-nasa-400 transition-colors"
                aria-label="View data sources"
              >
                <ChartBarIcon className="h-4 w-4" />
                <span>Data Sources</span>
              </button>
              
              <button
                onClick={() => setShowAbout(true)}
                className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-nasa-600 dark:hover:text-nasa-400 transition-colors"
                aria-label="About this project"
              >
                <InformationCircleIcon className="h-4 w-4" />
                <span>About</span>
              </button>

              {/* Dark Mode Toggle */}
              <motion.button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
              >
                {isDark ? (
                  <SunIcon className="h-5 w-5" />
                ) : (
                  <MoonIcon className="h-5 w-5" />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced Subtitle */}
      <motion.div 
        className="bg-gradient-to-r from-nasa-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 border-t border-gray-200 dark:border-gray-600"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-nasa-700 dark:text-nasa-300">
              Leveraging NASA Earth observation data to improve quality of life in fast-growing cities while considering environmental impacts
            </p>
            <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
              <span>Last updated: {new Date().toLocaleTimeString()}</span>
              <div className="flex items-center space-x-1">
                <GlobeAltIcon className="h-3 w-3" />
                <span>NASA Earth Science</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Data Sources Modal */}
      {showDataSources && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setShowDataSources(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Data Sources</h3>
            <div className="space-y-3 text-sm">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                This dashboard integrates multiple NASA Earth observation datasets for comprehensive urban planning insights.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {['ECOSTRESS', 'Landsat 8/9', 'VIIRS', 'MODIS', 'GRACE-FO', 'SMAP'].map((source) => (
                  <div key={source} className="p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
                    <h4 className="font-semibold text-gray-900 dark:text-white">{source}</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">
                      NASA Earth observation data
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={() => setShowDataSources(false)}
              className="mt-4 px-4 py-2 bg-nasa-600 text-white rounded-lg hover:bg-nasa-700 transition-colors"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}

      {/* About Modal */}
      {showAbout && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setShowAbout(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-lg w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">About This Project</h3>
            <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <p>
                This urban planning dashboard leverages NASA Earth observation data to provide real-time insights 
                for sustainable city development. Built with Next.js and powered by NASA's comprehensive Earth science datasets.
              </p>
              <p>
                Features include real-time air quality monitoring, urban heat island analysis, green space coverage tracking, 
                and community engagement tools for citizen science participation.
              </p>
            </div>
            <button
              onClick={() => setShowAbout(false)}
              className="mt-4 px-4 py-2 bg-nasa-600 text-white rounded-lg hover:bg-nasa-700 transition-colors"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </header>
  )
}

export default Header
