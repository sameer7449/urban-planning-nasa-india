import React, { useState } from 'react'
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from 'recharts'
import { 
  ChartBarIcon, 
  ArrowTrendingUpIcon, 
  CalendarIcon,
  ArrowDownTrayIcon 
} from '@heroicons/react/24/outline'

interface DataVisualizationProps {
  selectedCity: string
}

const DataVisualization: React.FC<DataVisualizationProps> = ({ selectedCity }) => {
  const [selectedMetric, setSelectedMetric] = useState('temperature')

  // Sample data - in a real application, this would come from NASA APIs
  const temperatureData = [
    { month: 'Jan', temperature: 28, baseline: 26 },
    { month: 'Feb', temperature: 30, baseline: 28 },
    { month: 'Mar', temperature: 32, baseline: 30 },
    { month: 'Apr', temperature: 35, baseline: 33 },
    { month: 'May', temperature: 38, baseline: 35 },
    { month: 'Jun', temperature: 40, baseline: 37 },
    { month: 'Jul', temperature: 42, baseline: 39 },
    { month: 'Aug', temperature: 41, baseline: 38 },
    { month: 'Sep', temperature: 38, baseline: 36 },
    { month: 'Oct', temperature: 35, baseline: 33 },
    { month: 'Nov', temperature: 31, baseline: 29 },
    { month: 'Dec', temperature: 29, baseline: 27 }
  ]

  const vegetationData = [
    { area: 'CBD', coverage: 8, target: 20 },
    { area: 'Residential', coverage: 22, target: 35 },
    { area: 'Industrial', coverage: 5, target: 15 },
    { area: 'Parks', coverage: 75, target: 85 },
    { area: 'Suburbs', coverage: 35, target: 45 }
  ]

  const airQualityData = [
    { name: 'Good', value: 15, color: '#00ff00' },
    { name: 'Moderate', value: 25, color: '#ffff00' },
    { name: 'Unhealthy for Sensitive', value: 35, color: '#ff8800' },
    { name: 'Unhealthy', value: 25, color: '#ff0000' }
  ]

  const stakeholderEngagement = [
    { week: 'Week 1', surveys: 67, meetings: 5, reports: 18 },
    { week: 'Week 2', surveys: 89, meetings: 7, reports: 25 },
    { week: 'Week 3', surveys: 112, meetings: 9, reports: 31 },
    { week: 'Week 4', surveys: 134, meetings: 11, reports: 38 },
    { week: 'Week 5', surveys: 156, meetings: 13, reports: 45 }
  ]

  const nasaDataInsights = [
    {
      title: 'Urban Heat Island Intensity',
      value: '+5.8°C',
      description: 'Average temperature increase in urban core vs. surrounding areas',
      source: 'Landsat 8 TIRS',
      trend: 'increasing'
    },
    {
      title: 'Green Space Deficit',
      value: '35% below target',
      description: 'Current vegetation coverage vs. recommended urban green space',
      source: 'MODIS NDVI',
      trend: 'improving'
    },
    {
      title: 'Air Quality Impact',
      value: '198 AQI',
      description: 'Current air quality index with poor health conditions',
      source: 'MODIS Aerosol',
      trend: 'stable'
    },
    {
      title: 'Community Participation',
      value: '92% engagement',
      description: 'Resident participation in planning initiatives',
      source: 'Community Surveys',
      trend: 'increasing'
    }
  ]

  const metrics = [
    { id: 'temperature', label: 'Temperature Trends', icon: '🌡️' },
    { id: 'vegetation', label: 'Vegetation Coverage', icon: '🌳' },
    { id: 'airquality', label: 'Air Quality Distribution', icon: '💨' },
    { id: 'engagement', label: 'Stakeholder Engagement', icon: '👥' }
  ]

  const renderChart = () => {
    switch (selectedMetric) {
      case 'temperature':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={temperatureData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis label={{ value: 'Temperature (°C)', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="temperature" 
                stroke="#ef4444" 
                fill="#ef4444" 
                fillOpacity={0.3}
                name="Urban Temperature"
              />
              <Area 
                type="monotone" 
                dataKey="baseline" 
                stroke="#6b7280" 
                fill="#6b7280" 
                fillOpacity={0.2}
                name="Rural Baseline"
              />
            </AreaChart>
          </ResponsiveContainer>
        )
      case 'vegetation':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={vegetationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="area" />
              <YAxis label={{ value: 'Coverage (%)', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Bar dataKey="coverage" fill="#22c55e" name="Current Coverage" />
              <Bar dataKey="target" fill="#6b7280" name="Target Coverage" />
            </BarChart>
          </ResponsiveContainer>
        )
      case 'airquality':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={airQualityData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {airQualityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        )
      case 'engagement':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={stakeholderEngagement}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="surveys" stroke="#3b82f6" name="Survey Responses" />
              <Line type="monotone" dataKey="meetings" stroke="#ef4444" name="Community Meetings" />
              <Line type="monotone" dataKey="reports" stroke="#22c55e" name="Incident Reports" />
            </LineChart>
          </ResponsiveContainer>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">
            Data Analysis - {selectedCity}
          </h2>
          <button className="flex items-center space-x-2 bg-nasa-600 text-white px-4 py-2 rounded-lg hover:bg-nasa-700 transition-colors">
            <ArrowDownTrayIcon className="h-4 w-4" />
            <span>Export Report</span>
          </button>
        </div>
        <p className="text-gray-600">
          Comprehensive analysis of NASA Earth observation data for urban planning decisions
        </p>
      </div>

      {/* Metric Selection */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Select Analysis Metric</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {metrics.map((metric) => (
            <button
              key={metric.id}
              onClick={() => setSelectedMetric(metric.id)}
              className={`p-4 rounded-lg border transition-colors ${
                selectedMetric === metric.id
                  ? 'border-nasa-500 bg-nasa-50 text-nasa-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-2xl mb-2">{metric.icon}</div>
              <p className="font-medium">{metric.label}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Chart Display */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          {metrics.find(m => m.id === selectedMetric)?.label}
        </h3>
        <div className="h-96">
          {renderChart()}
        </div>
      </div>

      {/* NASA Data Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {nasaDataInsights.map((insight, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900">{insight.title}</h4>
              <ArrowTrendingUpIcon className={`h-5 w-5 ${
                insight.trend === 'increasing' ? 'text-red-500' :
                insight.trend === 'improving' ? 'text-green-500' :
                'text-gray-500'
              }`} />
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-2">{insight.value}</p>
            <p className="text-sm text-gray-600 mb-2">{insight.description}</p>
            <p className="text-xs text-nasa-600">Source: {insight.source}</p>
          </div>
        ))}
      </div>

      {/* Data Sources */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">NASA Data Sources</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900">Landsat 8/9 Thermal Infrared</h4>
            <p className="text-sm text-gray-600 mt-1">
              Land Surface Temperature data for Urban Heat Island analysis
            </p>
            <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mt-2">
              Updated Daily
            </span>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900">MODIS Vegetation Index</h4>
            <p className="text-sm text-gray-600 mt-1">
              Normalized Difference Vegetation Index for green space analysis
            </p>
            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mt-2">
              Updated Daily
            </span>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900">MODIS Aerosol Optical Depth</h4>
            <p className="text-sm text-gray-600 mt-1">
              Air quality monitoring and pollution tracking
            </p>
            <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded mt-2">
              Updated Daily
            </span>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900">SRTM Topographical Data</h4>
            <p className="text-sm text-gray-600 mt-1">
              Elevation data for flood risk and infrastructure planning
            </p>
            <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded mt-2">
              Static Dataset
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DataVisualization
