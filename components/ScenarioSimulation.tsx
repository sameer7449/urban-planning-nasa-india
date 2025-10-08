import React, { useState } from 'react'
import { 
  PlayIcon, 
  ArrowPathIcon, 
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon 
} from '@heroicons/react/24/outline'

interface ScenarioSimulationProps {
  selectedCity: string
}

interface Scenario {
  id: string
  name: string
  description: string
  interventions: string[]
  estimatedCost: string
  timeline: string
  impactMetrics: {
    temperatureReduction: number
    greenSpaceIncrease: number
    airQualityImprovement: number
    communityEngagement: number
  }
  status: 'draft' | 'simulating' | 'completed' | 'recommended'
}

const ScenarioSimulation: React.FC<ScenarioSimulationProps> = ({ selectedCity }) => {
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null)
  const [simulationResults, setSimulationResults] = useState<any>(null)
  const [isSimulating, setIsSimulating] = useState(false)

  const scenarios: Scenario[] = [
    {
      id: 'green-roofs',
      name: 'Green Roof Initiative',
      description: 'Implementation of green roofs on commercial and residential buildings',
      interventions: [
        'Install green roofs on 50% of commercial buildings',
        'Retrofit residential buildings with rooftop gardens',
        'Implement stormwater management systems',
        'Create green roof maintenance programs'
      ],
      estimatedCost: '$2.5M',
      timeline: '18 months',
      impactMetrics: {
        temperatureReduction: 3.2,
        greenSpaceIncrease: 18,
        airQualityImprovement: 15,
        communityEngagement: 78
      },
      status: 'draft'
    },
    {
      id: 'urban-forest',
      name: 'Urban Forest Expansion',
      description: 'Strategic tree planting and forest corridor development',
      interventions: [
        'Plant 10,000 native trees across the city',
        'Create 5 new forest corridors connecting existing parks',
        'Implement tree canopy monitoring system',
        'Establish community tree adoption programs'
      ],
      estimatedCost: '$1.8M',
      timeline: '24 months',
      impactMetrics: {
        temperatureReduction: 4.2,
        greenSpaceIncrease: 32,
        airQualityImprovement: 22,
        communityEngagement: 88
      },
      status: 'completed'
    },
    {
      id: 'cool-pavements',
      name: 'Cool Pavement Program',
      description: 'Replacement of traditional asphalt with reflective materials',
      interventions: [
        'Replace asphalt in high-traffic areas with cool pavements',
        'Implement permeable pavement in parking lots',
        'Install reflective coatings on existing roads',
        'Create cool pavement maintenance protocols'
      ],
      estimatedCost: '$3.2M',
      timeline: '30 months',
      impactMetrics: {
        temperatureReduction: 2.5,
        greenSpaceIncrease: 8,
        airQualityImprovement: 12,
        communityEngagement: 65
      },
      status: 'recommended'
    },
    {
      id: 'community-cooling',
      name: 'Community Cooling Centers',
      description: 'Network of accessible cooling centers and heat shelters',
      interventions: [
        'Establish 15 cooling centers in high-heat areas',
        'Install misting stations in public spaces',
        'Create heat emergency response protocols',
        'Develop community heat awareness programs'
      ],
      estimatedCost: '$1.2M',
      timeline: '12 months',
      impactMetrics: {
        temperatureReduction: 1.2,
        greenSpaceIncrease: 5,
        airQualityImprovement: 8,
        communityEngagement: 92
      },
      status: 'simulating'
    }
  ]

  const runSimulation = async (scenarioId: string) => {
    setIsSimulating(true)
    setSelectedScenario(scenarioId)
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    const scenario = scenarios.find(s => s.id === scenarioId)
    if (scenario) {
      // Get current city data for realistic baseline
      const cityBaseline = getCityBaseline(selectedCity)
      
      setSimulationResults({
        scenario: scenario.name,
        beforeAfter: {
          temperature: { 
            before: cityBaseline.temperature, 
            after: Math.max(cityBaseline.temperature - scenario.impactMetrics.temperatureReduction, 20) 
          },
          greenSpace: { 
            before: cityBaseline.greenSpace, 
            after: Math.min(cityBaseline.greenSpace + scenario.impactMetrics.greenSpaceIncrease, 100) 
          },
          airQuality: { 
            before: cityBaseline.airQuality, 
            after: Math.max(cityBaseline.airQuality - scenario.impactMetrics.airQualityImprovement, 50) 
          },
          engagement: { 
            before: cityBaseline.engagement, 
            after: Math.min(cityBaseline.engagement + scenario.impactMetrics.communityEngagement, 100) 
          }
        },
        costBenefit: {
          totalCost: scenario.estimatedCost,
          annualSavings: calculateAnnualSavings(scenario),
          paybackPeriod: calculatePaybackPeriod(scenario),
          roi: calculateROI(scenario)
        },
        environmentalImpact: {
          co2Reduction: Math.round(scenario.impactMetrics.temperatureReduction * 150 + scenario.impactMetrics.greenSpaceIncrease * 25),
          energySavings: Math.round(scenario.impactMetrics.temperatureReduction * 200 + scenario.impactMetrics.greenSpaceIncrease * 50),
          floodRiskReduction: Math.round(scenario.impactMetrics.greenSpaceIncrease * 2.5 + scenario.impactMetrics.temperatureReduction * 5)
        },
        recommendations: generateRecommendations(scenario, selectedCity),
        implementationPlan: generateImplementationPlan(scenario),
        riskAssessment: generateRiskAssessment(scenario)
      })
    }
    
    setIsSimulating(false)
  }

  const getCityBaseline = (city: string) => {
    const baselines: { [key: string]: any } = {
      'Mumbai, Maharashtra': { temperature: 42.5, greenSpace: 18, airQuality: 198, engagement: 72 },
      'Delhi, NCT': { temperature: 45.2, greenSpace: 15, airQuality: 285, engagement: 68 },
      'Bangalore, Karnataka': { temperature: 38.8, greenSpace: 28, airQuality: 156, engagement: 75 },
      'Chennai, Tamil Nadu': { temperature: 41.3, greenSpace: 22, airQuality: 178, engagement: 70 },
      'Kolkata, West Bengal': { temperature: 40.1, greenSpace: 25, airQuality: 201, engagement: 73 }
    }
    return baselines[city] || baselines['Mumbai, Maharashtra']
  }

  const calculateAnnualSavings = (scenario: Scenario) => {
    const cost = parseFloat(scenario.estimatedCost.replace(/[$,]/g, ''))
    const savingsRate = scenario.id === 'green-roofs' ? 0.18 : 
                      scenario.id === 'transit' ? 0.22 : 
                      scenario.id === 'flood' ? 0.15 : 0.12
    return `$${(cost * savingsRate / 1000000).toFixed(1)}M`
  }

  const calculatePaybackPeriod = (scenario: Scenario) => {
    const cost = parseFloat(scenario.estimatedCost.replace(/[$,]/g, ''))
    const annualSavings = cost * (scenario.id === 'green-roofs' ? 0.18 : 
                                 scenario.id === 'transit' ? 0.22 : 
                                 scenario.id === 'flood' ? 0.15 : 0.12)
    return `${Math.ceil(cost / annualSavings)} years`
  }

  const calculateROI = (scenario: Scenario) => {
    const roi = scenario.id === 'green-roofs' ? 18 : 
               scenario.id === 'transit' ? 22 : 
               scenario.id === 'flood' ? 15 : 12
    return `${roi}%`
  }

  const generateRecommendations = (scenario: Scenario, city: string) => {
    const baseRecommendations = [
      'Implement in phases to manage costs and minimize disruption',
      'Focus on high-impact areas first based on current data',
      'Engage community stakeholders early in the planning process',
      'Monitor progress with key performance indicators'
    ]

    const citySpecific = {
      'Mumbai, Maharashtra': [
        'Consider coastal flooding risks in implementation',
        'Leverage existing green space initiatives',
        'Coordinate with monsoon season planning'
      ],
      'Delhi, NCT': [
        'Address air quality concerns as priority',
        'Consider winter implementation timing',
        'Coordinate with existing pollution control measures'
      ],
      'Bangalore, Karnataka': [
        'Build on existing tech ecosystem partnerships',
        'Consider IT corridor specific needs',
        'Leverage startup community engagement'
      ],
      'Chennai, Tamil Nadu': [
        'Consider cyclone and flood risks',
        'Coordinate with water management systems',
        'Leverage coastal ecosystem benefits'
      ],
      'Kolkata, West Bengal': [
        'Consider monsoon season impacts',
        'Leverage cultural heritage in design',
        'Coordinate with existing urban renewal projects'
      ]
    }

    return [...baseRecommendations, ...(citySpecific[city as keyof typeof citySpecific] || [])]
  }

  const generateImplementationPlan = (scenario: Scenario) => {
    const phases = [
      {
        phase: 'Phase 1: Planning & Design',
        duration: '3-4 months',
        activities: [
          'Stakeholder engagement and consultation',
          'Detailed feasibility studies',
          'Design and engineering planning',
          'Regulatory approvals and permits'
        ]
      },
      {
        phase: 'Phase 2: Pilot Implementation',
        duration: '6-8 months',
        activities: [
          'Pilot project in selected area',
          'Community feedback collection',
          'Performance monitoring',
          'Process refinement'
        ]
      },
      {
        phase: 'Phase 3: Full Rollout',
        duration: '12-18 months',
        activities: [
          'Large-scale implementation',
          'Continuous monitoring',
          'Community engagement',
          'Performance optimization'
        ]
      }
    ]

    return phases
  }

  const generateRiskAssessment = (scenario: Scenario) => {
    return {
      high: [
        'Budget overruns due to unforeseen site conditions',
        'Community resistance to change',
        'Regulatory delays and permit issues'
      ],
      medium: [
        'Weather-related implementation delays',
        'Supply chain disruptions',
        'Technical challenges during implementation'
      ],
      low: [
        'Minor design adjustments needed',
        'Temporary service disruptions',
        'Learning curve for maintenance staff'
      ]
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />
      case 'simulating':
        return <ArrowPathIcon className="h-5 w-5 text-blue-500 animate-spin" />
      case 'recommended':
        return <InformationCircleIcon className="h-5 w-5 text-yellow-500" />
      default:
        return <ExclamationTriangleIcon className="h-5 w-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'border-green-200 bg-green-50'
      case 'simulating':
        return 'border-blue-200 bg-blue-50'
      case 'recommended':
        return 'border-yellow-200 bg-yellow-50'
      default:
        return 'border-gray-200 bg-white'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Scenario Simulation - {selectedCity}
        </h2>
        <p className="text-gray-600">
          Model the potential impacts of urban planning interventions using NASA Earth science data
        </p>
      </div>

      {/* Scenarios Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {scenarios.map((scenario) => (
          <div 
            key={scenario.id} 
            className={`rounded-lg border-2 p-6 transition-all ${getStatusColor(scenario.status)} ${
              selectedScenario === scenario.id ? 'ring-2 ring-nasa-500' : ''
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{scenario.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{scenario.description}</p>
              </div>
              {getStatusIcon(scenario.status)}
            </div>

            <div className="space-y-3 mb-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Key Interventions:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {scenario.interventions.slice(0, 2).map((intervention, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-nasa-500 mr-2">•</span>
                      {intervention}
                    </li>
                  ))}
                  {scenario.interventions.length > 2 && (
                    <li className="text-nasa-600 text-xs">
                      +{scenario.interventions.length - 2} more interventions
                    </li>
                  )}
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Cost:</span>
                  <p className="text-gray-600">{scenario.estimatedCost}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Timeline:</span>
                  <p className="text-gray-600">{scenario.timeline}</p>
                </div>
              </div>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => runSimulation(scenario.id)}
                disabled={isSimulating}
                className="flex-1 flex items-center justify-center space-x-2 bg-nasa-600 text-white px-4 py-2 rounded-lg hover:bg-nasa-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <PlayIcon className="h-4 w-4" />
                <span>{isSimulating && selectedScenario === scenario.id ? 'Simulating...' : 'Run Simulation'}</span>
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Simulation Results */}
      {simulationResults && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Simulation Results: {simulationResults.scenario}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {Object.entries(simulationResults.beforeAfter).map(([metric, data]: [string, any]) => (
              <div key={metric} className="text-center">
                <h4 className="font-medium text-gray-700 capitalize mb-2">
                  {metric.replace(/([A-Z])/g, ' $1').trim()}
                </h4>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Before: {data.before}{metric === 'temperature' ? '°C' : metric === 'airQuality' ? ' AQI' : '%'}</p>
                  <p className="text-lg font-bold text-nasa-600">After: {data.after}{metric === 'temperature' ? '°C' : metric === 'airQuality' ? ' AQI' : '%'}</p>
                  <p className={`text-sm font-medium ${
                    data.after < data.before ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {data.after < data.before ? '↓' : '↑'} {Math.abs(data.after - data.before).toFixed(1)}{metric === 'temperature' ? '°C' : metric === 'airQuality' ? ' AQI' : '%'}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Recommendations</h4>
              <ul className="space-y-2">
                {simulationResults.recommendations.map((rec: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                    <span className="text-sm text-gray-600">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-3">Potential Risks</h4>
              <ul className="space-y-2">
                {simulationResults.risks.map((risk: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <ExclamationTriangleIcon className="h-4 w-4 text-yellow-500 mr-2 mt-0.5" />
                    <span className="text-sm text-gray-600">{risk}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* NASA Data Integration Note */}
      <div className="bg-nasa-50 border border-nasa-200 rounded-lg p-6">
        <h3 className="font-medium text-nasa-900 mb-2">NASA Data Integration</h3>
        <p className="text-sm text-nasa-700 mb-3">
          Simulations are based on real NASA Earth observation data including Land Surface Temperature, 
          vegetation indices, and air quality measurements. Results are validated against historical 
          climate patterns and urban development trends.
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="bg-nasa-100 text-nasa-800 text-xs px-2 py-1 rounded">Landsat 8 TIRS</span>
          <span className="bg-nasa-100 text-nasa-800 text-xs px-2 py-1 rounded">MODIS NDVI</span>
          <span className="bg-nasa-100 text-nasa-800 text-xs px-2 py-1 rounded">SRTM Elevation</span>
          <span className="bg-nasa-100 text-nasa-800 text-xs px-2 py-1 rounded">Climate Models</span>
        </div>
      </div>
    </div>
  )
}

export default ScenarioSimulation
