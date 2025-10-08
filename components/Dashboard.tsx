import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  ChartBarIcon, 
  GlobeAltIcon, 
  ShieldCheckIcon, 
  UsersIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon 
} from '@heroicons/react/24/outline'
import MetricCard from './MetricCard'
import AQIBadge from './AQIBadge'
import AlertCard from './AlertCard'
import DataSourcesSection from './DataSourcesSection'
import CitySkyline from './CitySkyline'
import Interactive3DMap from './Interactive3DMap'
import UrbanGamification from './UrbanGamification'
import AIPredictions from './AIPredictions'
import CityHealthIndex from './CityHealthIndex'
import { dataSources, getAQIInfo } from '@/lib/dataSources'

interface DashboardProps {
  selectedCity: string
}

const Dashboard: React.FC<DashboardProps> = ({ selectedCity }) => {
  const currentTime = new Date().toISOString()
  const [selectedLayer, setSelectedLayer] = useState('aqi')
  const [selectedDistrict, setSelectedDistrict] = useState<any>(null)
  
  const metrics = [
    {
      title: 'Surface Temperature',
      value: '42',
      unit: '°C',
      change: '+3.2°C',
      changeType: 'increase' as const,
      icon: GlobeAltIcon,
      description: 'Average surface temperature from ECOSTRESS data',
      source: dataSources.ecostress,
      timestamp: currentTime,
      uncertainty: '1.5°C',
      trend: 'up' as const,
      priority: 'high' as const
    },
    {
      title: 'Urban Heat Index',
      value: '0.85',
      unit: 'scale 0-1',
      change: '+0.05',
      changeType: 'increase' as const,
      icon: GlobeAltIcon,
      description: 'Normalized heat index (0.85 = 42°C equivalent)',
      source: dataSources.ecostress,
      timestamp: currentTime,
      uncertainty: '0.02',
      trend: 'up' as const,
      
      priority: 'high' as const
    },
    {
      title: 'Green Space Coverage',
      value: '18',
      unit: '%',
      change: '-2.1%',
      changeType: 'decrease' as const,
      icon: ShieldCheckIcon,
      description: 'Percentage of urban area with vegetation',
      source: dataSources.landsat,
      timestamp: currentTime,
      uncertainty: '2%',
      trend: 'down' as const,
      priority: 'critical' as const
    },
    {
      title: 'Community Engagement',
      value: '92',
      unit: '%',
      change: '+7%',
      changeType: 'increase' as const,
      icon: UsersIcon,
      description: 'Resident participation in planning',
      source: { ...dataSources.viirs, name: 'Local Surveys', dataset: 'Community Engagement Data' },
      timestamp: currentTime,
      trend: 'up' as const,
      priority: 'low' as const
    }
  ]

  const alerts = [
    {
      type: 'critical' as const,
      title: 'High Heat Risk',
      message: 'Temperatures in central areas exceed 42°C threshold',
      action: 'Parks Department to prioritize tree planting in Ward 7',
      location: 'Ward 7, Central Mumbai',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() // 2 hours ago
    },
    {
      type: 'success' as const,
      title: 'Green Initiative Success',
      message: 'New park development reduced local temperature by 2°C',
      action: 'Continue similar initiatives in other high-heat areas',
      location: 'Phoenix MarketCity Area',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString() // 6 hours ago
    },
    {
      type: 'info' as const,
      title: 'Community Feedback',
      message: '67 new resident reports received this week',
      action: 'Review reports and prioritize high-impact issues',
      location: 'City-wide',
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString() // 12 hours ago
    }
  ]

  const recentActivities = [
    {
      time: '2 hours ago',
      action: 'New temperature data processed',
      type: 'data'
    },
    {
      time: '4 hours ago',
      action: 'Community survey responses analyzed',
      type: 'community'
    },
    {
      time: '6 hours ago',
      action: 'Flood risk assessment updated',
      type: 'environment'
    },
    {
      time: '1 day ago',
      action: 'City council meeting notes integrated',
      type: 'stakeholder'
    }
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div 
        className="bg-gradient-to-br from-nasa-600 via-nasa-700 to-blue-800 rounded-2xl p-8 text-white shadow-strong"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <motion.h2 
              className="text-3xl font-bold mb-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Welcome to {selectedCity} Urban Planning Dashboard
            </motion.h2>
            <motion.p 
              className="text-nasa-100 text-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Real-time insights from NASA Earth observation data to support sustainable urban development
            </motion.p>
          </div>
          <motion.div 
            className="text-right"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="text-sm text-nasa-200 mb-1">Last updated:</p>
            <p className="text-xl font-semibold">
              {new Date().toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                timeZoneName: 'short'
              })}
            </p>
            <div className="mt-2 flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-nasa-200">Live Data Stream</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Air Quality Section */}
      <motion.div 
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft p-8 border border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Air Quality Index</h3>
          <AQIBadge aqi={198} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Current AQI Level</p>
            <p className="text-5xl font-bold text-gray-900 dark:text-white mb-2">198</p>
            <div className="flex items-center space-x-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
                +25 vs last month
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">Unhealthy</span>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <p className="font-semibold text-gray-900 dark:text-white mb-2">Health Guidance:</p>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {getAQIInfo(198).guidance}
              </p>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
              <p><span className="font-medium">Source:</span> {dataSources.modis.name} {dataSources.modis.dataset}</p>
              <p><span className="font-medium">Last Updated:</span> {new Date(dataSources.modis.lastUpdated).toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <AQIBadge aqi={198} showLegend={true} />
        </div>
      </motion.div>

      {/* Key Metrics */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 * index }}
          >
            <MetricCard
              title={metric.title}
              value={metric.value}
              unit={metric.unit}
              change={metric.change}
              changeType={metric.changeType}
              description={metric.description}
              source={metric.source}
              timestamp={metric.timestamp}
              uncertainty={metric.uncertainty}
              icon={metric.icon}
              trend={metric.trend}
              priority={metric.priority}
            />
          </motion.div>
        ))}
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        {/* Alerts */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft border border-gray-200 dark:border-gray-700">
          <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">System Alerts</h3>
          </div>
          <div className="p-6 space-y-4">
            {alerts.map((alert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
              >
                <AlertCard
                  type={alert.type}
                  title={alert.title}
                  message={alert.message}
                  action={alert.action}
                  location={alert.location}
                  timestamp={alert.timestamp}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft border border-gray-200 dark:border-gray-700">
          <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Recent Activity</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                >
                  <div className={`w-3 h-3 rounded-full ${
                    activity.type === 'data' ? 'bg-blue-500' :
                    activity.type === 'community' ? 'bg-green-500' :
                    activity.type === 'environment' ? 'bg-yellow-500' :
                    'bg-purple-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.action}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div 
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft p-8 border border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.button 
            className="flex items-center justify-center space-x-3 bg-gradient-to-r from-nasa-600 to-nasa-700 text-white px-6 py-4 rounded-xl hover:from-nasa-700 hover:to-nasa-800 transition-all duration-300 shadow-medium hover:shadow-strong"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            aria-label="Generate comprehensive urban planning report"
          >
            <GlobeAltIcon className="h-6 w-6" />
            <span className="font-semibold">Generate Report</span>
          </motion.button>
          <motion.button 
            className="flex items-center justify-center space-x-3 bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-4 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-medium hover:shadow-strong"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            aria-label="Launch community survey for urban planning feedback"
          >
            <UsersIcon className="h-6 w-6" />
            <span className="font-semibold">Launch Survey</span>
          </motion.button>
          <motion.button 
            className="flex items-center justify-center space-x-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-4 rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-300 shadow-medium hover:shadow-strong"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            aria-label="Run data analysis on current urban metrics"
          >
            <ChartBarIcon className="h-6 w-6" />
            <span className="font-semibold">Run Analysis</span>
          </motion.button>
        </div>
      </motion.div>

      {/* City Health Index */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
      >
        <CityHealthIndex 
          city={selectedCity}
          metrics={{
            airQuality: 65,
            temperature: 58,
            vegetation: 45,
            waterQuality: 72,
            wasteManagement: 68,
            publicHealth: 75,
            transportEfficiency: 60,
            energyConsumption: 55
          }}
        />
      </motion.div>

      {/* 3D Interactive Map */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft p-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            3D Urban Visualization
          </h3>
          <div className="h-96">
            <Interactive3DMap 
              city={selectedCity}
              selectedLayer={selectedLayer}
              onDistrictClick={setSelectedDistrict}
            />
          </div>
        </div>
      </motion.div>

      {/* AI Predictions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.4 }}
      >
        <AIPredictions city={selectedCity} />
      </motion.div>

      {/* Urban Gamification */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.6 }}
      >
        <UrbanGamification />
      </motion.div>

      {/* Data Sources Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.8 }}
      >
        <DataSourcesSection />
      </motion.div>
    </div>
  )
}

export default Dashboard
