'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Dashboard from '@/components/Dashboard'
import InteractiveMap from '@/components/InteractiveMap'
import DataVisualization from '@/components/DataVisualization'
import StakeholderEngagement from '@/components/StakeholderEngagement'
import ScenarioSimulation from '@/components/ScenarioSimulation'
import SurveySystem from '@/components/SurveySystem'
import AnalysisEngine from '@/components/AnalysisEngine'
import ReportGenerator from '@/components/ReportGenerator'
import WasteManagement from '@/components/WasteManagement'
import UrbanGrowthHousing from '@/components/UrbanGrowthHousing'
import CommunityReporting from '@/components/CommunityReporting'
import AIPredictions from '@/components/AIPredictions'
import UrbanGamification from '@/components/UrbanGamification'
import CityHealthIndex from '@/components/CityHealthIndex'

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [selectedCity, setSelectedCity] = useState('Mumbai, Maharashtra')

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'map', label: '3D Map', icon: '🗺️' },
    { id: 'ai', label: 'AI Predictions', icon: '🤖' },
    { id: 'game', label: 'City Builder', icon: '🎮' },
    { id: 'health', label: 'Health Index', icon: '❤️' },
    { id: 'waste', label: 'Waste Management', icon: '🗑️' },
    { id: 'growth', label: 'Urban Growth', icon: '🏗️' },
    { id: 'data', label: 'Data Analysis', icon: '📈' },
    { id: 'survey', label: 'Surveys', icon: '📋' },
    { id: 'analysis', label: 'Analysis Engine', icon: '🔬' },
    { id: 'reports', label: 'Reports', icon: '📄' },
    { id: 'scenarios', label: 'Scenarios', icon: '🔮' },
    { id: 'engagement', label: 'Community', icon: '👥' },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard selectedCity={selectedCity} />
      case 'map':
        return <InteractiveMap selectedCity={selectedCity} />
      case 'ai':
        return <AIPredictions city={selectedCity} />
      case 'game':
        return <UrbanGamification />
      case 'health':
        return <CityHealthIndex 
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
      case 'waste':
        return <WasteManagement />
      case 'growth':
        return <UrbanGrowthHousing />
      case 'data':
        return <DataVisualization selectedCity={selectedCity} />
      case 'survey':
        return <SurveySystem />
      case 'analysis':
        return <AnalysisEngine />
      case 'reports':
        return <ReportGenerator />
      case 'scenarios':
        return <ScenarioSimulation selectedCity={selectedCity} />
      case 'engagement':
        return <StakeholderEngagement selectedCity={selectedCity} />
      case 'community':
        return <CommunityReporting />
      default:
        return <Dashboard selectedCity={selectedCity} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header selectedCity={selectedCity} onCityChange={setSelectedCity} />
      
      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${
                  activeTab === tab.id
                    ? 'border-nasa-500 text-nasa-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {renderContent()}
      </main>
    </div>
  )
}
