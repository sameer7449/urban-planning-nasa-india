'use client'

import React, { useState } from 'react'
import {
  TrashIcon,
  ArrowPathIcon,
  MapPinIcon,
  ChartBarIcon,
  TruckIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts'

const WasteManagement: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState('Mumbai, Maharashtra')
  const [selectedView, setSelectedView] = useState<'collection' | 'disposal' | 'recycling' | 'facilities'>('collection')

  const cities = [
    'Mumbai, Maharashtra',
    'Delhi, NCT', 
    'Bangalore, Karnataka',
    'Chennai, Tamil Nadu',
    'Kolkata, West Bengal'
  ]

  const wasteData = {
    collection: [
      { zone: 'Zone 1', organic: 45, recyclable: 25, hazardous: 5, other: 25, efficiency: 85 },
      { zone: 'Zone 2', organic: 40, recyclable: 30, hazardous: 8, other: 22, efficiency: 78 },
      { zone: 'Zone 3', organic: 50, recyclable: 20, hazardous: 3, other: 27, efficiency: 92 },
      { zone: 'Zone 4', organic: 35, recyclable: 35, hazardous: 10, other: 20, efficiency: 70 },
      { zone: 'Zone 5', organic: 48, recyclable: 28, hazardous: 6, other: 18, efficiency: 88 }
    ],
    disposal: [
      { facility: 'Deonar Landfill', capacity: 2000, current: 1800, utilization: 90, type: 'Landfill' },
      { facility: 'Kanjurmarg Processing', capacity: 800, current: 650, utilization: 81, type: 'Processing' },
      { facility: 'Mulund Transfer Station', capacity: 500, current: 420, utilization: 84, type: 'Transfer' },
      { facility: 'Bhandup Composting', capacity: 300, current: 280, utilization: 93, type: 'Composting' }
    ],
    recycling: [
      { material: 'Paper', collected: 120, processed: 95, rate: 79 },
      { material: 'Plastic', collected: 85, processed: 60, rate: 71 },
      { material: 'Glass', collected: 45, processed: 40, rate: 89 },
      { material: 'Metal', collected: 30, processed: 28, rate: 93 },
      { material: 'Organic', collected: 200, processed: 180, rate: 90 }
    ]
  }

  const facilities = [
    {
      id: 'facility-1',
      name: 'Deonar Landfill',
      type: 'Landfill',
      location: 'Deonar, Mumbai',
      coordinates: [72.9500, 19.0167],
      capacity: 2000,
      currentLoad: 1800,
      status: 'high',
      services: ['Waste disposal', 'Methane capture', 'Leachate treatment'],
      lastUpdated: new Date()
    },
    {
      id: 'facility-2',
      name: 'Kanjurmarg Processing Plant',
      type: 'Processing',
      location: 'Kanjurmarg, Mumbai',
      coordinates: [72.9800, 19.1000],
      capacity: 800,
      currentLoad: 650,
      status: 'medium',
      services: ['Waste sorting', 'Recycling', 'Composting'],
      lastUpdated: new Date()
    },
    {
      id: 'facility-3',
      name: 'Mulund Transfer Station',
      type: 'Transfer',
      location: 'Mulund, Mumbai',
      coordinates: [72.9500, 19.1500],
      capacity: 500,
      currentLoad: 420,
      status: 'medium',
      services: ['Waste transfer', 'Temporary storage'],
      lastUpdated: new Date()
    }
  ]

  const collectionRoutes = [
    {
      id: 'route-1',
      name: 'Route A - Central Mumbai',
      zones: ['Zone 1', 'Zone 2'],
      distance: 25,
      efficiency: 85,
      vehicles: 8,
      frequency: 'Daily',
      lastOptimized: '2024-01-15'
    },
    {
      id: 'route-2',
      name: 'Route B - Western Suburbs',
      zones: ['Zone 3', 'Zone 4'],
      distance: 32,
      efficiency: 78,
      vehicles: 10,
      frequency: 'Daily',
      lastOptimized: '2024-01-10'
    },
    {
      id: 'route-3',
      name: 'Route C - Eastern Suburbs',
      zones: ['Zone 5'],
      distance: 18,
      efficiency: 92,
      vehicles: 6,
      frequency: 'Daily',
      lastOptimized: '2024-01-20'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'high': return 'text-red-600 bg-red-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 90) return 'text-green-600'
    if (efficiency >= 75) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getChartData = () => {
    return [
      { month: 'Jan', collected: 1200, recycled: 480, disposed: 720 },
      { month: 'Feb', collected: 1350, recycled: 540, disposed: 810 },
      { month: 'Mar', collected: 1280, recycled: 512, disposed: 768 },
      { month: 'Apr', collected: 1420, recycled: 568, disposed: 852 },
      { month: 'May', collected: 1380, recycled: 552, disposed: 828 },
      { month: 'Jun', collected: 1500, recycled: 600, disposed: 900 }
    ]
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center">
            <TrashIcon className="h-6 w-6 mr-2 text-green-600" />
            Waste Management Analysis
          </h2>
          <div className="flex items-center space-x-4">
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nasa-500"
            >
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
            <div className="flex space-x-2">
              <button
                onClick={() => setSelectedView('collection')}
                className={`px-3 py-2 rounded-lg text-sm font-medium ${
                  selectedView === 'collection' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Collection
              </button>
              <button
                onClick={() => setSelectedView('disposal')}
                className={`px-3 py-2 rounded-lg text-sm font-medium ${
                  selectedView === 'disposal' 
                    ? 'bg-red-100 text-red-700' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Disposal
              </button>
              <button
                onClick={() => setSelectedView('recycling')}
                className={`px-3 py-2 rounded-lg text-sm font-medium ${
                  selectedView === 'recycling' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Recycling
              </button>
              <button
                onClick={() => setSelectedView('facilities')}
                className={`px-3 py-2 rounded-lg text-sm font-medium ${
                  selectedView === 'facilities' 
                    ? 'bg-purple-100 text-purple-700' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Facilities
              </button>
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-green-600">Collection Efficiency</p>
            <p className="text-2xl font-bold text-green-900">82%</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-600">Recycling Rate</p>
            <p className="text-2xl font-bold text-blue-900">68%</p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <p className="text-sm text-orange-600">Active Facilities</p>
            <p className="text-2xl font-bold text-orange-900">{facilities.length}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-purple-600">Collection Routes</p>
            <p className="text-2xl font-bold text-purple-900">{collectionRoutes.length}</p>
          </div>
        </div>
      </div>

      {/* Collection Analysis */}
      {selectedView === 'collection' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Waste Collection by Zone</h3>
            <div className="space-y-4">
              {wasteData.collection.map((zone, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{zone.zone}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEfficiencyColor(zone.efficiency)}`}>
                      {zone.efficiency}% efficient
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Organic: <span className="font-semibold">{zone.organic}%</span></p>
                      <p className="text-gray-600">Recyclable: <span className="font-semibold">{zone.recyclable}%</span></p>
                    </div>
                    <div>
                      <p className="text-gray-600">Hazardous: <span className="font-semibold">{zone.hazardous}%</span></p>
                      <p className="text-gray-600">Other: <span className="font-semibold">{zone.other}%</span></p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Collection Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={getChartData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="collected" stroke="#10b981" strokeWidth={2} name="Collected (tons)" />
                <Line type="monotone" dataKey="recycled" stroke="#3b82f6" strokeWidth={2} name="Recycled (tons)" />
                <Line type="monotone" dataKey="disposed" stroke="#ef4444" strokeWidth={2} name="Disposed (tons)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Disposal Analysis */}
      {selectedView === 'disposal' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Disposal Facilities</h3>
            <div className="space-y-4">
              {wasteData.disposal.map((facility, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{facility.facility}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      facility.utilization > 90 ? 'bg-red-100 text-red-800' :
                      facility.utilization > 75 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {facility.utilization}% utilized
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mb-3">
                    <p><strong>Type:</strong> {facility.type}</p>
                    <p><strong>Capacity:</strong> {facility.capacity} tons/day</p>
                    <p><strong>Current Load:</strong> {facility.current} tons/day</p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        facility.utilization > 90 ? 'bg-red-500' :
                        facility.utilization > 75 ? 'bg-yellow-500' :
                        'bg-green-500'
                      }`}
                      style={{ width: `${facility.utilization}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Facility Utilization</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={wasteData.disposal}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="facility" />
                <YAxis domain={[0, 100]} />
                <Tooltip formatter={(value) => [`${value}%`, 'Utilization']} />
                <Bar dataKey="utilization" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Recycling Analysis */}
      {selectedView === 'recycling' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recycling Performance</h3>
            <div className="space-y-4">
              {wasteData.recycling.map((material, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{material.material}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      material.rate >= 85 ? 'bg-green-100 text-green-800' :
                      material.rate >= 70 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {material.rate}% processed
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mb-3">
                    <p><strong>Collected:</strong> {material.collected} tons/month</p>
                    <p><strong>Processed:</strong> {material.processed} tons/month</p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        material.rate >= 85 ? 'bg-green-500' :
                        material.rate >= 70 ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${material.rate}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recycling Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={wasteData.recycling}
                  dataKey="processed"
                  nameKey="material"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {wasteData.recycling.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'][index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Facilities Analysis */}
      {selectedView === 'facilities' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Waste Management Facilities</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {facilities.map((facility) => (
                <div key={facility.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900">{facility.name}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(facility.status)}`}>
                      {facility.status} load
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mb-3">
                    <p><strong>Type:</strong> {facility.type}</p>
                    <p><strong>Location:</strong> {facility.location}</p>
                    <p><strong>Capacity:</strong> {facility.capacity} tons/day</p>
                    <p><strong>Current Load:</strong> {facility.currentLoad} tons/day</p>
                  </div>
                  <div className="mb-3">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Utilization</span>
                      <span>{Math.round((facility.currentLoad / facility.capacity) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          facility.currentLoad / facility.capacity > 0.9 ? 'bg-red-500' :
                          facility.currentLoad / facility.capacity > 0.75 ? 'bg-yellow-500' :
                          'bg-green-500'
                        }`}
                        style={{ width: `${(facility.currentLoad / facility.capacity) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-1">Services:</p>
                    <div className="flex flex-wrap gap-1">
                      {facility.services.map((service, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Collection Routes</h3>
            <div className="space-y-4">
              {collectionRoutes.map((route) => (
                <div key={route.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900">{route.name}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEfficiencyColor(route.efficiency)}`}>
                      {route.efficiency}% efficient
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <div>
                      <p><strong>Zones:</strong> {route.zones.join(', ')}</p>
                      <p><strong>Distance:</strong> {route.distance} km</p>
                    </div>
                    <div>
                      <p><strong>Vehicles:</strong> {route.vehicles}</p>
                      <p><strong>Frequency:</strong> {route.frequency}</p>
                    </div>
                  </div>
                  <div className="mt-3 text-xs text-gray-500">
                    Last optimized: {route.lastOptimized}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Recommendations */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <ArrowPathIcon className="h-5 w-5 mr-2 text-blue-500" />
          Improvement Recommendations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Collection Optimization</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                Implement dynamic routing based on real-time waste levels
              </li>
              <li className="flex items-start">
                <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                Increase collection frequency in high-density areas
              </li>
              <li className="flex items-start">
                <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                Deploy smart bins with fill-level sensors
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Recycling Enhancement</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                Expand recycling facilities in underserved areas
              </li>
              <li className="flex items-start">
                <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                Implement community education programs
              </li>
              <li className="flex items-start">
                <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                Introduce incentive programs for recycling
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WasteManagement
