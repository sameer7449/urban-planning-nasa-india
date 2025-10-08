'use client'

import React, { useState } from 'react'
import {
  HomeIcon,
  BuildingOfficeIcon,
  MapPinIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  UsersIcon,
  TruckIcon
} from '@heroicons/react/24/outline'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area, ScatterChart, Scatter } from 'recharts'

const UrbanGrowthHousing: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState('Mumbai, Maharashtra')
  const [selectedView, setSelectedView] = useState<'growth' | 'housing' | 'infrastructure' | 'demographics'>('growth')

  const cities = [
    'Mumbai, Maharashtra',
    'Delhi, NCT', 
    'Bangalore, Karnataka',
    'Chennai, Tamil Nadu',
    'Kolkata, West Bengal'
  ]

  const growthData = {
    zones: [
      {
        id: 'zone-1',
        name: 'Bandra-Kurla Complex',
        type: 'Commercial',
        population: 45000,
        growthRate: 8.5,
        housingUnits: 1200,
        infrastructureScore: 85,
        priority: 'high',
        coordinates: [72.8500, 19.0500]
      },
      {
        id: 'zone-2',
        name: 'Powai',
        type: 'Mixed',
        population: 38000,
        growthRate: 12.3,
        housingUnits: 2800,
        infrastructureScore: 78,
        priority: 'high',
        coordinates: [72.9080, 19.1176]
      },
      {
        id: 'zone-3',
        name: 'Andheri West',
        type: 'Residential',
        population: 52000,
        growthRate: 6.8,
        housingUnits: 3500,
        infrastructureScore: 72,
        priority: 'medium',
        coordinates: [72.8277, 19.1136]
      },
      {
        id: 'zone-4',
        name: 'Thane',
        type: 'Residential',
        population: 68000,
        growthRate: 15.2,
        housingUnits: 4200,
        infrastructureScore: 65,
        priority: 'high',
        coordinates: [72.9667, 19.2000]
      },
      {
        id: 'zone-5',
        name: 'Navi Mumbai',
        type: 'Planned',
        population: 75000,
        growthRate: 18.7,
        housingUnits: 5500,
        infrastructureScore: 92,
        priority: 'low',
        coordinates: [73.0167, 19.0333]
      }
    ],
    housing: [
      { type: 'Affordable', units: 15000, demand: 25000, deficit: 10000, avgPrice: 4500000 },
      { type: 'Mid-range', units: 25000, demand: 30000, deficit: 5000, avgPrice: 8500000 },
      { type: 'Luxury', units: 8000, demand: 12000, deficit: 4000, avgPrice: 25000000 },
      { type: 'Social Housing', units: 5000, demand: 15000, deficit: 10000, avgPrice: 2000000 }
    ],
    infrastructure: [
      { type: 'Roads', coverage: 78, quality: 65, maintenance: 70, priority: 'high' },
      { type: 'Water Supply', coverage: 85, quality: 72, maintenance: 68, priority: 'high' },
      { type: 'Sewage', coverage: 70, quality: 58, maintenance: 62, priority: 'high' },
      { type: 'Electricity', coverage: 95, quality: 80, maintenance: 75, priority: 'medium' },
      { type: 'Internet', coverage: 88, quality: 85, maintenance: 82, priority: 'medium' },
      { type: 'Public Transport', coverage: 65, quality: 70, maintenance: 68, priority: 'high' }
    ]
  }

  const developmentProjects = [
    {
      id: 'project-1',
      name: 'Mumbai Metro Line 3',
      type: 'Transportation',
      status: 'Under Construction',
      budget: '₹23,000 Cr',
      completion: '2024',
      impact: 'High',
      description: 'Connecting Colaba to SEEPZ via 33.5 km underground corridor'
    },
    {
      id: 'project-2',
      name: 'Dharavi Redevelopment',
      type: 'Housing',
      status: 'Planning',
      budget: '₹25,000 Cr',
      completion: '2027',
      impact: 'Very High',
      description: 'Redevelopment of Asia\'s largest slum into modern residential complex'
    },
    {
      id: 'project-3',
      name: 'Mumbai Coastal Road',
      type: 'Infrastructure',
      status: 'Under Construction',
      budget: '₹12,000 Cr',
      completion: '2025',
      impact: 'High',
      description: '29.2 km coastal road connecting Marine Drive to Kandivali'
    },
    {
      id: 'project-4',
      name: 'Navi Mumbai Airport',
      type: 'Aviation',
      status: 'Under Construction',
      budget: '₹16,000 Cr',
      completion: '2025',
      impact: 'Very High',
      description: 'New international airport to decongest Mumbai Airport'
    }
  ]

  const demographicTrends = [
    { year: '2018', population: 12.4, density: 21000, migration: 2.1 },
    { year: '2019', population: 12.7, density: 21500, migration: 2.3 },
    { year: '2020', population: 12.9, density: 21800, migration: 1.8 },
    { year: '2021', population: 13.1, density: 22200, migration: 1.5 },
    { year: '2022', population: 13.4, density: 22700, migration: 2.0 },
    { year: '2023', population: 13.7, density: 23200, migration: 2.2 },
    { year: '2024', population: 14.0, density: 23700, migration: 2.5 }
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Under Construction': return 'text-blue-600 bg-blue-100'
      case 'Planning': return 'text-yellow-600 bg-yellow-100'
      case 'Completed': return 'text-green-600 bg-green-100'
      case 'On Hold': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'Very High': return 'text-purple-600'
      case 'High': return 'text-blue-600'
      case 'Medium': return 'text-yellow-600'
      case 'Low': return 'text-green-600'
      default: return 'text-gray-600'
    }
  }

  const getGrowthTrend = () => {
    return [
      { month: 'Jan', population: 13.2, housing: 1200, infrastructure: 75 },
      { month: 'Feb', population: 13.3, housing: 1250, infrastructure: 76 },
      { month: 'Mar', population: 13.4, housing: 1300, infrastructure: 77 },
      { month: 'Apr', population: 13.5, housing: 1350, infrastructure: 78 },
      { month: 'May', population: 13.6, housing: 1400, infrastructure: 79 },
      { month: 'Jun', population: 13.7, housing: 1450, infrastructure: 80 }
    ]
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center">
            <BuildingOfficeIcon className="h-6 w-6 mr-2 text-blue-600" />
            Urban Growth & Housing Analysis
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
                onClick={() => setSelectedView('growth')}
                className={`px-3 py-2 rounded-lg text-sm font-medium ${
                  selectedView === 'growth' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Growth
              </button>
              <button
                onClick={() => setSelectedView('housing')}
                className={`px-3 py-2 rounded-lg text-sm font-medium ${
                  selectedView === 'housing' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Housing
              </button>
              <button
                onClick={() => setSelectedView('infrastructure')}
                className={`px-3 py-2 rounded-lg text-sm font-medium ${
                  selectedView === 'infrastructure' 
                    ? 'bg-orange-100 text-orange-700' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Infrastructure
              </button>
              <button
                onClick={() => setSelectedView('demographics')}
                className={`px-3 py-2 rounded-lg text-sm font-medium ${
                  selectedView === 'demographics' 
                    ? 'bg-purple-100 text-purple-700' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Demographics
              </button>
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-600">Population Growth</p>
            <p className="text-2xl font-bold text-blue-900">12.5%</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-green-600">Housing Units</p>
            <p className="text-2xl font-bold text-green-900">53,000</p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <p className="text-sm text-orange-600">Infrastructure Score</p>
            <p className="text-2xl font-bold text-orange-900">78%</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-purple-600">Active Projects</p>
            <p className="text-2xl font-bold text-purple-900">{developmentProjects.length}</p>
          </div>
        </div>
      </div>

      {/* Growth Analysis */}
      {selectedView === 'growth' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Growth Zones Analysis</h3>
            <div className="space-y-4">
              {growthData.zones.map((zone) => (
                <div key={zone.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900">{zone.name}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(zone.priority)}`}>
                      {zone.priority} priority
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div>
                      <p className="text-gray-600">Population: <span className="font-semibold">{zone.population.toLocaleString()}</span></p>
                      <p className="text-gray-600">Growth Rate: <span className="font-semibold text-green-600">{zone.growthRate}%</span></p>
                    </div>
                    <div>
                      <p className="text-gray-600">Housing Units: <span className="font-semibold">{zone.housingUnits.toLocaleString()}</span></p>
                      <p className="text-gray-600">Infrastructure: <span className="font-semibold">{zone.infrastructureScore}%</span></p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      {zone.type}
                    </span>
                    <span className="text-xs text-gray-500">
                      {zone.coordinates[0]}, {zone.coordinates[1]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Growth Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={getGrowthTrend()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="population" stackId="1" stroke="#3b82f6" fill="#3b82f6" name="Population (M)" />
                <Area type="monotone" dataKey="housing" stackId="2" stroke="#10b981" fill="#10b981" name="Housing Units" />
                <Area type="monotone" dataKey="infrastructure" stackId="3" stroke="#f59e0b" fill="#f59e0b" name="Infrastructure Score" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Housing Analysis */}
      {selectedView === 'housing' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Housing Supply & Demand</h3>
            <div className="space-y-4">
              {growthData.housing.map((housing, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900">{housing.type}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      housing.deficit > 5000 ? 'bg-red-100 text-red-800' :
                      housing.deficit > 2000 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {housing.deficit.toLocaleString()} deficit
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div>
                      <p className="text-gray-600">Units Available: <span className="font-semibold">{housing.units.toLocaleString()}</span></p>
                      <p className="text-gray-600">Demand: <span className="font-semibold">{housing.demand.toLocaleString()}</span></p>
                    </div>
                    <div>
                      <p className="text-gray-600">Avg Price: <span className="font-semibold">₹{housing.avgPrice.toLocaleString()}</span></p>
                      <p className="text-gray-600">Deficit: <span className="font-semibold">{housing.deficit.toLocaleString()}</span></p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        housing.deficit > 5000 ? 'bg-red-500' :
                        housing.deficit > 2000 ? 'bg-yellow-500' :
                        'bg-green-500'
                      }`}
                      style={{ width: `${(housing.units / housing.demand) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Housing Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={growthData.housing}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="units" fill="#10b981" name="Available Units" />
                <Bar dataKey="demand" fill="#ef4444" name="Demand" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Infrastructure Analysis */}
      {selectedView === 'infrastructure' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Infrastructure Assessment</h3>
            <div className="space-y-4">
              {growthData.infrastructure.map((infra, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900">{infra.type}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(infra.priority)}`}>
                      {infra.priority} priority
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                    <div>
                      <p className="text-gray-600">Coverage: <span className="font-semibold">{infra.coverage}%</span></p>
                    </div>
                    <div>
                      <p className="text-gray-600">Quality: <span className="font-semibold">{infra.quality}%</span></p>
                    </div>
                    <div>
                      <p className="text-gray-600">Maintenance: <span className="font-semibold">{infra.maintenance}%</span></p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>Coverage</span>
                        <span>{infra.coverage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 bg-blue-500 rounded-full"
                          style={{ width: `${infra.coverage}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>Quality</span>
                        <span>{infra.quality}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 bg-green-500 rounded-full"
                          style={{ width: `${infra.quality}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Development Projects</h3>
            <div className="space-y-4">
              {developmentProjects.map((project) => (
                <div key={project.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900">{project.name}</h4>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(project.impact)}`}>
                        {project.impact} Impact
                      </span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 mb-3">
                    <p><strong>Type:</strong> {project.type}</p>
                    <p><strong>Budget:</strong> {project.budget}</p>
                    <p><strong>Completion:</strong> {project.completion}</p>
                  </div>
                  <p className="text-sm text-gray-700">{project.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Demographics Analysis */}
      {selectedView === 'demographics' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Demographic Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={demographicTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="population" stroke="#3b82f6" strokeWidth={2} name="Population (M)" />
                <Line type="monotone" dataKey="density" stroke="#10b981" strokeWidth={2} name="Density (per km²)" />
                <Line type="monotone" dataKey="migration" stroke="#f59e0b" strokeWidth={2} name="Migration Rate (%)" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Population Distribution</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-900">14.0M</p>
                  <p className="text-sm text-blue-600">Total Population</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-900">23,700</p>
                  <p className="text-sm text-green-600">Density per km²</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Age 0-14</span>
                  <span className="text-sm font-semibold">22%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Age 15-64</span>
                  <span className="text-sm font-semibold">68%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Age 65+</span>
                  <span className="text-sm font-semibold">10%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recommendations */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <ArrowTrendingUpIcon className="h-5 w-5 mr-2 text-green-500" />
          Development Recommendations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Housing Development</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                Prioritize affordable housing in high-growth zones
              </li>
              <li className="flex items-start">
                <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                Implement mixed-use development policies
              </li>
              <li className="flex items-start">
                <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                Fast-track slum redevelopment projects
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Infrastructure Investment</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                Expand public transportation network
              </li>
              <li className="flex items-start">
                <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                Upgrade water and sewage systems
              </li>
              <li className="flex items-start">
                <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                Develop smart city infrastructure
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UrbanGrowthHousing
