'use client'

import React, { useState, useEffect } from 'react'
import {
  ChartBarIcon,
  CpuChipIcon,
  DocumentChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts'

interface AnalysisResult {
  category: string
  score: number
  trend: 'improving' | 'declining' | 'stable'
  insights: string[]
  recommendations: string[]
  priority: 'high' | 'medium' | 'low'
}

interface SurveyData {
  id: string
  timestamp: Date
  responses: { [key: string]: any }
  location: string
  userType: string
}

export default function AnalysisEngine() {
  const [surveyData, setSurveyData] = useState<SurveyData[]>([])
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d')

  useEffect(() => {
    loadSurveyData()
  }, [])

  const loadSurveyData = () => {
    const savedData = localStorage.getItem('urban-planning-surveys')
    if (savedData) {
      const data = JSON.parse(savedData).map((item: any) => ({
        ...item,
        timestamp: new Date(item.timestamp)
      }))
      setSurveyData(data)
    }
  }

  const runAnalysis = async () => {
    setIsAnalyzing(true)
    
    // Simulate analysis processing time
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const results = analyzeData()
    setAnalysisResults(results)
    setIsAnalyzing(false)
  }

  const analyzeData = (): AnalysisResult[] => {
    const categories = ['heat', 'green-space', 'air-quality', 'infrastructure']
    const results: AnalysisResult[] = []

    categories.forEach(category => {
      const categoryData = surveyData.filter(survey => 
        Object.keys(survey.responses).some(key => 
          key.startsWith(category)
        )
      )

      if (categoryData.length === 0) {
        results.push({
          category,
          score: 0,
          trend: 'stable',
          insights: ['No data available for analysis'],
          recommendations: ['Encourage more survey participation'],
          priority: 'low'
        })
        return
      }

      // Calculate average score for this category
      let totalScore = 0
      let responseCount = 0

      categoryData.forEach(survey => {
        Object.entries(survey.responses).forEach(([key, value]) => {
          if (key.startsWith(category) && typeof value === 'number') {
            totalScore += value
            responseCount++
          }
        })
      })

      const averageScore = responseCount > 0 ? totalScore / responseCount : 0
      
      // Determine trend (simplified logic)
      const trend = averageScore >= 4 ? 'improving' : averageScore <= 2 ? 'declining' : 'stable'
      
      // Generate insights and recommendations
      const insights = generateInsights(category, averageScore, categoryData.length)
      const recommendations = generateRecommendations(category, averageScore, trend)
      const priority = averageScore <= 2 ? 'high' : averageScore <= 3 ? 'medium' : 'low'

      results.push({
        category,
        score: Math.round(averageScore * 10) / 10,
        trend,
        insights,
        recommendations,
        priority
      })
    })

    return results
  }

  const generateInsights = (category: string, score: number, responseCount: number): string[] => {
    const insights: string[] = []
    
    if (responseCount < 5) {
      insights.push(`Limited data available (${responseCount} responses)`)
    }

    switch (category) {
      case 'heat':
        if (score <= 2) {
          insights.push('Residents report severe heat discomfort')
          insights.push('Urban heat island effect is significant')
        } else if (score >= 4) {
          insights.push('Heat management is generally effective')
        } else {
          insights.push('Moderate heat stress reported')
        }
        break
      
      case 'green-space':
        if (score <= 2) {
          insights.push('Insufficient green space coverage')
          insights.push('High demand for more parks and vegetation')
        } else if (score >= 4) {
          insights.push('Good green space availability')
        } else {
          insights.push('Moderate green space satisfaction')
        }
        break
      
      case 'air-quality':
        if (score <= 2) {
          insights.push('Poor air quality affecting residents')
          insights.push('Pollution sources need immediate attention')
        } else if (score >= 4) {
          insights.push('Air quality is generally acceptable')
        } else {
          insights.push('Air quality concerns present')
        }
        break
      
      case 'infrastructure':
        if (score <= 2) {
          insights.push('Infrastructure needs significant improvement')
          insights.push('Flood risk management inadequate')
        } else if (score >= 4) {
          insights.push('Infrastructure is well-maintained')
        } else {
          insights.push('Infrastructure requires moderate improvements')
        }
        break
    }

    return insights
  }

  const generateRecommendations = (category: string, score: number, trend: string): string[] => {
    const recommendations: string[] = []

    switch (category) {
      case 'heat':
        if (score <= 2) {
          recommendations.push('Implement green roof programs')
          recommendations.push('Increase tree canopy coverage by 30%')
          recommendations.push('Install cool pavement materials')
        } else if (score <= 3) {
          recommendations.push('Expand existing cooling infrastructure')
          recommendations.push('Create more shaded public spaces')
        } else {
          recommendations.push('Maintain current heat management strategies')
        }
        break
      
      case 'green-space':
        if (score <= 2) {
          recommendations.push('Develop 5 new parks in underserved areas')
          recommendations.push('Implement street tree planting program')
          recommendations.push('Create community garden initiatives')
        } else if (score <= 3) {
          recommendations.push('Enhance existing green spaces')
          recommendations.push('Improve park accessibility')
        } else {
          recommendations.push('Continue green space maintenance')
        }
        break
      
      case 'air-quality':
        if (score <= 2) {
          recommendations.push('Implement vehicle emission controls')
          recommendations.push('Increase air quality monitoring stations')
          recommendations.push('Promote public transportation')
        } else if (score <= 3) {
          recommendations.push('Strengthen pollution control measures')
          recommendations.push('Improve industrial emission standards')
        } else {
          recommendations.push('Maintain air quality standards')
        }
        break
      
      case 'infrastructure':
        if (score <= 2) {
          recommendations.push('Upgrade drainage systems')
          recommendations.push('Implement flood early warning system')
          recommendations.push('Strengthen flood barriers')
        } else if (score <= 3) {
          recommendations.push('Improve existing infrastructure')
          recommendations.push('Enhance emergency response systems')
        } else {
          recommendations.push('Maintain infrastructure standards')
        }
        break
    }

    return recommendations
  }

  const getChartData = () => {
    const timeLabels = ['Week 1', 'Week 2', 'Week 3', 'Week 4']
    const categories = ['heat', 'green-space', 'air-quality', 'infrastructure']
    
    return timeLabels.map(week => {
      const dataPoint: any = { week }
      categories.forEach(category => {
        // Simulate historical data
        dataPoint[category] = Math.random() * 2 + 2.5
      })
      return dataPoint
    })
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving': return <ArrowTrendingUpIcon className="h-5 w-5 text-green-500" />
      case 'declining': return <ArrowTrendingDownIcon className="h-5 w-5 text-red-500" />
      default: return <div className="h-5 w-5 bg-gray-400 rounded-full" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center">
            <CpuChipIcon className="h-6 w-6 mr-2 text-nasa-600" />
            Urban Planning Analysis Engine
          </h2>
          <div className="flex items-center space-x-4">
            <select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nasa-500"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
            <button
              onClick={runAnalysis}
              disabled={isAnalyzing || surveyData.length === 0}
              className="px-4 py-2 bg-nasa-600 text-white rounded-lg hover:bg-nasa-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isAnalyzing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Analyzing...
                </>
              ) : (
                <>
                  <ChartBarIcon className="h-4 w-4 mr-2" />
                  Run Analysis
                </>
              )}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-600">Total Surveys</p>
            <p className="text-2xl font-bold text-blue-900">{surveyData.length}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-green-600">Analysis Complete</p>
            <p className="text-2xl font-bold text-green-900">{analysisResults.length}</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-sm text-yellow-600">High Priority</p>
            <p className="text-2xl font-bold text-yellow-900">
              {analysisResults.filter(r => r.priority === 'high').length}
            </p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-purple-600">Improving Trends</p>
            <p className="text-2xl font-bold text-purple-900">
              {analysisResults.filter(r => r.trend === 'improving').length}
            </p>
          </div>
        </div>

        {analysisResults.length > 0 && (
          <div className="space-y-6">
            {/* Trend Chart */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Category Trends Over Time</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={getChartData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis domain={[0, 5]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="heat" stroke="#ef4444" strokeWidth={2} name="Heat Management" />
                  <Line type="monotone" dataKey="green-space" stroke="#22c55e" strokeWidth={2} name="Green Space" />
                  <Line type="monotone" dataKey="air-quality" stroke="#3b82f6" strokeWidth={2} name="Air Quality" />
                  <Line type="monotone" dataKey="infrastructure" stroke="#8b5cf6" strokeWidth={2} name="Infrastructure" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Analysis Results */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {analysisResults.map((result) => (
                <div key={result.category} className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold capitalize">
                      {result.category.replace('-', ' ')} Analysis
                    </h3>
                    <div className="flex items-center space-x-2">
                      {getTrendIcon(result.trend)}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(result.priority)}`}>
                        {result.priority} priority
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Overall Score</span>
                      <span className="text-2xl font-bold text-nasa-600">{result.score}/5</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-nasa-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(result.score / 5) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                        <ExclamationTriangleIcon className="h-4 w-4 mr-1 text-yellow-500" />
                        Key Insights
                      </h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {result.insights.map((insight, index) => (
                          <li key={index} className="flex items-start">
                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0" />
                            {insight}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                        <CheckCircleIcon className="h-4 w-4 mr-1 text-green-500" />
                        Recommendations
                      </h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {result.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start">
                            <span className="w-1.5 h-1.5 bg-nasa-600 rounded-full mt-2 mr-2 flex-shrink-0" />
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {surveyData.length === 0 && (
          <div className="text-center py-8">
            <DocumentChartBarIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Survey Data Available</h3>
            <p className="text-gray-600">Run some surveys to generate analysis data.</p>
          </div>
        )}
      </div>
    </div>
  )
}
